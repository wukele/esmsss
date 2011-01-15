Ext.ns('Ems.page')

Ems.page.ComponentResourceView=function(app,config){
				this.app=app;
				this.tplPageResource=config.tplPageResource;
				config=config||{};
				Ems.page.ComponentResourceView.superclass.constructor.call(this,config);
}


Ext.extend(Ems.page.ComponentResourceView,Ext.grid.GridPanel,{
		autoScroll:true,
		cm:new Ext.grid.ColumnModel({
				defaults:{
					width:70,
					menuDisabled:true
				},
				columns:[
					{header:'ID',dataIndex:'resourceId'},
					{header:'ҳ����ԴID',dataIndex:'pageResource'},
					{header:'�������',dataIndex:'resourceName'},
					{header:'XTYPE',dataIndex:'xtypeCode'},
					{header:'X axis',dataIndex:'resourceTop'},
					{header:'Y axis',dataIndex:'resourceLeft'},
					{header:'��(px)',dataIndex:'resourceWidth'},
					{header:'��(px)',dataIndex:'resourceHeight'}]
		}),

		sm:new Ext.grid.RowSelectionModel({
				singleSelect:true
		}),
		setheader:function(h){
				this.setTitle(h);
		},
		//add by ffmmx
		tbar:[{xtype:'button',name:'addPageResourceBtn',id:'addPageResourceBtn',text:'����ҳ�����',handler:function(){alert('toadd');}},'-',
		      {xtype:'button',name:'removePageResourceBtn',id:'removePageResourceBtn',text:'ɾ��ҳ�����',handler:function(){alert('todel');}}],
		constructor:function(app,config){
				this.app=app;
				this.tplPageResource=config.tplPageResource;
				config=config||{};
				Ems.page.ComponentResourceView.superclass.constructor.call(this,config);
		},
		
		
		qryPageResource:function(tplPageResource){
			   this.tplPageResource=tplPageResource
			   this.store.load({
			   			params:{tplPageResource:this.tplPageResource}
			   });
		},
		
	
		initComponent:function(){
				var ResourceFeilds=[
				{name:'resourceId',mapping:'resourceId'},
				{name:'pageResource',mapping:'pageResource'},
				{name:'resourceName',mapping:'resourceName'},
				{name:'xtypeCode',mapping:'xtypeCode'},
				{name:'resourceTop',mapping:'resourceTop'},
				{name:'resourceLeft',mapping:'resourceLeft'},
				{name:'resourceWidth',mapping:'resourceWidth'},
				{name:'resourceHeight',mapping:'resourceHeight'}
				];
			
				this.store=new Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({url:'tplCompResourceQry.action'}),
						fields:ResourceFeilds,
						totalProperty:'totalProperty',
						root:'tplComps',
						baseParams:{
							tplPageResource:this.tplPageResource
						},
						autoLoad:true
				});
				Ems.page.ComponentResourceView.superclass.initComponent.call(this);
		}
})