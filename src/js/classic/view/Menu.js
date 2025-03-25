
Ext.define('Tualo.dashboard.view.Menu', {
    extend: 'Ext.panel.Panel',
    width: 230,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    ui: 'nav',
    scrollable: 'y',
    dockedItems: [{

        xtype: 'dashboard_searchmenu',
        dock: 'top'
    }, {
        xtype: 'dashboard_profilemenu',
        dock: 'bottom',
        height: 150
    }],
    items: [
        {
            ui: 'nav',
            xtype: 'treelist',
            reference: 'treelist',
            bind: {
                store: '{navItems}'
            },
            listeners: {
                itemclick: 'onMenuItemClick',
                select: 'onMenuItemSelect'
            }

        }
    ],


    floating: true,
    fixed: true,
    hidden: true,
    modal: true,
    width: 300,
    x: -300,
    //height: 300,
    // title: 'Text',

    responsiveConfig: true,
    viewModel: {
        type: 'dashboard_menu'
    },

    animadedShow: function () {
        let me = this, menu = Ext.getApplication().menu;

        me.show();
        menu.setXY(10, 10, 99999);
        menu.handleViewportResize();
        menu.focus();

        Ext.create('Ext.fx.Anim', {
            target: me,
            duration: 500,
            to: {
                x: 0, //end width 300
            },
            callback: function () {

            }
        });
    },

    animadedHide: function () {
        let me = this;
        Ext.create('Ext.fx.Anim', {
            target: me,
            duration: 500,
            to: {
                x: -300, //end width 300
            },
            callback: function () {
                me.hide();
            }
        });
    },

    handleViewportResize: function () {
        var me = this,
            Element = Ext.dom.Element,
            width = Element.getViewportWidth(),
            height = Element.getViewportHeight();

        if (width !== me.width || height !== me.height) {
            //me.setSize(width, height);
            me.setHeight(height);
        }
    },

    privates: {
        updateResponsiveState: function () {
            // By providing this method we are in sync with the layout suspend/resume as
            // well as other changes to configs that need to happen during this pulse of
            // size change.

            // Since we are not using the Viewport plugin beyond applying its methods on
            // to our prototype, we need to be Responsive ourselves and call this here:
            console.log('>>>>>')
            this.handleViewportResize();

            this.mixins.responsive.updateResponsiveState.call(this);
        }
    }
});