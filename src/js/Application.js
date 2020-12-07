Ext.application({
    name: 'TualoOffice',

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'Main.view.main.Main'

    controllers: ['TualoOffice.dashboard.controller.Application'],

    paths: {
        'TualoOffice': '.'
    },
    requires: [
        'TualoOffice.tualojs.Ajax'
    ],
    mainView: 'TualoOffice.dashboard.view.dashboard.Panel',

    launch: function() {
       this.ping();
    },

    ping: function(){
        let me=this;
        Tualo.Ajax.request({
            url: './dashboard/ping',
            json: function(o){
                if (o.success==false){
                    console.log(me.getMainView());
                    me.getMainView().setActiveItem(1);
                }else{
                    me.getMainView().setActiveItem(2);
                }
            }
        });
    },
    

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});