Ext.ns('Ems.page')
Ext.onReady(function(){
	
});
var globalPageResource;
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
					{header:'页面资源ID',dataIndex:'pageResource'},
					{header:'组件名称',dataIndex:'resourceName'},
					{header:'XTYPE',dataIndex:'xtypeCode'},
					{header:'X axis',dataIndex:'resourceTop'},
					{header:'Y axis',dataIndex:'resourceLeft'},
					{header:'宽(px)',dataIndex:'resourceWidth'},
					{header:'高(px)',dataIndex:'resourceHeight'}]
		}),

		sm:sm,
		setheader:function(h){
				this.setTitle(h);
		},
		//add by ffmmx
		tbar:[{xtype:'button',name:'addPageResourceBtn',id:'addPageResourceBtn',text:'新增页面组件',handler:function(){
						var _panel=this.ownerCt.ownerCt;
						var perfix="pageResource.";
						var _window = new Ext.Window({
							title:"添加控件",
							width:250,
							closeAction:"close",
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
										fieldLabel:"资源ID"
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
										fieldLabel:"宽(px)"
									},{
										name:'resourceHeight',
										allowBlank:false,
										fieldLabel:"高(px)"
									}
								],
							listeners:{
									"show":function(_window){
										
										
										
								}
							},
							buttons:[{
								text:"确定",
								handler:function(){
									var temp=globalPageResource;
									if(globalPageResource==""){
										Ext.getCmp("pageResource").setValue(temp);
									}else{
										Ext.getCmp("pageResource").setValue(globalPageResource);
									}
									var _window=this.ownerCt.ownerCt;
									var params={};
									var fieldName=_window.findByType("textfield");
									for(var i=0;i<fieldName.length;i++){
										paraName=perfix+fieldName[i].getName();
										params[paraName]=fieldName[i].getEl().dom.value ;
										if(fieldName[i].getEl().dom.value==""||fieldName[i].getEl().dom.value=='undefined'){
											Ext.example.msg('错误', "不能有空值或者必须有底图");
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
			
										// 失败
										var resourceId=ret.pageResource.resourceId;
										if (ret.returnNo > 0) {
											Ext.example.msg('失败', '失败原因:' + ret.returnMsg);
											return;
										}else{
											var _submitWindow=new Ext.Window({
											title:"是否增加临时组件",
											width:200,
											height:50,
											plain:true,
											resizable:false,
											layout:"form",
											buttons:[
													{
														text:"增加",
														handler:function(){
															Ext.Ajax.request({
																url : 'addTmpPageResource.action',
																method : 'post',
																params : {pageResource:temp,resourceId:resourceId},
																success:function(){
																	if (ret.returnNo > 0) {
																		Ext.example.msg('失败', '失败原因:' + ret.returnMsg);
																			return;
																	}
																	 _submitWindow.destroy();
																	 Ext.example.msg('成功', ret.returnMsg);
																		
																}
															})
														}	
													},{
														text:"不增加",
													 	handler:function(){
															_submitWindow.destroy() ;
													 	}
													}
												]
											
										});
											_submitWindow.show() ;
											// 成功
											//ComponentResourceView.store.load();
											_window.destroy();
											Ext.example.msg('成功', ret.returnMsg);
										}
										
										}
									});
								}
							},{
								text:"取消",
								handler:function(){
									this.ownerCt.ownerCt.hide();
								}
							}]
							
						});
						_window.show();
						
						
			}},'-',
		      {xtype:'button',name:'removePageResourceBtn',id:'removePageResourceBtn',text:'删除页面组件',handler:function(){alert('todel');}}],
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