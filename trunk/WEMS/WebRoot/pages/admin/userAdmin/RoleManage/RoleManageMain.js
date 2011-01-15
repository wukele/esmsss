/**
 * RoleManageMain.js 角色基本信息管理
 * 
 * @author ffmmx
 * @since 10.12.28
 */

(function() {
	Ext.ns("com.wems.admin.userAdmin");
	// 角色信息管理
	com.wems.admin.userAdmin.RoleManage = function() {
		var frame;// 主界面
		var qryPanel;// 查询面板
		var rolePanel;// 角色面板
		var window;// 新增修改窗口
		var store;// 角色列表

		var statusStore;// 激活状态
		var fieldModel = [ 'roleCode', 'regionId', 'roleLevel', 'localNet',
				'comments', 'roleName', 'operNo', 'isactive', 'resChar',
				'sysType', 'roleType', 'belongType', 'deptNo' ];
		var cm;
		var sm = new Ext.grid.CheckboxSelectionModel();
		var submitprefix = "role";
		
		var STATUS_ACTIVE=1;
		var STATUS_NOT_ACTIVE=0;
		var me = {
			getModifyWindow : function(record) {
				var allFields = [];
				var fields = window.findByType('textfield');
				var combos = window.findByType('combo');
				allFields = fields.concat(combos);

				if (record) {
					for (i = 0; i < allFields.length; i++) {
						allFields[i].setValue(record.data[allFields[i]
								.getName()]);
					}
				}
				window.setTitle('修改角色');
				window.findById('roleCode').readOnly = true;
				var btnOk = window.getFooterToolbar().findById('ok');
				btnOk.handler = this.modifyRole;
				return window;
			},
			clearWindowFieldValues : function() {
				fields = window.findByType('textfield');
				combos = window.findByType('combo');

				Ext.each(fields, function(item, index, allItems) {
					item.setValue('');
				});
				Ext.each(combos, function(item, index, allItems) {
					item.setValue(1);
				});
			},
			getAddWindow : function() {
				this.clearWindowFieldValues();
				window.setTitle('添加角色');
				var btnOk = window.getFooterToolbar().findById('ok');
				btnOk.handler = this.addRole;
				return window;
			},
			removeRole : function() {// 删除
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("注意", "至少选择一条记录");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstRoleCode['+i+']'] = selectedRecords[i].data.roleCode;
				}

				// 删除
				Ext.Ajax.request({
					url : 'removeRole.action',
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
						store.remove(selectedRecords);

						Ext.example.msg('成功', ret.returnMsg);
					}
				});
			},
			// 失效
			invaildateRole : function() {
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("注意", "至少选择一条记录");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstRoleCode['+i+']'] = selectedRecords[i].data.roleCode;
				}

				// 失效
				Ext.Ajax.request({
					url : 'invalidateRole.action',
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
						for(i=0;i<selectedRecords.length;i++){
							selectedRecords[i].data.isactive=STATUS_NOT_ACTIVE;
							selectedRecords[i].commit();
						}

						Ext.example.msg('成功', ret.returnMsg);
					}
				});
			},
			// 有效
			vaildateRole : function() {
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("注意", "至少选择一条记录");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstRoleCode['+i+']'] = selectedRecords[i].data.roleCode;
				}

				// 有效
				Ext.Ajax.request({
					url : 'validateRole.action',
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
						for(i=0;i<selectedRecords.length;i++){
							selectedRecords[i].data.isactive=STATUS_ACTIVE;
							selectedRecords[i].commit();
						}

						Ext.example.msg('成功', ret.returnMsg);
					}
				});
			},
			// 修改
			modifyRole : function() {
				var data = {};
				var paras = {};
				var allFields = [];
				var fields = window.findByType('textfield');
				var combos = window.findByType('combo');
				allFields = fields.concat(combos);

				var rec = store.getById(window.findById('roleCode').getValue());
				data = rec.data;
				for (i = 0; i < allFields.length; i++) {
					var fieldName = '';
					fieldName = allFields[i].getName();
					data[fieldName] = allFields[i].getValue();
				}

				for (i in data) {
					var fieldName = '';
					fieldName = submitprefix ? submitprefix + '.' + i : i;
					paras[fieldName] = data[i];
				}
				// 验证
				isFieldsValidated = true;
				for (i = 0; i < allFields.length; i++) {
					isFieldsValidated = isFieldsValidated
							&& allFields[i].validate();
				}
				if (isFieldsValidated) {
					// 修改
					Ext.Ajax.request({
						url : 'modifyRole.action',
						method : 'post',
						params : paras,
						success : function(xhq, status) {
							var ret = Ext.util.JSON
							.decode(xhq.responseText);
							if (xhq.responseText == null)
								return;

							// 修改失败
							if (ret.returnNo > 0) {
								Ext.example.msg('失败', '失败原因:' + ret.returnMsg);
								return;
							}
							// 修改成功
							rec.data = data;
							rec.commit();

							Ext.example.msg('成功', ret.returnMsg);
						}
					});
					window.hide();
				}
			},
			// 添加
			addRole : function() {
				var fields = window.findByType('textfield');
				var combos = window.findByType('combo');
				var allFields = [];

				var data = {};
				allFields = fields.concat(combos);

				Ext.each(allFields, function(item, index, allItems) {
					var fieldName = '';
					fieldName = submitprefix ? submitprefix + '.'
							+ item.getName() : item.getName();
					data[fieldName] = item.getValue();
				});

				Ext.Ajax
						.request({
							url : 'addRole.action',
							method : 'post',
							params : data,
							success : function(req, status) {
								var ret = Ext.util.JSON
										.decode(xhq.responseText);
								if (ret == null)
									return;
								// 失败
								if (ret.returnNo != 0) {
									Ext.example.msg('注意', ret.returnMsg);
									return;
								}
								Ext.example.msg('成功', ret.returnMsg);
								// 添加成功
								recData = {};
								for (i = 0; i < allFields.length; i++) {
									recData[allFields[i].getName()] = allFields[i]
											.getValue();
								}
								var rec = new Ext.data.Record(recData,
										recData['roleCode']);
								store.add(rec);
							}
						});

				window.hide();
			},
			// 查询
			queryRole : function() {
				var paras = {};
				var qryFields = [];
				var textFields = qryPanel.findByType('textfield');
				var combo = qryPanel.findByType('combo');
				qryFields = textFields.concat(combo);

				Ext.each(qryFields, function(item, index, allItems) {
					var paraName = '';
					paraName = submitprefix ? submitprefix + '.'
							+ item.getName() : item.getName();
					paras[paraName] = item.getValue();
				});
				store.reload({
					proxy : new Ext.data.HttpProxy({
						url : 'qryRole.action',
						method : 'post'
					}),
					baseParams:{start:0,limit:20},
					params : paras,
					fields : fieldModel,
					idProperty : 'roleCode',
					root : 'lstRole',
					totalProperty:'roleCount'
				});
			},
			init : function(contianerId) {
				// 初始化激活状态
				statusStore = new Ext.data.SimpleStore({
					fields : [ 'key', 'name' ],
					data : [ [ STATUS_ACTIVE, '有效' ], [ STATUS_NOT_ACTIVE, '无效' ] ],
					id : 'status'
				});
				// 初始化添加/修改窗口容器
				window = new Ext.Window({
					title : '添加用户',
					frame : true,
					width : 300,
					height : 130,
					layout : "form",
					labelWidth : 60,
					autoHeight : true,
					plain : true,
					resizable : true,
					buttonAlign : "center",
					closeAction : "hide",
					defaults : {
						xtype : "textfield",
						width : 180
					},
					items : [ {
						id : 'roleCode',
						fieldLabel : '角色代号',
						name : 'roleCode',
						allowBlank : false,
						blankText : '角色代号不能为空',
						maxLength : 6,
						maxLengthText : '角色代号至多6位'
					}, {
						id : 'roleName',
						fieldLabel : '角色名称',
						name : 'roleName',
						allowBlank : false,
						blankText : '角色名称才不能为空',
						maxLength : 32,
						maxLengthText : '至多32位'
					}, {
						id : 'roleLevel',
						fieldLabel : '角色等级',
						name : 'roleLevel',
						allowBlank : false,
						blankText : '角色名称才不能为空',
						maxLength : 6,
						maxLengthText : '角色等级至多6位'
					}, {
						id : 'roleType',
						fieldLabel : '角色类型',
						name : 'roleType',
						maxLength : 6,
						maxLengthText : '角色类型至多6位'
					}, {
						fieldLabel : '状态',
						id : 'isactive',
						name : 'isactive',
						xtype : 'combo',
						typeAhead : true,
						selectOnFocus : true,
						triggerAction : 'all',
						mode : 'local',
						editable : false,
						store : statusStore,
						valueField : 'key',
						displayField : 'name',
						value : ''
					} ],
					buttons : [ {
						xtype : 'button',
						id : 'ok',
						name : 'ok',
						text : '确认'
					}, {
						xtype : 'button',
						id : 'cancel',
						name : 'cancel',
						text : '取消',
						handler : function() {
							window.hide();
						}
					} ]
				});
				// 初始化角色查询存储
				paras={};
				paras[submitprefix?submitprefix+'.'+'isactive':'isactive']=STATUS_ACTIVE;
				
				store = new Ext.data.JsonStore({
					proxy : new Ext.data.HttpProxy({
						url : 'qryRole.action'
					}),
					baseParams:{start:0,limit:20},
					params:paras,
					fields : fieldModel,
					idProperty : 'roleCode',
					root : 'lstRole',
					totalProperty:'roleCount'
				});
				store.load();
				// 查询面板
				qryPanel = new Ext.Panel({
					bodyStyle : 'width:100%',
					defaults : {
						border : false
					},
					layout : 'column',
					frame : true,
					items : [ {
						xtype : 'panel',
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							width : 160,
							fieldLabel : '角色代号',
							name : 'roleCode',
							maxLength : 10,
							maxLengthText : '至多10位',
							rightPadding : .20
						} ]
					}, {
						xtype : 'panel',
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							width : 160,
							fieldLabel : '角色名称',
							name : 'roleName',
							maxLength : 60,
							maxLengthText : '至多60位',
							rightPadding : .20
						} ]
					}, {
						xtype : 'panel',
						columnWidth : .25,
						layout : 'form',
						items : [ {
							width : 160,
							fieldLabel : '状态',
							name : 'isactive',
							xtype : 'combo',
							typeAhead : true,
							selectOnFocus : true,
							triggerAction : 'all',
							mode : 'local',
							editable : false,
							store : statusStore,
							valueField : 'key',
							displayField : 'name',
							value : 1,
							rightPadding : .20
						} ]
					}, {
						xtype : 'button',
						name : 'query',
						text : '查询',
						handler : function() {
							// 查询用户方法
							me.queryRole();
						}
					} ]
				});

				cm = new Ext.grid.ColumnModel({
					columns : [ new Ext.grid.RowNumberer(), sm, {
						id : 'roleCode',
						header : '角色代码',
						dataIndex : 'roleCode'
					}, {
						header : '角色名称',
						dataIndex : 'roleName'
					}, {
						header : '角色等级',
						dataIndex : 'roleLevel'
					}, {
						header : '角色类型',
						dataIndex : 'roleType'
					}, {
						header : '备注',
						dataIndex : 'comments'
					}, {
						header : '最后修改用户',
						dataIndex : 'operNo'
					}, {
						header : '状态',
						dataIndex : 'isactive',
						renderer : function(val) {
							if (val == 1)
								return '有效';
							else if (val == 0)
								return '无效';
						}
					} ],
					defaults : {
						defaultWidth : 200,
						sortable : true
					}
				});

				// 角色视图
				rolePanel = new Ext.grid.GridPanel({
					store : store,
					title : '角色视图',
					sm : sm,
					cm : cm,
					border:false,
					height:398,
					viewConfig : {
						autoFill : true
					},
					tbar : [ {
						xtype : 'button',
						name : 'btnAddRole',
						text : '添加',
						handler : function() {
							// 添加角色方法方法
							var addWindow = me.getAddWindow();
							addWindow.show();
						}
					},'-', {
						xtype : 'button',
						name : 'btnRemoveInvalidateRole',
						text : '删除',
						handler : function() {
							// 删除角色
							me.removeRole();
						}
					}, '-',{
						xtype : 'button',
						name : 'btnInvaildateRole',
						text : '失效',
						handler : function() {
							me.invaildateRole();
						}
					},'-', {
						xtype : 'button',
						name : 'btnInvaildateRole',
						text : '有效',
						handler : function() {
							me.vaildateRole();
						}
					} ],
					bbar:new Ext.PagingToolbar({store:store,
						displayInfo: true,
						pageSize:20,
						displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
						emptyMsg : '没有记录'
					})

				});
				// 添加双击修改。。
				rolePanel.on('rowdblclick', function(gridPanel, rowIndex, e) {
					var selectedRecord = gridPanel.getSelectionModel()
							.getSelected();
					var modifyWindow = me.getModifyWindow(selectedRecord);
					modifyWindow.show();
				});

				// 总容器
				frame = new Ext.Panel({
					iconCls : 'silk-user',
					layout : 'form',
					width : '100%',
					heigth : '100%',
					title : '角色管理',
					border:false,
					items : [ qryPanel, rolePanel ]
				});
				if (contianerId)
					frame.render(contianerId);
			}
		};
		return me;
	}();
})();

Ext.onReady(function() {
	com.wems.admin.userAdmin.RoleManage.init('RoleManageMainPanel');
});