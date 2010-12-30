Ext.ns('Ems.page')

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
						name:'module_code'
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
							this.ownerCt.ownerCt.getForm().submit({
								clientValidation: true,
								url:'SysModuleMgrAdd.action',
    							success:function(){
    								 Ext.example.msg('OK','{0}新增成功',this.ownerCt.ownerCt.items.items[1].getValue());
    								 this.ownerCt.ownerCt.hide();
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
				}
				]
			}),
			sm:new Ext.grid.RowSelectionModel({
				singleSelect:true
			}),
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
								{name:'isActive',mapping:'isActive'}
							]
					}),
					this.store.load();
				Ems.page.ModuleMgr.superclass.initComponent.call(this);
			}
});



Ext.onReady(function(){
	new Ems.page.ModuleMgr({
			renderTo:Ext.getDom('sysModule')
	});
});

