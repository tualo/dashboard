
Ext.define('Tualo.dashboard.view.login.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_login',

    onInitialize: function(){
         
    },

    onLoginClick: async function(btn) {
        window.btn=btn;
        window.t=this;

        let me = this,
            frm = me.getView().getValues(),
            result = await Tualo.Fetch.post('',frm);
        console.log(result);
        if (result.success==false){
            me.getView().addCls('panel-shake')
            Ext.defer(()=>{  me.getView().removeCls('panel-shake') }, 1000 );
            Ext.toast(result.msg);
        }else{
            me.getView().fireEvent('loggedIn');
            // me.getMainView().setActiveItem(0);
            window.location.reload();
        }
        
  
    }
});