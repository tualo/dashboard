Ext.define('Tualo.dashboard.lazy.Panel', {
    //extend: "Ext.dashboard.Panel",
    extend: "Ext.panel.Panel",
    layout: 'fit',
    requires:[
        'Tualo.dashboard.lazy.controller.Panel',
    ],
    controller: 'lazy_dashboard_panel',
    listeners: {
        boxready: 'onBoxReady'
    },
    items: [],
});