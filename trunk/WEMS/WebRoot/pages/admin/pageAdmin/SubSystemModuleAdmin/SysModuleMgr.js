Ext.ns('Ems.page')

var store;
var sm=new Ext.grid.RowSelectionModel({
				singleSelect:true
			});
Ems.page.SysEditWindow=Ext.extend(Ext.Window,{
		title:'系统信息',
		frame:true,
		width:300,
		height:300,
		layout:'fit',
		margins:'5 5 5 5',
		padding:'5 5 5 5',
		closeAction:'hide',
		resizable:false,
		defaults:{
			width:120
		},
		initComponent:function(){			
				this.Fitems=[
					{
						fieldLabel:'系统编码',
						blankText:'系统名称必填',
						allowBlank:false,
						name:'sm.moduleCode'
					},
					{
						fieldLabel:'系统名称',
						blankText:'系统名称必填',
						allowBlank:false,
						name:'sm.moduleName'
					},
					{
						name:'isActive',
						width:50,
						fieldLabel:'是否激活',
						xtype:'combo',
						editable:false,
						store:new Ext.data.ArrayStore({
							id: 0,
							fields: [
            						'value',
            						'displayText'
        					],
        					data:[
        						[1,'是'],[0,'否']
        					]
						}),
							lazyRender:true,
    						mode: 'local',
        					valueField: 'value',
    						displayField: 'displayText',
    						typeAhead: true,
    						triggerAction: 'all',
    						allowBlank:false
					}
				];
				this.rbuttons=[
					{text:'提交',handler:function(){
							//Ext.Msg.alert('moduleCode',this.ownerCt.ownerCt.items.items[0].getValue());
						var _window=this.ownerCt.ownerCt.ownerCt;
						this.ownerCt.ownerCt.ownerCt.initComponent();
							this.ownerCt.ownerCt.getForm().submit({
								clientValidation: true,
								url:'SysModuleMgrAdd.action',
    							success:function(form, action){
										 module_mgr.store.load();
										 Ext.example.msg('OK','新增成功');
								 		_window.hide();
    							}
							});	
							
					}}
				];
				this.FormPan=new Ext.form.FormPanel({
					defaultType:'textfield',
					width:250,
					height:300,
					frame:true,
					items:this.Fitems,
					buttons:this.rbuttons
				})
				
				this.items=[this.FormPan]
				Ems.page.SysEditWindow.superclass.initComponent.call(this);
		}
});

Ems.page.ModuleMgr=Ext.extend(Ext.grid.GridPanel,{
			title:'子系统管理',
			autoHeight:true,
			border:false,
			cm:new Ext.grid.ColumnModel({
				defaults:{
					width:120,
					sortable: true,
				    editable: false
				},
				columns:[
				{header:'系统编码',dataIndex:'moduleCode'},
				{header:'系统名称',dataIndex:'moduleName'},
				{header:'是否激活',dataIndex:'isActive',renderer:function(value){
					if(value==1){
						return '是';
					}else{
						return '否';
					}
														}
				},
				{header:'系统索引',dataIndex:'moduleIndex',hidden:true}
				]
			}),
			sm:sm,
			tbar:new Ext.Toolbar([
				{
			 		text:'添加',
			 		iconCls:'silk-add',
			 		handler:function(){
						if(this.editWin==null){
							this.editWin=new Ems.page.SysEditWindow();
							this.editWin.show();
						}else{
							this.editWin.show();
						}
					}
				},'-',{
					text:'删除',
					iconCls:'silk-delete',
					handler:function(){
						var _ModuleMgr=this.ownerCt.ownerCt;
						var selectedRecord = sm.getSelected();
						var paras = {};
						if (selectedRecord == null || selectedRecord.length == 0){
							Ext.example.msg("注意", "至少选择一条记录");
						}
						paras["moudle_codes"] = selectedRecord.get("moduleCode") ;
						
						Ext.Ajax.request({
						url : 'SysModuleMgrDel.action',
						method : 'post',
						params : paras,
						success : function(xhq, status) {
							var ret = Ext.util.JSON
							.decode(xhq.responseText);
							if (xhq.responseText == null)
								return;

							// 失败
							if (ret.returnNo > 0) {
								Ext.example.msg('失败', '失败原因:' + ret.returnMsg);
								return;
							}
							// 成功
							module_mgr.store.load();
							Ext.example.msg('成功', ret.returnMsg);
						}
					});
						
					}
					
				},'-',{
					text:'更新',
					iconCls:'silk-update',
					handler:function(){
						var _ModuleMgr=this.ownerCt.ownerCt;
						_ModuleMgr.hide();
						var selectedRecord = sm.getSelected();
						var paras = {};
						var perfix="sm.";
						if (selectedRecord == null || selectedRecord.length == 0){
							Ext.example.msg("注意", "至少选择一条记录");
						}
						params=  selectedRecord.get("moduleCode") ;
//						this.store=new Ext.data.JsonStore({
//								proxy:new Ext.data.HttpProxy({
//									url:'SysModuleMgrUps.action?sm.moduleCode='+params
//								}),
//								autoLoad:true,
//								root:'modules',
//								fields:[
//									{name:'moduleCodeUpdate',mapping:'moduleCode'},
//									{name:'moduleNameUpdate',mapping:'moduleName'},
//									{name:'isActiveUpdate',mapping:'isActive'}
//								]
//							}),
//						this.store.load();
						var _window = new Ext.Window({
							title:"更新子系统",
							width:220,
							height:200,
							plain:true,
							resizable:false,
							layout:"form",
							labelWidth:55,
							defaultType:"textfield",
							defaults:{anchor:"100%"},
							items:[
									{
										name:'moduleCodeUpdate',
										readOnly:true,
										value:selectedRecord.get("moduleCode"),
										fieldLabel:"系统编码"	
									},{
										name:'moduleNameUpdate',
										value:selectedRecord.get("moduleName"),
										fieldLabel:"系统名称"
									},{
										name:'moduleNameUpdate',
										value:selectedRecord.get("moduleIndex"),
										fieldLabel:"系统索引"
									},{
										name:"isActiveUpdate",
										xtype:"combo",
										mode:"local",
										value:selectedRecord.get("isActive"),
										triggerAction: 'all',
										fieldLabel:"是否激活",
										store:new Ext.data.ArrayStore({
											fields:['value','displayText'],
											data:[
				        						[1,'是'],[0,'否']
				        					]
										}),
										displayField:"displayText",
										editable:false
									}
								],
							listeners:{
							"show":function(_window){	
									var _combo=_window.findByType("combo")[0];
									if(_combo.value===1){
										_combo.setValue("是");
									}else if(_combo.value==0){
										_combo.setValue("否");
									}
						}
					},
							buttons:[{
								text:"确定",
								handler:function(){
									var _window=this.ownerCt.ownerCt;
									var moduleCode=_window.findByType("textfield")[0].getEl().dom.value;
									var moduleName=_window.findByType("textfield")[1].getEl().dom.value;
									var moduleIndex=_window.findByType("textfield")[2].getEl().dom.value;
									var isActive=_window.findByType("combo")[0].getEl().dom.value;
									if(isActive==="是"){
										isActive=1;
									}else{
										isActive=0;
									}
									
									var params={
												"sm.moduleCode":moduleCode,
												"sm.moduleName":moduleName,
												"sm.moduleIndex":moduleIndex,
												"sm.isActive":isActive
												};
									Ext.Ajax.request({
										url : 'SysModuleMgrUpdate.action',
										method : 'post',
										params : params,
										success : function(xhq, status) {
										var ret = Ext.util.JSON
										.decode(xhq.responseText);
										if (xhq.responseText == null)
											return;
			
										// 失败
										if (ret.returnNo > 0) {
											Ext.example.msg('失败', '失败原因:' + ret.returnMsg);
											return;
										}
										// 成功
										module_mgr.store.load();
										_window.hide();
										Ext.example.msg('成功', ret.returnMsg);
										_ModuleMgr.show();
										}
									});
								}
							},{
								text:"取消",
								handler:function(){
									_ModuleMgr.show();
									this.ownerCt.ownerCt.hide();
								}
							}]
							
						});
						_window.show();
						
					}
					
				}
			]),
			initComponent:function(){
				this.store=new Ext.data.JsonStore({
							proxy:new Ext.data.HttpProxy({
								url:'SysModuleMgr.action'
							}),
							autoLoad:true,
							root:'modules',
							fields:[
								{name:'moduleCode',mapping:'moduleCode'},
								{name:'moduleName',mapping:'moduleName'},
								{name:'moduleIndex',mapping:'moduleIndex'},
								{name:'isActive',mapping:'isActive'}
							]
					}),
					this.store.load();
				Ems.page.ModuleMgr.superclass.initComponent.call(this);
			}
});



Ext.onReady(function(){
	
	module_mgr = new Ems.page.ModuleMgr({
                       renderTo:Ext.getDom('sysModule')
       });
	
});

