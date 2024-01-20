Ext.define('Tualo.dashboard.view.dashboard.SearchMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_searchmenu',
    onBoxReady: function(x){
        // this.onToggleMicro(null,true);
    },
    onResize: function(fld,width){
        fld.getViewModel().set('width',width);
    },

    onSearchClick: function(fld){
        let me = this;
        me.getView().up('dashboard_dashboard').getController().onToggleMicro(null,false);
        setTimeout(function(){
            me.getView().down('#searchfield').focus(true);
        },100);
    },
    /**
     * 
     * 
     * @param {*} fld 
     * @param {*} e 
     */
    onSearchKeyPress: function (fld, e) {
        let searchvalue = fld.getValue().toLowerCase();
        console.log('onSearchKeyPress',arguments);
        if (e.keyCode == 13) {

          let list = [];
          for(var className in Ext.ClassManager.classes){
            if (Ext.ClassManager.classes.hasOwnProperty(className)){
                if (typeof Ext.ClassManager.classes[className].globalsearch=='object'){
                    if (
                            (typeof Ext.ClassManager.classes[className].globalsearch.title=='string')
                        &&  (Ext.ClassManager.classes[className].globalsearch.title.length>1)
                        &&  (Ext.ClassManager.classes[className].globalsearch.title!='not set')
                    ){
                        if (
                            (Ext.ClassManager.classes[className].globalsearch.title.toLowerCase().indexOf(searchvalue)>=0) ||
                            (Ext.ClassManager.classes[className].globalsearch.table_name.toLowerCase().indexOf(searchvalue)>=0)
                        ){
                            list.push({ 
                                text: Ext.ClassManager.classes[className].globalsearch.title,
                                routeTo: Ext.ClassManager.classes[className].globalsearch.routeTo,
                                iconCls: Ext.ClassManager.classes[className].globalsearch.iconCls,
                                leaf: true
                            })
                        }
                    }
                }
              }
            }
            if (list.length>0){
                let store = this.getView().up('dashboard_dashboard').getViewModel().get('navItems');
                store.getRootNode().removeAll();
                console.log('list',list);
                store.getRootNode().appendChild(list);
            }
        }

        
      }
});