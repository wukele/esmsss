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
		var qryPanel;
		var grid;
		var store;

		var STATUS_ACTIVE = 0;
		var STATUS_NOT_ACTIVE = 1;

		var fieldModel = ['operNo', 'regionId', 'deptNo', 'roleCode',
				'operName', 'loginName', 'operPwd', 'question', 'answer',
				'gender', 'positions', 'phone', 'email', 'mobileNo', 'needSms',
				'operMessage', 'effDate', 'expHintDate', 'expDate', 'initFlag',
				'dealType', 'appType', 'statisticalDeptNo', 'operAlias',
				'loginCount', 'resInit1', 'resInit2', 'resChar1', 'resChar2',
				'pwdEncode', 'operStatus', 'operKind', 'flag', 'acctStatus',
				'busiType', 'derateFlag', 'isOnline', 'loginIp'];
		var cm;
		var sm = new Ext.grid.CheckboxSelectionModel();
		var UserAddCt;
		var submitprefix = 'user';

		var me = {
			removeUser : function() {// 删除
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("注意", "至少选择一条记录");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstUserNo[' + i + ']'] = selectedRecords[i].data.operNo;
				}

				// 删除
				Ext.Ajax.request({
							url : 'removeUser.action',
							method : 'post',
							params : paras,
							success : function(xhq, status) {
								var ret = Ext.util.JSON
										.decode(xhq.responseText);
								if (xhq.responseText == null)
									return;

								// 失败
								if (ret.returnNo > 0) {
									Ext.example.msg('失败', '失败原因:'
													+ ret.returnMsg);
									return;
								}
								// 成功
								store.remove(selectedRecords);

								Ext.example.msg('成功', ret.returnMsg);
							}
						});
			},
			// 失效
			invaildateUser : function() {
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("注意", "至少选择一条记录");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstUserNo[' + i + ']'] = selectedRecords[i].data.operNo;
				}

				// 失效
				Ext.Ajax.request({
							url : 'invalidateUser.action',
							method : 'post',
							params : paras,
							success : function(xhq, status) {
								var ret = Ext.util.JSON
										.decode(xhq.responseText);
								if (xhq.responseText == null)
									return;

								// 失败
								if (ret.returnNo > 0) {
									Ext.example.msg('失败', '失败原因:'
													+ ret.returnMsg);
									return;
								}
								// 成功
								for (i = 0; i < selectedRecords.length; i++) {
									selectedRecords[i].data.flag = STATUS_NOT_ACTIVE;
									selectedRecords[i].commit();
								}

								Ext.example.msg('成功', ret.returnMsg);
							}
						});
			},
			// 有效
			vaildateUser : function() {
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("注意", "至少选择一条记录");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstUserNo[' + i + ']'] = selectedRecords[i].data.operNo;
				}

				// 有效
				Ext.Ajax.request({
							url : 'validateUser.action',
							method : 'post',
							params : paras,
							success : function(xhq, status) {
								var ret = Ext.util.JSON
										.decode(xhq.responseText);
								if (xhq.responseText == null)
									return;

								// 失败
								if (ret.returnNo > 0) {
									Ext.example.msg('失败', '失败原因:'
													+ ret.returnMsg);
									return;
								}
								// 成功
								for (i = 0; i < selectedRecords.length; i++) {
									selectedRecords[i].data.flag = STATUS_ACTIVE;
									selectedRecords[i].commit();
								}

								Ext.example.msg('成功', ret.returnMsg);
							}
						});
			},
			queryUser : function() {
				var paras = {};
				var qryFields = qryPanel.findByType('textfield');
				
				Ext.each(qryFields, function(item, index, allItems) {
							var paraName = '';
							paraName = submitprefix ? submitprefix + '.'
									+ item.getName() : item.getName();
							paras[paraName] = item.getValue();
						});
				store.reload({
							proxy : new Ext.data.HttpProxy({
										url : 'qryUser.action',
										method : 'post'
									}),
							baseParams : {
								start : 0,
								limit : 20
							},
							params : paras,
							fields : fieldModel,
							idProperty : 'operNo',
							root : 'lstUser',
							totalProperty : 'userCount'
						});

			},
			setUserAddCt : function(userAddCt) {
				if (userAddCt)
					UserAddCt = userAddCt;
				UserAddCt.setDataStore(store);
			},
			init : function(contianerId) {
				// for test ###
				// store=new Ext.data.JsonStore({
				// proxy:new
				// Ext.data.MemoryProxy({lstUser:[{operNo:'1',operName:'测试',loginName:'登录名',operPwd:'ceshi',gender:'1'}]}),
				// fields:fieldModel,
				// idProperty:'operNo',
				// root:'lstUser'
				// });
				store = new Ext.data.JsonStore({
							proxy : new Ext.data.HttpProxy({
										url : 'qryUser.action'
									}),
							baseParams : {
								start : 0,
								limit : 20
							},
							fields : fieldModel,
							idProperty : 'operNo',
							root : 'lstUser',
							totalProperty : 'userCount'
						});
				store.load();

				cm = new Ext.grid.ColumnModel({
							columns : [new Ext.grid.RowNumberer(), sm, {
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
										dataIndex : 'operPwd',
										renderer : function(val) {
											if (val)
												return val.replace(/\w*/,
														'******');
										}
									}, {
										header : '性别',
										dataIndex : 'gender',
										renderer : function(val) {
											if (val == 1)
												return '男';
											else
												return '女';
										}
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
									}, {
										header : '是否有效',
										dataIndex : 'flag',
										renderer : function(val) {
											if (val == STATUS_NOT_ACTIVE)
												return '无效';
											else
												return '有效';
										}
									}],
							defaults : {
								sortable : true
							}
						});

				// 查询面板
				qryPanel = new Ext.Panel({
					anchor:'100%',
					defaults : {
						border : false,
						labelWidth: 60,  
        				labelAlign:"right",
        				buttonAlign:'center'
					},
					layout : 'column',
					frame : true,
					items : [{
								xtype : 'panel',
								columnWidth:.2,
								layout : 'form',
								items : [{
											xtype : 'textfield',
											width : 120,
											fieldLabel : '用户号',
											name : 'operNo',
											maxLength : 10,
											maxLengthText : '至多10位'
										}]
							}, {
								xtype : 'panel',
								layout : 'form',
								columnWidth:.2,
								items : [{
											xtype : 'textfield',
											width : 120,
											fieldLabel : '用户名称',
											name : 'operName',
											maxLength : 60,
											maxLengthText : '至多60位'
										}]
							}, {  //状态后台获取
								xtype : 'panel',
								layout : 'form',
								columnWidth:.1,
								labelWidth:30,
								items : [{
									xtype : 'combo',
									width : 60,
									fieldLabel : '状态',
									name : 'flag',
									store : new Ext.data.JsonStore({
												proxy : new Ext.data.HttpProxy(
														{
															url : 'UiConfigQry.action'
														}),
												baseParams : {
													config_name : 'isActive'
												},
												root : 'configs',
												totalProperty : 'totalProperty',
												fields:[{name:'configValue',mapping:'configValue'},{name:'configDesc',mapping:'configDesc'}]
											}),
									displayField:'configDesc',
									valueField:'configValue',
									editable:false,
									triggerAction : 'all',
									selectOnFocus:true
								}]
							}, {
								xtype : 'button',
								name : 'query',
								text : '查询',
								width:80,
								handler : this.queryUser
								// 查询用户方法
						}]
				});

				grid = new Ext.grid.GridPanel({
							store : store,
							title : '用户视图',
							sm : sm,
							cm : cm,
							border : true,
							viewConfig : {
								autoFill : true
							},
							tbar : [{
										xtype : 'button',
										name : 'btnAddUser',
										text : '添加',
										handler : function() {
											// 添加用户方法
											// @add ffmmx
											var addWindow = UserAddCt
													.getAddWindow();

											addWindow.show();
										}
									}, '-', {
										xtype : 'button',
										name : 'btnRemoveUser',
										text : '删除',
										handler : function() {
											me.removeUser();
										}
									}, '-', {
										xtype : 'button',
										name : 'btnInvaidateUser',
										text : '失效',
										handler : function() {
											me.invaildateUser();
										}
									}, '-', {
										xtype : 'button',
										name : 'btnVaidateUser',
										text : '有效',
										handler : function() {
											me.vaildateUser();
										}
									}],
							bbar : new Ext.PagingToolbar({
										store : store,
										displayInfo : true,
										pageSize : 20,
										displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
										emptyMsg : '没有记录'
									})
						});

				// 添加双击修改。。
				grid.on('rowdblclick', function(gridPanel, rowIndex, e) {
							var selectedRecord = gridPanel.getSelectionModel()
									.getSelected();
							var modifyWindow = UserAddCt
									.getModifyWindow(selectedRecord);
							modifyWindow.show();
						});

				// 总容器
				frame = new Ext.Panel({
							iconCls : 'silk-user',
							layout : 'form',
							width : '100%',
							height : '100%',
							title : '用户管理',
							border : false,
							items : [qryPanel, grid]
						});
						
				if (contianerId){
					frame.render(contianerId);
					//init grid height to frame height
					grid.setHeight(Ext.get(contianerId).getHeight() - qryPanel.getHeight()-frame.header.getHeight());
				}
					
				
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