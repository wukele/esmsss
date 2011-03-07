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
									title:'ϵͳ�˵�'
						}
						Ems.page.SystemMenuTree.superclass.constructor.call(this,config);
			},
			initComponent:function(){
					    this.root=new  Ext.tree.AsyncTreeNode({
					    			text:'EMS',
					    			iconCls:'silk-table-refresh',
					    			allowDrop:false
					    });
					    this.on({
					    		beforeload:this.onBeforeLoad,
					    		scope:this
					    })
					    
					    this.contextmenu=new  Ext.menu.Menu({
					    		items:[{
					    				text:'������',
					    				handler:function(){
					    							Ext.Msg.prompt('�˵�','�����²˵���:',function(btn,text){
					    											if(btn=='ok' && text){
					    														if(Ems.page.PageMenuReletionApp.s_node){
					    																		Ext.Ajax.request({
					    																						url:'PageMenuRename.action',
					    																						params:{
					    																									module_code:Ems.page.PageMenuReletionApp.s_node.attributes.module_code,
					    																									menu_code:Ems.page.PageMenuReletionApp.s_node.attributes.menu_code,
					    																									n_text:text
					    																						},
					    																						success:function(res,opt){
					    																									if(res.responseText){
					    																												var  result=Ext.decode(res.responseText);
					    																												if(result.is_success){
					    																															Ext.example.msg('success','�˵��������ɹ�');
					    																															Ems.page.PageMenuReletionApp.s_node.setText(opt.params.n_text);
					    																												}else{
					    																															Ext.example.msg('faild',result.return_message);
					    																												}
					    																									}
					    																						}
					    																		})
					    														}
					    													
					    											}
					    							});
					    				}
					    		},'-',{
					    				text:'ɾ���˵�',
					    				handler:function(){
					    							var  node=Ems.page.PageMenuReletionApp.s_node;
					    							if(node){
					    									
					    													Ext.Ajax.request({
					    															url:'PageMenuRemove.action',
					    															params:{
					    																	module_code:Ems.page.PageMenuReletionApp.s_node.attributes.module_code,
					    																    menu_code:Ems.page.PageMenuReletionApp.s_node.attributes.menu_code
					    															},
					    															success:function(res,opt){
					    																	 if(res.responseText){
					    																	 			var  result=Ext.decode(res.responseText);
					    																	 			if(result.is_success){
					    																	 						Ext.example.msg('success','�˵�ɾ���ɹ�');
					    																	 						p=node.parentNode;
					    													 				 						if(p)p.removeChild(node,true);
					    													 				 						Ems.page.PageMenuReletionApp.page_data_view.store.load();
					    																	 			}else{
					    																	 						Ext.example.msg('failed','ɾ��ʧ��');
					    																	 			}
					    																	 			
					    																	 }
					    															}
					    													});
					    									
					    							}
					    					
					    				}
					    		},'-',{
					    			 		text:'�½�Ŀ¼',
					    			 		handler:function(){
					    			 				var  node=Ems.page.PageMenuReletionApp.s_node;
					    			 				if(node){
					    			 							if(node.isLeaf()){
					    			 										Ext.example.msg('warn','�����ڹ���ҳ��������Ŀ¼');
					    			 										return 1;
					    			 							}
					    			 							Ext.Msg.prompt('Ŀ¼��','����Ŀ¼��:',function(btn,text){
					    			 										if(btn=='ok' &&   text){
					    			 													var   nd=Ems.page.PageMenuReletionApp.s_node;
					    			 													Ext.Ajax.request({
					    			 																url:'addDirSystemMenu.action',
					    			 																params:{
					    			 																		module_code:nd.attributes.module_code,
					    			 																		menu_code:nd.attributes.menu_code,
					    			 																		dir_name:text
					    			 																},
					    			 																success:function(res,opt){
					    			 																	     var  result=Ext.decode(res.responseText);
					    			 																	     if(result &&  result.is_success){
					    			 																	     		 Ext.example.msg('success','Ŀ¼�����ɹ�');
					    			 																	     		 var  n_node=new  Ext.tree.TreeNode({
					    			 																	     		 		text:opt.params.dir_name,
					    			 																	     		 		isLeaf:false
					    			 																	     		 });
					    			 																	     		 n_node.attributes.module_code=opt.params.module_code;
					    			 																	     		 n_node.attributes.parent_code=opt.params.menu_code;
					    			 																	     		 n_node.attributes.menu_code=result.return_message;
					    			 																	     		 Ems.page.PageMenuReletionApp.s_node.appendChild(n_node);
					    			 																	     }else{
					    			 																	     		  Ext.example.msg('faild','Ŀ¼����ʧ��');
					    			 																				  return 1;
					    			 																	     }   
					    			 																}
					    			 													})
					    			 										}
					    			 							});
					    			 				}
					    			 		}
					    		}]
					    })
					    
					    this.on({
					    		 contextmenu:this.onNodeContextmenu,
					    		 scope:this
					    });
					    
					    Ems.page.SystemMenuTree.superclass.initComponent.call(this);
			},
			onNodeContextmenu:function(node,e){
						 e.stopEvent();
						 Ems.page.PageMenuReletionApp.s_node=node;
						 this.contextmenu.showAt(e.getXY());
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
	        		{header:'ҳ��ID',dataIndex:'pageId'},
	        		{header:'ҳ����ԴID',dataIndex:'pageResourceId'},
	        		{header:'ҳ������',dataIndex:'pageType'},
	        		{header:'ҳ���ͼ',dataIndex:'pageImageUrl',renderer:function(value){
	        																								if(value){
	        																											return  '<img  src="'+value+'" width="40" height="40"  />';
	        																								}else{
	        																											return  '';
	        																								}
	        																					
	        																					}},
	        	   {header:'ҳ������',dataIndex:'pageName'},
	        	   {header:'��������',dataIndex:'operCode'},
	        	   {header:'�˵�����',dataIndex:'menuCode'}
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
								title:'��ͨҳ����Ϣ'
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
					     this.tbar=new  Ext.Toolbar({
					     			items:[{
					     					text:'ɾ����ͨҳ��',
					     					iconCls:'silk-delete',
					     					handler:function(){
					     								var  record=Ems.page.PageMenuReletionApp.page_data_view.getSelectionModel().getSelected();
					     								if(!record){
					     											Ext.example.msg('warning','��ѡ��ɾ����');
					     											return 1;
					     								}
					     								Ext.Ajax.request({
					     											url:'deleteInfoPage.action',
					     											params:{
					     														page_id:record.get('pageId')
					     											},
					     											success:function(res,opt){
					     														var  result=Ext.decode(res.responseText);
					     														if(result  &&  result.is_success){
					     																	Ext.example.msg('success','ɾ���ɹ�');
					     																	Ems.page.PageMenuReletionApp.page_data_view.store.load();
					     														}
					     											}
					     								})
					     					}
					     			}]
					     })
					     
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
		   	 				 			title:'ҳ����Դ',
		   	 				 			autoScroll:true,
		   	 				 			containerScroll: true,
		   	 				 			cm:new Ext.grid.ColumnModel({
		   	 				 					defaults:{
		   	 				 							width:50
		   	 				 					},
		   	 				 					columns:[
		   	 				 					{header:'���ID',dataIndex:'pageResource'},
		   	 				 					{header:'XTYPE',dataIndex:'xtypeCode'},
		   	 				 					{header:'�������',dataIndex:'componentName'},
		   	 				 					{header:'��������ID',dataIndex:'valueId'},
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
		   	 				 			title:'ҳ������',
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
		   	 				 						{header:'���ID',dataIndex:'resourceId'},
		   	 				 						{header:'ҳ����ԴID',dataIndex:'pageResource'},
		   	 				 						{header:'�������',dataIndex:'componentName'},
		   	 				 						{header:'��������ID',dataIndex:'valueId'},
		   	 				 						{header:'��������',dataIndex:'variableName'},
		   	 				 						{header:'�豸ID',dataIndex:'deviceId'},
		   	 				 						{header:'�豸����',dataIndex:'deviceName'},
		   	 				 						{header:'�豸����',dataIndex:'deviceType'}
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
									if(!record.data){
												Ext.example.msg('warning','���ܸ��Ĳ˵�����');
												return 1;
									}
									if(record.get('menuCode')){
												Ext.example.msg('warning','ҳ���ѱ��˵�ʹ��');
												return  1;
									}
									
									Ext.Ajax.request({
											url:'AddNormalPageMenu.action',
											params:{
													menu_code:node.menu_code,
													module_code:node.module_code,
													is_leaf:node.leaf,
													page_id:record.get('pageId'),
													node_tree:e.target,
													grid_row:record
											},
											success:function(result,opt){
													 if(result.responseText){
													 			var  res=Ext.decode(result.responseText);
													 			if(res.is_success){
													 						//Ext.Msg.alert('ok','add node');
													 						var  param=opt.params;
													 						if(!param.is_leaf){
													 							//	param.node_tree.load();
													 							var  n_node=new  Ext.tree.TreeNode({
													 									text:param.grid_row.get('pageName'),
													 									leaf:true
													 							});
													 							n_node.attributes.menu_code=res.menu_code;
													 							n_node.attributes.module_code=res.module_code;
													 							param.node_tree.appendChild(n_node);	
													 							Ems.page.PageMenuReletionApp.page_data_view.store.load();
													 						}
													 			}											 			
													 }
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