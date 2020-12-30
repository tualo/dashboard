Ext.define('TualoOffice.dashboard.view.main.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard_main',
    controller: 'dashboard_main',
    layout: 'card',

    listeners: {
        initialize: 'onInitialize'
    },
    addView: function(viewcls,token,single){
        this.items.getAt(2).addView(viewcls,token,single);
    },
    requires: [
        'TualoOffice.dashboard.view.login.Panel',
        'TualoOffice.dashboard.view.dashboard.Panel',
        'TualoOffice.dashboard.view.main.Controller'
    ],
    items: [
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
            xtype: 'dashboard_login',
            listeners: {
                loggedIn: 'onLoggedIn'
            }
        },{
            xtype: 'dashboard_dashboard',
            itemId: 'dashboard_dashboard',
            listeners: {
                loggedOut: 'onLoggedOut'
            }
        }
    ]
});