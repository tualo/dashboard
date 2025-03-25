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
                showIcons: true,
                tpl: [
                    '<tpl for=".">',
                    '<div style=" display: inline; margin-right: 12px; max-width: 50px; width: 50px;overflow: hidden;text-overflow: ellipsis;" class="breadcrumb-wrap">',
                    '<span>{text}</span>',
                    '</div>',
                    '</tpl>'
                ],
                listeners: {
                    itemclick(me, record, item, index, e, eOpts) {
                        console.log('itemclick', me, record, item, index, e, eOpts);
                        me.up('dashboard_dashboard').showStage(record.get('itemId'))
                    }
                },
                itemSelector: 'div.breadcrumb-wrap',
                emptyText: '',
                bind: {
                    store: '{breadcrumbs}'
                }
            }],
            layout: 'card',
            items: [
                {
                    xtype: 'panel',
                    layout: 'card',
                    listeners: {
                        boxready: 'onDashboardReady'
                    }
                }
            ]
        }],
    showStage: function (itemId) {
        let stage = this.getComponent('stage');
        stage.setActiveItem(itemId);
    },
    addView: function (cls, options) {

        let stage = this.getComponent('stage'),
            c = Ext.create(cls, options || {});
        stage.add(c);
        stage.setActiveItem(c);

        let breadcrumbStore = this.getViewModel().getStore('breadcrumbs');

        /*
        console.log(breadcrumbStore);
        console.log(breadcrumbStore.isLoaded);
        console.log(breadcrumbStore.load());
        */

        console.log('length', breadcrumbStore.getRange().length);


        let record = breadcrumbStore.add({
            itemId: c.itemId,
            text: '...',
            iconCls: c.iconCls
        });

        let myFn = function (v) {
            this.set('text', v);
            console.log('c.getViewModel().bind', v);
        }

        c.getViewModel().bind('{currentTitle}', myFn, record[0]);

        /*
        c.on('destroy',function(){
            stage.remove(c);
            stage.setActiveItem(0);
            breadcrumbStore.removeAt(breadcrumbStore.getCount()-1);
        });
        */
        /*
        c.on('titlechange',function(){
            // let rec = breadcrumbStore.getAt(breadcrumbStore.getCount()-1);
            record.set('text',c.title);
        });
        */
        //('title',c.title);
        Ext.getApplication().updateWindowTitle();
        console.log('addView done', breadcrumbStore);
        return c;
    },
    setSessionPing: function (data) {
    }
})