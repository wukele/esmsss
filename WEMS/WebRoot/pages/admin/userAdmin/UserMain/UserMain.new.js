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
					//查询面板
					qryPanel=new Ext.Panel({
						bodyStyle:'width:100%',
						defaults:{border:false},
						layout : 'column',
						frame:true,
						items : [ {xtype:'panel',columnWidth:.25,layout:'form',items:[{
							xtype : 'textfield',
							width : 160,
							fieldLabel : '用户号',
							name : 'operNo',
							maxLength : 10,
							maxLengthText : '至多10位',
							rightPadding:.20
						} ]}, {xtype:'panel',columnWidth:.25,layout:'form',items:[{
							xtype : 'textfield',
							width : 160,
							fieldLabel : '用户名称',
							name : 'operName',
							maxLength : 60,
							maxLengthText : '至多60位',
							rightPadding:.20
						} ]}, {
							xtype : 'button',
							name : 'query',
							text : '查询',
							handler :
								// 查询用户方法
								this.queryUser
						} ]
					}) ;
					//
					cm = new Ext.grid.ColumnModel({
						columns : [ new Ext.grid.RowNumberer(), sm, {
							id : 'operNo',
							header : '用户号',
							dataIndex : 'operNo'
						}, {
							header : '用户名称',
							dataIndex : 'operName'
						}, {
							header : '登录名称',
							dataIndex : 'loginName'
						}, {
							header : '密码',
							dataIndex : 'operPwd'
						}, {
							header : '性别',
							dataIndex : 'gender'
						}, {
							header : '位置',
							dataIndex : 'positions'
						}, {
							header : '电话',
							dataIndex : 'phone'
						}, {
							header : '电子邮件',
							dataIndex : 'email'
						}, {
							header : '手机号码',
							dataIndex : 'mobileNo'
						},{
							header:'是否有效',
							dataIndex:'flag',
							renderer: function(val){
								if(val == 1)
									return '无效';
								else if(val == 0)
									return '有效';
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
						title : '用户列表',
						sm : sm,
						cm : cm,
						bodyStyle:'height:38%;',
						viewConfig:{autoFill:true},
						bbar : [ {
							xtype : 'button',
							name : 'btnAddUser',
							text : '添加',
							handler : function() {
								// 添加用户方法
								// @add ffmmx
								var addWindow = UserAddCt.getAddWindow();
								
								addWindow.show();
							}
						}, {
							xtype : 'button',
							name : 'btnRemoveUser',
							text : '删除/失效',
							handler : function() {
								var _window = new Ext.Window({
									title:"用户操作",
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
												fieldLabel : "操作类别",
												store : new Ext.data.ArrayStore( {
													fields : [ "classification" ],
													data : [ [ "删除" ], [ "失效" ] ]
												}),
												displayField : "classification",
												editable : false
												}]
											}]
									  }],
									buttons:[{
										text:"确定",
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
														alert("操作成功");
														_window.hide();
														me.queryUser;
													},
											  		failure: function(response, opts) {
											      		alert("操作失败");
														_window.hide();
											  	    }

												})
											}
										}
									},{
										text:"取消",
										handler:function(){
											_window.hide();
										}
									}],
									listeners:{
										"show":function(){
											var _classType=_window.findByType("combo")[0]
											_classType.setValue("删除");
										}
									}
							});
									_window.show();
								
							}
						} ]
					});

					
					//添加双击修改。。
					grid.on('rowdblclick',function(gridPanel, rowIndex,e){
						var selectedRecord=gridPanel.getSelectionModel().getSelected();
						var modifyWindow = UserAddCt.getModifyWindow(selectedRecord);
						modifyWindow.show();
					});
					
					//用户角色关联操作
					//@add ffmmx 
					//@since 10.12.28
					
					//添加点击选择，显示角色面板
					grid.on('rowclick',function(gridPanel,rowIndex,e){
						var selectedRecord=gridPanel.getSelectionModel().getSelected();
						if(frame.findById('rolePanel')==null){
							frame.add(rolePanel);
							frame.doLayout();
						}
						
						
					});
					//用户可操作角色
					availRoleStore=new Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({url:''}),
						idProperty:'roleCode',
						root:'lstAvaRole'
					});
//					availRoleStore.load();
					availRolePanel=new Ext.grid.GridPanel({
						iconCls:'silk-user',
						store:availRoleStore,
						title:'用户可操作的角色',
						bodyStyle:'height:100%;',
						tbar:[{xtype:'button',id:'addRole',text:'新增'}],
						columns:[new Ext.grid.RowSelectionModel(),
						         {header:'角色代码',dataIndex:'roleCode'},
						         {header:'角色名称',dataIndex:'roleName'},
						         {header:'角色类型',dataIndex:'roleType'},
						         {header:'是否激活',dataIndex:'isactive',renderer:function(val){ if(val==1) return "激活"; else return "未激活";}}
						         ],
						defaults:{
							width:125,
							editable:false,
							sortable:false
						},
						enableDragDrop   : true
					});
					//用户已使用的角色
					usedRoleStore =new Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({url:''}),
						idProperty:'roleCode',
						root:'lstUsedRole'
					});
					
					usedRolePanel=new Ext.grid.GridPanel({
						iconCls:'silk-user',
						store:usedRoleStore,
						title:'用户已使用的角色',
						bodyStyle:'height:100%;',
						tbar:[{xtype:'button',id:'delRole',text:'删除'}],
						columns:[new Ext.grid.RowSelectionModel(),
						         {header:'角色代码',dataIndex:'roleCode'},
						         {header:'角色名称',dataIndex:'roleName'},
						         {header:'角色类型',dataIndex:'roleType'},
						         {header:'是否激活',dataIndex:'isactive',renderer:function(val){ if(val==1) return "激活"; else return "未激活";}}
						         ],
						defaults:{
							width:125,
							editable:false,
							sortable:false
						},
						enableDragDrop   : true
					});
					//用户角色信息面板
					rolePanel=new Ext.Panel({
						id:'rolePanel',
						iconCls: 'silk-user',
						layout:'column',
						items:[availRolePanel,usedRolePanel]
					});
					//总容器
					frame=new Ext.Panel({
						iconCls: 'silk-user',
						layout:'form',
						width:'100%',
						heigth:'100%',
						title:'用户管理',
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