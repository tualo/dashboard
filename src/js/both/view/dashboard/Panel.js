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
        },{
            xtype: 'button',
            text: 'Nav',
            enableToggle: true,
            reference: 'navBtn',
            toggleHandler: 'onToggleNav'
        },{
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
        },{ 
            xtype: 'dashboard_profilemenu',
            dock: 'bottom',
            // height: 150
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
    },{
        xtype: 'panel',
        itemId: 'stage',
        flex: 1,
        layout: 'card',/*,
        dockedItems: [{ 
            xtype: 'dashboard_windowmenu',
            dock: 'bottom'
        }]*/
        items: [
            {
                xtype: 'panel',
                layout: 'card',
                listeners: {
                    boxready: 'onDashboardReady'
                }/*,
                initComponent: function(){
                    console.log('initComponent','DASHBOARD',arguments);
                }*/
            }
            /*
            
            */
        ]
    }],
    addView: function(cls,options){

        let stage = this.getComponent('stage'),
            c = Ext.create(cls,options||{});
        stage.add(c);
        stage.setActiveItem(c);

        Ext.getApplication().updateWindowTitle();
    },
    setSessionPing: function(data){
        console.log('setSessionPing','data',data);
    }
})