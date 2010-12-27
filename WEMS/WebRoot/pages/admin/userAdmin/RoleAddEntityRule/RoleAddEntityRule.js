RoleAddEntityRule=function(){
	var queryPanel=new Ext.Panel({
			iconCls: 'silk-user',
			id:'RoleAddEntityRuleMain',
			title:'角色功能查询',
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
			title:'角色查询结果',
			border:false,
			autoDestroy:true,
			height:150,
			cm:new Ext.grid.ColumnModel({
					defaults:{
						width: 120,
            			sortable: true
					},
					columns:[
					{header:'角色代码',dataIndex:'roleCode'},
					{header:'角色名称',dataIndex:'comments'},
					{header:'角色类型',dataIndex:'roleType'},
					{header:'是否激活',dataIndex:'isactive'},
					{header:'角色操作员',dataIndex:'operNo'}
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
				 	
				 						 		title:'角色功能变更',
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
				 													text: '新增',
            														iconCls: 'silk-add',
            														handler: function(){
            																var rec= operMenuPanel.getSelectionModel().getSelected();
        																	if (!rec) {
        																		Ext.example.msg('注意','请选定添加项');
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
                        																   Ext.example.msg('OK','角色功能{0}添加成功',rec.get('menuTitle'))
                        																   return true;     
                        															},
                        															failure: function(e){
                        																   Ext.example.msg('错误','角色功能新增失败');
                        															},
                        															method:'POST'
                        														}); 							
                        													}else{
                        														
                        														Ext.example.msg('信息','角色功能不能重复');
                        													}
            														},
            														scope: this
				 												}
				 												]),
				 												iconCls:'silk-cog',
				 												ddGroup:'roleMenuPanelDDGrourp',
				 												columnWidth:0.5,
				 												title:'操作员可操作功能',
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
				 															{header:'菜单代码',dataIndex:'menuCode'},
				 															{header:'菜单名称',dataIndex:'menuTitle'},
				 															{header:'菜单系统名称',dataIndex:'deploySysCode'}
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
				 													text: '删除',
            														iconCls: 'silk-delete',
            														handler: function(){
            															  var rec=roleMenuPanel.getSelectionModel().getSelected();
            															  if(!rec){
            															  	   Ext.example.msg('信息','请选定删除项');
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
            															  			 Ext.example.msg('OK','角色功能删除成功')
            															  			 roleEntityStore.load();
            															  		}
            															  });
            														}
				 												}
				 												]),
				 												iconCls:'silk-cog',						
				 												columnWidth:0.5,
				 												title:'角色功能',
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
				 															{header:'菜单代码',dataIndex:'menuCode'},
				 															{header:'菜单名称',dataIndex:'menuTitle'},
				 															{header:'菜单系统名称',dataIndex:'deploySysCode'}
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
                        																   Ext.example.msg('OK','角色功能{0}添加成功',records[0].get('menuTitle'))
                        																   return true;     
                        															},
                        															failure: function(e){
                        																   Ext.example.msg('错误','角色功能新增失败');
                        															},
                        															method:'POST'
                        													}); 													               												
                        											}else{
                        													Ext.example.msg('信息','角色功能不能重复');
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