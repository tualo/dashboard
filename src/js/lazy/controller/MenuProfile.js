Ext.define('Tualo.dashboard.controller.MenuProfile', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu_profile',   
    
    onTreeLoad: function(){
        var treelist = this.lookupReference('treelist');
        this.onToggleNav(null,true); // kleiner nachlade trick
        treelist.setConfig('singleExpand', true);
    },
    onToggleMicro: function(button, pressed) {
        var treelist = this.lookupReference('treelist'),
            ct = treelist.ownerCt;

        treelist.setMicro(pressed);

        if (pressed) {
            this.oldWidth = ct.width;
            ct.setWidth(44);
        } else {
            ct.setWidth(this.oldWidth);
        }
    },

    onBoxReady: function(x){
        this.onToggleMicro(null,true);
    },
    onToggleNav: function (button, pressed) {
        var treelist = this.lookupReference('treelist'),
            ct = this.lookupReference('treelistContainer');

        treelist.setExpanderFirst(!pressed);
        treelist.setUi(pressed ? 'nav' : null);
        treelist.setHighlightPath(pressed);
        ct[pressed ? 'addCls' : 'removeCls']('treelist-with-nav');

        
    },
    onMenuItemClick: function(view,record,node){
        if (!Ext.isEmpty(record.node.get('routeTo'))){
            if (record.event.ctrlKey===true){
                window.open('#'+record.node.get('routeTo'),'_blank');
            }else{
                Ext.getApplication().redirectTo(record.node.get('routeTo'));
            }
        }
        
        console.log('onMenuItemClick',record)
    },
    onResize: function(fld,width){
        let treelist = this.lookupReference('treelist'),
        pressed=true;
        if (width < 100){
            pressed=true;
        }else{
            pressed=false;
        }
        treelist[pressed ? 'addCls' : 'removeCls']('avatar-small');
        this.onToggleMicro(null,pressed);
    },
});
