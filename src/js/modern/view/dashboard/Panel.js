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
        "added": "onBoxReady"
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


            items: [
                {

                    xtype: 'dashboard_searchmenu',
                    docked: 'top',
                    dock: 'top',
                    ui: 'nav',
                },
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

                },
                {
                    xtype: 'dashboard_profilemenu',
                    docked: 'bottom',
                    dock: 'bottom',
                    ui: 'nav',
                }
            ]
        }, {
            xtype: 'panel',
            itemId: 'stage',
            flex: 1,
            bbar: [{
                xtype: 'dataview',
                flex: 1,
                inline: true,
                cls: 'tualo-breadcrumb-bar',
                itemTpl: [
                    '<div class="tualo-breadcrumb-item{[values.active ? " tualo-breadcrumb-item-active" : ""]}">',
                    '<tpl if="iconCls"><span class="tualo-breadcrumb-icon {iconCls}"></span></tpl>',
                    '<span class="tualo-breadcrumb-text">{text:htmlEncode}</span>',
                    '<tpl if="closable"><span class="tualo-breadcrumb-close x-fa fa-xmark" role="button"></span></tpl>',
                    '</div>'
                ],
                listeners: {
                    childtap: function (view, location) {
                        let panel = view.up('dashboard_dashboard'),
                            record = location.record;
                        if (location.event.getTarget('.tualo-breadcrumb-close')) {
                            panel.closeView(record.get('itemId'));
                        } else {
                            panel.getController().onBreadcrumbSelect(record);
                        }
                    }
                },
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
        }],
    initialize: function () {
        this.callParent(arguments);
        this.initBreadcrumbs();
    },

    getBreadcrumbStore: function () {
        return this.getViewModel().getStore('breadcrumbs');
    },

    // Modern meldet Kartenwechsel direkt auf der Stage.
    initBreadcrumbs: function () {
        let stage = this.getComponent('stage'),
            store = this.getBreadcrumbStore();

        if (!this._breadcrumbsInitialized) {
            this._breadcrumbsInitialized = true;
            stage.on('remove', this.onStageViewRemoved, this);
            stage.on('activeitemchange', this.syncActiveBreadcrumb, this);
        }

        if (store.findExact('itemId', 'dashboard_home') === -1) {
            store.insert(0, {
                itemId: 'dashboard_home',
                text: 'Dashboard',
                link: '',
                iconCls: 'x-fa fa-house',
                closable: false
            });
        }
        this.syncActiveBreadcrumb();
    },

    syncActiveBreadcrumb: function () {
        let activeItem = this.getComponent('stage').getActiveItem(),
            itemId = activeItem ? activeItem.getItemId() : null;

        this.getBreadcrumbStore().each(function (rec) {
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

    addView: function (cls, options) {
        let stage = this.getComponent('stage'),
            routeToken = Ext.util.History.getToken() || '',
            c = Ext.create(cls, options || {}),
            store;

        this.initBreadcrumbs();
        store = this.getBreadcrumbStore();

        stage.add(c);

        this.fireEvent('add_stage_view', this, c);

        let record = store.add({
            itemId: c.getItemId(),
            link: routeToken,
            text: (c.getTitle && c.getTitle()) || '...',
            iconCls: c.iconCls
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
        c.on('titlechange', function (cmp, title) {
            record.set('text', title);
        });

        this.showStage(c.getItemId());
        Ext.getApplication().updateWindowTitle();
        return c;
    },
    setSessionPing: function (data) {
    }
})