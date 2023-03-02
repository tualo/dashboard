Ext.define('Tualo.dashboard.view.main.Panel',{
    extend: 'Ext.panel.Panel',
    title: 'tualo',
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
                html: '<div class="lds-ring"><div></div><div>OK</div><div></div><div></div></div>'
            }]
        }
    ],
    addView: function(viewcls,single,token) {
        let panel = Ext.create(viewcls,{ });
        this.add(panel);
        this.setActiveItem(panel);
    }
})