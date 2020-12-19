Ext.define('TualoOffice.dashboard.widgets.client.Button', {
    extend: 'Ext.Button',
    alias: 'widget.clientbutton',

    switchClient: function(client){
  
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
  
    
    //
    onSwitchClient: function(btn){
      this.switchClient(btn.text);
    },
    refreshMenu: function(clients,current){
      /*
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
        */
    },
    text: ';)',
    //menu: [],
    initConfig: function(config) {
//        console.log('init',config);
        this.callParent(config);
        let me = this;
        me.menu = [];
        me.on('painted',me.getClient,me);
        document.addEventListener("visibilitychange", function(){
            console.log('---->')
              me.getClient();  
        });
      
        //this.setText( TualoOffice.getApplication().sessionPing.client );
        console.log('init',config);
        
      //var me.callParent();
      
    },
    setStore: function(store) {
        var oldStore = this.store;
        this.store = store;
        this.updateStore(store, oldStore);
    }
});
  