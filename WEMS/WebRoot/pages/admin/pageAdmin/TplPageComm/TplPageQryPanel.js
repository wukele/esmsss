Ext.ns('Ems.page')


Ems.page.TplPageQryForm=Ext.extend(Ext.FormPanel,{
	title:'模板页面查询',
	frame:true,
	iconCls:'silk-plugin',
	defaultType:'textfield',
	labelWidth:100,
	labelPad:0,
	buttonAlign:'left',
	defaults:{
		width:200,
		padding:'50 50 50 50',
		margins:'100 100 100 100'
	},
	initComponent:function(){
		this.items=[
		{
			 id:'tpl_page_id',
			 fieldLabel:'模板编号',
			 name:'tpl_page_id'
		},
		{
			 id:'tpl_page_name',
			 fieldLabel:'模板名称',
			 name:'tpl_page_name'
		}
		
		];
		this.buttons=[
		{
			xtype:'button',
			text:'查询',
			width:40,
			handler:this.DoQry
		},
		{
			xtype:'button',
			text:'重置',
			width:40,
			handler:function(){
					this.ownerCt.ownerCt.getForm().reset();
			}
		}
		];
		
		this.addEvents({'doqrytemplate':true});	
		Ems.page.TplPageQryForm.superclass.initComponent.call(this);
	},
	
	DoQry:function(){
		this.ownerCt.ownerCt.fireEvent('doqrytemplate',this.ownerCt.ownerCt);
	}
});

Ems.page.TplPageEditWindow=Ext.extend(Ext.Window,{
	closeAction:'hide',
	title:'模板信息编辑',
	width:400,
	height:265,
	resizable:false,
	id:'EditWindow',
	initComponent:function(){
			this.EditForm=new Ext.FormPanel({
					defaultType:'textfield',
					buttonAlign:'center',
					defaults:{
						width:200
					},
					frame:true,
					items:[{
						name:'tplPageId',
						fieldLabel:'模板ID',
						readOnly:true
					},{
						name:'tplPageName',
						fieldLabel:'模板名称'
					},{
						name:'tplImagePath',
						fieldLabel:'模板底图路径'
					},{
						name:'tplPageType',
						fieldLabel:'模板类型'
					},{
						name:'tplPageResource',
						fieldLabel:'资源ID'
					},{
						name:'tplImageHeight',
						fieldLabel:'底图高',
						xtype:'numberfield'
					},{
						name:'tplImageWidth',
						fieldLabel:'底图宽',
						xtype:'numberfield'
					}
					],
					buttons:[
					{
						text:'提交',
						handler:function(){
							  if(!this.ownerCt.ownerCt.getForm().isValid())return false;
							 
							  this.ownerCt.ownerCt.getForm().submit({
							  		url:'TplPageModify.action',
							  		success:function(form, action){
							  			if(action.result.res_code==0){
							  				 var ed=Ext.getCmp('EditWindow');
							  				 ed.fireEvent('editsuccess',ed);
							  			}
							  		},
							  		failure: function(form, action) {
							  			if(action.result!=undefined && action.result.res_code==0){
							  				 var ed=Ext.getCmp('EditWindow');
							  				 ed.fireEvent('editsuccess',ed);
							  			}
							  		}
							  });
						}
					},
					{
						text:'取消',
						handler:function(){
							this.ownerCt.ownerCt.getForm().reset();
							this.ownerCt.ownerCt.ownerCt.hide();
						}
					}
					]
			});
			this.items=[this.EditForm];
			Ems.page.TplPageEditWindow.superclass.initComponent.call(this);
			this.addEvents({'editsuccess':true});
	}
})





Ems.page.TplPageQryListPanel=Ext.extend(Ext.Panel,{
	 title:'模板列表',
	 iconCls:'silk-table',
	 height:700,
	 autoScroll:true,
	 tbar:[
	 {
	 	text:'删除',
	 	iconCls:'silk-delete',
	 	handler:function(){
	 		var container=this.ownerCt.ownerCt;
	 		var records=container.listView.getSelectedRecords();
	 		if(records==undefined){
	 			Ext.example.msg('警告','请选定删除项');
	 			return false;
	 		}
	 		Ext.example.msg('Info','删除:'+ records[0].get('tplPageName'));
	 		Ext.Ajax.request({
	 			url:'TplPageDelete.action',		
	 			method:'POST',
	 			params:{
	 				tpl_page_id:records[0].get('tplPageId')
	 			},
	 			success:function(e){
	 				Ext.example.msg('OK','删除:'+ records[0].get('tplPageName')+ '成功');
	 				container.store.load({
	 					params:{
	 						start:0,
							limit:6
	 					}
	 				});
	 			}
	 		}); 		
	 	}
	 },'-',
	 {
	 	 text:'编辑',
	 	 iconCls:'silk-user-edit',
	 	 handler:function(){
	 	 	var container=this.ownerCt.ownerCt;
	 		var records=container.listView.getSelectedRecords();
	 		if(records==undefined || records[0]==undefined){
	 			Ext.example.msg('警告','请选定编辑项');
	 			return false;
	 		}
	 		if(this.editWindow){
	 			this.editWindow.EditForm.getForm().loadRecord(records[0]);
	 			this.editWindow.show();
	 		}else{
	 			this.editWindow=new Ems.page.TplPageEditWindow();
	 			this.editWindow.on('editsuccess',function(window){
	 					Ext.example.msg('OK','编辑成功');
	 					container.store.load({
	 						params:{
	 							start:0,
								limit:5
	 						}
	 					});
	 					window.hide();
	 			});
	 			this.editWindow.EditForm.getForm().loadRecord(records[0]);
	 			this.editWindow.show();
	 		}
	 	 }
	 }
	 ],
	 
	 initComponent:function(){
	 		this.TPL=new Ext.XTemplate('<tpl for=".">',
	 		'<div class="x-list-wrap"><div class="x-list-image"><img src="{tplImagePath}" width="100" height="80" title="{tplPageName}" /></div>',
	 		'<div class="x-list-text"><p>模板ID：{tplPageId} </p><p>模板名称:{tplPageName} </p> <p>模板类型 :{tplPageType}</p></div>',
	 		'<div class="x-list-text"><p>模板资源ID：{tplPageResource}</p></div>',
	 		'</div></tpl>');
	 		this.listView=new Ext.DataView({
	 				store:this.store,
	 				tpl:this.TPL,
	 				itemSelector:'div.x-list-wrap',
	 				emptyText: 'No images to display',
					multiSelect:true,
					overClass:'x-view-over'
	 		});
	 		this.items=[this.listView];
	 		this.bbar=new Ext.PagingToolbar({
	 				store:this.store,
					displayInfo: true,
					pageSize:6,
					displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
					emptyMsg : '没有记录'
	 		})
	 		Ems.page.TplPageQryListPanel.superclass.initComponent.call(this);
	 },
	 constructor:function(config){
	 		config=config||{};
	 		this.store=config.store;
	 		Ems.page.TplPageQryListPanel.superclass.constructor.call(config,this);
	 }
	
});



Ems.page.TplPageQryPanel=Ext.extend(Ext.Panel,{
	border:false,
	QueryTemplate:function(e){
			var  tpl_id=e.getForm().findField('tpl_page_id').getValue();
			var  tpl_name=e.getForm().findField('tpl_page_name').getValue();
			this.ownerCt.TplPageQryList.store.load({
				params: {	start:0,
					limit:5,
					tpl_page_id:tpl_id,
					tpl_page_name:tpl_name}
			});
	},
	
	initComponent:function(){
			this.QryForm=new Ems.page.TplPageQryForm();
			this.QryForm.on('doqrytemplate',this.QueryTemplate);
			this.store=new Ext.data.JsonStore({
					proxy:new Ext.data.HttpProxy({url:'TplPageQry.action'}),
					root:'tpls',
					totalProperty:'totalProperty',
					fields:[
					{name:'tplPageType',mapping:'tplPageType'},
					{name:'tplPageId',mapping:'tplPageId'},
					{name:'tplPageResource',mapping:'tplPageResource'},
					{name:'tplPageName',mapping:'tplPageName'},
					{name:'tplImagePath',mapping:'tplImagePath'},
					{name:'tplImageWidth',mapping:'tplImageWidth'},
					{name:'tplImageHeight',mapping:'tplImageHeight'}
					]
			});
			this.store.load({
				params:{
					start:0,
					limit:6
				}
			});
			this.TplPageQryList=new Ems.page.TplPageQryListPanel({
					store:this.store,
					renderTo:Ext.getDom('templateList')
			})
			this.items=[this.QryForm];
			Ems.page.TplPageQryPanel.superclass.initComponent.call(this);
	}
});