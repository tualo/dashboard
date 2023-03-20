Ext.define('Tualo.Application',{
    extend: 'Ext.app.Application',
    name: 'Tualo',
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    //controllers: ['Tualo.dashboard.controller.Application'],
    paths: {
        'Tualo': '.'
    },
    requires: [
        'Ext.*',
        'Tualo.tualojs.Ajax'
    ],
    mainView: 'Tualo.dashboard.view.main.Panel',
    listeners: {
        unmatchedroute: 'onUnmatchedRoute'
    },
    routes: {
        'logout': function(){}
    },

    getAPIPath: ()=>{ return '../' },

    /*
    profiles: [
        'Phone',
        'Tablet'
    ],
    */
    defaultToken: 'dashboard_wait',


    onUnmatchedRoute: function(token) {
        console.error('onUnmatchedRoute',token);
    },

    launch: function(profile) {
        console.log('launch',arguments);
        Ext.getBody().removeCls('launching');
        this.callParent([profile]);
        this.registerRoutes();
        this.ping()
    },
    getRoutes: function(){
        let routes = {};
        for(let cls in Ext.ClassManager.classes){
            if (cls.indexOf('Tualo.routes.')==0){
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
            url: Ext.getApplication().getAPIPath()+'dashboard/ping',
            json: function(o){
                me.sessionPing = o;
                if (o.success==false){
                    Ext.getApplication().redirectTo('dashboard_login');
                    // me.getMainView().setActiveItem(1);
                }else{
                    Ext.getApplication().redirectTo('dashboard_dashboard');
                    // me.getMainView().setActiveItem(2);
                    // window.o = o;
                    // window.f = me.getMainView().getComponent('dashboard_dashboard');
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