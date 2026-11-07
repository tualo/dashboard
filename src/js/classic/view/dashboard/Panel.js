Ext.define('Tualo.dashboard.view.dashboard.Panel', {
    extend: 'Ext.Panel',

    alias: "widget.dashboard_dashboard",
    requires: [
        /*'Tualo.dashboard.widgets.Menu'*/
    ],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    controller: 'dashboard_dashboard',
    viewModel: {
        type: 'dashboard_dashboard'
    },

    iconCls: 'x-fa fa-gears',
    title: 'tualo office',
    /*
    defaults: {
        header: {
            defaults: {
                ui: 'flat large'
            }
        }
    },
    */
    header: {
        hidden: true,
        items: [{
            xtype: 'button',
            text: 'Options',
            menu: [{
                text: 'Expander Only',
                checked: true,
                handler: 'onToggleConfig',
                config: 'expanderOnly'
            }, {
                text: 'Single Expand',
                checked: false,
                handler: 'onToggleConfig',
                config: 'singleExpand'
            }]
        }, {
            xtype: 'button',
            text: 'Nav',
            enableToggle: true,
            reference: 'navBtn',
            toggleHandler: 'onToggleNav'
        }, {
            xtype: 'button',
            text: 'Micro',
            enableToggle: true,
            toggleHandler: 'onToggleMicro'
        }]
    },
    listeners: {
        "boxready": "onBoxReady"
    },
    items: [

        {
            width: 230,
            split: true,
            reference: 'treelistContainer',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: true,
            ui: 'nav',
            scrollable: 'y',
            dockedItems: [{

                xtype: 'dashboard_searchmenu',
                dock: 'top'
            }, {
                xtype: 'dashboard_profilemenu',
                dock: 'bottom',
                height: 150
            }],
            items: [
                {
                    ui: 'nav',
                    xtype: 'treelist',
                    reference: 'treelist',
                    bind: {
                        store: '{navItems}'
                    },
                    listeners: {
                        itemclick: 'onMenuItemClick',
                        select: 'onMenuItemSelect'
                    }

                }
            ]
        }, {
            xtype: 'panel',
            itemId: 'stage',
            flex: 1,

            bbar: [{
                xtype: 'dataview',
                flex: 1,
                cls: 'tualo-breadcrumb-bar',
                tpl: [
                    '<tpl for=".">',
                    '<div class="tualo-breadcrumb-item{[values.active ? " tualo-breadcrumb-item-active" : ""]}">',
                    '<tpl if="iconCls"><span class="tualo-breadcrumb-icon {iconCls}"></span></tpl>',
                    '<span class="tualo-breadcrumb-text">{text:htmlEncode}</span>',
                    '<tpl if="closable"><span class="tualo-breadcrumb-close x-fa fa-xmark" role="button" data-qtip="Schlie&szlig;en"></span></tpl>',
                    '</div>',
                    '</tpl>'
                ],
                listeners: {
                    itemclick: function (view, record, item, index, e) {
                        let panel = view.up('dashboard_dashboard');
                        if (e.getTarget('.tualo-breadcrumb-close')) {
                            panel.closeView(record.get('itemId'));
                        } else {
                            panel.showStage(record.get('itemId'));
                        }
                    }
                },
                itemSelector: 'div.tualo-breadcrumb-item',
                emptyText: '',
                bind: {
                    store: '{breadcrumbs}'
                }
            }],
            layout: 'card',
            items: [
                {
                    xtype: 'panel',
                    itemId: 'dashboard_home',
                    layout: 'card',
                    listeners: {
                        boxready: 'onDashboardReady'
                    }
                }
            ]
        }
    ],
    afterRender: function () {
        this.callParent(arguments);
        this.initBreadcrumbs();
    },

    getBreadcrumbStore: function () {
        return this.getViewModel().getStore('breadcrumbs');
    },

    // Classic meldet Kartenwechsel auf der aktivierten Karte, nicht auf der Stage.
    initBreadcrumbs: function () {
        let stage = this.getComponent('stage'),
            store = this.getBreadcrumbStore();

        if (!this._breadcrumbsInitialized) {
            this._breadcrumbsInitialized = true;
            stage.on('remove', this.onStageViewRemoved, this);
            stage.on('add', this.onStageViewAdded, this);
            stage.items.each(function (component) {
                this.onStageViewAdded(stage, component);
            }, this);
        }

        if (store.findExact('itemId', 'dashboard_home') === -1) {
            store.insert(0, {
                itemId: 'dashboard_home',
                text: 'Dashboard',
                iconCls: 'x-fa fa-house',
                closable: false
            });
        }
        this.syncActiveBreadcrumb();
    },

    onStageViewAdded: function (stage, component) {
        this.mon(component, 'activate', this.syncActiveBreadcrumb, this);
    },

    syncActiveBreadcrumb: function () {
        let activeItem = this.getComponent('stage').getLayout().getActiveItem(),
            itemId = activeItem ? activeItem.getItemId() : null;

        this.getBreadcrumbStore().each(function (rec) {
            console.log('syncActiveBreadcrumb', rec.get('itemId'), itemId);
            rec.set('active', rec.get('itemId') === itemId);

        });
    },

    showStage: function (itemId) {
        let stage = this.getComponent('stage'),
            c = stage.getComponent(itemId);
        if (c) {
            stage.setActiveItem(c);
            this.syncActiveBreadcrumb();
        }
    },

    closeView: function (itemId) {
        let c = this.getComponent('stage').getComponent(itemId);
        if (c && c.getItemId() !== 'dashboard_home') {
            this.removeView(c);
        }
    },

    removeView: function (component) {
        // Breadcrumb-Pflege übernimmt der remove-Listener (onStageViewRemoved),
        // damit auch extern zerstörte Komponenten korrekt aufgeräumt werden.
        this.getComponent('stage').remove(component);
    },

    onStageViewRemoved: function (stage, component) {
        this.mun(component, 'activate', this.syncActiveBreadcrumb, this);
        let store = this.getBreadcrumbStore(),
            idx = store.findExact('itemId', component.getItemId());

        if (idx !== -1) {
            let wasActive = store.getAt(idx).get('active');
            store.removeAt(idx);
            if (wasActive) {
                // benachbarten Eintrag aktivieren (links bevorzugt)
                let next = store.getAt(idx - 1) || store.getAt(0);
                if (next) {
                    this.showStage(next.get('itemId'));
                }
            }
            Ext.getApplication().updateWindowTitle();
        }
    },

    getBreadcrumbTitle: function (c) {
        let title = '...';
        if (typeof c.getWindowTitle === 'function') {
            title = c.getWindowTitle();
        } else if (typeof c.getTitle === 'function') {
            title = c.getTitle();
        } else if (typeof c.title === 'string') {
            title = c.title;
        }
        return title;
    },

    addView: function (cls, options) {
        let me = this, stage = this.getComponent('stage'),
            c = Ext.create(cls, options || {}),
            title = this.getBreadcrumbTitle(c),
            icon = 'fa-regular fa-file',
            store;

        this.initBreadcrumbs();
        store = this.getBreadcrumbStore();

        stage.add(c);

        this.fireEvent('add_stage_view', this, c);




        if (typeof c.getWindowIcon === 'function') {
            icon = c.getWindowIcon();
        } else if (typeof c.iconCls === 'string') {
            icon = c.iconCls;
        }

        if (!icon) {
            icon = 'fa-regular fa-file';
        }

        console.log('Adding view with title:', title, 'and icon:', icon);

        let record = store.add({
            itemId: c.getItemId(),
            text: title,
            iconCls: icon
        })[0];

        // Titel aktuell halten: bevorzugt über ViewModel-Binding,
        // zusätzlich über das titlechange-Event
        if (c.getViewModel()) {
            c.getViewModel().bind('{currentTitle}', function (v) {
                if (!Ext.isEmpty(v)) {
                    this.set('text', v);
                }
            }, record);
        }

        if (c.getViewModel()) {
            c.getViewModel().bind('{currentIcon}', function (v) {
                if (!Ext.isEmpty(v)) {
                    this.set('iconCls', v);
                }
            }, record);
        }

        c.on('titlechange', function (cmp, title) {
            console.log('Title changed for', cmp, 'new title:', title);
            record.set('text', me.getBreadcrumbTitle(cmp));
        });


        c.on('iconchange', function (cmp, icon) {
            console.log('Icon changed for', cmp, 'new icon:', icon);
            record.set('iconCls', icon);
        });


        this.showStage(c.getItemId());
        Ext.getApplication().updateWindowTitle();
        return c;
    },
    setSessionPing: function (data) {
    }
})