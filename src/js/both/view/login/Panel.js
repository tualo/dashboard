Ext.define('Tualo.dashboard.view.login.Panel', {
    extend: 'Ext.form.Panel',

    
    requires: [
        'Tualo.dashboard.view.login.Controller'
    ],

    controller: 'dashboard_login',
    xtype: 'dashboard_login',
    
    bodyStyle: {
        backgroundColor: 'rgb(240,240,255)'
    },
    //title: 'Login',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    items:[{
        xtype: 'panel',
        itemId: 'loginform',
        title: 'Anmeldung',
        border: true,
        autoSize: true,

        items: [
            {
                xtype: 'panel',
                autoSize: true,
                bodyPadding: 20,
                width: 320,
                defaults: {
                    anchor: '100%'
                },

                items: [
                            
                    {
                        xtype: 'displayfield',
                        value: 'Geben Sie hier Ihre Zugangsdaten ein'
                    },
                    {
                        xtype: 'textfield',
                        name: 'username',
                        anchor: '100%',
                        label: 'Login',
                        value: '',
                        //enableKeyEvents: true,
                        listeners: {
                            keypress: function(me, e, o) {
                                if (e.keyCode === 13) {
                                    me.up('panel').items.getAt(2).focus();
                                }
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'password',
                        label: 'Passort',
                        inputType: 'password',
                        value: '',
                        listeners: {
                            keypress: function(me, e, o) {
                                if (e.keyCode === 13) {
                                    me.up('panel').up('panel').up().getController().onLoginClick();
                                }
                            }
                        }
                    }
                ],

                buttons: [
                    {
                        text: 'Anmelden',
                        handler: 'onLoginClick'
                    }
                ]
            }
        ]
    }]
    
});