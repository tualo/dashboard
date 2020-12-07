Ext.define('TualoOffice.dashboard.controller.Menu', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard_mainmenu',
    onLogoutClick: function(){
        console.log('onLogoutClick');
        this.getView().fireEvent('logout',this);
    }
});