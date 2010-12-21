RoleAddEntityRule=function(){
	var queryPanel=new Ext.Panel({
			id:'RoleAddEntityRuleMain',
			title:'��ɫ���ܲ�ѯ',
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
function queryInfoRole(e){
	var ruleCode=Ext.getCmp('role_code').getValue();
	var ruleName=Ext.getCmp('role_name').getValue();
	Ext.Ajax.request({
			url:'RoleAddEntityRuleActionQry.action'
	});
}



Ext.onReady(RoleAddEntityRule);