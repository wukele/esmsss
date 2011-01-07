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

		var STATUS_ACTIVE=0;
		var STATUS_NOT_ACTIVE=1;
		
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
		
		var me = {
				removeUser : function() {// ɾ��
					var paras = {};
					var selectedRecords = sm.getSelections();

					if (selectedRecords == null || selectedRecords.length == 0)
						Ext.example.msg("ע��", "����ѡ��һ����¼");

					for (i = 0; i < selectedRecords.length; i++) {
						paras['lstUserNo['+i+']'] = selectedRecords[i].data.operNo;
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
				invaildateUser : function() {
					var paras = {};
					var selectedRecords = sm.getSelections();

					if (selectedRecords == null || selectedRecords.length == 0)
						Ext.example.msg("ע��", "����ѡ��һ����¼");

					for (i = 0; i < selectedRecords.length; i++) {
						paras['lstUserNo['+i+']'] = selectedRecords[i].data.operNo;
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
								Ext.example.msg('ʧ��', 'ʧ��ԭ��:' + ret.returnMsg);
								return;
							}
							// �ɹ�
							for(i=0;i<selectedRecords.length;i++){
								selectedRecords[i].data.flag=STATUS_NOT_ACTIVE;
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
						paras['lstUserNo['+i+']'] = selectedRecords[i].data.operNo;
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
								Ext.example.msg('ʧ��', 'ʧ��ԭ��:' + ret.returnMsg);
								return;
							}
							// �ɹ�
							for(i=0;i<selectedRecords.length;i++){
								selectedRecords[i].data.flag=STATUS_ACTIVE;
								selectedRecords[i].commit();
							}

							Ext.example.msg('�ɹ�', ret.returnMsg);
						}
					});
				},
				queryUser:function(){
					var paras={};
					var qryFields=qryPanel.findByType('textfield');
					Ext.each(qryFields,function(item,index,allItems){
						var paraName='';
							paraName=submitprefix?submitprefix+'.'+item.getName():item.getName();
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
					// for test ###
					// store=new Ext.data.JsonStore({
					// proxy:new
					// Ext.data.MemoryProxy({lstUser:[{operNo:'1',operName:'����',loginName:'��¼��',operPwd:'ceshi',gender:'1'}]}),
					// fields:fieldModel,
					// idProperty:'operNo',
					// root:'lstUser'
					// });
					store = new Ext.data.JsonStore({
						proxy : new Ext.data.HttpProxy({
							url : 'qryUser.action'
						}),
						fields : fieldModel,
						idProperty : 'operNo',
						root : 'lstUser'
					});
					store.load();

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
							dataIndex : 'operPwd',
							renderer:function(val){ 
								if(val)
									return val.replace(/\w*/,'******');}
						}, {
							header : '�Ա�',
							dataIndex : 'gender',
							renderer:function(val){
								if(val==1)
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
						},{
							header:'�Ƿ���Ч',
							dataIndex:'flag',
							renderer: function(val){
								if(val == STATUS_NOT_ACTIVE)
									return '��Ч';
								else
									return '��Ч';
							}
						} ],
						defaults : {
							sortable : true
						}
					});

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
							handler :this.queryUser // ��ѯ�û�����
						} ]
					}) ;
					
					grid = new Ext.grid.GridPanel({
						store : store,
						title : '�û���ͼ',
						sm : sm,
						cm : cm,
						bodyStyle:'width:100%;height:70%;',
						viewConfig:{autoFill:true},
						tbar : [ {
							xtype : 'button',
							name : 'btnAddUser',
							text : '����',
							handler : function() {
								// �����û�����
								// @add ffmmx
								var addWindow = UserAddCt.getAddWindow();
								
								addWindow.show();
							}
						}, {
							xtype : 'button',
							name : 'btnRemoveUser',
							text : 'ɾ��',
							handler : function(){
								me.removeUser();
							}
						},{
							xtype:'button',
							name:'btnInvaidateUser',
							text:'ʧЧ',
							handler:function(){
								me.invaildateUser();
							}
						},{
							xtype:'button',
							name:'btnVaidateUser',
							text:'��Ч',
							handler:function(){
								me.vaildateUser();
							}
						}]
					});

					//����˫���޸ġ���
					grid.on('rowdblclick',function(gridPanel, rowIndex,e){
						var selectedRecord=gridPanel.getSelectionModel().getSelected();
						var modifyWindow = UserAddCt.getModifyWindow(selectedRecord);
						modifyWindow.show();
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