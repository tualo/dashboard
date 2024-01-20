Ext.define('Tualo.dashboard.view.dashboard.WindowMenu', {
    extend: 'Ext.toolbar.Toolbar',
    alias: "widget.dashboard_windowmenu",

    xtype: 'toolbar',
    dock: 'bottom',
    initComponent: function(){
        var me = this;
        me.callParent();
        
    },
    onBoxReady: function(){
        var me = this;
        me.callParent(arguments);
        try{
            if(me.up().up().getItemId()=='stage'){
                // me.up().up().on('beforeadd',this.beforeadd,me);
            }
        }catch(e){
            
        }
    },
    beforeadd: function(container,component,index,eOpts){
        console.log('beforeadd',arguments);
        this.add({
            iconCls: null,
            text: "wnd",
            glyph: 61,
            xtype: 'button'
        });
    },
    items: [{
        iconCls: null,
        text: "wnd",
        glyph: 61,
        xtype: 'button'
    }]
});
