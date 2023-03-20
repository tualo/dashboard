Ext.define('Tualo.routes.DashboardLogin',{
    url: 'dashboard_login',
    handler: {
        action: function(token){
            Ext.getApplication().addView('Tualo.dashboard.view.login.Panel',true,token);
        },
        before: function (action) {
            Ext.require('Tualo.dashboard.view.login.Panel',function(){
                action.resume();
            },this)
        }
    }
});