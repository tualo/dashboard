Ext.define('Tualo.dashboard.view.loader.Panel', {
    extend: 'Ext.panel.Panel',
    
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
});