Ext.define('Tualo.dashboard.view.wait.Panel', {
    extend: 'Ext.Panel',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items:[{
        xtype: 'panel',
        html: 'Einen Moment bitte'
    }]
})