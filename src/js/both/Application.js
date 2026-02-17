Ext.Loader.setPath('Tualo.dashboard', './jsdashboard');
Ext.Loader.setPath('Tualo.dashboard.lazy', './jsdashboard');

let orig = Ext.ClassManager.instantiateByAlias
Ext.ClassManager.instantiateByAlias = function (orig) {
    return function () {
        let alias = arguments[0];
        if (true) {
            console.debug('load alias', alias, arguments);
        }
        return orig.apply(this, arguments);
    }
}(orig);

Ext.define('Tualo.Application', {
    extend: 'Ext.app.Application',
    name: 'Tualo',
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    debug: false,
    getDebug: function () {
        return this.debug;

    },
    enableDebugXType: function () {
        let orig = Ext.ClassManager.instantiateByAlias
        Ext.ClassManager.instantiateByAlias = function (orig) {
            return function () {
                let alias = arguments[0];
                if (false) {
                    console.debug('load alias', alias, arguments);
                }
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
        'logout': function () { }
    },
    getAPIPath: () => { return './' },
    onUnmatchedRoute: function (token) {
        console.error('onUnmatchedRoute', token);
    },
    selfCheck: async function (dsName) {
        Ext.create('Tualo.dashboard.lazy.SelfCheck').check(dsName);
    },
    launch: async function (profile, e) {

        if (Tualo && Tualo.js && Tualo.js.LazyLoader) {
            await Tualo.js.LazyLoader.getLoaders();
            let requires = await Tualo.js.LazyLoader.getRequires();
            Ext.require(requires);
        }
        // this.enableDebugXType();
        Ext.getBody().removeCls('launching');
        Ext.on('routereject', (route, eOpts) => {
            try {
                console.error('routereject', eOpts.message)
            } catch (e) {

            }
            console.error('routereject', arguments)
            return true;
        })
        this.callParent([profile]);
        this.registerRoutes();
        this.getMainView().setActiveItem(this.getMainView().getComponent('loading'));
        this.ping();


    },
    getRoutes: function () {
        let routes = {};
        for (let cls in Ext.ClassManager.classes) {
            if (cls.indexOf('Tualo.routes.') == 0) {
                try {
                    let route = Ext.create(cls);
                    routes[route.url + ""] = route.handler;
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return routes;

    },
    registerRoutes: function () {
        this.setRoutes(this.getRoutes());
    },
    addView: function (viewcls, options) {
        console.log('addView', viewcls, options, Ext.isReady, Ext.getApplication().getMainView());
        //this.getMainView().is
        console.log('addView', this.getMainView().getComponent('dashboard_dashboard'));
        return this.getMainView().getComponent('dashboard_dashboard').addView(viewcls, options);
    },
    showStage: function (itemId) {
        console.log('showStage', itemId);
        this.getMainView().getComponent('dashboard_dashboard').showStage(itemId);
    },
    getCurrentView: function () {
        return Ext.getApplication().getMainView().down('dashboard_dashboard').getComponent('stage');
    },
    updateWindowTitle: function (title) {
        try {
            let title = (this.sessionPing) ? (this.sessionPing.client + ': ') : '',
                currentItem = (Ext.isModern) ? Ext.getApplication().getMainView().down('dashboard_dashboard').getComponent('stage').getActiveItem() : Ext.getApplication().getMainView().down('dashboard_dashboard').getComponent('stage').getLayout().getActiveItem();
            if ((typeof currentItem.getTitle == 'function') && (currentItem.getTitle())) {
                title += currentItem.getTitle();
            } else if ((typeof currentItem.getWindowTitle == 'function') && (currentItem.getWindowTitle())) {
                title += currentItem.getWindowTitle();
            } else {
                title += 'Tualo';
            }
            window.document.title = title;
        } catch (e) {
            console.error(e);
        }
    },
    pingTest: async function () {
        let res = await (await fetch(Ext.getApplication().getAPIPath() + 'dashboard/ping')).json();
        if (res.success == false) {
            alert('not logged in');
        } else {
            setTimeout(this.pingTest.bind(this), 60000);
        }
    },
    ping: function () {
        let me = this;
        Tualo.Ajax.request({
            url: Ext.getApplication().getAPIPath() + 'dashboard/ping',
            json: function (o) {
                me.sessionPing = o;
                if (o.success == false) {
                    me.getMainView().setActiveItem(1);
                    if (o.msg != '')
                        Ext.toast({
                            html: o.msg,
                            title: 'Fehler',
                            width: 200,
                            align: 't',
                            iconCls: 'fa fa-warning'
                        });
                } else {
                    me.updateWindowTitle();
                    me.getMainView().setActiveItem(2);
                    setTimeout(me.pingTest.bind(me), 10000);
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
    },
    getCustomTypeSQL: function () {
        for (key in Ext.ClassManager.aliasToName) {
            if (key.indexOf('data.field.') == 0) {
                let className = Ext.ClassManager.aliasToName[key]
                let parentClassName = Ext.ClassManager.get(className).superclass.$className
                if (className.toLowerCase().indexOf('tualo') >= 0) {
                    let sql = `INSERT IGNORE INTO \`custom_types\`  
                        (
                                id,
                                xtype_long_classic,
                                xtype_long_modern,
                                extendsxtype_classic,
                                extendsxtype_modern,
                                name,
                                vendor,
                                description,
                                create_datetime,
                                login
                        ) VALUES
                        (
                            '${Ext.ClassManager.aliasToName[key]}',
                            '${key}',
                            '${key}',
                            '${parentClassName}',
                            '${parentClassName}',
                            '${Ext.ClassManager.aliasToName[key]}',
                            'Tualo',
                            '',
                            '${(new Date()).toISOString().slice(0, 19).replace('T', ' ')}',
                            getSessionUser()
                        );`;
                    console.log(sql);
                }
            }
        }
    }


});