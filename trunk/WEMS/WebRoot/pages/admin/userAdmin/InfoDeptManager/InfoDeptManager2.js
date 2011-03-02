(function() {
	Ext.namespace('com.wems.admin.userAdmin');

	com.wems.admin.userAdmin.InfoDeptManager = function() {
		var queryPanel;
		var gridPanel;
		var addForm;
		var addWindow;
		var updateWindow;
		var updateForm;
		var store;
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
		var fields = ['deptNo', 'parentDeptNo', 'deptName', 'comments',
				'pathCode', 'deptType', 'localNet', 'phone', 'fax', 'address',
				'flag', 'resChar1', 'resChar2', 'areaId', 'channelType',
				'subChannelType'];
		var cm = new Ext.grid.ColumnModel({
					columns : [new Ext.grid.RowNumberer(), sm, {
								header : '部门ID',
								dataIndex : 'deptNo'
							}, {
								header : '父级',
								dataIndex : 'parentDeptNo'
							}, {
								header : '部门名称',
								dataIndex : 'deptName'
							}, {
								header : '描述',
								dataIndex : 'comments'
							}, {
								header : '路径编码',
								dataIndex : 'pathCode'
							}, {
								header : '部门类型',
								dataIndex : 'deptType'
							}, {
								header : '本地编码',
								dataIndex : 'localNet'
							}, {
								header : '电话',
								dataIndex : 'phone'
							}, {
								header : '传真',
								dataIndex : 'fax'
							}, {
								header : '地址',
								dataIndex : 'address'
							}, {
								header : '状态',
								dataIndex : 'flag'
							}, {
								header : '区域编码',
								dataIndex : 'areaId'
							}, {
								header : '渠道类型',
								dataIndex : 'channelType'
							}, {
								header : '子渠道类型',
								dataIndex : 'subChannelType'
							}],
					defaults : {
						sortable : true
					}

				});

		function ajaxSyncCall(urlStr, paramsStr) {
			var obj;
			var value;
			if (window.ActiveXObject) {
				obj = new ActiveXObject('Microsoft.XMLHTTP');
			} else if (window.XMLHttpRequest) {
				obj = new XMLHttpRequest();
			}
			obj.open('POST', urlStr, false);
			obj.setRequestHeader('Content-Type',
					'application/x-www-form-urlencoded');
			obj.send(paramsStr);
			var result = Ext.decode(obj.responseText);
			return result;
		}
		function getFormParams(form, submitprefix) {
			var paras = {};
			var fields = form.findByType('textfield');
			Ext.each(fields, function(item, index, allItems) {
						var paraName = submitprefix ? submitprefix + '.'
								+ item.getName() : item.getName();
						paras[paraName] = item.getValue();
					});
			return paras;
		}
		
		function invokeJava(url, paras) {
			Ext.Ajax.request({
				url : url,
				method : 'post',
				params : paras,
				success : function(response) {
					var resp = Ext.decode(response.responseText);
					var ret = resp.ret;
					if (ret == 0) {
						Ext.example.msg('Success', '部门操作成功');
					} else {
						Ext.example.msg('Failure', "" + resp.msg);
					}

				},

				failure : function(response, action) {
					Ext.Msg.alert('Failure', 'Ajax communication failed');
					return "1";
				}
			});

}

		var me = {
			queryDeptInfo:function(){
//				var params = {};
//				var queryFields = queryPanel.findByType('textfield');
//				var submitprefix = "infoDept";
//				Ext.each(queryFields, function(item, index, allItems) {
//							var paraName = '';
//							paraName = submitprefix ? submitprefix + '.'
//									+ item.getName() : item.getName();
//							params[paraName] = item.getValue();
//						});
				var params = getFormParams(queryPanel, "infoDept");
				store.reload({
							proxy : new Ext.data.HttpProxy({
										url : 'selectInfoDept.action'
									}),
							baseParams : {
								start : 0,
								limit : 10
							},
							params : params,
							fields : fields,
							root : 'infoDepts',
							idProperty : 'deptNo',
							totalProperty : 'totalProperty'
						
					
				});
			
			},
			init : function(contianerId) {
				store = new Ext.data.JsonStore({
							proxy : new Ext.data.HttpProxy({
										url : 'selectInfoDept.action'
									}),
							baseParams : {},
							fields : fields,
							root : 'infoDepts',
							idProperty : 'deptNo',
							totalProperty : 'totalProperty'
						});
				store.load();

				// 查询面板
				queryPanel = new Ext.FormPanel({
							id : 'queryPanel',
							anchor : '100%',
							layout : 'column',
							frame : true,
							// baseCls:'x-plain',
							defaults : {
								labelWidth : 60,
								labelAlign : 'right',
								buttonAlign : 'center'
							},
							items : [{
										xtype : 'panel',
										columnWidth : .3,
										layout : 'form',
										items : [{
													xtype : 'textfield',
													fieldLabel : '部门ID',
													name : 'deptNo'
												}]
									}, {
										xtype : 'panel',
										columnWidth : .3,
										layout : 'form',
										items : [{
													xtype : 'textfield',
													fieldLabel : '部门名称',
													name : 'deptName'
												}]
									}, {
										xtype : 'button',
										width : 80,
										text : '查询',
										handler : function() {
											me.queryDeptInfo();
										}
									}, {
										xtype : 'button',
										width : 80,
										text : '重置',
										handler : function() {
											Ext.getCmp('queryPanel').form
													.reset();
										}
									}]
						});
				// 查询结果面板
				gridPanel = new Ext.grid.GridPanel({
							height : 100,
							store : store,
							sm : sm,
							cm : cm,
							tbar : [{
										xtype : 'button',
										text : '新增部门',
										handler : function() {
											addWindow.show();
										}
									}, '-', {
										xtype : 'button',
										text : '修改部门',
										handler : function() {
											var selectedRecords = sm.getSelections();
											var length = selectedRecords.length;
											if (length != 1) {
												Ext.example.msg("提示", "需要选择其中一行数据!");
												return;
											}else if(length>1){
												Ext.example.msg("提示",'更新只能选择一行数据')
											}else{
												updateWindow.show();
												var selectDate=selectedRecords[0].data;
												var deptNo = selectDate.deptNo;
												updateForm.form.findField("u_deptNo").setValue(selectDate.deptNo);
												updateForm.form.findField("u_deptName").setValue(selectDate.deptName);
												updateForm.form.findField("u_parentDeptNo").setValue(selectDate.parentDeptNo);
												updateForm.form.findField("u_parentDeptName").setValue(selectDate.parentDeptNo);
												updateForm.form.findField("u_comments").setValue(selectDate.comments);
												updateForm.form.findField("u_flag").setValue(selectDate.flag);
												updateForm.form.findField("u_pathCode").setValue(selectDate.pathCode);
												updateForm.form.findField("u_deptType").setValue(selectDate.deptType);
												updateForm.form.findField("u_localNet").setValue(selectDate.localNet);
												updateForm.form.findField("u_phone").setValue(selectDate.phone);
												updateForm.form.findField("u_fax").setValue(selectDate.fax);
												updateForm.form.findField("u_address").setValue(selectDate.address);
												updateForm.form.findField("u_areaId").setValue(selectDate.areaId);
												updateForm.form.findField("u_channelType").setValue(selectDate.channelType);
												updateForm.form.findField("u_subChannelType").setValue(selectDate.subChannelType);
												updateForm.form.findField("u_resChar1").setValue(selectDate.resChar1);
												updateForm.form.findField("u_resChar2").setValue(selectDate.resChar2);
												updateForm.form.findField("u_deptNo").setReadOnly(true);
											}
											
										}
									}, '-', {
										xtype : 'button',
										text : '删除部门',
										handler : function() {
											var selectedRecords = sm.getSelections();
											var length = selectedRecords.length;
											if (length != 1) {
												Ext.example.msg("提示", "需要选择其中一行数据!");
												return;
											}
											var deptNo = selectedRecords[0].data.deptNo;
											var paras = {};
											paras["infoDept.deptNo"] = deptNo;
											Ext.Ajax.request({
												method:'POST',
												url:'deleteInfoDept.action',
												params:paras,
												success:function(response, status){
													var res=Ext.decode(response.responseText)
													if(res.ret=='1'){
														Ext.example.msg('删除失败', '失败原因:'
																			+ res.msg);
														return;
													}else{
														Ext.example.msg('删除成功','删除成功');
														
														//me.queryDeptInfo();
														store.remove(selectedRecords);
													}
												}
											})
//											store = new Ext.data.JsonStore({
//												proxy : new Ext.data.HttpProxy({
//															url : 'selectInfoDept.action'
//														}),
//												baseParams : {
//													start : 0,
//													limit : 20
//												},
//												//params : params,
//												fields : fields,
//												root : 'infoDepts',
//												idProperty : 'deptNo',
//												totalProperty : 'totalProperty'
//											});
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
				
						
						
				var isStore = new Ext.data.SimpleStore({
							fields : ['value', 'text'],
							data : [['0', '生效'], ['1', '失效']]
						});
				// 新部门添加面板
				addForm = new Ext.form.FormPanel({
					labelWidth : 100,
					labelAlign : "right",
					frame : true,
					items : [{
						xtype : "panel",
						title : "",
						layout : "column",
						items : [{
									xtype : "panel",
									title : "",
									layout : "form",
									columnWidth : 0.25,
									defaultType : 'textfield',
									items : [{
												fieldLabel : "部门ID",
												name : "deptNo",
												anchor : "100%",
												allowBlank : false,
												maxLength : 6,
												maskRe : /\d/
											}, {
												xtype : "combo",
												fieldLabel : '是否生效',
												name : "flag",
												store : isStore,
												displayField : 'text',
												valueField : 'value',
												mode : 'local',
												triggerAction : 'all',
												value : "1"
											}, {
												fieldLabel : "电话",
												name : "phone",
												anchor : "100%"
											}, {
												fieldLabel : "渠道类型",
												name : "channelType",
												anchor : "100%"
											}]
								}, {
									xtype : "panel",
									title : "",
									layout : "form",
									columnWidth : 0.25,
									defaultType : 'textfield',
									items : [{
												fieldLabel : "部门名称",
												name : "deptName",
												anchor : "100%",
												allowBlank : false,
												maxLength : 64
											}, {
												fieldLabel : "路径编码",
												name : "pathCode",
												anchor : "100%"
											}, {
												fieldLabel : "传真",
												name : "fax",
												anchor : "100%"
											}, {
												fieldLabel : "子渠道类型",
												name : "subChannelType",
												anchor : "100%"
											}]
								}, {
									xtype : "panel",
									title : "",
									layout : "form",
									columnWidth : 0.25,
									defaultType : 'textfield',
									items : [{
												name : "parentDeptNo",
												hidden : true,
												hideLabel : true,
												allowBlank : false,
												maxLength : 6
											}, {
												fieldLabel : "父级部门",
												name : "parentDeptName",
												anchor : "100%",
												allowBlank : false,
												listeners : {
													focus : function() {
														var loader = new Ext.tree.TreeLoader(
																{
																	dataUrl : 'selectInfoDept.action'
																});

														loader.processResponse = function(
																response, node,
																callback) {
															var json = response.responseText;
															try {
																var json = Ext
																		.decode(response.responseText);
																// var json =
																// eval("("+json+")");
																node
																		.beginUpdate();
																// 从json中获得json数组，这里的key与Struts2返回的json对象中的key对应
																var o = json["infoDepts"];

																for (var i = 0, len = o.length; i < len; i++) {
																	var _node = {
																		id : o[i].deptNo,
																		text : o[i].deptName,
																		deptNo : o[i].deptNo,
																		deptName : o[i].deptName
																	};
																	var n = this
																			.createNode(_node);
																	if (n) {
																		node
																				.appendChild(n);
																	}
																}
																node
																		.endUpdate();
																if (typeof callback == "function") {
																	callback(
																			this,
																			node);
																}
															} catch (e) {
																this
																		.handleFailure(response);
															}
														}
														loader
																.on(
																		"beforeload",
																		function(
																				treeLoader,
																				node) {
																			loader.baseParams["infoDept.parentDeptNo"] = node.attributes.deptNo;
																		});
														var tree = new Ext.tree.TreePanel(
																{
																	loader : loader,
																	useArrows : false,
																	autoScroll : true,
																	containerScroll : true
																});
														var root = new Ext.tree.AsyncTreeNode(
																{
																	id : '100000',
																	text : '计费结算中心',
																	nodeType : 'async',
																	deptNo : '100000',
																	deptName : '计费结算中心'
																});
														tree.setRootNode(root);
														root.expand(false,
																false);

														var win = new Ext.Window(
																{
																	layout : 'fit',
																	width : 500,
																	height : 300,
																	closeAction : 'hide',
																	items : [tree],
																	buttons : [
																			{
																				text : '按钮',
																				handler : function() {
																					addForm.form
																							.findField("parentDeptNo")
																							.setValue(tree
																									.getSelectionModel()
																									.getSelectedNode().attributes.deptNo);
																					addForm.form
																							.findField("parentDeptName")
																							.setValue(tree
																									.getSelectionModel()
																									.getSelectedNode().attributes.deptName);
																					win
																							.close();

																				}
																			}]
																});
														win.show();
													}
												}
											}, {
												xtype : "combo",
												fieldLabel : '部门类型',
												name : "deptType",
												store : isStore,
												displayField : 'text',
												valueField : 'value',
												mode : 'local',
												triggerAction : 'all',
												value : "1"
											}, {
												fieldLabel : "地址",
												name : "address",
												anchor : "100%"
											}, {
												fieldLabel : "备注1",
												name : "resChar1",
												anchor : "100%"
											}]
								}, {
									xtype : "panel",
									title : "",
									layout : "form",
									columnWidth : 0.25,
									defaultType : "textfield",
									items : [{
												fieldLabel : "部门描述",
												name : "comments",
												anchor : "100%"
											}, {
												fieldLabel : "本地编码",
												name : "localNet",
												anchor : "100%",
												value : "831"
											}, {
												fieldLabel : "区域编码",
												name : "areaId",
												anchor : "100%"
											}, {
												fieldLabel : "备注2",
												name : "resChar2",
												anchor : "100%"
											}]
								}]
					}],
					buttons : [{
						text : '提交',
						handler : function() {
							// addForm.getForm().submit();
							var submitprefix = "infoDept";
							var paras = {};
							var fields = addForm.findByType('textfield');
							Ext.each(fields, function(item, index, allItems) {
								var paraName = submitprefix ? submitprefix
										+ '.' + item.getName() : item.getName();
								paras[paraName] = item.getValue();
							});
							// alert(addForm.url)
							if (addForm.getForm().isValid()) {
								invokeJava('insertInfoDept.action', paras);
								var _window=this.ownerCt.ownerCt.ownerCt;
								_window.hide();
								me.queryDeptInfo();
							}

						}
					}]
				});
				//添加新部门窗口
				addWindow=new Ext.Window({
					title : "新建部门信息",
					height:200,
					width:1200,
					closeAction:'hide',
					resizable:false,
					items:[addForm]
				});
				
		/*-----------------------------------------------------------华丽的分割线----------------------------------------------------------------------*/
				updateForm = new Ext.form.FormPanel({
					labelWidth : 100,
					labelAlign : "right",
					frame : true,
					items : [{
						xtype : "panel",
						title : "",
						layout : "column",
						items : [{
									xtype : "panel",
									title : "",
									layout : "form",
									columnWidth : 0.25,
									defaultType : 'textfield',
									items : [{
												fieldLabel : "部门ID",
												id : "u_deptNo",
												name:'deptNo',
												anchor : "100%",
												allowBlank : false,
												maxLength : 6,
												maskRe : /\d/
											}, {
												xtype : "combo",
												fieldLabel : '是否生效',
												id : "u_flag",
												name:'flag',
												store : isStore,
												displayField : 'text',
												valueField : 'value',
												mode : 'local',
												triggerAction : 'all',
												value : "1"
											}, {
												fieldLabel : "电话",
												id : "u_phone",
												name:'phone',
												anchor : "100%"
											}, {
												fieldLabel : "渠道类型",
												id : "u_channelType",
												name:'channelType',
												anchor : "100%"
											}]
								}, {
									xtype : "panel",
									title : "",
									layout : "form",
									columnWidth : 0.25,
									defaultType : 'textfield',
									items : [{
												fieldLabel : "部门名称",
												id : "u_deptName",
												name:'deptName',
												anchor : "100%",
												allowBlank : false,
												maxLength : 64
											}, {
												fieldLabel : "路径编码",
												name:'pathCode',
												id : "u_pathCode",
												anchor : "100%"
											}, {
												fieldLabel : "传真",
												name:'fax',
												id : "u_fax",
												anchor : "100%"
											}, {
												fieldLabel : "子渠道类型",
												id : "u_subChannelType",
												name:'subChannelType',
												anchor : "100%"
											}]
								}, {
									xtype : "panel",
									title : "",
									layout : "form",
									columnWidth : 0.25,
									defaultType : 'textfield',
									items : [{
												id : "u_parentDeptNo",
												name:'parentDeptNo',
												hidden : true,
												hideLabel : true,
												allowBlank : false,
												maxLength : 6
											}, {
												fieldLabel : "父级部门",
												id : "u_parentDeptName",
												name:'parentDeptName',
												anchor : "100%",
												allowBlank : false,
												listeners : {
													focus : function() {
														var loader = new Ext.tree.TreeLoader(
																{
																	dataUrl : 'selectInfoDept.action'
																});

														loader.processResponse = function(
																response, node,
																callback) {
															var json = response.responseText;
															try {
																var json = Ext
																		.decode(response.responseText);
																// var json =
																// eval("("+json+")");
																node
																		.beginUpdate();
																// 从json中获得json数组，这里的key与Struts2返回的json对象中的key对应
																var o = json["infoDepts"];

																for (var i = 0, len = o.length; i < len; i++) {
																	var _node = {
																		id : o[i].deptNo,
																		text : o[i].deptName,
																		deptNo : o[i].deptNo,
																		deptName : o[i].deptName
																	};
																	var n = this
																			.createNode(_node);
																	if (n) {
																		node
																				.appendChild(n);
																	}
																}
																node
																		.endUpdate();
																if (typeof callback == "function") {
																	callback(
																			this,
																			node);
																}
															} catch (e) {
																this
																		.handleFailure(response);
															}
														}
														loader
																.on(
																		"beforeload",
																		function(
																				treeLoader,
																				node) {
																			loader.baseParams["infoDept.parentDeptNo"] = node.attributes.deptNo;
																		});
														var tree = new Ext.tree.TreePanel(
																{
																	loader : loader,
																	useArrows : false,
																	autoScroll : true,
																	containerScroll : true
																});
														var root = new Ext.tree.AsyncTreeNode(
																{
																	id : '100000',
																	text : '计费结算中心',
																	nodeType : 'async',
																	deptNo : '100000',
																	deptName : '计费结算中心'
																});
														tree.setRootNode(root);
														root.expand(false,
																false);

														var win = new Ext.Window(
																{
																	layout : 'fit',
																	width : 500,
																	height : 300,
																	closeAction : 'hide',
																	items : [tree],
																	buttons : [
																			{
																				text : '按钮',
																				handler : function() {
																					addForm.form
																							.findField("parentDeptNo")
																							.setValue(tree
																									.getSelectionModel()
																									.getSelectedNode().attributes.deptNo);
																					addForm.form
																							.findField("parentDeptName")
																							.setValue(tree
																									.getSelectionModel()
																									.getSelectedNode().attributes.deptName);
																					win
																							.close();

																				}
																			}]
																});
														win.show();
													}
												}
											}, {
												xtype : "combo",
												fieldLabel : '部门类型',
												id : "u_deptType",
												name:'deptType',
												store : isStore,
												displayField : 'text',
												valueField : 'value',
												mode : 'local',
												triggerAction : 'all',
												value : "1"
											}, {
												fieldLabel : "地址",
												name:'address',
												id : "u_address",
												anchor : "100%"
											}, {
												fieldLabel : "备注1",
												name:'resChar1',
												id : "u_resChar1",
												anchor : "100%"
											}]
								}, {
									xtype : "panel",
									title : "",
									layout : "form",
									columnWidth : 0.25,
									defaultType : "textfield",
									items : [{
												fieldLabel : "部门描述",
												id : "u_comments",
												name:'comments',
												anchor : "100%"
											}, {
												fieldLabel : "本地编码",
												id : "u_localNet",
												name:'localNet',
												anchor : "100%",
												value : "831"
											}, {
												fieldLabel : "区域编码",
												id : "u_areaId",
												name:'areaId',
												anchor : "100%"
											}, {
												fieldLabel : "备注2",
												id : "u_resChar2",
												name:'resChar2',
												anchor : "100%"
											}]
								}]
					}],
					buttons : [{
						text : '提交',
						handler : function() {
							// addForm.getForm().submit();
							var submitprefix = "infoDept";
							var paras = {};
							var fields = updateForm.findByType('textfield');
							Ext.each(fields, function(item, index, allItems) {
								var paraName = submitprefix ? submitprefix
										+ '.' + item.getName() : item.getName();
								paras[paraName] = item.getValue();
							});
							// alert(addForm.url)
							if (updateForm.getForm().isValid()) {
								invokeJava('updateInfoDept.action', paras);
								var _window=this.ownerCt.ownerCt.ownerCt;
								_window.hide();
								me.queryDeptInfo();
							}

						}
					}, {
						text : '重  置',
						handler : function() {
							addForm.form.reset();
						}
					}]
				});
				
				updateWindow=new Ext.Window({
					title : "更新部门信息",
					height:200,
					width:1200,
					closeAction:'hide',
					resizable:false,
					items:[updateForm]
				});
				

				// 总容器
				frame = new Ext.Panel({
							iconCls : 'silk-user',
							layout : 'form',
							width : '100%',
							height : '100%',
							title : '部门信息管理',
							border : false,
							items : [queryPanel, gridPanel]
						});

				if (contianerId) {
					frame.render(contianerId);
					// init grid height to frame height
					gridPanel
							.setHeight(Ext.get(contianerId).getHeight()
									- queryPanel.getHeight()
									- frame.header.getHeight());
				}
			}
		};
		return me
	}()

})();

Ext.onReady(function() {
			var InfoDept = com.wems.admin.userAdmin.InfoDeptManager;
			InfoDept.init('container');

		});