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
					proxy:new Ext.data.MemoryProxy({lstUser:[{operNo:'1',operName:'����',loginName:'��¼��',operPwd:'ceshi',gender:'1'}]}),
					fields:fieldModel,
					idProperty:'operNo',
					root:'lstUser'
				});
				store.load();
				
				cm=new Ext.grid.ColumnModel({columns:[ new Ext.grid.RowNumberer(),
				                                           sm,
				                                           {id:'operNo',header:'�û���',dataIndex:'operNo'},
				                  		                 {header:'�û�����',dataIndex:'operName'},
				                		                 {header:'��¼����',dataIndex:'loginName'},
				                		                 {header:'����',dataIndex:'operPwd'},
				                		                 {header:'�Ա�',dataIndex:'gender'},
				                		                 {header:'λ��',dataIndex:'positions'},
				                		                 {header:'�绰',dataIndex:'phone'},
				                		                 {header:'�����ʼ�',dataIndex:'email'},
				                		                 {header:'�ֻ�����',dataIndex:'mobileNo'}],
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
					title:'�û�����',
					sm:sm,
					cm:cm,
					bbar:[{xtype:'button',name:'btnAddUser',text:'���',handler:function(){
						//����û�����
					}},{xtype:'button',name:'btnRemoveUser',text:'ɾ��',handler:function(){
						//ɾ������
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