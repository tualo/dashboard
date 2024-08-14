Ext.Loader.setPath('Tualo.dashboard', './jsdashboard');
Ext.Loader.setPath('Tualo.dashboard.lazy', './jsdashboard');


/*
let ecreate = Ext.create;

Ext.define('Tualo.Application',{
    override: 'Ext',

    create: function() {
        var name = arguments[0],
            nameType = typeof name,
            args = [...arguments].slice( 1),
            cls;

        if (nameType === 'function') {
            cls = name;
        }
        else {
            if (nameType !== 'string' && args.length === 0) {
                args = [name];

                if (!(name = name.xclass)) {
                    name = args[0].xtype;

                    if (name) {
                        name = 'widget.' + name;
                    }
                }
            }

            if (typeof name !== 'string' || name.length < 1) {
                throw new Error("[Ext.create] Invalid class name or alias '" + name +
                                "' specified, must be a non-empty string");
            }

            name = Ext.ClassManager.resolveName(name);
            cls =  Ext.ClassManager.get(name);
        }

        // Still not existing at this point, try to load it via synchronous mode as the last
        // resort
        if (!cls) {
            

            Ext.syncRequire(name);

            cls =  Ext.ClassManager.get(name);
        }

        if (!cls) {
            throw new Error("[Ext.create] Unrecognized class name / alias: " + name);
        }

        if (typeof cls !== 'function') {
            throw new Error("[Ext.create] Singleton '" + name + "' cannot be instantiated.");
        }

        return  Ext.ClassManager.getInstantiator(args.length)(cls, args);
    }
});*/

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
                    console.debug('load alias',alias,arguments);
                    return orig.apply(this, arguments);
                }
        }(orig);

        /*
        let orig2 = Ext.widget;
        Ext.widget = function(orig){
            return function() {
                console.debug('Ext.widget',arguments);
                return orig.apply(this, arguments);
            }
        }(orig2);


        orig2 = Ext.view.Table.updateColumns;
        Ext.view.Table.updateColumns = function(orig){
            return function() {
                console.debug('Ext.view.Table.updateColumns',arguments);
                return orig.apply(this, arguments);
            }
        }(orig2);

        Ext.define('Tualo.Ext.view.Table', {
            override : 'Ext.view.Table',
            updateColumns: function(){
                console.debug('Ext.view.Table.updateColumns',arguments);
                return Ext.view.Table.prototype.updateColumns.call.bind(this)(arguments);
            }
        });
        */
    },
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
    defaultToken: 'dashboard',
    routes: {
        'logout': function(){}
    },
    getAPIPath: ()=>{ return './' },
    onUnmatchedRoute: function(token) {
        console.error('onUnmatchedRoute',token);
    },
    selfCheck: async function(dsName){
        Ext.create('Tualo.dashboard.lazy.SelfCheck').check(dsName);
    },
    launch: function(profile,e) {
        this.enableDebugXType();
        Ext.getBody().removeCls('launching');
        Ext.on('routereject',(route,eOpts)=>{
            try{
                console.error('routereject',eOpts.message)
            }catch(e){

            }
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
                try{
                let route = Ext.create(cls);
                routes[route.url+""]=route.handler;
                }catch(e){
                    console.error(e);
                }
            }
        }
        return routes;

    },
    registerRoutes: function(){
        this.setRoutes(this.getRoutes());
    },
    addView: function(viewcls,options){
        return this.getMainView().getComponent('dashboard_dashboard').addView(viewcls,options);
    },
    showStage: function(itemId){
        console.log('showStage',itemId);
        this.getMainView().getComponent('dashboard_dashboard').showStage(itemId);
    },
    getCurrentView: function(){
        return Ext.getApplication().getMainView().down('dashboard_dashboard').getComponent('stage');
    },
    updateWindowTitle: function(title){
        try{
            let title = (this.sessionPing)?(this.sessionPing.client+': '):'',
                currentItem = (Ext.isModern) ? Ext.getApplication().getMainView().down('dashboard_dashboard').getComponent('stage').getActiveItem() : Ext.getApplication().getMainView().down('dashboard_dashboard').getComponent('stage').getLayout().getActiveItem();
            if ((typeof currentItem.getTitle=='function') && (currentItem.getTitle())){
                title += currentItem.getTitle();
            }else if ((typeof currentItem.getWindowTitle=='function') && (currentItem.getWindowTitle())){
                title += currentItem.getWindowTitle();
            }else{
                title += 'Tualo';
            }
            window.document.title = title;
        }catch(e){
            console.error(e);
        }
    },
    pingTest: async function(){
        let res = await ( await fetch(Ext.getApplication().getAPIPath()+'dashboard/ping') ).json();
        if (res.success==false){
            alert('not logged in');
        }else{
            setTimeout(this.pingTest.bind(this),60000);
        }
    },
    ping: function(){
        let me=this;
        Tualo.Ajax.request({
            url: Ext.getApplication().getAPIPath()+'dashboard/ping',
            json: function(o){
                me.sessionPing = o;
                if (o.success==false){
                    me.getMainView().setActiveItem(1);
                    if (o.msg!='')
                    Ext.toast({
                        html: o.msg,
                        title: 'Fehler',
                        width: 200,
                        align: 't',
                        iconCls: 'fa fa-warning'
                    });
                }else{
                    me.updateWindowTitle();
                    me.getMainView().setActiveItem(2);
                    setTimeout(me.pingTest.bind(me),10000);
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