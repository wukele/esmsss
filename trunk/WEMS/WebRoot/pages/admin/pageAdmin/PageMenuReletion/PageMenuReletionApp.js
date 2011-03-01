Ext.ns('Ems.page')


Ems.page.SystemMenuTree=Ext.extend(Ext.tree.TreePanel,{
			constructor:function(cfg){
						var  config=cfg||{
									region:'west',
									margins:'2 2 2 2',
									width:270,
									animate:true,
									containerScroll: true,
									autoScroll: true,
									dataUrl:'GetSystemMenu.action',
									 enableDD: true,
									 ddAppendOnly:true,
									title:'系统菜单'
						}
						Ems.page.SystemMenuTree.superclass.constructor.call(this,config);
			},
			initComponent:function(){
					    this.root=new  Ext.tree.AsyncTreeNode({
					    			text:'EMS',
					    			iconCls:'silk-table-refresh'		
					    });
					    this.on({
					    		beforeload:this.onBeforeLoad,
					    		scope:this
					    })
					    Ems.page.SystemMenuTree.superclass.initComponent.call(this);
			},
			
			onBeforeLoad:function(node){
						this.getLoader().baseParams={
								   menu_code:node.attributes.menu_code,
								   module_code:node.attributes.module_code
						}
			}		
})


Ems.page.PageDataView=Ext.extend(Ext.grid.GridPanel,{
			
	        cm:new  Ext.grid.ColumnModel({
	        		defaults:{
	        					width:60,
	        					menuDisabled:true
	        		},
	        		columns: [
	        		{header:'页面ID',dataIndex:'pageId'},
	        		{header:'页面资源ID',dataIndex:'pageResourceId'},
	        		{header:'页面类型',dataIndex:'pageType'},
	        		{header:'页面地图',dataIndex:'pageImageUrl',renderer:function(value){
	        																								if(value){
	        																											return  '<img  src="'+value+'" width="40" height="40"  />';
	        																								}else{
	        																											return  '';
	        																								}
	        																					
	        																					}},
	        	   {header:'页面名称',dataIndex:'pageName'},
	        	   {header:'操作编码',dataIndex:'operCode'},
	        	   {header:'菜单编码',dataIndex:'menuCode'}
	        		]
	        }),
	        
	 		onPanelRender:function(){
	 				this.store.load();
	 		},
	        
	        sm:new  Ext.grid.RowSelectionModel({
	       			singleSelect:true
	        }),
			constructor:function(cfg){
						var  config=cfg||{
								region: 'center', 
								margins: '2 2 2 0',
								activeItem: 0,
								border: 1,
								autoScroll: true,
								containerScroll: true,
								enableDragDrop:true,
								ddGroup:'page_menu',
								title:'普通页面信息'
						}
						Ems.page.PageDataView.superclass.constructor.call(this,config);
			},		
			initComponent:function(){
					     this.store=new   Ext.data.JsonStore({
					     		   url:'GetInfoPage.action',
					     		   root:'pages',
					     		   fields:[
					     		   {name:'pageId',mapping:'pageId',type:'int'},
					     		   {name:'pageResourceId',mapping:'pageResourceId'},
					     		   {name:'pageType',mapping:'pageType'},
					     		   {name:'pageImageUrl',mapping:'pageImageUrl'},
					     		   {name:'pageName',mapping:'pageName'},
					     		   {name:'operCode',mapping:'operCode'},
					     		   {name:'menuCode',mapping:'menuCode'}
					     		   ]
					     });
					     this.on({
					     		  render:this.onPanelRender,
					     		  scope:this
					     });
					     Ems.page.PageDataView.superclass.initComponent.call(this);
			}
			
})





Ems.page.DetailPanel=Ext.extend(Ext.TabPanel,{
		   	 activeTab: 0,
		   	 width:500,
		   	 constructor:function(cfg){
		   	 				var  config=cfg||{
		   	 					region: 'east', 
								margins: '2 2 2 2',
								activeItem: 0,
								border: 1,
								autoScroll: true,
								collapsible:true,
		   	 					animCollapse:true
		   	 				};
		   	 				Ems.page.DetailPanel.superclass.constructor.call(this,config);
		   	 },
		   	 
		   	 initComponent:function(){
		   	 				 this.page_res_view=new  Ext.grid.GridPanel({
		   	 				 			title:'页面资源',
		   	 				 			autoScroll:true,
		   	 				 			containerScroll: true,
		   	 				 			cm:new Ext.grid.ColumnModel({
		   	 				 					defaults:{
		   	 				 							width:50
		   	 				 					},
		   	 				 					columns:[
		   	 				 					{header:'组件ID',dataIndex:'pageResource'},
		   	 				 					{header:'XTYPE',dataIndex:'xtypeCode'},
		   	 				 					{header:'组件名称',dataIndex:'componentName'},
		   	 				 					{header:'数据配置ID',dataIndex:'valueId'},
		   	 				 					{header:'AXIS X',dataIndex:'resourceLeft'},
		   	 				 					{header:'AXIS Y',dataIndex:'resourceTop'}
		   	 				 					]
		   	 				 			}),
		   	 				 			store:new  Ext.data.JsonStore({
		   	 				 				   url:'QryCurrentPageResource.action',
		   	 				 				   root:'page_resource',
		   	 				 				   fields:[
		   	 				 				   {name:'pageResource',mapping:'pageResource'},
		   	 				 				   {name:'xtypeCode',mapping:'xtypeCode'},
		   	 				 				   {name:'componentName',mapping:'componentName'},
		   	 				 				   {name:'valueId',mapping:'valueId'},
		   	 				 				   {name:'resourceLeft',mapping:'resourceLeft',type:'int'},
		   	 				 				   {name:'resourceTop',mapping:'resourceTop',type:'int'}
		   	 				 				   ]
		   	 				 			}),
		   	 				 			sm:new Ext.grid.RowSelectionModel({
		   	 				 				    singleSelect:true
		   	 				 			}),
		   	 				 			viewConfig:{
		   	 				 				forceFit: true
		   	 				 			}
		   	 				 });
		   	 				 this.page_data_device=new  Ext.grid.GridPanel({
		   	 				 			title:'页面数据',
		   	 				 			autoScroll:true,
		   	 				 			containerScroll: true,
		   	 				 			autoHeight:true,
		   	 				 			store:new  Ext.data.JsonStore({
		   	 				 						url:'QryComponentDataDevice.action',
		   	 				 						root:'page_data',
		   	 				 						fields:[
		   	 				 						{name:'resourceId',mapping:'resourceId',type:'int'},
		   	 				 						{name:'pageResource',mapping:'pageResource'},
		   	 				 						{name:'componentName',mapping:'componentName'},
		   	 				 						{name:'valueId',mapping:'valueId'},
		   	 				 						{name:'variableName',mapping:'variableName'},
		   	 				 						{name:'deviceId',mapping:'deviceId',type:'int'},
		   	 				 						{name:'deviceName',mapping:'deviceName'},
		   	 				 						{name:'deviceType',mapping:'deviceType'}
		   	 				 						]
		   	 				 			}),
		   	 				 			cm:new  Ext.grid.ColumnModel({
		   	 				 						defaults:{
		   	 				 								width:80
		   	 				 						},
		   	 				 						columns:[
		   	 				 						{header:'组件ID',dataIndex:'resourceId'},
		   	 				 						{header:'页面资源ID',dataIndex:'pageResource'},
		   	 				 						{header:'组件名称',dataIndex:'componentName'},
		   	 				 						{header:'数据配置ID',dataIndex:'valueId'},
		   	 				 						{header:'变量名称',dataIndex:'variableName'},
		   	 				 						{header:'设备ID',dataIndex:'deviceId'},
		   	 				 						{header:'设备名称',dataIndex:'deviceName'},
		   	 				 						{header:'设备类型',dataIndex:'deviceType'}
		   	 				 						]
		   	 				 			}),
		   	 				 			sm:new Ext.grid.RowSelectionModel({
		   	 				 				    singleSelect:true
		   	 				 			}),
		   	 				 			viewConfig:{
		   	 				 				forceFit: true
		   	 				 			}
		   	 				 });				 
		   	 				 this.items=[this.page_res_view,this.page_data_device];
		   	 				 this.on({
		   	 				 		tabchange:this.onTabPanelChange,
		   	 				 		scope:this
		   	 				 });
		   	 				 
		   	 				 Ems.page.DetailPanel.superclass.initComponent.call(this);
		   	 },
		   	 
		   	 
		   	 onTabPanelChange:function(tab,panel){
		   	 				var  record=Ems.page.PageMenuReletionApp.page_data_view.getSelectionModel().getSelected()
		   	 				if(record){
		   	 								panel.store.load({
		   	 										params:{
		   	 												page_id:record.get('pageId')
		   	 										}
		   	 								})
		   	 				}else{
		   	 							return 1;
		   	 				}
		   	 }
		   	 
})




Ems.page.PageMenuReletionApp=function(){
			return {
						init:function(){
							 this.page_data_view=new Ems.page.PageDataView();
							 this.page_menu_tree=new Ems.page.SystemMenuTree();
							 this.page_data_view.on({
							 			click:this.onPageDataViewSelect,
							 			scope:this
							 });
							 
							 this.page_detail_tab=new Ems.page.DetailPanel();
							 
							 
						
							 
							 
							  this.Appviewer=new Ems.page.TplContainer({
							  			layout:'border',
							  			container:'container',
							  			items:[this.page_menu_tree,
							  				this.page_data_view,
							  				this.page_detail_tab
							  		]
							  });
							  
					this.treeDropZone=new Ext.tree.TreeDropZone(this.page_menu_tree,{
							 				ddGroup:'page_menu'
					});
					
					this.page_menu_tree.on({
							beforenodedrop:this.onDataDrop,
							scope:this
					});
					
					
						},
						
						onDataDrop:function(e){
									//Ext.Msg.alert('before','ok');		
									var  record=e.data.selections[0];
									var  node=e.target.attributes;
									if(!record)return 1;
									Ext.Ajax.request({
											url:'AddNormalPageMenu.action',
											params:{
													menu_code:node.menu_code,
													module_code:node.module_code,
													is_leaf:node.leaf,
													page_id:record.get('page_id')
											},
											success:function(result){
													
											}
									})
						},
						
						
						onPageDataViewSelect:function(){
								var  record=Ems.page.PageMenuReletionApp.page_data_view.getSelectionModel().getSelected();
								var  activeTab=this.page_detail_tab.getActiveTab();
								if(!record)return 1;
								activeTab.store.load({
											params:{
													page_id:record.get('pageId')
											}
								})
						}
						
			}
}();


Ext.onReady(Ems.page.PageMenuReletionApp.init,Ems.page.PageMenuReletionApp)