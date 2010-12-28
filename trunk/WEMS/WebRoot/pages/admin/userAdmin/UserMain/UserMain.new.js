/**
 * 
 * user manager main ui
 * 
 * @author ffmmx
 */

(function() {
	Ext.ns('com.wems.admin.userAdmin');

	com.wems.admin.userAdmin.UserMain = function() {
		var frame;
		var grid;
		var store;
		var qryPanel;
		var availRolePanel;
		var availRoleStore;
		var usedRolePanel;
		var usedRoleStore;
		var rolePanel;
		
		var roleFieldModel=['roleCode',
		                	'regionId',
		                	'roleLevel',
		                	'localNet',
		                	'comments',
		                	'roleName',
		                	'operNo',
		                	'isactive',
		                	'resChar',
		                	'sysType',
		                	'roleType',
		                	'belongType',
		                	'deptNo'];
		var fieldModel = [ 'operNo',
		               	'regionId',
		            	'deptNo',
		            	'roleCode',
		            	'operName',
		            	'loginName',
		            	'operPwd',
		            	'question',
		            	'answer',
		            	'gender',
		            	'positions',
		            	'phone',
		            	'email',
		            	'mobileNo',
		            	'needSms',
		            	'operMessage',
		            	'effDate',
		            	'expHintDate',
		            	'expDate',
		            	'initFlag',
		            	'dealType',
		            	'appType',
		            	'statisticalDeptNo',
		            	'operAlias',
		            	'loginCount',
		            	'resInit1',
		            	'resInit2',
		            	'resChar1',
		            	'resChar2',
		            	'pwdEncode',
		            	'operStatus',
		            	'operKind',
		            	'flag',
		            	'acctStatus',
		            	'busiType',
		            	'derateFlag',
		            	'isOnline',
		            	'loginIp' ];
		var cm;
		var sm = new Ext.grid.CheckboxSelectionModel();
		var UserAddCt;
		var submitprefix = 'user';
		
		me={
				queryUser:function(){
					var paras={};
					var qryFields=grid.getTopToolbar().findByType('textfield');
					Ext.each(qryFields,function(item,index,allItems){
						var paraName='';
						if(submitprefix)
							paraName=submitprefix+'.'+item.getName();
						paras[paraName]=item.getValue();
					});
					store.reload({
						proxy : new Ext.data.HttpProxy({
							url : 'qryUser.action',
							method:'post'
						}),
						params:paras,
						fields : fieldModel,
						idProperty : 'operNo',
						root : 'lstUser'
					});
					
				},
				setUserAddCt : function(userAddCt) {
					if (userAddCt)
						UserAddCt = userAddCt;
					UserAddCt.setDataStore(store);
				},
				init : function(contianerId) {
					store = new Ext.data.JsonStore({
						proxy : new Ext.data.HttpProxy({
							url : 'qryUser.action'
						}),
						fields : fieldModel,
						idProperty : 'operNo',
						root : 'lstUser'
					});
					store.load();
					//��ѯ���
					qryPanel=new Ext.Panel({
						bodyStyle:'width:100%',
						defaults:{border:false},
						layout : 'column',
						frame:true,
						items : [ {xtype:'panel',columnWidth:.25,layout:'form',items:[{
							xtype : 'textfield',
							width : 160,
							fieldLabel : '�û���',
							name : 'operNo',
							maxLength : 10,
							maxLengthText : '����10λ',
							rightPadding:.20
						} ]}, {xtype:'panel',columnWidth:.25,layout:'form',items:[{
							xtype : 'textfield',
							width : 160,
							fieldLabel : '�û�����',
							name : 'operName',
							maxLength : 60,
							maxLengthText : '����60λ',
							rightPadding:.20
						} ]}, {
							xtype : 'button',
							name : 'query',
							text : '��ѯ',
							handler :
								// ��ѯ�û�����
								this.queryUser
						} ]
					}) ;
					//
					cm = new Ext.grid.ColumnModel({
						columns : [ new Ext.grid.RowNumberer(), sm, {
							id : 'operNo',
							header : '�û���',
							dataIndex : 'operNo'
						}, {
							header : '�û�����',
							dataIndex : 'operName'
						}, {
							header : '��¼����',
							dataIndex : 'loginName'
						}, {
							header : '����',
							dataIndex : 'operPwd'
						}, {
							header : '�Ա�',
							dataIndex : 'gender'
						}, {
							header : 'λ��',
							dataIndex : 'positions'
						}, {
							header : '�绰',
							dataIndex : 'phone'
						}, {
							header : '�����ʼ�',
							dataIndex : 'email'
						}, {
							header : '�ֻ�����',
							dataIndex : 'mobileNo'
						},{
							header:'�Ƿ���Ч',
							dataIndex:'flag',
							renderer: function(val){
								if(val == 1)
									return '��Ч';
								else if(val == 0)
									return '��Ч';
							}
						} ],
						defaults : {
							sortable : true
						}
					});

					grid = new Ext.grid.GridPanel({
						iconCls: 'silk-user',
						store : store,
						layout : 'fit',
						title : '�û��б�',
						sm : sm,
						cm : cm,
						bodyStyle:'height:38%;',
						viewConfig:{autoFill:true},
						bbar : [ {
							xtype : 'button',
							name : 'btnAddUser',
							text : '���',
							handler : function() {
								// ����û�����
								// @add ffmmx
								var addWindow = UserAddCt.getAddWindow();
								
								addWindow.show();
							}
						}, {
							xtype : 'button',
							name : 'btnRemoveUser',
							text : 'ɾ��/ʧЧ',
							handler : function() {
								var _window = new Ext.Window({
									title:"�û�����",
									width:250,
									height:100,
									plain:true,
									resizable:false,
									layout:"form",
									labelWidth:55,
									defaultType:"textfield",
									items:[{
										xtype:"panel",
										style:"padding:5px",
										baseCls:"x-plain",
										layout:"column",
										items:[{
											columnWidth:.9,
											baseCls:"x-plain",
											layout:"form",
											labelWidth:55,
											defaults:{xtype:"textfield",width:125},
											items:[{
												xtype : "combo",
												mode : "local",
												triggerAction : 'all',
												fieldLabel : "�������",
												store : new Ext.data.ArrayStore( {
													fields : [ "classification" ],
													data : [ [ "ɾ��" ], [ "ʧЧ" ] ]
												}),
												displayField : "classification",
												editable : false
												}]
											}]
									  }],
									buttons:[{
										text:"ȷ��",
										handler:function(){
											var records=grid.getSelectionModel().getSelections();
											var operNo;
											_window=this.ownerCt.ownerCt;
											var flag=_window.findByType("combo")[0].getValue();
											for(var i=0;i<records.length;i++){
												operNo=records[i].get("operNo")
												Ext.Ajax.request({
													url:"delUser.action",
													method : "post",
													params:{"operNo":operNo,"flag":flag},
													success: function(response, opts) {
														alert("�����ɹ�");
														_window.hide();
														me.queryUser;
													},
											  		failure: function(response, opts) {
											      		alert("����ʧ��");
														_window.hide();
											  	    }

												})
											}
										}
									},{
										text:"ȡ��",
										handler:function(){
											_window.hide();
										}
									}],
									listeners:{
										"show":function(){
											var _classType=_window.findByType("combo")[0]
											_classType.setValue("ɾ��");
										}
									}
							});
									_window.show();
								
							}
						} ]
					});

					
					//���˫���޸ġ���
					grid.on('rowdblclick',function(gridPanel, rowIndex,e){
						var selectedRecord=gridPanel.getSelectionModel().getSelected();
						var modifyWindow = UserAddCt.getModifyWindow(selectedRecord);
						modifyWindow.show();
					});
					
					//�û���ɫ��������
					//@add ffmmx 
					//@since 10.12.28
					
					//��ӵ��ѡ����ʾ��ɫ���
					grid.on('rowclick',function(gridPanel,rowIndex,e){
						var selectedRecord=gridPanel.getSelectionModel().getSelected();
						if(frame.findById('rolePanel')==null){
							frame.add(rolePanel);
							frame.doLayout();
						}
						
						
					});
					//�û��ɲ�����ɫ
					availRoleStore=new Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({url:''}),
						idProperty:'roleCode',
						root:'lstAvaRole'
					});
//					availRoleStore.load();
					availRolePanel=new Ext.grid.GridPanel({
						iconCls:'silk-user',
						store:availRoleStore,
						title:'�û��ɲ����Ľ�ɫ',
						bodyStyle:'height:100%;',
						tbar:[{xtype:'button',id:'addRole',text:'����'}],
						columns:[new Ext.grid.RowSelectionModel(),
						         {header:'��ɫ����',dataIndex:'roleCode'},
						         {header:'��ɫ����',dataIndex:'roleName'},
						         {header:'��ɫ����',dataIndex:'roleType'},
						         {header:'�Ƿ񼤻�',dataIndex:'isactive',renderer:function(val){ if(val==1) return "����"; else return "δ����";}}
						         ],
						defaults:{
							width:125,
							editable:false,
							sortable:false
						},
						enableDragDrop   : true
					});
					//�û���ʹ�õĽ�ɫ
					usedRoleStore =new Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({url:''}),
						idProperty:'roleCode',
						root:'lstUsedRole'
					});
					
					usedRolePanel=new Ext.grid.GridPanel({
						iconCls:'silk-user',
						store:usedRoleStore,
						title:'�û���ʹ�õĽ�ɫ',
						bodyStyle:'height:100%;',
						tbar:[{xtype:'button',id:'delRole',text:'ɾ��'}],
						columns:[new Ext.grid.RowSelectionModel(),
						         {header:'��ɫ����',dataIndex:'roleCode'},
						         {header:'��ɫ����',dataIndex:'roleName'},
						         {header:'��ɫ����',dataIndex:'roleType'},
						         {header:'�Ƿ񼤻�',dataIndex:'isactive',renderer:function(val){ if(val==1) return "����"; else return "δ����";}}
						         ],
						defaults:{
							width:125,
							editable:false,
							sortable:false
						},
						enableDragDrop   : true
					});
					//�û���ɫ��Ϣ���
					rolePanel=new Ext.Panel({
						id:'rolePanel',
						iconCls: 'silk-user',
						layout:'column',
						items:[availRolePanel,usedRolePanel]
					});
					//������
					frame=new Ext.Panel({
						iconCls: 'silk-user',
						layout:'form',
						width:'100%',
						heigth:'100%',
						title:'�û�����',
						items:[qryPanel,grid]
					});
					//---------------------------------10.12.28
					if (contianerId)
						frame.render(contianerId);
				}
			};
		return me; 
	}();
})();

Ext.onReady(function() {
	var UserAdd = com.wems.admin.userAdmin.UserAdd;
	var UserMain = com.wems.admin.userAdmin.UserMain;
	UserAdd.init();
	UserMain.init('UserMainPanel');
	UserMain.setUserAddCt(UserAdd);

});