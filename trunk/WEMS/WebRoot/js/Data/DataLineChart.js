Ext.ns('Ems.Component');


Ext.Component.DataLineChart=Ext.extend(Ext.Panel,{
			title:'Êý¾ÝÇúÏßÍ¼',
			layout:'fit',
			constructor:function(cfg){
							var config=cfg||{
										width:400,
										height:400
							}
							Ext.Component.DataLineChart.superclass.constructor.call(this,config);
			},
			
			initComponent:function(){
						this.store=new Ext.data.ArrayStore({
									fields:['realData','time']
						});
						this.lineChart=new  Ext.chart.LineChart({
									store:this.store,
									xField: 'time',
            						yField: 'realData',
            						xAxis:new Ext.chart.NumericAxis({
            								maximum:20,
            								reverse:true
            						})
						});
						this.count=0
						this.lineData=[];
						this.items=[this.lineChart];
						Ext.Component.DataLineChart.superclass.initComponent.call(this);
			},
			
		
			
			setValue:function(val){
						//var  nowTime=new Date();
							if(this.lineData.length>21){
										
											this.lineData.pop();
											this.count=0;
											this.lineData.unshift([val,this.count++]);
											this.sortData(this.lineData);
							}else{
										
											this.lineData.unshift([val,this.count++]);
												this.sortData(this.lineData);
							}
					   	
					   		this.store.loadData(this.lineData);
					    //this.lineChart.refresh()
			},
			
			sortData:function(arr){
						for(i=0;i<arr.length;i++){
										arr[i][1]=i
						}	
			}
			
})

Ext.reg('DataLineChart',Ext.Component.DataLineChart);