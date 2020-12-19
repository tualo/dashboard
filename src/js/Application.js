Ext.application({
    name: 'TualoOfficeApplication',

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

    mainView: 'TualoOffice.dashboard.view.main.Panel',

    listeners: {
        unmatchedroute: 'onUnmatchedRoute'
    },
    routes: {
        'logout': function(){}
    },

    onUnmatchedRoute: function(token) {
        console.error('onUnmatchedRoute',token);
    },

    launch: function() {
       
        this.registerRoutes();
    },
    /*
    constructor: function(config) {

        if (typeof config=='undefined') config={};
        config.routes = this.getRoutes();
        console.log('a',config.routes);
        this.callParent(config);
    },
    */
    getRoutes: function(){
        let routes = {};
        for(let cls in Ext.ClassManager.classes){
            if (cls.indexOf('TualoOffice.routes.')==0){
                let route = Ext.create(cls);
                routes[route.url+""]=route.handler;
                
            }
        }
        return routes;

    },
    registerRoutes: function(){
        this.setRoutes(this.getRoutes());
    },
    addView: function(viewcls,single,token){
        this.getMainView().addView(viewcls,single,token);
    },
    ping: function(){
        let me=this;
        Tualo.Ajax.request({
            url: './dashboard/ping',
            json: function(o){
                me.sessionPing = o;
                if (o.success==false){
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