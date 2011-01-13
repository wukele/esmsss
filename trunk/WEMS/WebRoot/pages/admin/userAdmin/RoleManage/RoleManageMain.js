/**
 * RoleManageMain.js ��ɫ������Ϣ����
 * 
 * @author ffmmx
 * @since 10.12.28
 */

(function() {
	Ext.ns("com.wems.admin.userAdmin");
	// ��ɫ��Ϣ����
	com.wems.admin.userAdmin.RoleManage = function() {
		var frame;// ������
		var qryPanel;// ��ѯ���
		var rolePanel;// ��ɫ���
		var window;// �����޸Ĵ���
		var store;// ��ɫ�б�

		var statusStore;// ����״̬
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
				window.setTitle('�޸Ľ�ɫ');
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
				window.setTitle('��ӽ�ɫ');
				var btnOk = window.getFooterToolbar().findById('ok');
				btnOk.handler = this.addRole;
				return window;
			},
			removeRole : function() {// ɾ��
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("ע��", "����ѡ��һ����¼");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstRoleCode['+i+']'] = selectedRecords[i].data.roleCode;
				}

				// ɾ��
				Ext.Ajax.request({
					url : 'removeRole.action',
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
						store.remove(selectedRecords);

						Ext.example.msg('�ɹ�', ret.returnMsg);
					}
				});
			},
			// ʧЧ
			invaildateRole : function() {
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("ע��", "����ѡ��һ����¼");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstRoleCode['+i+']'] = selectedRecords[i].data.roleCode;
				}

				// ʧЧ
				Ext.Ajax.request({
					url : 'invalidateRole.action',
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
						for(i=0;i<selectedRecords.length;i++){
							selectedRecords[i].data.isactive=STATUS_NOT_ACTIVE;
							selectedRecords[i].commit();
						}

						Ext.example.msg('�ɹ�', ret.returnMsg);
					}
				});
			},
			// ��Ч
			vaildateRole : function() {
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("ע��", "����ѡ��һ����¼");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstRoleCode['+i+']'] = selectedRecords[i].data.roleCode;
				}

				// ��Ч
				Ext.Ajax.request({
					url : 'validateRole.action',
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
						for(i=0;i<selectedRecords.length;i++){
							selectedRecords[i].data.isactive=STATUS_ACTIVE;
							selectedRecords[i].commit();
						}

						Ext.example.msg('�ɹ�', ret.returnMsg);
					}
				});
			},
			// �޸�
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
				// ��֤
				isFieldsValidated = true;
				for (i = 0; i < allFields.length; i++) {
					isFieldsValidated = isFieldsValidated
							&& allFields[i].validate();
				}
				if (isFieldsValidated) {
					// �޸�
					Ext.Ajax.request({
						url : 'modifyRole.action',
						method : 'post',
						params : paras,
						success : function(xhq, status) {
							var ret = Ext.util.JSON
							.decode(xhq.responseText);
							if (xhq.responseText == null)
								return;

							// �޸�ʧ��
							if (ret.returnNo > 0) {
								Ext.example.msg('ʧ��', 'ʧ��ԭ��:' + ret.returnMsg);
								return;
							}
							// �޸ĳɹ�
							rec.data = data;
							rec.commit();

							Ext.example.msg('�ɹ�', ret.returnMsg);
						}
					});
					window.hide();
				}
			},
			// ���
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
								// ʧ��
								if (ret.returnNo != 0) {
									Ext.example.msg('ע��', ret.returnMsg);
									return;
								}
								Ext.example.msg('�ɹ�', ret.returnMsg);
								// ��ӳɹ�
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
			// ��ѯ
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
					params : paras,
					fields : fieldModel,
					idProperty : 'roleCode',
					root : 'lstRole'
				});
			},
			init : function(contianerId) {
				// ��ʼ������״̬
				statusStore = new Ext.data.SimpleStore({
					fields : [ 'key', 'name' ],
					data : [ [ STATUS_ACTIVE, '��Ч' ], [ STATUS_NOT_ACTIVE, '��Ч' ] ],
					id : 'status'
				});
				// ��ʼ�����/�޸Ĵ�������
				window = new Ext.Window({
					title : '����û�',
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
						fieldLabel : '��ɫ����',
						name : 'roleCode',
						allowBlank : false,
						blankText : '��ɫ���Ų���Ϊ��',
						maxLength : 6,
						maxLengthText : '��ɫ��������6λ'
					}, {
						id : 'roleName',
						fieldLabel : '��ɫ����',
						name : 'roleName',
						allowBlank : false,
						blankText : '��ɫ���ƲŲ���Ϊ��',
						maxLength : 32,
						maxLengthText : '����32λ'
					}, {
						id : 'roleLevel',
						fieldLabel : '��ɫ�ȼ�',
						name : 'roleLevel',
						allowBlank : false,
						blankText : '��ɫ���ƲŲ���Ϊ��',
						maxLength : 6,
						maxLengthText : '��ɫ�ȼ�����6λ'
					}, {
						id : 'roleType',
						fieldLabel : '��ɫ����',
						name : 'roleType',
						maxLength : 6,
						maxLengthText : '��ɫ��������6λ'
					}, {
						fieldLabel : '״̬',
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
						text : 'ȷ��'
					}, {
						xtype : 'button',
						id : 'cancel',
						name : 'cancel',
						text : 'ȡ��',
						handler : function() {
							window.hide();
						}
					} ]
				});
				// ��ʼ����ɫ��ѯ�洢
				paras={};
				paras[submitprefix?submitprefix+'.'+'isactive':'isactive']=STATUS_ACTIVE;
				
				store = new Ext.data.JsonStore({
					proxy : new Ext.data.HttpProxy({
						url : 'qryRole.action'
					}),
					params:paras,
					fields : fieldModel,
					idProperty : 'roleCode',
					root : 'lstRole'
				});
				store.load();
				// ��ѯ���
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
							fieldLabel : '��ɫ����',
							name : 'roleCode',
							maxLength : 10,
							maxLengthText : '����10λ',
							rightPadding : .20
						} ]
					}, {
						xtype : 'panel',
						columnWidth : .25,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							width : 160,
							fieldLabel : '��ɫ����',
							name : 'roleName',
							maxLength : 60,
							maxLengthText : '����60λ',
							rightPadding : .20
						} ]
					}, {
						xtype : 'panel',
						columnWidth : .25,
						layout : 'form',
						items : [ {
							width : 160,
							fieldLabel : '״̬',
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
						text : '��ѯ',
						handler : function() {
							// ��ѯ�û�����
							me.queryRole();
						}
					} ]
				});

				cm = new Ext.grid.ColumnModel({
					columns : [ new Ext.grid.RowNumberer(), sm, {
						id : 'roleCode',
						header : '��ɫ����',
						dataIndex : 'roleCode'
					}, {
						header : '��ɫ����',
						dataIndex : 'roleName'
					}, {
						header : '��ɫ�ȼ�',
						dataIndex : 'roleLevel'
					}, {
						header : '��ɫ����',
						dataIndex : 'roleType'
					}, {
						header : '��ע',
						dataIndex : 'comments'
					}, {
						header : '����޸��û�',
						dataIndex : 'operNo'
					}, {
						header : '״̬',
						dataIndex : 'isactive',
						renderer : function(val) {
							if (val == 1)
								return '��Ч';
							else if (val == 0)
								return '��Ч';
						}
					} ],
					defaults : {
						defaultWidth : 200,
						sortable : true
					}
				});

				// ��ɫ��ͼ
				rolePanel = new Ext.grid.GridPanel({
					store : store,
					title : '��ɫ��ͼ',
					sm : sm,
					cm : cm,
					border:false,
					height:350,
					viewConfig : {
						autoFill : true
					},
					tbar : [ {
						xtype : 'button',
						name : 'btnAddRole',
						text : '���',
						handler : function() {
							// ��ӽ�ɫ��������
							var addWindow = me.getAddWindow();
							addWindow.show();
						}
					}, {
						xtype : 'button',
						name : 'btnRemoveInvalidateRole',
						text : 'ɾ��',
						handler : function() {
							// ɾ����ɫ
							me.removeRole();
						}
					}, {
						xtype : 'button',
						name : 'btnInvaildateRole',
						text : 'ʧЧ',
						handler : function() {
							me.invaildateRole();
						}
					}, {
						xtype : 'button',
						name : 'btnInvaildateRole',
						text : '��Ч',
						handler : function() {
							me.vaildateRole();
						}
					} ]

				});
				// ���˫���޸ġ���
				rolePanel.on('rowdblclick', function(gridPanel, rowIndex, e) {
					var selectedRecord = gridPanel.getSelectionModel()
							.getSelected();
					var modifyWindow = me.getModifyWindow(selectedRecord);
					modifyWindow.show();
				});

				// ������
				frame = new Ext.Panel({
					iconCls : 'silk-user',
					layout : 'form',
					width : '100%',
					heigth : '100%',
					title : '��ɫ����',
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