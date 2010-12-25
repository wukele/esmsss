/**
 * 
 * user manager main ui
 * 
 * @author ffmmx
 */

(function() {
	Ext.ns('com.wems.admin.userAdmin');

	com.wems.admin.userAdmin.UserMain = function() {
		var grid;
		var store;

		var fieldModel = [ 'operNo', 'operName', 'loginName', 'operPwd',
				'gender', 'positions', 'phone', 'email', 'mobileNo' ];
		var cm;
		var sm = new Ext.grid.CheckboxSelectionModel();
		var UserAddCt;
		var submitprefix = 'user';
		
		return {
			me:this,
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
						dataIndex : 'operPwd'
					}, {
						header : '�Ա�',
						dataIndex : 'gender'
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
					} ],
					defaults : {
						sortable : true
					}
				});

				grid = new Ext.grid.GridPanel({
					store : store,
					layout : 'fit',
					title : '�û�����',
					sm : sm,
					cm : cm,
					autoHeight:true,
					height:500,
					viewConfig:{autoFill:true},
					tbar : [ {
						xtype : 'panel',
						layout : 'column',
						frame:true,
						items : [ {html:'�û���:',layout:'fit'},{
								xtype : 'textfield',
								width : 160,
								fieldLabel : '�û���',
								name : 'operNo',
								maxLength : 10,
								maxLengthText : '����10λ'
							} , {html:'�û�����:',layout:'fit'},{
								xtype : 'textfield',
								width : 160,
								fieldLabel : '�û�����',
								name : 'operName',
								maxLength : 60,
								maxLengthText : '����60λ'
							} , {
							xtype : 'button',
							name : 'query',
							text : '��ѯ',
							handler :
								// ��ѯ�û�����
								this.queryUser
						} ]
					} ],
					bbar : [ {
						xtype : 'button',
						name : 'btnAddUser',
						text : '���',
						handler : function() {
							// ����û�����
							// @add ffmmx
							var addWindow = UserAddCt.getAddWindow();
							
							addWindow.show();
						}
					}, {
						xtype : 'button',
						name : 'btnRemoveUser',
						text : 'ɾ��',
						handler : function() {
							// ɾ������
							
						}
					} ]
				});

				if (contianerId)
					grid.render(contianerId);
			}
		};
	}();
})();

Ext.onReady(function() {
	var UserAdd = com.wems.admin.userAdmin.UserAdd;
	var UserMain = com.wems.admin.userAdmin.UserMain;
	UserAdd.init();
	UserMain.init('UserMainPanel');
	UserMain.setUserAddCt(UserAdd);

});