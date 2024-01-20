
Ext.define('Tualo.dashboard.view.dashboard.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_dashboard',

    onDashboardReady: function(panel){
    },
    onBoxReady: function(x){
        this.onToggleMicro(null,true);
    },
    onMenuItemSelect: function(event,item,node){
        console.log('onMenuItemSelect',arguments)
    },
    parseParam: function(param){
        let pairs=param.split('&');
        let p={};
        pairs.forEach((item)=>{
            let keyValue=item.split('=');
            p[keyValue[0]] = keyValue[1];
        });
        return p;
    },
    onMenuItemClick: function(view,record,node){
        if (Ext.isEmpty(record.node.get('routeTo'))){
            
            if (
                !Ext.isEmpty(record.node.get('component')) &&
                record.node.get('component')=='cmp_ds'
            ){
                let p = this.parseParam(record.node.get('param'));
                record.node.set('routeTo','ds/'+p['t'].toLowerCase());
            }
            
        }
        if (!Ext.isEmpty(record.node.get('routeTo'))){
            if (record.event.ctrlKey===true){
                window.open('#'+record.node.get('routeTo'),'_blank');
//                Ext.getApplication().redirectTo(record.node.get('routeTo'));
            }else{
                Ext.getApplication().redirectTo(record.node.get('routeTo'));
            }
        }
        
        console.log('onMenuItemClick',record)
    },


    onTreeLoad: function(){
        var treelist = this.lookupReference('treelist');
        this.onToggleNav(null,true); // kleiner nachlade trick
        treelist.setConfig('singleExpand', true);
    },

    onToggleNav: function (button, pressed) {
        var treelist = this.lookupReference('treelist'),
            ct = this.lookupReference('treelistContainer');

        treelist.setExpanderFirst(!pressed);
        treelist.setUi(pressed ? 'nav' : null);
        treelist.setHighlightPath(pressed);
        ct[pressed ? 'addCls' : 'removeCls']('treelist-with-nav');

        if (Ext.isIE8) {
            this.repaintList(treelist);
        }
    },
   
    onToggleConfig: function (menuitem) {
        var treelist = this.lookupReference('treelist');

        treelist.setConfig(menuitem.config, menuitem.checked);
    },
    onSearchFieldFocus: function(fld,focus){
        var treelist = this.lookupReference('treelist');

        console.log('onSearchFieldFocus',treelist)
        if (focus){
            this.onToggleMicro(null,false);
        }else{
            // this.onToggleMicro(null,true);
        }


    },
    onToggleMicro: function(button, pressed) {
        var treelist = this.lookupReference('treelist'),
            navBtn = this.lookupReference('navBtn'),
            ct = treelist.ownerCt;

        treelist.setMicro(pressed);

        if (pressed) {
            navBtn.setPressed(true);
            navBtn.disable();
            this.oldWidth = ct.width;
            ct.setWidth(44);
        } else {
            ct.setWidth(this.oldWidth);
            navBtn.enable();
        }
    },

    repaintList: function(treelist, microMode) {
        treelist.getStore().getRoot().cascade(function(node) {
            var item, toolElement;

            item = treelist.getItem(node);

            if (item && item.isTreeListItem) {
                if (microMode) {
                    toolElement = item.getToolElement();

                    if (toolElement && toolElement.isVisible(true)) {
                        toolElement.syncRepaint();
                    }
                }
                else {
                    if (item.element.isVisible(true)) {
                        item.iconElement.syncRepaint();
                        item.expanderElement.syncRepaint();
                    }
                }
            }
        });
    }
});