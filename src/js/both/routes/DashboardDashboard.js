Ext.define('Tualo.routes.DashboardDashboard',{
    url: 'dashboard_dashboard',
    handler: {
        action: function(token){
            Ext.getApplication().addView('Tualo.dashboard.view.dashboard.Panel',true,token);
        },
        before: function (action) {
            Ext.require('Tualo.dashboard.view.dashboard.Panel',function(){
                action.resume();
            },this)
        }
    }
});