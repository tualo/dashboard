Ext.define('Tualo.routes.Dashboard',{
    url: 'home',
    handler: {
        action: function(token){
            console.log('action',this,arguments)
            Ext.getApplication().addView('Tualo.dashboard.view.login.Panel',true,token);
        },
        before: function (action) {
            console.log('before',this,arguments)
            Ext.require('Tualo.dashboard.view.login.Panel',function(){
                action.resume();
            },this)
        }
    }
});