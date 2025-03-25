Ext.define('Tualo.dashboard.view.MenuModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.dashboard_menu',

    data: {
        currentFullnames: 'OK',
        currentClient: '',
        currentClients: [],
        title: 'tualo'
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
                url: './dashboard/menu'
            },
            lazyFill: false
        },
        breadcrumbs: {
            fields: [
                { name: 'itemId', type: 'string' },
                { name: 'text', type: 'string' },
                { name: 'link', type: 'string' },
                { name: 'iconCls', type: 'string' }
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});