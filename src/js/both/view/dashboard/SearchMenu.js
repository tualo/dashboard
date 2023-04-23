Ext.define('Tualo.dashboard.view.dashboard.SearchMenu', {
    extend: 'Ext.Panel',
    alias: "widget.dashboard_searchmenu",
    layout: {
        type: 'hbox',
       // align: 'stretch'
    },
    height: 50,
    controller: 'dashboard_searchmenu',
    //bodyPadding: "20px",
    viewModel: {
        data: {
            width: 230,
        },
        formulas: {
            iconVisible: function(get){
                return get('width') < 230;
            }
        }


    },
    listeners: {
        resize: 'onResize',
        "boxready": 'onBoxReady'
    },
    items: [
        {
            xtype: 'glyphtool',
            glyph: 'search',
            flex: 1,
            cls: "application-search-icon",
            bind: {
                hidden: '{!iconVisible}'
            },
            handler: 'onSearchClick'
        },

        {
            flex: 1,
            xtype: 'textfield',
            itemId: 'searchfield',
            cls: "application-search-input",
            emptyText: 'Suche  ...',
            anchor: '100%',
            bind: {
                hidden: '{iconVisible}'
            },
            enableKeyEvents: true,
            listeners: {
                keypress: function(fld,e){
                    fld.up('dashboard_searchmenu').getController().onSearchKeyPress(fld,e);
                },
                focus: function(fld){
                    fld.up('dashboard_dashboard').getController().onSearchFieldFocus(fld,true);
                },
                blur: function(fld){
                    fld.up('dashboard_dashboard').getController().onSearchFieldFocus(fld,false);
                }
            },
            triggers: {
                clear: {
                    weight: 0,
                    cls: Ext.baseCSSPrefix + "form-clear-trigger",
                    handler: function(field) {
                        field.setValue("");
                        field.up('dashboard_dashboard').getViewModel().get('navItems').removeAll();
                        field.up('dashboard_dashboard').getViewModel().get('navItems').load();
                    }
                },
                collapse: {
                    weight: 0,
                    cls: Ext.baseCSSPrefix + "form-bar-trigger",
                    handler: function(field) {
                        field.up('dashboard_dashboard').getController().onToggleMicro(null,true);
                    }
                }
            }
        }
    ]
});