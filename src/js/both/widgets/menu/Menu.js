Ext.define('TualoOffice.dashboard.widgets.menu.Menu', {
    extend: 'TualoOffice.dashboard.widgets.Sidebar',
    xtype: 'dashboard_mainmenu',
    requires:[
        'TualoOffice.dashboard.widgets.menu.Controller'
    ],

    config: {
        selection: null
    },

    controller: 'dashboard_mainmenu',
    //cls: 'main-menu',
    layout:  {
        type: 'vbox',
        align: 'strech'
    },
    //weighted: true,
    //width: 100,
    border: true,
    autoWidth: true,
    //title: 'test',
    items: [ {
            xtype: 'button',
            handler: 'onExpandClick',
            iconCls: 'x-fa fa-bars',
            //ui: 'large',
            //ui: 'large flat dark',
            docked: 'top'
        },/* {
            xtype: 'dataview',
            scrollable: 'y',
            store: 'Menu',
            weight: 0,
            flex: 1,
            ui: 'dark large',
            selectable: {
                deselectable: false
            },
            itemTpl: [
                '<span class="icon x-fa fa-{icon}"></span>',
                '<span class="text">{text}</span>'
            ],
            listeners: {
                childtap: 'onMenuChildTap'
            }
        }, */{
            xtype: 'button',
            handler: 'onProfileTap',
            //ui: 'large flat dark picture',
            iconCls: 'picture',
            textAlign: 'left',
            /*bind: {
                icon: '{user.picture}',
                text: '<div class="title">{user.firstname}</div>'+
                    '<div class="value">{user.username}</div>'
            }*/
        }
    ],

    updateSelection: function(value) {
        this.child('#navigator').setSelection(value);
    }
});
