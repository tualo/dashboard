Ext.define('TualoOffice.dashboard.widgets.app.HeaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.app_header',
    onLogoutClick: function(){
        this.getView().fireEvent('logout')
    }
});