

Ext.onReady(function() {

	var data = [['1', 'male', 'name1', 'descn1'],
			['2', 'female', 'name2', 'descn2'],
			['3', 'male', 'name3', 'descn3'],
			['4', 'female', 'name4', 'descn4'],
			['5', 'male', 'name5', 'descn5']];
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
						header : "",
						width : 30,
						align : "center"
					}),// 添加一个编号
			new Ext.grid.CheckboxSelectionModel(),// 增加 CheckBox多选框列
			{
				header : '部门ID',
				dataIndex : 'deptNo',
				sortable : true
			}, {
				header : '父级',
				dataIndex : 'parentDeptNo',
				sortable : true,
				renderer : renderDeptName
			}, {
				header : '名称',
				dataIndex : 'deptName',
				sortable : true
			}, {
				header : '描述',
				dataIndex : 'comments',
				sortable : true
			}, {
				header : '路径编码',
				dataIndex : 'pathCode',
				sortable : true
			}, {
				header : '部门类型',
				dataIndex : 'deptType',
				sortable : true
			}, {
				header : '本地编码',
				dataIndex : 'localNet',
				sortable : true
			}, {
				header : '电话',
				dataIndex : 'phone',
				sortable : true
			}, {
				header : '传真',
				dataIndex : 'fax',
				sortable : true
			}, {
				header : '地址',
				dataIndex : 'address',
				sortable : true
			}, {
				header : '状态',
				dataIndex : 'flag',
				sortable : true
			}, {
				header : '区域编码',
				dataIndex : 'areaId',
				sortable : true
			}, {
				header : '渠道类型',
				dataIndex : 'channelType',
				sortable : true
			}, {
				header : '子渠道类型',
				dataIndex : 'subChannelType',
				sortable : true
			}]);
	var allInfoDepts = ajaxSyncCall("selectInfoDept.action").infoDepts;
	// alert(allInfoDepts)
	var store = new Ext.data.Store({
				/*
				 * proxy:new Ext.data.HttpProxy({ url:'selectInfoDept.action'
				 * }),
				 */
				proxy : new Ext.data.PagingMemoryProxy(allInfoDepts),
				/*
				 * reader:new
				 * Ext.data.JsonReader({root:'infoDepts',totalProperty:'totalProperty'},[
				 */
				reader : new Ext.data.JsonReader({}, [{
									name : 'deptNo'
								}, {
									name : 'parentDeptNo'
								}, {
									name : 'deptName'
								}, {
									name : 'comments'
								}, {
									name : 'pathCode'
								}, {
									name : 'deptType'
								}, {
									name : 'localNet'
								}, {
									name : 'phone'
								}, {
									name : 'fax'
								}, {
									name : 'address'
								}, {
									name : 'flag'
								}, {
									name : 'areaId'
								}, {
									name : 'channelType'
								}, {
									name : 'subChannelType'
								}]),
				idProperty : 'deptNo',
				sortInfo : {
					field : "deptNo",
					direction : "asc"
				}
			});

	// store.loadData(allInfoDepts);//这样写分页无法生效
	store.load({
				params : {
					start : 0,
					limit : 10
				}
			});
	var bbar = new Ext.PagingToolbar({
				pageSize : 10,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录，一共{2}条',
				emptyMsg : '没有记录'
			});

	var tbar = new Ext.Toolbar(['-', {
				text : '新增部门',
				handler : function() {
					tab2.title = "新增部门";
					tabs.add(tab2).show();
					addForm.form.reset();
					addForm.url = "insertInfoDept.action";
					addForm.form.findField("deptNo").getEl().dom.readOnly = false;
				}
			}, '-', {
				text : '修改部门',
				handler : function() {
					// alert(grid.getSelectionModel().getSelections()[0].data.deptNo);
					var length = grid.getSelectionModel().getSelections().length;
					if (length != 1) {
						Ext.Msg.alert("提示", "需要选择其中一行数据!");
						return;
					}
					var deptNo = grid.getSelectionModel().getSelections()[0].data.deptNo;
					// alert(deptNo);
					// 得到该部门的数据
					tab2.title = "修改部门信息";
					tabs.add(tab2).show();
					addForm.form.reset();
					addForm.url = "updateInfoDept.action";
					var paras = {};
					paras["infoDept.deptNo"] = deptNo;
					Ext.Ajax.request({
						url : "selectInfoDept.action",
						method : 'post',
						params : paras,
						success : function(response) {
							var resp = Ext.decode(response.responseText);
							var ret = resp.ret;
							addForm.form.findField("deptNo")
									.setValue(resp.infoDepts[0].deptNo);
							addForm.form.findField("deptName")
									.setValue(resp.infoDepts[0].deptName);
							addForm.form.findField("parentDeptNo")
									.setValue(resp.infoDepts[0].parentDeptNo);
							addForm.form
									.findField("parentDeptName")
									.setValue(renderDeptName(resp.infoDepts[0].parentDeptNo));
							addForm.form.findField("comments")
									.setValue(resp.infoDepts[0].comments);
							addForm.form.findField("flag")
									.setValue(resp.infoDepts[0].flag);
							addForm.form.findField("pathCode")
									.setValue(resp.infoDepts[0].pathCode);
							addForm.form.findField("deptType")
									.setValue(resp.infoDepts[0].deptType);
							addForm.form.findField("localNet")
									.setValue(resp.infoDepts[0].localNet);
							addForm.form.findField("phone")
									.setValue(resp.infoDepts[0].phone);
							addForm.form.findField("fax")
									.setValue(resp.infoDepts[0].fax);
							addForm.form.findField("address")
									.setValue(resp.infoDepts[0].address);
							addForm.form.findField("areaId")
									.setValue(resp.infoDepts[0].areaId);
							addForm.form.findField("channelType")
									.setValue(resp.infoDepts[0].channelType);
							addForm.form.findField("subChannelType")
									.setValue(resp.infoDepts[0].subChannelType);
							addForm.form.findField("resChar1")
									.setValue(resp.infoDepts[0].resChar1);
							addForm.form.findField("resChar2")
									.setValue(resp.infoDepts[0].resChar2);
							// alert(addForm.form.findField("deptNo").getEl().dom)
							addForm.form.findField("deptNo").setReadOnly(true);
						},

						failure : function(response, action) {
							Ext.Msg.alert('Failure',
									'Ajax communication failed');
							return "1";
						}
					});

				}
			}, '-', {
				text : '删除部门',
				handler : function() {
					var length = grid.getSelectionModel().getSelections().length;
					if (length != 1) {
						Ext.Msg.alert("提示", "需要选择其中一行数据!");
						return;
					}
					var deptNo = grid.getSelectionModel().getSelections()[0].data.deptNo;
					var paras = {};
					paras["infoDept.deptNo"] = deptNo;
					ajaxSyncCall('deleteInfoDept.action', "infoDept.deptNo="
									+ deptNo);
					paras = getFormParams(qryForm, "infoDept")
					paras.limit = 10;
					paras.start = 0;
					var allInfoDepts = ajaxSyncCall("selectInfoDept.action",
							"infoDept.deptNo=" + paras["infoDept.deptNo"] + "&"
									+ "infoDept.deptName="
									+ paras["infoDept.deptName"]).infoDepts;
					store.proxy = new Ext.data.PagingMemoryProxy(allInfoDepts);
					store.reload({
								params : paras
							});
					// store.reload({params:{start:0,limit:10}});
				}

			}, '-']);
	var grid = new Ext.grid.GridPanel({
				stripeRows : true,
				loadMask : true,
				autoHeight : true,
				selModel : new Ext.grid.RowSelectionModel({
							singleSelect : false
						}),
				// renderTo:'container',
				store : store,
				cm : cm,
				bbar : bbar,
				tbar : tbar,
				viewConfig : {
					forceFit : true
				},
				listeners : {
					rowclick : function(e) {
						// Ext.Msg.alert('click','click');
					},
					rowdblclick : function(g, rIdx, e) {
						// alert('double click');
					}
				}
			});

	var qryForm = new Ext.form.FormPanel({
		id : 'qryForm',
		title : '查询条件',
		frame : true,
		// url:'selectInfoDept.action',
		layout : 'column',
		items : [{
					columnWidth : .3,
					layout : 'form',
					defaultType : 'textfield',
					items : [{
								fieldLabel : '部门ID',
								name : 'deptNo'
							}]
				}, {
					columnWidth : .3,
					layout : 'form',
					defaultType : 'textfield',
					items : [{
								fieldLabel : '部门名称',
								name : 'deptName'
							}]
				}, {

					items : [new Ext.Panel({
						layout : 'table',
						buttonAlign : 'center',
						buttons : [{
							text : '查  询',
							handler : function() {
								var paras = getFormParams(qryForm, "infoDept");
								paras["start"] = 0;
								paras["limit"] = 10;
								var allInfoDepts = ajaxSyncCall(
										"selectInfoDept.action",
										"infoDept.deptNo="
												+ paras["infoDept.deptNo"]
												+ "&" + "infoDept.deptName="
												+ paras["infoDept.deptName"]).infoDepts;
								store.proxy = new Ext.data.PagingMemoryProxy(allInfoDepts);
								store.reload({
											params : paras
										});
							}
						}, {
							text : '重  置',
							handler : function() {

								Ext.getCmp('qryForm').form.reset();
							}
						}]
					})]
				}]
	});
	var isStore = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : [['0', '生效'], ['1', '失效']]
			});

	var addForm = new Ext.form.FormPanel({
		title : "新建部门信息",
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
													response, node, callback) {
												var json = response.responseText;
												try {
													var json = Ext
															.decode(response.responseText);
													// var json =
													// eval("("+json+")");
													node.beginUpdate();
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
															node.appendChild(n);
														}
													}
													node.endUpdate();
													if (typeof callback == "function") {
														callback(this, node);
													}
												} catch (e) {
													this
															.handleFailure(response);
												}
											}
											loader.on("beforeload", function(
													treeLoader, node) {
												loader.baseParams["infoDept.parentDeptNo"] = node.attributes.deptNo;
											});
											var tree = new Ext.tree.TreePanel({
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
											root.expand(false, false);

											var win = new Ext.Window({
												layout : 'fit',
												width : 500,
												height : 300,
												closeAction : 'hide',
												items : [tree],
												buttons : [{
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
														win.close();

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
							var paraName = submitprefix ? submitprefix + '.'
									+ item.getName() : item.getName();
							paras[paraName] = item.getValue();
						});
				// alert(addForm.url)
				if (addForm.getForm().isValid()) {
					invokeJava(addForm.url, paras);
				}

			}
		}, {
			text : '重  置',
			handler : function() {
				addForm.form.reset();
			}
		}]
	});

	var viewpoint = new Ext.Panel({
				layout : 'auto',
				renderTo:'container',
				items : [qryForm, grid]
			});

	

	var tabs = new Ext.TabPanel({
				autoDestroy : false,
				//renderTo : 'container',
				listeners : {
					activate : function(tab) {
						tab.getUpdater().refresh();
					}
				}

			});
	var tab1 = tabs.add({
				id : Ext.id(),
				title : "部门查询列表",
				items : [viewpoint],
				closable : false
			});
	var tab2 = tabs.add({
				closeAction : 'hide',
				id : Ext.id(),
				title : "新增部门",
				items : [addForm],
				closable : true
			});

	tabs.remove(tab2);

	tabs.activate(0);
		// alert(tab2.hide())
});

function invokeJava(url, paras) {
	Ext.Ajax.request({
				url : url,
				method : 'post',
				params : paras,
				success : function(response) {
					var resp = Ext.decode(response.responseText);
					var ret = resp.ret;
					if (resp.msg == null || resp.msg == "") {
						resp.msg = "处理成功!";
					}
					if (ret == 0) {
						Ext.Msg.alert('Success', resp.msg);
					} else {
						Ext.Msg.alert('Failure', "" + resp.msg);
					}

				},

				failure : function(response, action) {
					Ext.Msg.alert('Failure', 'Ajax communication failed');
					return "1";
				}
			});

}
function renderDeptName(value) {
	if (value != null && value.length > 0) {
		var resp = ajaxSyncCall("selectInfoDept.action", "infoDept.deptNo="
						+ value);
		if (resp.infoDepts.length > 0) {
			return resp.infoDepts[0].deptName;
		} else {
			return "";
		}

	}
}
function ajaxSyncCall(urlStr, paramsStr) {
	var obj;
	var value;
	if (window.ActiveXObject) {
		obj = new ActiveXObject('Microsoft.XMLHTTP');
	} else if (window.XMLHttpRequest) {
		obj = new XMLHttpRequest();
	}
	obj.open('POST', urlStr, false);
	obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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