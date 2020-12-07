Ext.define('TualoOffice.dashboard.view.dashboard.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard_dashboard',
    requires: [
        'TualoOffice.dashboard.view.dashboard.Controller',
        'TualoOffice.dashboard.widgets.Menu'
        //'TualoOffice.dashboard.controller.Dashboard'
    ],
    layout: 'card',
    
    
    controller: 'dashboard_dashboard',
    
    lbar: {
        xtype: 'dashboard_mainmenu',
        reference: 'dashboard_mainmenu',
        //ui: 'dark micro',
        listeners: {
            logout: 'onLogoutClick'
        },
        
        zIndex: 4
    },
    items:[
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
        xtype: 'panel',
        bodyCls: 'tualologinpanel',
        itemId: 'login',
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items:[{
            xtype: 'formpanel',
            itemId: 'loginform',
            //bodyCls: 'tualologinformpanel',
            // title: 'Anmeldung',
            bodyPadding: 24,
            border: true,
            defaults: {
                anchor: '100%'
            },
            width: 300,
            items: [
                {
                    xtype: 'displayfield',
                    value: 'Geben Sie hier Ihre Zugangsdaten ein'
                },
                {
                    xtype: 'textfield',
                    name: 'username',
                    anchor: '100%',
                    label: 'Login',
                    value: ''
                },
                {
                    xtype: 'textfield',
                    name: 'password',
                    label: 'Passort',
                    inputType: 'password',
                    value: ''
                }
            ],
            buttons: [
                {
                    text: 'Anmelden',
                    handler: 'onLoginClick'
                }
            ]
        }]
    },{
        title: 'tualo office',
        xtype: 'panel',
        html: 'logged in'
    }
    ]
});