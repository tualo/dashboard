Ext.define('Tualo.dashboard.view.dashboard.Panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard_dashboard',
    requires: [
        'Tualo.dashboard.view.dashboard.Controller',
        'Tualo.dashboard.view.dashboard.Model',
        'Tualo.dashboard.widgets.menu.Menu',
        'Tualo.dashboard.widgets.app.Header'
    ],
    layout: 'card',
    controller: 'dashboard_dashboard',
    viewModel: {
        type: 'dashboard_dashboard'
    },
    

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
        /*
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
        },*/
        {
            title: 'tualo office',
            xtype: 'panel',
            itemId: 'stage',
            layout: {
                type: 'card',
                /*
                align: 'center',
                pack: 'center'
                */
            },
            items:[{
                xtype: 'panel',
                autoWidth: true,
                autoHeight: true,
                
                bind:{
                    html: '<span style="line-height:6.6vw;font-size:6vw;">Hallo, <br><b>{fullname}</b></span>'
                }
            }]
        }
    ]
});