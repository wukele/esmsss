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
				// Ext.data.MemoryProxy({lstUser:[{operNo:'1',operName:'测试',loginName:'登录名',operPwd:'ceshi',gender:'1'}]}),
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
						header : '用户号',
						dataIndex : 'operNo'
					}, {
						header : '用户名称',
						dataIndex : 'operName'
					}, {
						header : '登录名称',
						dataIndex : 'loginName'
					}, {
						header : '密码',
						dataIndex : 'operPwd'
					}, {
						header : '性别',
						dataIndex : 'gender'
					}, {
						header : '位置',
						dataIndex : 'positions'
					}, {
						header : '电话',
						dataIndex : 'phone'
					}, {
						header : '电子邮件',
						dataIndex : 'email'
					}, {
						header : '手机号码',
						dataIndex : 'mobileNo'
					},{
						header:'是否有效',
						dataIndex:'flag',
						renderer: function(val){
							if(val == 1)
								return '无效';
							else if(val == 0)
								return '有效';
						}
					} ],
					defaults : {
						sortable : true
					}
				});

				grid = new Ext.grid.GridPanel({
					store : store,
					layout : 'fit',
					title : '用户管理',
					sm : sm,
					cm : cm,
					autoHeight:true,
					height:500,
					viewConfig:{autoFill:true},
					tbar : [ {
						xtype : 'panel',
						layout : 'column',
						frame:true,
						items : [ {html:'用户号:',layout:'fit'},{
								xtype : 'textfield',
								width : 160,
								fieldLabel : '用户号',
								name : 'operNo',
								maxLength : 10,
								maxLengthText : '至多10位'
							} , {html:'用户名称:',layout:'fit'},{
								xtype : 'textfield',
								width : 160,
								fieldLabel : '用户名称',
								name : 'operName',
								maxLength : 60,
								maxLengthText : '至多60位'
							} , {
							xtype : 'button',
							name : 'query',
							text : '查询',
							handler :
								// 查询用户方法
								this.queryUser
						} ]
					} ],
					bbar : [ {
						xtype : 'button',
						name : 'btnAddUser',
						text : '添加',
						handler : function() {
							// 添加用户方法
							// @add ffmmx
							var addWindow = UserAddCt.getAddWindow();
							
							addWindow.show();
						}
					}, {
						xtype : 'button',
						name : 'btnRemoveUser',
						text : '删除/失效',
						handler : function() {
							var _window = new Ext.Window({
								title:"用户操作",
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
											fieldLabel : "操作类别",
											store : new Ext.data.ArrayStore( {
												fields : [ "classification" ],
												data : [ [ "删除" ], [ "失效" ] ]
											}),
											displayField : "classification",
											editable : false
											}]
										}]
								  }],
								buttons:[{
									text:"确定",
									handler:function(){
										var records=grid.getSelectionModel().getSelections();
										var operNo;
										_window=this.ownerCt.ownerCt;
										var flag=_window.findByType("combo")[0].getValue();
										for(var i=0;i<records.length;i++){
											operNo=records[i].get("operNo")
											Ext.Ajax.request({
												url:"delUser.action",
												method : "post",
												params:{"operNo":operNo,"flag":flag},
												success: function(response, opts) {
													alert("操作成功");
													_window.hide();
													me.queryUser;
												},
										  		failure: function(response, opts) {
										      		alert("操作失败");
													_window.hide();
										  	    }

											})
										}
									}
								},{
									text:"取消",
									handler:function(){
										_window.hide();
									}
								}],
								listeners:{
									"show":function(){
										var _classType=_window.findByType("combo")[0]
										_classType.setValue("删除");
									}
								}
						});
								_window.show();
							
						}
					} ]
				});

				//添加双击修改。。
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