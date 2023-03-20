Ext.define('Tualo.routes.DashboardWait',{
    url: 'dashboard_wait',
    handler: {
        action: function(token){
            Ext.getApplication().addView('Tualo.dashboard.view.wait.Panel',true,token);
        },
        before: function (action) {
            Ext.require('Tualo.dashboard.view.wait.Panel',function(){
                action.resume();
            },this)
        }
    }
});