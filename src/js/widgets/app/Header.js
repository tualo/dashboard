
Ext.define('TualoOffice.dashboard.widgets.app.Header', {
    extend: 'Ext.Toolbar',
    xtype: 'app_header',
    requires: [
        'Ext.field.Search',
        'TualoOffice.dashboard.widgets.client.Button'
    ],
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
            flex: 2
        },
        
        {
            xtype: 'clientbutton'
        },
        {
            xtype: 'button',
            handler: 'onLogoutClick',
            tooltip: 'Abmelden',
            iconCls: 'x-fa fa-power-off',
            docked: 'right'
        }
    ]
});