
Ext.define('TualoOffice.dashboard.view.login.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_login',

    onInitialize: function(){
         
    },

    onLoginClick: function(){

        let me = this,
            formpanel = me.getView(),
            frm = formpanel.getValues();
  
        Tualo.Ajax.request({
          scope: this,
          //showWait: true,
          url: './',
          params: {
            "username": frm.username,
            "password": frm.password
          },
          json: function(o){
            if (o.success==false){
                me.getView().addCls('panel-shake')
                Ext.defer(()=>{  me.getView().removeCls('panel-shake') }, 1000 );
                Ext.toast(o.msg);
                
            }else{

                me.getView().fireEvent('loggedIn');
                window.location.reload();
              //me.getView().getLayout().setActiveItem(2);
            }
          }
        });
  
    }
});