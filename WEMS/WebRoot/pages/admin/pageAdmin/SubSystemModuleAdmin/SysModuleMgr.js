Ext.ns('Ems.page')


var sm=new Ext.grid.RowSelectionModel({
				singleSelect:true
			});
var store;
Ems.page.SysEditWindow=Ext.extend(Ext.Window,{
		title:'ϵͳ��Ϣ',
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
						fieldLabel:'ϵͳ����',
						blankText:'ϵͳ���Ʊ���',
						allowBlank:false,
						name:'sm.moduleCode'
					},
					{
						fieldLabel:'ϵͳ����',
						blankText:'ϵͳ���Ʊ���',
						allowBlank:false,
						name:'sm.moduleName'
					},
					{
						name:'isActive',
						width:50,
						fieldLabel:'�Ƿ񼤻�',
						xtype:'combo',
						editable:false,
						store:new Ext.data.ArrayStore({
							id: 0,
							fields: [
            						'value',
            						'displayText'
        					],
        					data:[
        						[1,'��'],[0,'��']
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
					{text:'�ύ',handler:function(){
							//Ext.Msg.alert('moduleCode',this.ownerCt.ownerCt.items.items[0].getValue());
						var _window=this.ownerCt.ownerCt.ownerCt;
						this.ownerCt.ownerCt.ownerCt.initComponent();
							this.ownerCt.ownerCt.getForm().submit({
								clientValidation: true,
								url:'SysModuleMgrAdd.action',
    							success:function(form, action){
										 module_mgr.store.load();
										 Ext.example.msg('OK','�����ɹ�');
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
			title:'��ϵͳ����',
			autoHeight:true,
			border:false,
			cm:new Ext.grid.ColumnModel({
				defaults:{
					width:120,
					sortable: true,
				    editable: false
				},
				columns:[
				{header:'ϵͳ����',dataIndex:'moduleCode'},
				{header:'ϵͳ����',dataIndex:'moduleName'},
				{header:'�Ƿ񼤻�',dataIndex:'isActive',renderer:function(value){
					if(value==1){
						return '��';
					}else{
						return '��';
					}
														}
				}
				]
			}),
			sm:sm,
			tbar:new Ext.Toolbar([
				{
			 		text:'����',
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
					text:'ɾ��',
					iconCls:'silk-delete',
					handler:function(){
						var _ModuleMgr=this.ownerCt.ownerCt;
						var selectedRecord = sm.getSelected();
						var paras = {};
						if (selectedRecord == null || selectedRecord.length == 0){
							Ext.example.msg("ע��", "����ѡ��һ����¼");
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

							// ʧ��
							if (ret.returnNo > 0) {
								Ext.example.msg('ʧ��', 'ʧ��ԭ��:' + ret.returnMsg);
								return;
							}
							// �ɹ�
							module_mgr.store.load();
							Ext.example.msg('�ɹ�', ret.returnMsg);
						}
					});
						
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
	
	module_mgr = new Ems.page.ModuleMgr({
                       renderTo:Ext.getDom('sysModule')
       });
});
