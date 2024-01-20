Ext.define('Tualo.dashboard.view.dashboard.ProfileMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_profilemenu',
    onBoxReady: function(x){
        this.getView().add(Ext.create('Tualo.dashboard.MenuProfile',{}));
    },
    onResize: function(fld,width){
    },

    onIconClick: function(fld){
    }
});