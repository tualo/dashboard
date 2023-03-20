Ext.define('Tualo.dashboard.view.dashboard.Panel', {
    extend: 'Ext.Panel',

    alias: "widget.dashboard_dashboard",
    layout: 'card',
    /*
    defaults: {
        header: {
            defaults: {
                ui: 'flat large'
            }
        }
    },
    */
    lbar: {
        xtype: 'panel',
        reference: 'mainmenu',
        ui: 'dark micro',
        html: 'menu',
        zIndex: 4
    },
    items: [{
        xtype:'panel',
        style:{
            backgroundColor: 'green'
        },
        html: 'stage',
    }],
    setSessionPing: function(data){
        console.log('setSessionPing','data',data);
    }

    /*

    viewModel: {
		type: 'dashboard_dashboard'
	},
	controller: 'dashboard_dashboard',

    layout: {
        type: 'fit',
    },
    items:[{

        xtype: 'panel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },

        cls: 'icon-application-logo',
        iconCls: 'icon icon-cmp_template_default-logo',
        bind: {
            title: '{title}'
        },


        items: [
            {
                flex: 1,
                reference: 'mainpanel',
                layout: 'card',
                //autoWidth: true,
                items: [{
                    xtype: 'panel',
                    html: 'center'
                }]
            }
        ],
        tools: [
            /*
            {
                xtype: 'tbspacer',
                flex: 1
            },
            {
                xtype: 'clientbutton',
                reference: 'clientbutton',
            },
            {
                xtype: 'bkrbutton',
                reference: 'bkrbutton',
            },
            {
                xtype: 'officebutton',
                reference: 'officebutton',
            },
            {
                xtype: 'senioritybutton',
                reference: 'senioritybutton',
            },
            * /
            {
                
                text: ((typeof fullname == 'string') ? fullname : ''),
                xtype: 'button',
                reference: 'loginbutton',
                menu: [
                    {
                        text: 'Abmelden',
                        glyph: 'xf08b@FontAwesome',
                        handler: function () {
                            Ext.Ajax.request({
                                url: './',
                                params: {
                                    TEMPLATE: 'NO',
                                    cmp: 'cmp_logout'
                                },
                                success: function (response) {
                                    window.location.href = window.location.origin + window.location.pathname;
                                }
                            });
                        }
                    },
                    {
                        text: 'Profil',
                        glyph: 'xf0ad@FontAwesome',
                        handler: function () {

                            var hash = 'cmp_profile/';
                            Application.controller.redirectTo(hash, true);
                        }
                    }

                ]
            },
            {
                glyph: 'xf0c9@FontAwesome',
                width: 20,
                xtype: 'button',
                reference: 'microbutton',
                enableToggle: true,
                bind: {
                    pressed: '{navtooglepressed}'

                },
                toggleHandler: 'onToggleMicro'
            }/ *,
            {
                xtype: 'tbspacer',
                bind: {
                    hidden: '{!showSearch}'
                },
                width: 10
            },
            {
                width: 400,
                emptyText: 'Bitte geben Sie den Suchtext ein',
                xtype: 'textfield',
                reference: 'globalsearchfield',
                bind: {
                    hidden: '{!showSearch}'
                },
                enableKeyEvents: true,
                listeners: {
                    keypress: 'onGlobalSearchKeyPress'
                }
            },
            {
                glyph: 'xf002@FontAwesome',
                width: 20,
                xtype: 'button',
                reference: 'searchbutton',
                enableToggle: true,
                pressed: false,
                toggleHandler: 'onSearchToggle'
            }
            * /
        ],
        / *

        items: [
            {
                //region: 'west',
                reference: 'treelistContainer',
                collapsible: true,
                cls: 'treelist-with-nav',
                width: 300,
                title: 'Menü',
                bind: {
                    hidden: '{!sideNavigation}',
                    //width: '{navWidth}',
                    collapsed: '{navtooglepressed}'
                },
                headerPosition: 'left',
                //animCollapse: true,
                
                xtype: 'panel',
                //border: false,
                //frame: false,
                scrollable: 'y',

                items: [{
                    alwaysOnTop: true,
                    xtype: 'treepanel',
                    reference: 'treelist',
                    rootVisible: false,
                    defaults: {
                        indent: 35,
                    },
                    bind: {
                        store: '{navItems}',
                        //micro: '{navtooglepressed}',
                        //ui: '{treelistUI}'
                    }
                }]
            },
            {
                //region: 'center',
                flex: 1,
                reference: 'mainpanel',
                layout: 'card',
                width: 500,
                //autoWidth: true,
                items: [{
                    xtype: 'panel'
                }]
            }
        ] * /
    }]
    */
})