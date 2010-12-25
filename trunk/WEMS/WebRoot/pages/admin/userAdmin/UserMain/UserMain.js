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
						text : '删除',
						handler : function() {
							// 删除方法
							
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