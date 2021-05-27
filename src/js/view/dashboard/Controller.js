Ext.define('TualoOffice.dashboard.view.dashboard.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_dashboard',

    onLogoutClick: function(){
      let me = this;
      Tualo.Ajax.request({
        scope: this,
        url: './logout',
        params: {
          "logout": 1
        },
        json: function(o){
          me.getView().fireEvent('loggedOut');
        }
      });

  
    },

    addView: function(viewcls,single,token){
      
      
      let panel = Ext.create(viewcls,{

      });
      this.getView().add(panel);
      this.getView().setActiveItem(panel);
      
    }
})