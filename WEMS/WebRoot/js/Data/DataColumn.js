 Ext.ns('Ems.Component')
 
 
 Ems.Component.DataColumn=Ext.extend(Ext.Panel,{
 				constructor:function(cfg){
 							var  config=cfg||{
 										width:70,
 										height:200
 							}
 						    Ems.Component.DataColumn.superclass.constructor.call(this,config);   
 				},
 				initComponent:function(){
 							 this.store = new  Ext.data.ArrayStore({
 							 			fields:['val','value_name'],
 							 			data:[[130,'val1']]
 							 });
 							 
 							 this.items=[{
 							 			xtype:'columnchart',
 							 			store:this.store,
 							 			xField:'value_name',
 							 			yField:'val',
 							 			xAxis: new Ext.chart.CategoryAxis({
                									title: '设备变量'
            							}),
            							yAxis:new  Ext.chart.NumericAxis({
            										maximum:180
            							})
 							 }];
 							  Ems.Component.DataColumn.superclass.initComponent.call(this);
 				},
 				
 				setValue:function(val){
 							  var  data=[[val,'变量']];
 							  this.store.loadData(data);
 				}
 });
 
 
 Ext.reg('DataColumn', Ems.Component.DataColumn);