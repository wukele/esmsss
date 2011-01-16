Ext.ns('Ems.page')
Ext.onReady(function(){
	
	var globalPageResource;
	
});
var sm=new Ext.grid.RowSelectionModel({
				singleSelect:true
			});

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

		sm:sm,
		setheader:function(h){
				this.setTitle(h);
		},
		//add by ffmmx
		tbar:[{xtype:'button',name:'addPageResourceBtn',id:'addPageResourceBtn',text:'����ҳ�����',handler:function(){
						var _panel=this.ownerCt.ownerCt;
						var perfix="pageResource.";
						var _window = new Ext.Window({
							title:"��ӿؼ�",
							width:250,
							height:270,
							plain:true,
							resizable:false,
							layout:"form",
							labelWidth:55,
							defaultType:"textfield",
							defaults:{anchor:"100%"},
							items:[
									  {
										name:'pageResource',
										id:"pageResource",
										hidden:true,
										fieldLabel:"��ԴID"
									},{
										name:'xtypeCode',
										allowBlank:false,
										fieldLabel:"XTYPE"
									},{
										name:'resourceTop',
										allowBlank:false,
										fieldLabel:"X axis"
									},{
										name:'resourceLeft',
										allowBlank:false,
										fieldLabel:"Y axis"
									},{
										name:'resourceWidth',
										allowBlank:false,
										fieldLabel:"��(px)"
									},{
										name:'resourceHeight',
										allowBlank:false,
										fieldLabel:"��(px)"
									}
								],
							listeners:{
									"show":function(_window){
										Ext.getCmp("pageResource").setValue(globalPageResource);
										
								}
							},
							buttons:[{
								text:"ȷ��",
								handler:function(){
									var _window=this.ownerCt.ownerCt;
									var params={};
									var fieldName=_window.findByType("textfield");
									for(var i=0;i<fieldName.length;i++){
										paraName=perfix+fieldName[i].getName();
										params[paraName]=fieldName[i].getEl().dom.value ;
										if(fieldName[i].getEl().dom.value==""||fieldName[i].getEl().dom.value=='undefined'){
											Ext.example.msg('����', "�����п�ֵ���߱����е�ͼ");
											return;
										}
									}
									
									Ext.Ajax.request({
										url : 'tplCompResourceAdd.action',
										method : 'post',
										params : params,
										success : function(xhq, status) {
										var ret = Ext.util.JSON
										.decode(xhq.responseText);
										if (xhq.responseText == null)
											return;
			
										// ʧ��
										if (ret.returnNo > 0) {
											Ext.example.msg('ʧ��', 'ʧ��ԭ��:' + ret.returnMsg);
											return;
										}else{
											var _submitWindow=new Ext.Window({
											title:"�Ƿ�������ʱ���",
											width:200,
											height:50,
											plain:true,
											resizable:false,
											layout:"form",
											buttons:[
													{
														text:"����",
														handler:function(){
															
														}	
													},{
														text:"������",
													 	handler:function(){
															_submitWindow.hide();
													 	}
													}
												]
											
										});
											_submitWindow.show();
											// �ɹ�
											//ComponentResourceView.store.load();
											_window.hide();
											Ext.example.msg('�ɹ�', ret.returnMsg);
										}
										
										}
									});
								}
							},{
								text:"ȡ��",
								handler:function(){
									this.ownerCt.ownerCt.hide();
								}
							}]
							
						});
						_window.show();
						
						
			}},'-',
		      {xtype:'button',name:'removePageResourceBtn',id:'removePageResourceBtn',text:'ɾ��ҳ�����',handler:function(){alert('todel');}}],
		constructor:function(app,config){
				this.app=app;
				this.tplPageResource=config.tplPageResource;
				config=config||{};
				Ems.page.ComponentResourceView.superclass.constructor.call(this,config);
		},
		
		
		qryPageResource:function(tplPageResource){
			   this.tplPageResource=tplPageResource
			   globalPageResource=tplPageResource
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