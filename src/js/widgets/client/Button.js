Ext.define('TualoOffice.dashboard.widgets.client.Button', {
    extend: 'Ext.Button',
    alias: 'widget.clientbutton',
    
    switchClient: function(client){
      console.log('ok',client,arguments);
      Ext.Ajax.request({
          url: './dashboard/client/switch',
          params: {
            toclient: client
          },
          success: function(response){
            var o = JSON.parse(response.responseText);
            if (o.success){
              window.location.reload();
            }
            
          }
      });
    },
    
    getClient: function(){
      var me = this;
      Ext.Ajax.request({
          url: './dashboard/client/load',
          success: function(response){
            var o = JSON.parse(response.responseText);
            if (o.success){  
              if (o.data.length>0){
                me.show();
                me.refreshMenu(o.data,o.current);
              }else{
                me.hide();
              }
  
            }else{
              me.hide();
            }
          }
      });
    },
    
    text: '--',
    onSwitchClient: function(btn){
      this.switchClient(btn.config.text);
    },
    refreshMenu: function(clients,current){
      var me = this, text=current, m=[];
      me.setText(text);
      if (clients){
        for(var i=0;i<clients.length;i++){
          if (clients[i].client==current){
            text = clients[i].client;
          }
          m.push(  {text: clients[i].client,handler:this.onSwitchClient,scope:this} );
        }
        me.setMenu(m);
      }
      
    },
    bind: {
      text: '{client}',
    },
    initConfig: function(config) {
        this.callParent(config);
        console.log('ok')
        let me = this;
        me.menu = [];
        document.addEventListener("visibilitychange", function(){
            me.getClient();  
        });
        me.getClient();
    },
    setStore: function(store) {
        var oldStore = this.store;
        this.store = store;
        this.updateStore(store, oldStore);
    }
});
  