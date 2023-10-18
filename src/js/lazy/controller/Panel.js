Ext.define('Tualo.dashboard.lazy.parts.InventoryChart', {
    requires: [
        'Ext.chart.CartesianChart'
    ],
    extend: 'Ext.dashboard.Part',
    alias: 'part.tualodashboard_inventorychart',
 
    viewTemplate: {
        layout: 'fit',
        title: 'Inventory',
        header: false,
        items: [{
            xtype: 'cartesian',
            height: 400,
            innerPadding: '0 10 0 10',
            //background: '#F1495B',
            store: {
                fields: ['name', 'apples', 'oranges'],
                data: [
                    {name: 'Eric', apples: 10, oranges: 3}, 
                    {name: 'Mary', apples: 7, oranges: 2}, 
                    {name: 'John', apples: 5,oranges: 2}, 
                    {name: 'Bob', apples: 2, oranges: 3}, 
                    {name: 'Joe', apples: 19, oranges: 1}, 
                    {name: 'Macy', apples: 13, oranges: 4}
                ]
            },
            axes: [{
                type: 'numeric3d',
                position: 'left',
                fields: ['apples', 'oranges'],
                title: {
                    text: 'Inventory',
                    fontSize: 15
                },
                grid: {
                    odd: {
                        fillStyle: 'rgba(255, 255, 255, 0.06)'
                    },
                    even: {
                        fillStyle: 'rgba(0, 0, 0, 0.03)'
                    }
                }
            }, {
                type: 'category3d',
                position: 'bottom',
                title: {
                    text: 'People',
                    fontSize: 15
                },
                fields: 'name'
            }],
            series: {
                type: 'bar3d',
                xField: 'name',
                yField: ['apples', 'oranges']
            }
        }]
    }
});

Ext.define('Tualo.dashboard.lazy.controller.Panel', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.lazy_dashboard_panel',
    onBoxReady: function(){
        this.queryDashboard();
    },
    queryDashboard: async function(){
        let data = await fetch('./dashboard/parts').then((response)=>{return response.json()});
        if (data.success){
            console.log(data.data);
            this.createDashboard(data.data);
        }
    },
    createDashboard: function(parts){

        let alias = Object.keys(Ext.ClassManager.aliasToName);
        let defaultContent = [];
        let requires = [];
        let index = 0;
        parts.forEach((item)=>{
            if (alias.indexOf('part.'+item.dashboard_type)==-1){
                requires.push(item.classname);
            }
        });

        Ext.require(requires,()=>{
            parts.forEach((item)=>{
                console.log('part',alias,item,alias.indexOf('part.'+item.dashboard_type));
                //if (alias.indexOf('part.'+item.dashboard_type)>=0){
                    let conf = {};
                    try{
                        conf = JSON.parse(item.configuration);
                    }catch(e){
                        console.error(e);
                    }
                    defaultContent.push({
                        ...conf,
                        ...{
                            title: item.title,
                            type: item.dashboard_type,
                            columnIndex: index,
                            height: 320
                        }
                    });
                    parts[item.dashboard_type] = item.dashboard_type;
                    index++;
                //}
            });
            if (defaultContent.length>0){
                let db = Ext.create('Ext.dashboard.Dashboard', {
                    columnWidths: [
                        0.5,
                        0.5
                    ],
                    defaultContent: defaultContent,
                    parts: parts
                });
                this.getView().add(db);
            }
        },this);


        
   }
});