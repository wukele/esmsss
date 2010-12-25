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
					},{
						header:'�Ƿ���Ч',
						dataIndex:'flag',
						renderer: function(val){
							if(val == 1)
								return '��Ч';
							else if(val == 0)
								return '��Ч';
						}
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
						text : 'ɾ��/ʧЧ',
						handler : function() {
							var _window = new Ext.Window({
								title:"�û�����",
								width:250,
								height:100,
								plain:true,
								resizable:false,
								layout:"form",
								labelWidth:55,
								defaultType:"textfield",
								items:[{
									xtype:"panel",
									style:"padding:5px",
									baseCls:"x-plain",
									layout:"column",
									items:[{
										columnWidth:.9,
										baseCls:"x-plain",
										layout:"form",
										labelWidth:55,
										defaults:{xtype:"textfield",width:125},
										items:[{
											xtype : "combo",
											mode : "local",
											triggerAction : 'all',
											fieldLabel : "�������",
											store : new Ext.data.ArrayStore( {
												fields : [ "classification" ],
												data : [ [ "ɾ��" ], [ "ʧЧ" ] ]
											}),
											displayField : "classification",
											editable : false
											}]
										}]
								  }],
								buttons:[{
									text:"ȷ��",
									handler:function(){
										var records=grid.getSelectionModel().getSelections();
										var operNo;
										_window=this.ownerCt.ownerCt;
										var flag=_window.findByType("combo")[0].getValue();
										for(var i=0;i<records.length;i++){
											operNo=records[i].get("operNo")
											Ext.Ajax.request({
												url:"delUser.action?"+"operNo="+operNo+"&flag="+flag,
												method : "post",
											})
										}
									}
								},{
									text:"ȡ��",
									handler:function(){
										_window.hide();
									}
								}],
								listeners:{
									"show":function(){
										var _classType=_window.findByType("combo")[0]
										_classType.setValue("ɾ��");
									}
								}
						});
								_window.show();
							
						}
					} ]
				});

				//���˫���޸ġ���
				grid.on('rowdblclick',function(gridPanel, rowIndex,e){
					var selectedRecord=gridPanel.getSelectionModel().getSelected();
					var modifyWindow = UserAddCt.getModifyWindow(selectedRecord);
					modifyWindow.show();
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