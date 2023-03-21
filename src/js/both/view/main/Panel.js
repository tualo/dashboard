Ext.define('Tualo.dashboard.view.main.Panel',{
    extend: 'Ext.panel.Panel',
    layout: 'card',

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
                html: 'Einen Moment bitte...'
            }]
        },{
            xtype: 'dashboard_dashboard',
            itemId: 'dashboard_dashboard',
        }
    ],
    addView: function(viewcls,single,token) {
        let panel = Ext.create(viewcls,{ });
        this.add(panel);
        this.setActiveItem(panel);
    }
})