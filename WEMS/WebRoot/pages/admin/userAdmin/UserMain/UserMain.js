/**
 * 
 * user manager main ui
 * @author ffmmx
 */

(function(){
	Ext.ns('com.wems.admin.userAdmin');
	
	com.wems.admin.userAdmin.UserMain=function(){
		var grid;
		var store;
		
		var fieldModel=['operNo','operName','loginName','operPwd','gender','positions','phone','email','mobileNo'];
		var cm;
		var sm=new Ext.grid.CheckboxSelectionModel();
		return {
			init:function(contianerId){
				store=new Ext.data.JsonStore({
					proxy:new Ext.data.MemoryProxy({lstUser:[{operNo:'1',operName:'测试',loginName:'登录名',operPwd:'ceshi',gender:'1'}]}),
					fields:fieldModel,
					idProperty:'operNo',
					root:'lstUser'
				});
				store.load();
				
				cm=new Ext.grid.ColumnModel({columns:[ new Ext.grid.RowNumberer(),
				                                           sm,
				                                           {id:'operNo',header:'用户号',dataIndex:'operNo'},
				                  		                 {header:'用户名称',dataIndex:'operName'},
				                		                 {header:'登录名称',dataIndex:'loginName'},
				                		                 {header:'密码',dataIndex:'operPwd'},
				                		                 {header:'性别',dataIndex:'gender'},
				                		                 {header:'位置',dataIndex:'positions'},
				                		                 {header:'电话',dataIndex:'phone'},
				                		                 {header:'电子邮件',dataIndex:'email'},
				                		                 {header:'手机号码',dataIndex:'mobileNo'}],
				                		        defaults:{
				                		        	sortable:true
				                		        }});
//				store=new Ext.data.JsonStore({
//					proxy:new Ext.data.HttpProxy({url:''}),
//					fields:fieldModel,
//					idProperty:'operNo',
//					root:'lstUser'
//				});
				
				
				grid=new Ext.grid.GridPanel({
					store:store,
					layout:'fit',
					title:'用户管理',
					sm:sm,
					cm:cm,
					bbar:[{xtype:'button',name:'btnAddUser',text:'添加',handler:function(){
						//添加用户方法
					}},{xtype:'button',name:'btnRemoveUser',text:'删除',handler:function(){
						//删除方法
					}}]
				});
				
				if(contianerId)
					grid.render(contianerId);
			}
		};
	}();
})();


Ext.onReady(function(){
	com.wems.admin.userAdmin.UserMain.init('UserMainPanel');
});