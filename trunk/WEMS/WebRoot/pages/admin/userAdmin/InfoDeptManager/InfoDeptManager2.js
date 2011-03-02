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
								header : '����ID',
								dataIndex : 'deptNo'
							}, {
								header : '����',
								dataIndex : 'parentDeptNo'
							}, {
								header : '��������',
								dataIndex : 'deptName'
							}, {
								header : '����',
								dataIndex : 'comments'
							}, {
								header : '·������',
								dataIndex : 'pathCode'
							}, {
								header : '��������',
								dataIndex : 'deptType'
							}, {
								header : '���ر���',
								dataIndex : 'localNet'
							}, {
								header : '�绰',
								dataIndex : 'phone'
							}, {
								header : '����',
								dataIndex : 'fax'
							}, {
								header : '��ַ',
								dataIndex : 'address'
							}, {
								header : '״̬',
								dataIndex : 'flag'
							}, {
								header : '�������',
								dataIndex : 'areaId'
							}, {
								header : '��������',
								dataIndex : 'channelType'
							}, {
								header : '����������',
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
						Ext.example.msg('Success', '���Ų����ɹ�');
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

				// ��ѯ���
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
													fieldLabel : '����ID',
													name : 'deptNo'
												}]
									}, {
										xtype : 'panel',
										columnWidth : .3,
										layout : 'form',
										items : [{
													xtype : 'textfield',
													fieldLabel : '��������',
													name : 'deptName'
												}]
									}, {
										xtype : 'button',
										width : 80,
										text : '��ѯ',
										handler : function() {
											me.queryDeptInfo();
										}
									}, {
										xtype : 'button',
										width : 80,
										text : '����',
										handler : function() {
											Ext.getCmp('queryPanel').form
													.reset();
										}
									}]
						});
				// ��ѯ������
				gridPanel = new Ext.grid.GridPanel({
							height : 100,
							store : store,
							sm : sm,
							cm : cm,
							tbar : [{
										xtype : 'button',
										text : '��������',
										handler : function() {
											addWindow.show();
										}
									}, '-', {
										xtype : 'button',
										text : '�޸Ĳ���',
										handler : function() {
											var selectedRecords = sm.getSelections();
											var length = selectedRecords.length;
											if (length != 1) {
												Ext.example.msg("��ʾ", "��Ҫѡ������һ������!");
												return;
											}else if(length>1){
												Ext.example.msg("��ʾ",'����ֻ��ѡ��һ������')
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
										text : 'ɾ������',
										handler : function() {
											var selectedRecords = sm.getSelections();
											var length = selectedRecords.length;
											if (length != 1) {
												Ext.example.msg("��ʾ", "��Ҫѡ������һ������!");
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
														Ext.example.msg('ɾ��ʧ��', 'ʧ��ԭ��:'
																			+ res.msg);
														return;
													}else{
														Ext.example.msg('ɾ���ɹ�','ɾ���ɹ�');
														
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
										displayMsg : '��ʾ�� {0} ���� {1} ����¼��һ�� {2} ��',
										emptyMsg : 'û�м�¼'
									})

						});
				
						
						
				var isStore = new Ext.data.SimpleStore({
							fields : ['value', 'text'],
							data : [['0', '��Ч'], ['1', 'ʧЧ']]
						});
				// �²���������
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
																	text : '�Ʒѽ�������',
																	nodeType : 'async',
																	deptNo : '100000',
																	deptName : '�Ʒѽ�������'
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
				//����²��Ŵ���
				addWindow=new Ext.Window({
					title : "�½�������Ϣ",
					height:200,
					width:1200,
					closeAction:'hide',
					resizable:false,
					items:[addForm]
				});
				
		/*-----------------------------------------------------------�����ķָ���----------------------------------------------------------------------*/
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
												fieldLabel : "����ID",
												id : "u_deptNo",
												name:'deptNo',
												anchor : "100%",
												allowBlank : false,
												maxLength : 6,
												maskRe : /\d/
											}, {
												xtype : "combo",
												fieldLabel : '�Ƿ���Ч',
												id : "u_flag",
												name:'flag',
												store : isStore,
												displayField : 'text',
												valueField : 'value',
												mode : 'local',
												triggerAction : 'all',
												value : "1"
											}, {
												fieldLabel : "�绰",
												id : "u_phone",
												name:'phone',
												anchor : "100%"
											}, {
												fieldLabel : "��������",
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
												fieldLabel : "��������",
												id : "u_deptName",
												name:'deptName',
												anchor : "100%",
												allowBlank : false,
												maxLength : 64
											}, {
												fieldLabel : "·������",
												name:'pathCode',
												id : "u_pathCode",
												anchor : "100%"
											}, {
												fieldLabel : "����",
												name:'fax',
												id : "u_fax",
												anchor : "100%"
											}, {
												fieldLabel : "����������",
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
												fieldLabel : "��������",
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
																	text : '�Ʒѽ�������',
																	nodeType : 'async',
																	deptNo : '100000',
																	deptName : '�Ʒѽ�������'
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
												fieldLabel : '��������',
												id : "u_deptType",
												name:'deptType',
												store : isStore,
												displayField : 'text',
												valueField : 'value',
												mode : 'local',
												triggerAction : 'all',
												value : "1"
											}, {
												fieldLabel : "��ַ",
												name:'address',
												id : "u_address",
												anchor : "100%"
											}, {
												fieldLabel : "��ע1",
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
												fieldLabel : "��������",
												id : "u_comments",
												name:'comments',
												anchor : "100%"
											}, {
												fieldLabel : "���ر���",
												id : "u_localNet",
												name:'localNet',
												anchor : "100%",
												value : "831"
											}, {
												fieldLabel : "�������",
												id : "u_areaId",
												name:'areaId',
												anchor : "100%"
											}, {
												fieldLabel : "��ע2",
												id : "u_resChar2",
												name:'resChar2',
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
						text : '��  ��',
						handler : function() {
							addForm.form.reset();
						}
					}]
				});
				
				updateWindow=new Ext.Window({
					title : "���²�����Ϣ",
					height:200,
					width:1200,
					closeAction:'hide',
					resizable:false,
					items:[updateForm]
				});
				

				// ������
				frame = new Ext.Panel({
							iconCls : 'silk-user',
							layout : 'form',
							width : '100%',
							height : '100%',
							title : '������Ϣ����',
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