Ext.define('Tualo.dashboard.view.dashboard.ProfileMenu', {
    extend: 'Ext.Panel',
    alias: "widget.dashboard_profilemenu",

    layout: 'fit',
    controller: 'dashboard_profilemenu',
    listeners: {
        resize: 'onResize',
        "boxready": 'onBoxReady'
    },

    viewModel: {
        data: {
            width: 230,
            client: 'Tualo',
            fullname: 'Thomas Hoffmann',
            login: 'thoffmann',
            avatar: '',
            clientavatar: '',
            gst: 'GST 001',
            bkr: 'BKR 001'
        },
        formulas: {
            iconVisible: function (get) {
                return get('width') < 230;
            },
            infoHtml: function (get) {
                console.log('get', '->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><');
                return ['<div class="application-profile-header-info">',
                    '<div class="application-profile-header-avatar">',
                    '<img src="' + get('avatar') + '">',
                    '</div>',
                    '<div class="application-profile-header-avatar">',
                    '<img src="' + get('clientavatar') + '">',
                    '</div>',
                    '<div class="application-profile-header-avatar">',
                    '<img src="' + get('gstavatar') + '">',
                    '</div>',
                    '<div class="application-profile-header-avatar">',
                    '<img src="' + get('bkravatar') + '">',
                    '</div>',
                    //'<div class="application-profile-header-gst" style="margin-left: -2px;">GST: '+get('gst')+'</div>',
                    //'<div class="application-profile-header-bkr" style="margin-left: -2px;">BKR: '+get('bkr')+'</div>',
                    '</div>'].join('');
            },
            html: function (get) {
                return ['<div class="application-profile-header">',
                    '<div class="application-profile-header-avatar">',
                    '<img src="' + get('avatar') + '">',
                    '</div>',

                    '<div class="application-profile-header-name">' + get('fullname') + '</div>',
                    //'<div class="application-profile-header-login">'+get('login')+'</div>',
                    '<div class="application-profile-header-client">' + get('client') + '</div>',
                    '<div class="application-profile-header-gst">GST: ' + get('gst') + '</div>',
                    '<div class="application-profile-header-bkr">BKR: ' + get('bkr') + '</div>',

                    '</div>'
                ].join('');
            }
        }
    },


    listeners: {
        resize: 'onResize',
        "boxready": 'onBoxReady'
    },
    //bodyPadding: "14px",
    items: [
        /*
        {
            xtype: 'panel',
            //cls: "application-profile-header-info",
            flex: 1,
            //bodyPadding: "14px",
            bind: {
                // hidden: '{!iconVisible}',
                html: '{infoHtml}',
            },
        },
        {
            xtype: 'panel',
            cls: "application-profile-header",
            flex: 1,
            border: true,
            bodyPadding: "8px",
            bind: {
                // hidden: '{iconVisible}',
                html: '{html}',
            },
        }
        */
    ]

});