Ext.define('Tualo.dashboard.view.dashboard.Model', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.dashboard_dashboard',

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
                url: '../dashboard/menu'
            },
            lazyFill: false
        }
    }
});