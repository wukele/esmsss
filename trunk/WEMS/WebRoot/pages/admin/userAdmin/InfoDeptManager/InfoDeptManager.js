

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
					}),// ���һ�����
			new Ext.grid.CheckboxSelectionModel(),// ���� CheckBox��ѡ����
			{
				header : '����ID',
				dataIndex : 'deptNo',
				sortable : true
			}, {
				header : '����',
				dataIndex : 'parentDeptNo',
				sortable : true,
				renderer : renderDeptName
			}, {
				header : '����',
				dataIndex : 'deptName',
				sortable : true
			}, {
				header : '����',
				dataIndex : 'comments',
				sortable : true
			}, {
				header : '·������',
				dataIndex : 'pathCode',
				sortable : true
			}, {
				header : '��������',
				dataIndex : 'deptType',
				sortable : true
			}, {
				header : '���ر���',
				dataIndex : 'localNet',
				sortable : true
			}, {
				header : '�绰',
				dataIndex : 'phone',
				sortable : true
			}, {
				header : '����',
				dataIndex : 'fax',
				sortable : true
			}, {
				header : '��ַ',
				dataIndex : 'address',
				sortable : true
			}, {
				header : '״̬',
				dataIndex : 'flag',
				sortable : true
			}, {
				header : '�������',
				dataIndex : 'areaId',
				sortable : true
			}, {
				header : '��������',
				dataIndex : 'channelType',
				sortable : true
			}, {
				header : '����������',
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

	// store.loadData(allInfoDepts);//����д��ҳ�޷���Ч
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
				displayMsg : '��ʾ��{0}����{1}����¼��һ��{2}��',
				emptyMsg : 'û�м�¼'
			});

	var tbar = new Ext.Toolbar(['-', {
				text : '��������',
				handler : function() {
					tab2.title = "��������";
					tabs.add(tab2).show();
					addForm.form.reset();
					addForm.url = "insertInfoDept.action";
					addForm.form.findField("deptNo").getEl().dom.readOnly = false;
				}
			}, '-', {
				text : '�޸Ĳ���',
				handler : function() {
					// alert(grid.getSelectionModel().getSelections()[0].data.deptNo);
					var length = grid.getSelectionModel().getSelections().length;
					if (length != 1) {
						Ext.Msg.alert("��ʾ", "��Ҫѡ������һ������!");
						return;
					}
					var deptNo = grid.getSelectionModel().getSelections()[0].data.deptNo;
					// alert(deptNo);
					// �õ��ò��ŵ�����
					tab2.title = "�޸Ĳ�����Ϣ";
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
				text : 'ɾ������',
				handler : function() {
					var length = grid.getSelectionModel().getSelections().length;
					if (length != 1) {
						Ext.Msg.alert("��ʾ", "��Ҫѡ������һ������!");
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
		title : '��ѯ����',
		frame : true,
		// url:'selectInfoDept.action',
		layout : 'column',
		items : [{
					columnWidth : .3,
					layout : 'form',
					defaultType : 'textfield',
					items : [{
								fieldLabel : '����ID',
								name : 'deptNo'
							}]
				}, {
					columnWidth : .3,
					layout : 'form',
					defaultType : 'textfield',
					items : [{
								fieldLabel : '��������',
								name : 'deptName'
							}]
				}, {

					items : [new Ext.Panel({
						layout : 'table',
						buttonAlign : 'center',
						buttons : [{
							text : '��  ѯ',
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
							text : '��  ��',
							handler : function() {

								Ext.getCmp('qryForm').form.reset();
							}
						}]
					})]
				}]
	});
	var isStore = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : [['0', '��Ч'], ['1', 'ʧЧ']]
			});

	var addForm = new Ext.form.FormPanel({
		title : "�½�������Ϣ",
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
									fieldLabel : "����ID",
									name : "deptNo",
									anchor : "100%",
									allowBlank : false,
									maxLength : 6,
									maskRe : /\d/
								}, {
									xtype : "combo",
									fieldLabel : '�Ƿ���Ч',
									name : "flag",
									store : isStore,
									displayField : 'text',
									valueField : 'value',
									mode : 'local',
									triggerAction : 'all',
									value : "1"
								}, {
									fieldLabel : "�绰",
									name : "phone",
									anchor : "100%"
								}, {
									fieldLabel : "��������",
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
									fieldLabel : "��������",
									name : "deptName",
									anchor : "100%",
									allowBlank : false,
									maxLength : 64
								}, {
									fieldLabel : "·������",
									name : "pathCode",
									anchor : "100%"
								}, {
									fieldLabel : "����",
									name : "fax",
									anchor : "100%"
								}, {
									fieldLabel : "����������",
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
									fieldLabel : "��������",
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
													// ��json�л��json���飬�����key��Struts2���ص�json�����е�key��Ӧ
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
														text : '�Ʒѽ�������',
														nodeType : 'async',
														deptNo : '100000',
														deptName : '�Ʒѽ�������'
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
													text : '��ť',
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
									fieldLabel : '��������',
									name : "deptType",
									store : isStore,
									displayField : 'text',
									valueField : 'value',
									mode : 'local',
									triggerAction : 'all',
									value : "1"
								}, {
									fieldLabel : "��ַ",
									name : "address",
									anchor : "100%"
								}, {
									fieldLabel : "��ע1",
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
									fieldLabel : "��������",
									name : "comments",
									anchor : "100%"
								}, {
									fieldLabel : "���ر���",
									name : "localNet",
									anchor : "100%",
									value : "831"
								}, {
									fieldLabel : "�������",
									name : "areaId",
									anchor : "100%"
								}, {
									fieldLabel : "��ע2",
									name : "resChar2",
									anchor : "100%"
								}]
					}]
		}],
		buttons : [{
			text : '�ύ',
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
			text : '��  ��',
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
				title : "���Ų�ѯ�б�",
				items : [viewpoint],
				closable : false
			});
	var tab2 = tabs.add({
				closeAction : 'hide',
				id : Ext.id(),
				title : "��������",
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
						resp.msg = "����ɹ�!";
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