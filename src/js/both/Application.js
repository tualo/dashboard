Ext.application({
    name: 'TualoOfficeApplication',
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
        console.log(1);
        Tualo.Ajax.request({
            url: './dashboard/ping',
            json: function(o){
                me.sessionPing = o;
                if (o.success==false){
                    me.getMainView().setActiveItem(1);
                }else{
                    me.getMainView().setActiveItem(2);
                    window.o = o;
                    window.f = me.getMainView().getComponent('dashboard_dashboard');
                    me.getMainView().getComponent('dashboard_dashboard').setSessionPing(o);
                }
            }
        });
    },
    

    onAppUpdate: function () {
        Ext.Msg.confirm('Anwendung', 'Für diese Anwendung gibt es Änderungen, sollen diese geladen werden?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});