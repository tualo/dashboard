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
    items: [
        
        {
        width: 250,
        split: true,
        reference: 'treelistContainer',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: true,
        ui: 'nav',
        scrollable: 'y',
        items: [{
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

        }]
    },{
        xtype: 'panel',
        itemId: 'stage',
        flex: 1,
        layout: 'card'
    }],
    addView: function(cls,single,token){
        let stage = this.getComponent('stage'),
            c = Ext.create(cls);
        stage.add(c);
        stage.setActiveItem(c);
    },
    setSessionPing: function(data){
        console.log('setSessionPing','data',data);
    }
})