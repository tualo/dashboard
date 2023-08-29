Ext.define('Tualo.dashboard.view.dashboard.ProfileMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_profilemenu',
    onBoxReady: function(x){

        this.getView().add(Ext.create('Tualo.dashboard.MenuProfile',{}));
        
        /*
        console.log(Ext.getApplication().sessionPing);
        this.getViewModel().set('fullname',Ext.getApplication().sessionPing.fullname);
        this.getViewModel().set('username',Ext.getApplication().sessionPing.username);
        this.getViewModel().set('client',Ext.getApplication().sessionPing.client);
        this.getViewModel().set('avatar',Ext.getApplication().sessionPing.avatar);
        this.getViewModel().set('clientavatar',Ext.getApplication().sessionPing.clientavatar);
        this.getViewModel().set('gstavatar',Ext.getApplication().sessionPing.gstavatar);
        this.getViewModel().set('bkravatar',Ext.getApplication().sessionPing.bkravatar);
        this.getViewModel().set('gst',Ext.getApplication().sessionPing.gst);
        this.getViewModel().set('bkr',Ext.getApplication().sessionPing.bkr);
        */
    },

    onResize: function(fld,width){
        // fld.getViewModel().set('width',width);
        console.log('ProfileMenuController',width);
    },

    onIconClick: function(fld){
        //this.getView().up('dashboard_dashboard').getController().onToggleMicro(null,false);
        // this.getView().down('#searchfield').focus();
    }
});