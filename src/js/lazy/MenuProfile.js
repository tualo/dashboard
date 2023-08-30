Ext.define('Tualo.dashboard.MenuProfile', {
    extend: 'Ext.panel.Panel',
    controller: 'menu_profile',
    requires: [
        'Tualo.dashboard.controller.MenuProfile'
    ],
    // border: true,
    viewModel: {
        data: {
            width: null,
        },
        stores: {
            navItems: {
    
                autoLoad: true,
                type: 'tree',
                listeners: {
                    load: 'onTreeLoad'
                },
                proxy: {
                    type: 'ajax',
                    reader: 'json',
                    url: './dashboard/profilemenu'
                },
                lazyFill: false
            }
        }
    },
    listeners: {
        "resize": 'onResize',
        "boxready": "onBoxReady"
    },
    layout: 'fit',
    // height: 132,
    items: [
            
        {
            width: 230,
            split: true,
            reference: 'treelistContainer',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            ui: 'nav',
            scrollable: 'y',
            items: [
                {
                    ui: 'nav',
                    xtype: 'treelist',
                    reference: 'treelist',
                    bind: {
                        store: '{navItems}'
                    },
                    listeners: {
                        itemclick: 'onMenuItemClick',
                        select: 'onMenuItemSelect'
                    }

                }
            ]
        }
    ]
});
