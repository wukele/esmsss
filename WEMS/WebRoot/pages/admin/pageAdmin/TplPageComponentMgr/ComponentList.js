Ext.ns('Ems.page')

Ems.page.ComponentList=Ext.extend(Ext.grid.GridPanel,{
		constructor:function(app,cfg){
			
			Ems.page.ComponentList.superclass.constructor.call(this,cfg);
		},
		initComponent:function(){
			this.store=new Ext.data.JsonStore({
					proxy:new Ext.data.HttpProxy({url:'CompList.action'})
			});
		}
});