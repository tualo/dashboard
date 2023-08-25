Ext.define('Tualo.dashboard.lazy.Panel',{
    //extend: "Ext.dashboard.Panel",
    extend: "Ext.panel.Panel",
    html: 'lazy panel',
    layout: 'fit',
    items: [{
        xtype: 'dashboard',
        maxColumns: 4,
    stateful: true,
    stateId: 'simple-dashboard',
    columnWidths: [0.25, 0.25, 0.25, 0.25],
    parts: {

        widget1: {
            viewTemplate: { //normal view config, can use xtype to use an application view
                title: 'Widget 1',
                html: 'Widget 1'
            }
        },
        widget2: {
            viewTemplate: {
                title: 'Widget 2',
                html: 'Widget 2'
            }
        },
        widget3: {
            viewTemplate: {
                title: 'Widget 3',
                html: 'Widget 3'
            }
        }
    },
    defaultContent: [{
        type: 'widget1', //maps to the parts key
        columnIndex: 0
    }, {
        type: 'widget3',
        columnIndex: 0
    }, {
        type: 'widget2',
        columnIndex: 1
    }]
    }],
    /*
    requires:[
        'Tualo.dashboard.lazy.controller.Panel',
        'Tualo.dashboard.lazy.models.Panel'
    ],
    
    controller: 'lazy_dashboard_panel',
	viewModel: {
		type: 'lazy_dashboard_panel'
	},
    bind: {
      //  disabled: "{disabled}"
    },
    */

    /*
    maxColumns: 4,
    stateful: true,
    stateId: 'simple-dashboard',
    columnWidths: [0.25, 0.25, 0.25, 0.25],
    parts: {
        widget1: {
            viewTemplate: { //normal view config, can use xtype to use an application view
                title: 'Widget 1',
                html: 'Widget 1'
            }
        },
        widget2: {
            viewTemplate: {
                title: 'Widget 2',
                html: 'Widget 2'
            }
        },
        widget3: {
            viewTemplate: {
                title: 'Widget 3',
                html: 'Widget 3'
            }
        }
    },
    defaultContent: [{
        type: 'widget1', //maps to the parts key
        columnIndex: 0
    }, {
        type: 'widget3',
        columnIndex: 0
    }, {
        type: 'widget2',
        columnIndex: 1
    }]
    */
});