Ext.define('Tualo.routes.Dashboard',{
    url: 'dashboard',
    handler: {
        action: function(token){
            Ext.getApplication().addView('Tualo.dashboard.lazy.Panel');
        },
        before: function (action) {
            action.resume();
        }
    }
});