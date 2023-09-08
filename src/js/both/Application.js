Ext.Loader.setPath('Tualo.dashboard', './jsdashboard');
Ext.Loader.setPath('Tualo.dashboard.lazy', './jsdashboard');



Ext.define('Tualo.Application',{
    extend: 'Ext.app.Application',
    name: 'Tualo',
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    debug: false,
    getDebug: function(){
        return this.debug;
        
    },
    enableDebugXType: function(){
        let orig = Ext.ClassManager.instantiateByAlias
        Ext.ClassManager.instantiateByAlias = function(orig){
                return function() {
                        let alias = arguments[0];
                        console.debug('load alias',alias);
                        return orig.apply(this, arguments);
                }
        }(orig);
    },
    //controllers: ['Tualo.dashboard.controller.Application'],
    paths: {
        'Tualo': '.'
    },
    requires: [
        'Ext.*',
        'Tualo.*',
        'IconFont.*'
    ],
    mainView: 'Tualo.dashboard.view.main.Panel',
    listeners: {
        unmatchedroute: 'onUnmatchedRoute'
    },
    routes: {
        'logout': function(){}
    },

    getAPIPath: ()=>{ return './' },

    /*
    profiles: [
        'Phone',
        'Tablet'
    ],
    */
    // defaultToken: 'dashboard_wait',

    onUnmatchedRoute: function(token) {
        console.error('onUnmatchedRoute',token);
    },

    launch: function(profile) {
        Ext.getBody().removeCls('launching');
        Ext.on('routereject',()=>{
            console.error('routereject',arguments)
            return true;
        })
        this.callParent([profile]);
        this.registerRoutes();
        this.getMainView().setActiveItem(this.getMainView().getComponent('loading'));
        this.ping();
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
        this.getMainView().getComponent('dashboard_dashboard').addView(viewcls,single,token);
    },
    getCurrentView: function(){
        return Ext.getApplication().getMainView().down('dashboard_dashboard').getComponent('stage');
    },
    ping: function(){
        let me=this;
        Tualo.Ajax.request({
            url: Ext.getApplication().getAPIPath()+'dashboard/ping',
            json: function(o){
                me.sessionPing = o;
                if (o.success==false){
                    //Ext.getApplication().redirectTo('dashboard_login');
                    me.getMainView().setActiveItem(1);
                }else{
                    me.getMainView().setActiveItem(2);
                    /*
                    Ext.getApplication().redirectTo('dashboard_dashboard');
                    */
                    me.getMainView().getComponent('dashboard_dashboard').setSessionPing(o);
                    
                }
            }
        });
    },
    

    onAppUpdate: function () {
        /*
        Ext.Msg.confirm('Anwendung', 'Für diese Anwendung gibt es Änderungen, sollen diese geladen werden?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
        */
    }
});