Ext.define('TualoOffice.dashboard.view.dashboard.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_dashboard',

    onLogoutClick: function(){
      let me = this;
      Tualo.Ajax.request({
        scope: this,
        //showWait: true,
        url: './',
        params: {
          "logout": 1
        },
        json: function(o){
          TualoOffice.ping();
        }
      });
    },

    onLoginClick: function(){

        let me = this,
            formpanel = me.getView().getComponent('login').getComponent('loginform'),
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
              me.getView().getLayout().setActiveItem(1);
              Ext.toast(o.msg);
            }else{
              me.getView().getLayout().setActiveItem(2);
            }
          }
        });
  
    }
})