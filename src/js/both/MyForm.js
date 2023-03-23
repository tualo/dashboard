Ext.define('Tualo.MyForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.myform',

    renderTpl: [
        // headingEl can also be inserted in updateHeader
        '<tpl if="headingText">',
            '<div id="{id}-headingEl" data-ref="headingEl" role="heading"',
                ' class="', Ext.baseCSSPrefix, 'hidden-clip" style="height:0">',
                    '{headingText}',
            '</div>',
        '</tpl>',
        '<tpl if="hasTabGuard">{% this.renderTabGuard(out, values, \'before\'); %}</tpl>',
        '<form id="{id}-bodyWrap" data-ref="bodyWrap" class="{baseCls}-bodyWrap"',
            '<tpl if="bodyWrapAriaAttributes">',
                '<tpl foreach="bodyWrapAriaAttributes"> {$}="{.}"</tpl>',
            '<tpl else>',
                ' role="presentation"',
            '</tpl>',
            '>',
            // If this Panel is framed, the framing template renders the docked items round the frame
            '{% this.renderDockedItems(out,values,0); %}',
            '<div id="{id}-body" data-ref="body" class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>',
                ' {baseCls}-body-{ui}<tpl if="uiCls">',
                    '<tpl for="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl>',
                '</tpl>{childElCls}"',
                '<tpl if="bodyAriaAttributes">',
                    '<tpl foreach="bodyAriaAttributes"> {$}="{.}"</tpl>',
                '<tpl else>',
                    ' role="presentation"',
                '</tpl>',
                '<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
                '{%this.renderContainer(out,values);%}',
            '</div>',
            '{% this.renderDockedItems(out,values,1); %}',
        '</form>',
        '<tpl if="hasTabGuard">{% this.renderTabGuard(out, values, \'after\'); %}</tpl>'
    ]

})