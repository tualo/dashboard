Ext.define('Tualo.dashboard.view.main.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_main',

    onInitialize: function(){
        this.ping();
    },
    onLoggedOut: function(){
        let me=this;
        me.getView().setActiveItem(1);
    },
    onLoggedIn: function(){
        let me=this;
        me.getView().setActiveItem(2);
    },
    ping: function(){
        let me=this;
        Tualo.Ajax.request({
            url: './dashboard/ping',
            json: function(o){
                if (o.success==false){
                    me.getView().setActiveItem(1);
                }else{
                    me.getView().setActiveItem(2);
                }
            }
        });
    }
});