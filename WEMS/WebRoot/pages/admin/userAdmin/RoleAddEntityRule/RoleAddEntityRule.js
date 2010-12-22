RoleAddEntityRule=function(){
	var queryPanel=new Ext.Panel({
			id:'RoleAddEntityRuleMain',
			title:'角色功能查询',
			weight:800,
			height:100,
			border:false,
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
						  fieldLabel:'角色代码'
					}]
				},
				{
					columnWidth: .25,
					layout:'form',
					defaultType:'textfield',
					items:[{
						  id:'role_name',
						  fieldLabel:'角色名称'
					}]
				},
				{
					columnWidth: .25,
					items:[{
						  xtype:'button',
						  width:100,
						  text:'查询',
						  handler:queryInfoRole
					}]
				}
				
			]
	});
}
function queryInfoRole(e){
	var roleCode=Ext.getCmp('role_code').getValue();
	var roleName=Ext.getCmp('role_name').getValue();
	Ext.Ajax.request({
			url:'RoleAddEntityRuleActionQry.action',
			params:{
				role_code:roleCode,
				role_name:roleName
			}
			
	});
}



Ext.onReady(RoleAddEntityRule);