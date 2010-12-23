RoleAddEntityRule=function(){
	var queryPanel=new Ext.Panel({
			id:'RoleAddEntityRuleMain',
			title:'��ɫ���ܲ�ѯ',
			weight:800,
			height:100,
			border:false,
			frame:true,
			renderTo:Ext.getDom("RoleAddEntityRuleContainer"),
			layout:'column',
			defaults:{
				border:false,
				padding:'5 5 5 10'
			},
			items:[
				{
					columnWidth: .25,
					layout:'form',
					defaultType:'textfield',
					items:[{
						  id:'role_code',
						  fieldLabel:'��ɫ����'
					}]
				},
				{
					columnWidth: .25,
					layout:'form',
					defaultType:'textfield',
					items:[{
						  id:'role_name',
						  fieldLabel:'��ɫ����'
					}]
				},
				{
					columnWidth: .25,
					items:[{
						  xtype:'button',
						  width:100,
						  text:'��ѯ',
						  handler:queryInfoRole
					}]
				}
				
			]
	});
}
var rolesView=null;
var roleStore=null;
var roleEntityStore=null;
var operPanel=null;
function queryInfoRole(e){
	var roleCode=Ext.getCmp('role_code').getValue();
	var roleName=Ext.getCmp('role_name').getValue();
	
	
	if(!roleStore){
		roleStore=new Ext.data.JsonStore({
		
				 root:'roles',
				 fields:[{name:'roleCode',mapping:'roleCode'},
				 {name:'comments',mapping:'comments'},
				 {name:'roleType',mapping:'roleType'},
				 {name:'isactive',mapping:'isactive'},
				 {name:'operNo',mapping:'operNo'}],
				 
			
			//url:'RoleAddEntityRuleActionQry.action?role_code='+roleCode+'&role_name='+roleName
			proxy:new Ext.data.HttpProxy({
				url:'RoleAddEntityRuleActionQry.action'
			})
		});
		roleStore.load({
			params:{
				role_code:roleCode,
				role_name:roleName
			}
		});
	}else{
		roleStore.load({
			params:{
				role_code:roleCode,
				role_name:roleName
			}
		});
	}
	if(!rolesView){
		rolesView=new Ext.grid.GridPanel({
			renderTo:Ext.getDom('QryResult'),
			store:roleStore,
			title:'��ɫ��ѯ���',
			border:false,
			autoDestroy:true,
			height:200,
			cm:new Ext.grid.ColumnModel({
					defaults:{
						width: 120,
            			sortable: true
					},
					columns:[
					{header:'��ɫ����',dataIndex:'roleCode'},
					{header:'��ɫ����',dataIndex:'comments'},
					{header:'��ɫ����',dataIndex:'roleType'},
					{header:'�Ƿ񼤻�',dataIndex:'isactive'},
					{header:'��ɫ����Ա',dataIndex:'operNo'}
					]
			}),
			sm:new Ext.grid.RowSelectionModel({
				 	singleSelect:true,
				 	listeners:{
				 			rowselect:function(sm,idx,record){
				 					var selRoleCode=record.get('roleCode');
				 					new Ext.Ajax.request({
				 						url:'RoleAddEntityRuleQryMenu.action'
				 					
				 					})
				 					if(!operPanel){
				 						 operPanel=new Ext.Panel({
				 						 		width:1048,
				 						 		title:'��ɫ���ܱ��',
				 					 			layout:'column',
				 								height:400,
				 								renderTo:Ext.getDom('OperArea'),
				 								border:false
				 						 })
				 					}
				 			}
				 	}
			})
		});
	}
}



Ext.onReady(RoleAddEntityRule);