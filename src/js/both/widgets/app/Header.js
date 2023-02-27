
Ext.define('TualoOffice.dashboard.widgets.app.Header', {
    extend: 'Ext.Toolbar',
    xtype: 'app_header',
    requires: [
        'Ext.field.Search',
        'Ext.field.Text',
        //'Ext.ux.form.SearchField',
        'TualoOffice.dashboard.widgets.client.Button',
        'TualoOffice.dashboard.widgets.app.HeaderModel',
        'TualoOffice.dashboard.widgets.app.HeaderController'
    ],
    controller: 'app_header',
    /*
    viewModel: {
        type: 'app_header'
    },
    */
    layout: 'hbox',
    shadow: true,
    styleHtmlContent: true,
    items: [
        {
            xtype: 'image',
            tooltip: 'Logo',
            docked: 'left',
            width: 80
        },
        
        {
            xtype: 'searchfield',
            name: 'searchfield',
            placeholder: 'Suchen',
            flex: 1
        },
        
        {
            xtype: 'clientbutton',
            //ui: 'action round',
            //shadow: 'true',
        },
        
        /*{
            xtype: 'button',
            shadow: 'true',
            height: 32,
            iconCls: 'x-fa fa-arrow-right'
        }
        */
        {
           xtype: 'button',
           margin: '6 10 0 0',
           handler: 'onLogoutClick',
           shadow: 'true',
           tooltip: 'Abmelden',
           ui: 'action round',
           height: 32,
           iconCls: 'x-fa fa-power-off',
           docked: 'right'
       },{
            xtype: 'button',
            margin: '6 10 0 0',
            handler: 'onLogoutClick',
            shadow: 'true',
            ui: 'action round',
            text: 'Thomas Hoffmann',
            height: 32,
            docked: 'right'
        }
    ]
});