Ext.define('Tualo.dashboard.lazy.SelfCheck', {
   
        check: async function(dsname){

            let me = this,
                name = dsname.toLocaleUpperCase().substring(0, 1) + dsname.toLowerCase().slice(1),
                components = [
                    'Tualo.DataSets.store.'+name,
                    'Tualo.DataSets.model.'+name,
                    'Tualo.DataSets.controller.'+name,

                    'Tualo.DataSets.form.'+name,
                    'Tualo.DataSets.list.'+name,
                    'Tualo.DataSets.dsview.'+name,

                ];

            this.checkFormFields(dsname);
            this.checkColumns(dsname);
            
            this.checkFormJSX(dsname);
            this.checkListJSX(dsname);

            components.forEach((cmp)=>{
                try{
                    Ext.create(cmp);
                    console.info(cmp,'ok'  );

                    
                }catch(e){
                    console.error(cmp,e);
                }
            });
        },
        checkColumns: async function(dsname){
            const formData = new FormData();
            let filter =[{"property":"table_name","value":dsname,"operator":"eq"}]
            formData.append("filter", JSON.stringify(filter));

            let columns = await fetch('./ds/view_ds_listcolumn/read',{
                method: "POST",
                body: formData,
                }).then((res)=>{ return res.json() });

            console.log(columns);

            if (columns.success){
                columns = JSON.parse(columns.data[0].js);
                columns.forEach((column)=>{
                    console.log(column);
                    try{
                        Ext.create(column);
                        console.info('column',column.dataIndex,'ok'  );
                    }catch(e){
                        console.error('column',column.dataIndex,e);
                    }
                });
            }
        },
        checkFormFields: async function(dsname){
            const formData = new FormData();
            let filter =[{"property":"table_name","value":dsname,"operator":"eq"}]
            formData.append("filter", JSON.stringify(filter));

            let res = await fetch('./ds/view_ds_formfields/read',{
                method: "POST",
                body: formData,
                }).then((res)=>{ return res.json() });

            console.log(res);

            if (res.success){
                res.data.forEach((formfield)=>{
                    let list = JSON.parse(formfield.js);
                    list.forEach((item)=>{
                        console.log(item);
                        try{
                            Ext.create( item) ;
                            console.info('formfield',item.xtype,'ok'  );
                        }catch(e){
                            console.error('formfield',item.xtype,e);
                        }
                    });
                });

            }
        },

        checkFormJSX: async function(dsname){
            const formData = new FormData();
            let me = this;
            let filter =[{"property":"table_name","value":dsname,"operator":"eq"}]
            formData.append("filter", JSON.stringify(filter));

            let res = await fetch('./ds/view_ds_form/read',{
                method: "POST",
                body: formData,
                }).then((res)=>{ return res.json() });

            console.log(res);

            if (res.success){
                res.data.forEach((rec)=>{
                    let configObjects = JSON.parse(rec.jsx);
                    configObjects.forEach((item)=>{
                        me.checkConfigObject(item);
                    });
                });

            }
        },


        checkListJSX: async function(dsname){
            const formData = new FormData();
            let me = this;
            let filter =[{"property":"table_name","value":dsname,"operator":"eq"}]
            formData.append("filter", JSON.stringify(filter));

            let res = await fetch('./ds/view_ds_list/read',{
                method: "POST",
                body: formData,
                }).then((res)=>{ return res.json() });

            console.log(res);

            if (res.success){
                res.data.forEach((rec)=>{
                    let configObjects = JSON.parse(rec.jsx);
                    configObjects.forEach((item)=>{
                        me.checkConfigObject(item);
                    });
                });

            }
        },

        checkConfigObject: function(configObject){
            let me = this;
            try{
                if (configObject.items){
                    configObject.items.forEach((item)=>{
                        me.checkConfigObject(item);
                    });
                }
                Ext.create( configObject) ;
                console.info('checkConfigObject',configObject.xtype,'ok'  );
            }catch(e){
                console.error('checkConfigObject',configObject.xtype,e);
            }
        }
    
});