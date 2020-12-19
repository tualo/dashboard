Ext.define('TualoOffice.dashboard.view.dashboard.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard_dashboard',
    requires: [
        'TualoOffice.dashboard.view.dashboard.Controller',
        'TualoOffice.dashboard.widgets.menu.Menu',
        'TualoOffice.dashboard.widgets.app.Header'
    ],
    layout: 'card',
    controller: 'dashboard_dashboard',
    addView: function(viewcls,single,token){
        this.getController().addView(viewcls,single,token);
    },
    
    items:[
        {
            docked: 'top',
            xtype: 'app_header',
            reference: 'app_header',
            ui: 'dark micro',
            listeners: {
                logout: 'onLogoutClick'
            },
            zIndex: 4
        },
        {
            docked: 'left',
            xtype: 'dashboard_mainmenu',
            reference: 'dashboard_mainmenu',
            ui: 'dark micro',
            listeners: {
                logout: 'onLogoutClick'
            },
            
            zIndex: 4
        },
        {
            xtype: 'panel',
            itemId: 'loading',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items:[{
                xtype: 'panel',
                width: 80,
                height: 80,
                html: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
            }]
        },{
            title: 'tualo office',
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items:[{
                xtype: 'panel',
                width: 80,
                height: 80,
                html: 'Hi, there!'
            }]
        }
    ]
});