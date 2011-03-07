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
			removeUser : function() {// ɾ��
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("ע��", "����ѡ��һ����¼");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstUserNo[' + i + ']'] = selectedRecords[i].data.operNo;
				}

				// ɾ��
				Ext.Ajax.request({
							url : 'removeUser.action',
							method : 'post',
							params : paras,
							success : function(xhq, status) {
								var ret = Ext.util.JSON
										.decode(xhq.responseText);
								if (xhq.responseText == null)
									return;

								// ʧ��
								if (ret.returnNo > 0) {
									Ext.example.msg('ʧ��', 'ʧ��ԭ��:'
													+ ret.returnMsg);
									return;
								}
								// �ɹ�
								store.remove(selectedRecords);

								Ext.example.msg('�ɹ�', ret.returnMsg);
							}
						});
			},
			// ʧЧ
			invaildateUser : function() {
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("ע��", "����ѡ��һ����¼");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstUserNo[' + i + ']'] = selectedRecords[i].data.operNo;
				}

				// ʧЧ
				Ext.Ajax.request({
							url : 'invalidateUser.action',
							method : 'post',
							params : paras,
							success : function(xhq, status) {
								var ret = Ext.util.JSON
										.decode(xhq.responseText);
								if (xhq.responseText == null)
									return;

								// ʧ��
								if (ret.returnNo > 0) {
									Ext.example.msg('ʧ��', 'ʧ��ԭ��:'
													+ ret.returnMsg);
									return;
								}
								// �ɹ�
								for (i = 0; i < selectedRecords.length; i++) {
									selectedRecords[i].data.flag = STATUS_NOT_ACTIVE;
									selectedRecords[i].commit();
								}

								Ext.example.msg('�ɹ�', ret.returnMsg);
							}
						});
			},
			// ��Ч
			vaildateUser : function() {
				var paras = {};
				var selectedRecords = sm.getSelections();

				if (selectedRecords == null || selectedRecords.length == 0)
					Ext.example.msg("ע��", "����ѡ��һ����¼");

				for (i = 0; i < selectedRecords.length; i++) {
					paras['lstUserNo[' + i + ']'] = selectedRecords[i].data.operNo;
				}

				// ��Ч
				Ext.Ajax.request({
							url : 'validateUser.action',
							method : 'post',
							params : paras,
							success : function(xhq, status) {
								var ret = Ext.util.JSON
										.decode(xhq.responseText);
								if (xhq.responseText == null)
									return;

								// ʧ��
								if (ret.returnNo > 0) {
									Ext.example.msg('ʧ��', 'ʧ��ԭ��:'
													+ ret.returnMsg);
									return;
								}
								// �ɹ�
								for (i = 0; i < selectedRecords.length; i++) {
									selectedRecords[i].data.flag = STATUS_ACTIVE;
									selectedRecords[i].commit();
								}

								Ext.example.msg('�ɹ�', ret.returnMsg);
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
										dataIndex : 'operPwd',
										renderer : function(val) {
											if (val)
												return val.replace(/\w*/,
														'******');
										}
									}, {
										header : '�Ա�',
										dataIndex : 'gender',
										renderer : function(val) {
											if (val == 1)
												return '��';
											else
												return 'Ů';
										}
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
									}, {
										header : '�Ƿ���Ч',
										dataIndex : 'flag',
										renderer : function(val) {
											if (val == STATUS_NOT_ACTIVE)
												return '��Ч';
											else
												return '��Ч';
										}
									}],
							defaults : {
								sortable : true
							}
						});

				// ��ѯ���
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
											fieldLabel : '�û���',
											name : 'operNo',
											maxLength : 10,
											maxLengthText : '����10λ'
										}]
							}, {
								xtype : 'panel',
								layout : 'form',
								columnWidth:.2,
								items : [{
											xtype : 'textfield',
											width : 120,
											fieldLabel : '�û�����',
											name : 'operName',
											maxLength : 60,
											maxLengthText : '����60λ'
										}]
							}, {  //״̬��̨��ȡ
								xtype : 'panel',
								layout : 'form',
								columnWidth:.1,
								labelWidth:30,
								items : [{
									xtype : 'combo',
									width : 60,
									fieldLabel : '״̬',
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
								text : '��ѯ',
								width:80,
								handler : this.queryUser
								// ��ѯ�û�����
						}]
				});

				grid = new Ext.grid.GridPanel({
							store : store,
							title : '�û���ͼ',
							sm : sm,
							cm : cm,
							border : true,
							viewConfig : {
								autoFill : true
							},
							tbar : [{
										xtype : 'button',
										name : 'btnAddUser',
										text : '���',
										handler : function() {
											// ����û�����
											// @add ffmmx
											var addWindow = UserAddCt
													.getAddWindow();

											addWindow.show();
										}
									}, '-', {
										xtype : 'button',
										name : 'btnRemoveUser',
										text : 'ɾ��',
										handler : function() {
											me.removeUser();
										}
									}, '-', {
										xtype : 'button',
										name : 'btnInvaidateUser',
										text : 'ʧЧ',
										handler : function() {
											me.invaildateUser();
										}
									}, '-', {
										xtype : 'button',
										name : 'btnVaidateUser',
										text : '��Ч',
										handler : function() {
											me.vaildateUser();
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

				// ���˫���޸ġ���
				grid.on('rowdblclick', function(gridPanel, rowIndex, e) {
							var selectedRecord = gridPanel.getSelectionModel()
									.getSelected();
							var modifyWindow = UserAddCt
									.getModifyWindow(selectedRecord);
							modifyWindow.show();
						});

				// ������
				frame = new Ext.Panel({
							iconCls : 'silk-user',
							layout : 'form',
							width : '100%',
							height : '100%',
							title : '�û�����',
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