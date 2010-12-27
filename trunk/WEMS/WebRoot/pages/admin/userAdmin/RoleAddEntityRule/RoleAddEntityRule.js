RoleAddEntityRule=function(){
	var queryPanel=new Ext.Panel({
			iconCls: 'silk-user',
			id:'RoleAddEntityRuleMain',
			title:'��ɫ���ܲ�ѯ',
			weight:800,
			height:100,
			border:false,
			frame:true,
			renderTo:Ext.getDom("RoleAddEntityRuleContainer"),
			layout:'column',
			defaults:{
				border:false
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
var operMenuPanel=null;
var selRoleCode=null;
var crStore=null;
var roleMenuPanel=null;
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
			iconCls: 'silk-grid',
			renderTo:Ext.getDom('QryResult'),
			store:roleStore,
			title:'��ɫ��ѯ���',
			border:false,
			autoDestroy:true,
			height:150,
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
				 				    selRoleCode=record.get('roleCode');
				 					if(!operPanel){
				 						 operPanel=new Ext.Panel({
				 						 		iconCls:'silk-user-edit',
				 	
				 						 		title:'��ɫ���ܱ��',
				 					 			layout:'column',
				 								height:320,
				 								frame:true,
				 								autoScroll:true
				 						 });
				 					}
				 					var menuProxy=new Ext.data.HttpProxy({
				 						url:'RoleAddEntityRuleQryMenu.action',
				 						method:'POST'
				 					});
				 					if(!roleEntityStore){
				 						roleEntityStore=new Ext.data.JsonStore({
				 							proxy:menuProxy,	
				 							root:'operMenu',
				 							fields:[
				 							{name:'menuCode',mapping:'menuCode'},
				 							{name:'menuTitle',mapping:'menuTitle'},
				 							{name:'deploySysCode',mapping:'deploySysCode'}
				 							]
				 						});
				 						
				 						if(!operMenuPanel){
				 										operMenuPanel=new Ext.grid.GridPanel({
				 												tbar:new Ext.Toolbar([
				 												{
				 													text: '����',
            														iconCls: 'silk-add',
            														handler: function(){
            																var rec= operMenuPanel.getSelectionModel().getSelected();
        																	if (!rec) {
        																		Ext.example.msg('ע��','��ѡ�������');
            																	return false;
        																    }
        																
        																	var isHas=true;
                        													roleMenuPanel.store.each(function(sRecord){
                        														if(sRecord.get('menuCode') == rec.get('menuCode')){               
                        															isHas=false;
                        															return false;
                        														}
                        													});
                        													if(isHas){
        																		 Ext.Ajax.request({
                        															url:'RoleAddEntityRule.action',
                        															params:{
                        																 role_code:selRoleCode,
                        																 menu_code:rec.get('menuCode')
                        															},
                        															success: function(){
                        																   roleMenuPanel.store.add(rec);
                        																   Ext.example.msg('OK','��ɫ����{0}��ӳɹ�',rec.get('menuTitle'))
                        																   return true;     
                        															},
                        															failure: function(e){
                        																   Ext.example.msg('����','��ɫ��������ʧ��');
                        															},
                        															method:'POST'
                        														}); 							
                        													}else{
                        														
                        														Ext.example.msg('��Ϣ','��ɫ���ܲ����ظ�');
                        													}
            														},
            														scope: this
				 												}
				 												]),
				 												iconCls:'silk-cog',
				 												ddGroup:'roleMenuPanelDDGrourp',
				 												columnWidth:0.5,
				 												title:'����Ա�ɲ�������',
				 												height:300,
				 												store:roleEntityStore,
				 												frame:true,
				 												enableDragDrop   : true,
				 												cm:new Ext.grid.ColumnModel({
				 														defaults:{
				 															width:125,
				 															editable:false,
				 															sortable:false
				 														},
				 														columns:[
				 															{header:'�˵�����',dataIndex:'menuCode'},
				 															{header:'�˵�����',dataIndex:'menuTitle'},
				 															{header:'�˵�ϵͳ����',dataIndex:'deploySysCode'}
				 															]
				 												}),
				 												sm:new Ext.grid.RowSelectionModel({
				 													singleSelect:true
				 												})
				 										});
				 										
				 									
				 										
				 						}
				 					
				 					
				 						roleEntityStore.load();
				 					}else{
				 						roleEntityStore.load();
				 					}
				 					if(!crStore){
				 						crStore=new Ext.data.JsonStore({
				 							proxy:menuProxy,
				 							root:'roleMenu',
				 							fields:[
				 							{name:'menuCode',mapping:'menuCode'},
				 							{name:'menuTitle',mapping:'menuTitle'},
				 							{name:'deploySysCode',mapping:'deploySysCode'}
				 							]
				 						});
				 					
				 						if(!roleMenuPanel){
				 								roleMenuPanel=new Ext.grid.GridPanel({
				 												tbar:new Ext.Toolbar([
				 												{
				 													text: 'ɾ��',
            														iconCls: 'silk-delete',
            														handler: function(){
            															  var rec=roleMenuPanel.getSelectionModel().getSelected();
            															  if(!rec){
            															  	   Ext.example.msg('��Ϣ','��ѡ��ɾ����');
            															  	   return false;
            															  }
            															  Ext.Ajax.request({
            															  		url:'RoleAddEntityRuleActionDel.action',
            															  		params:{
            															  			role_code:selRoleCode,
            															  			menu_code:rec.get('menuCode')
            															  		},
            															  		method:'POST',
            															  		success:function(){
            															  			 
            															  			 crStore.remove(rec);
            															  			 Ext.example.msg('OK','��ɫ����ɾ���ɹ�')
            															  			 roleEntityStore.load();
            															  		}
            															  });
            														}
				 												}
				 												]),
				 												iconCls:'silk-cog',						
				 												columnWidth:0.5,
				 												title:'��ɫ����',
				 												height:300,
				 												store:crStore,
				 												frame:true,
				 												enableDragDrop   : true,
				 												cm:new Ext.grid.ColumnModel({
				 														defaults:{
				 															width:125,
				 															editable:false,
				 															sortable:false
				 														},
				 														columns:[
				 															{header:'�˵�����',dataIndex:'menuCode'},
				 															{header:'�˵�����',dataIndex:'menuTitle'},
				 															{header:'�˵�ϵͳ����',dataIndex:'deploySysCode'}
				 															]
				 												}),
				 												sm:new Ext.grid.RowSelectionModel({
				 													singleSelect:true
				 												})
				 									});
				 									
				 									
				 									
				 									operPanel.add([operMenuPanel,roleMenuPanel]);
				 									operPanel.render(Ext.getDom('OperArea'));
				 									 var secondGridDropTargetEl = roleMenuPanel.getView().scroller.dom;
				 									 var secondGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
                											ddGroup    : 'roleMenuPanelDDGrourp',
                											notifyDrop : function(ddSource, e, data){
                        											var records =  ddSource.dragData.selections;
                        											var menuCode=records[0].get('menuCode');
                        											var isHas=true;
                        											roleMenuPanel.store.each(function(sRecord){
                        													if(sRecord.get('menuCode') == menuCode){
                
                        														isHas=false;
                        													 
                        													}
                        											});
                        											if(isHas){
                        												
                        												   Ext.Ajax.request({
                        															url:'RoleAddEntityRule.action',
                        															params:{
                        																 role_code:selRoleCode,
                        																 menu_code:menuCode
                        															},
                        															success: function(){
                        																   roleMenuPanel.store.add(records);
                        																   Ext.example.msg('OK','��ɫ����{0}��ӳɹ�',records[0].get('menuTitle'))
                        																   return true;     
                        															},
                        															failure: function(e){
                        																   Ext.example.msg('����','��ɫ��������ʧ��');
                        															},
                        															method:'POST'
                        													}); 													               												
                        											}else{
                        													Ext.example.msg('��Ϣ','��ɫ���ܲ����ظ�');
                        													return false;
                        											}
                											}
  													 });
				 									
				 									
				 						}
				 						
				 						crStore.load({
				 							params:{role_code:selRoleCode}
				 						});
				 					}else{
				 						crStore.load({
				 							params:{role_code:selRoleCode}
				 						});   
				 					}
				 					
				 				
				 			}
				 	}
			})
		});
	}
}



Ext.onReady(RoleAddEntityRule);