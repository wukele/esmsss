Ext.ns('Ems.page')

Ems.page.bspkPageMenu=Ext.extend(Ext.menu.Menu,{
		setRecord:function(rec){
				this.record=rec;
		},
		setSelectIdx:function(idx){
				this.idx=idx;
		}
})


Ems.page.bskpPagePanel=Ext.extend(Ext.Panel,{

		getSelectorTpl:function(){
			var tpl=['<tpl for=".">','<div class="x-seach-item">','<div class="x-list-image"><img height="40" width="40" src="{bspkImagePath}" />',
			'</div><div class="x-item-text"><p>页面ID : {bspkPageId}</p>',
			'<p>页面名称 : {bspkPageName}</p></div><div class="x-item-text"><p>宽度(px)：{bspkImageWidth}</p><p>',
			'高度(px) : {bspkImageHeight}</p>',
			'</div></tpl>'].join('');
			return tpl;
		},
		initComponent:function(){
				this.store=new Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({url:'BskpInfoPage.action'}),
						fields:Ems.page.BskpDataApp.BskpInfoPageField,
						root:'bspkPages'
				});
				this.PageView=new Ext.DataView({
					tpl:new Ext.XTemplate('<tpl for=".">',
					'<div class="x-seach-item"><div class="x-item-image"><img src="{bspkImagePath}" width="40px" height="40px"/></div>',
					'<div class="x-item-text"><p>模板页名称  : {bspkPageName}</p>',
					'<p>资源ID ： {bspkPageResource}</p>',
					'</div>',
					'</div></tpl>'),
					itemSelector:'div.x-seach-item',
					multiSelect:true,
					store:this.store,
					overClass:'x-seach-item-over'
				})
				this.store.load();
				this.PageView.on('dblclick',this.bspkPageSelected);
				this.PageView.on({
						contextmenu:this.onPageViewContextmenu,
						scope:this
				})
				this.items=this.PageView;
				Ems.page.bskpPagePanel.superclass.initComponent.call(this);
		},
		onPageViewContextmenu:function(dv,idx,ht,e){
				
				if(!this.Contextmenu){
						this.Contextmenu=new Ems.page.bspkPageMenu({
								items:[{
									text:'删除',
									handler:function(){
										//Ext.Msg.alert('ko',this.ownerCt.record.get('bspkPageId'));
										Ext.Ajax.request({
												url:'removeDataPage.action',
												params:{
													bspk_page_id:this.ownerCt.record.get('bspkPageId')
												},
												success:function(){
												    dv.store.load();
												    Ext.example.msg('Success','临时数据页面删除成功');
												}
										});
									}
								}]
						});
				}
				e.stopEvent();
				this.Contextmenu.setRecord(dv.store.getAt(idx));
				this.Contextmenu.setSelectIdx(idx)
				this.Contextmenu.showAt(e.getXY());	
		},
		
		
		bspkPageSelected:function(dataView,idx){			
				var record=dataView.store.getAt(idx);
				if(record==undefined){
					 Ext.example.msg('警告','还未选定页面');
				}
				this.selectedPage=record;
				Ems.page.BskpDataApp.BspkPageViewer.load({
					url:'BspkPreview.action',
					scripts:true,
					params:{
						 page_id:record.get('bspkPageId')
					}
				});		
		}	
});

Ext.reg('bskpPagePanel',Ems.page.bskpPagePanel);




Ems.page.DataPanel=Ext.extend(Ext.TabPanel,{
		activeTab:0,
		width:350,
		region:'west',
		initComponent:function(){
				this.items=[{
						xtype:'bskpPagePanel',
						title:'临时页面',
						id:'bskpPagePanel'
				}]; 
				Ems.page.DataPanel.superclass.initComponent.call(this);
		}
});


Ems.page.RealTimeDataWindow=Ext.extend(Ext.Window,{
		height:400,
		width:790,
		GetRealTimeDataColumn:function(){
				var DataCol=new Ext.grid.ColumnModel({
					defaults:{
							width:60,
							menuDisabled:true
					},
					columns:[
						{header:'设备ID',dataIndex:'deviceId'},
						{header:'设备名称',dataIndex:'deviceName'},
						{header:'设备类型',dataIndex:'deviceType'},
						{header:'设备IP',dataIndex:'deviceIp',width:120},
						{header:'采集任务ID',dataIndex:'collectTaskId'},
						{header:'变量名称',dataIndex:'variableName'},
						{header:'设备变量ID',dataIndex:'deviceVarId'},
						{header:'物理值',dataIndex:'varPhyValue'},
						{header:'逻辑值',dataIndex:'varLogicValue'},
						{header:'采集时间',dataIndex:'collectTime',width:180}]
				});
				return DataCol;
		},
		GetRealTimeDataFields:function(){
				var Datafields=[
					{name:'deviceId',mapping:'deviceId',type:'int'},
					{name:'deviceName',mapping:'deviceName'},
					{name:'deviceType',mapping:'deviceType'},
					{name:'deviceIp',mapping:'deviceIp'},
					{name:'collectTaskId',mapping:'collectTaskId',type:'int'},
					{name:'variableName',mapping:'variableName'},
					{name:'deviceVarId',mapping:'deviceVarId'},
					{name:'varPhyValue',mapping:'varPhyValue'},
					{name:'varLogicValue',mapping:'varLogicValue'},
					{name:'collectTime',mapping:'collectTime',type:'date'}]
				return Datafields;
		},
		initComponent:function(){
					this.DataPanel=new Ext.grid.GridPanel({
							width:780,
							height:400,
							autoScroll:true,
							border:false,
							cm:this.GetRealTimeDataColumn(),
							store:new Ext.data.JsonStore({
									url:'qryAllRealTimeData.action',
									fields:this.GetRealTimeDataFields(),
									autoLoad:true,
									root:'real_time_datas'
							}),
							sm:new Ext.grid.RowSelectionModel({
								singleSelect:true
							})
					});
					this.items=[this.DataPanel];
					Ems.page.RealTimeDataWindow.superclass.initComponent.call(this);
		}
		
});



Ems.page.DeviceDataPanel=Ext.extend(Ext.Panel,{
		 	height:600,
			width:1024,
			title:'设备数据',
			border:false,
			layout:'column',
			
			setPageRes:function(res){
						this.record=res;
			},
			
			initComponent:function(){
							this.DeviceStore=new Ext.data.GroupingStore({
										proxy:new Ext.data.HttpProxy({
													url:'DeviceInfoQry.action'
										}),
										reader:new Ext.data.JsonReader({
													 fields:[
													 {name:'deviceId',mapping:'deviceId',type:'int'},
													 {name:'deviceName',mapping:'deviceName'},
													 {name:'deviceType',mapping:'deviceType'},
													 {name:'deviceIp',mapping:'deviceIp'},
													 {name:'collectTaskId',mapping:'collectTaskId'},
													 {name:'actionFlag',mapping:'actionFlag'},
													 {name:'roomId',mapping:'roomId'}
													 ],
													 root:'deviceInfos'
										}),
										groupField:'deviceType',
										autoLoad:true
							});
							this.DeviceView=new Ext.grid.GridPanel({
									columnWidth:0.3,
								    store:this.DeviceStore,
								    tbar:new  Ext.Toolbar({
								    		items:[
								    		{
								    				iconCls:'silk-connect',
								    				text:'设备绑定',
								    				handler:function(){
								    							
								    				}
								    		}
								    		]
								    }),
								    margins:'5 5 5 5',
								    height:595,
								    frame:true,
								    autoScroll:true,
								    sm:new Ext.grid.RowSelectionModel({
								    			singleSelect:true
								    }),
								    cm:new Ext.grid.ColumnModel({
								    			defaults:{
								    						width:60,
								    						menuDisabled:true
								    			},
								    			columns:[
								    			{header:'设备ID',dataIndex:'deviceId'},
								    			{header:'设备名称',dataIndex:'deviceName'},
								    			{header:'设备类型',dataIndex:'deviceType'},
								    			{header:'设备IP',dataIndex:'deviceIp',width:100},
								    			{header:'采集任务ID',dataIndex:'collectTaskId'},
								    			{header:'是否在用',dataIndex:'actionFlag',renderer: function(value, metaData, record, rowIndex, colIndex, store) {
								    																											if(value){
								    																														return  '是';
								    																											}else{
								    																														return   '否';
								    																											}
								    																								 }
								    			},
								    			{header:'房间ID',dataIndex:'roomId'}
								    			]
								    }),
								    view: new Ext.grid.GroupingView({
            								forceFit:true,
            								groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        							})
							});
							this.deviceVarStore=new Ext.data.JsonStore({
									url:'QryRealTimeDeviceVarible.action',
									fields:[
											{name:'deviceId',mapping:'deviceId',type:'int'},
											{name:'deviceName',mapping:'deviceName'},
											{name:'deviceType',mapping:'deviceType'},
											{name:'deviceIp',mapping:'deviceIp'},
											{name:'collectTaskId',mapping:'collectTaskId',type:'int'},
											{name:'variableName',mapping:'variableName'},
											{name:'deviceVarId',mapping:'deviceVarId'},
											{name:'varPhyValue',mapping:'varPhyValue'},
											{name:'varLogicValue',mapping:'varLogicValue'},
											{name:'collectTime',mapping:'collectTime',type:'date'}
									],
									root:'real_time_datas'
							});
							this.deviceVarGrid=new  Ext.grid.GridPanel({
									columnWidth:0.55,
									margins:'5 5 5 5',
									height:590,
									frame:true,
									store:this.deviceVarStore,
									autoScroll:true,
									tbar:new   Ext.Toolbar({
											items:[{
														text:'绑定',
														iconCls:'silk-connect',
														handler:function(){
																	var record=	this.ownerCt.ownerCt.getSelectionModel().getSelected();
																	if(!record){
																			Ext.example.msg('警告','请选择需绑定的设备变量');
																			return 1;
																	}
																	var  v=this.ownerCt.ownerCt.ownerCt.record;
																	var  vid=v.get('valueId');
																	var  req={};
																	if(!vid){
																				req.device_value_id=record.get('deviceVarId');
																				req.resource_id=v.get('resourceId');
																				req.is_create_new=true;
																	}else{
																				req.device_value_id=record.get('deviceVarId');
																				req.is_create_new=false;
																				req.value_id=vid;
																	}
																	Ext.Ajax.request({
																				url:'BindDeviceVar.action',
																				params:req,
																				success:function(){
																							Ext.example.msg('OK','组件数据绑定成功');
																							Ext.WindowMgr.getActive().hide(1);
																				}
																	})
														}
											}]
									}),
									cm:new Ext.grid.ColumnModel({
											defaults:{
												 width:30,
												 menuDisabled:true
											},
											columns:[
												{header:'设备变量ID',dataIndex:'deviceVarId'},
												{header:'设备变量名称',dataIndex:'variableName'},
												{header:'物理值',dataIndex:'varPhyValue'},
												{header:'逻辑值',dataIndex:'varLogicValue'},
												{header:'采集时间',dataIndex:'collectTime'}
												]
									}),
									sm:new Ext.grid.RowSelectionModel({
								    			singleSelect:true
								    }), 
								    viewConfig:{
								    		 forceFit: true
								    }
							});
							this.DeviceView.on({
										click:this.onDeviceSelect
							});
							this.items=[this.DeviceView,this.deviceVarGrid];
					    	Ems.page.DeviceDataPanel.superclass.initComponent.call(this);
			},
			
			onDeviceSelect:function(e){
					  var   sd=this.getSelectionModel().getSelected();
					  this.ownerCt.deviceVarStore.load({
					  			params:{
					  						device_id:sd.get('deviceId')
					  			}
					  });
			}	
});

Ext.reg('devicePanel',Ems.page.DeviceDataPanel);



Ems.page.RuleDataEnginePanel=Ext.extend(Ext.Panel,{
		   width:1024,
		   height:800,
		   layout:'column',
		   initComponent:function(){
		   					this.EnginePanel=new Ext.grid.GridPanel({
		   									store:new  Ext.data.JsonStore({
		   											url:'DataEnginelist.action',
		   											fields:[
		   											{name:'engineId',mapping:'engineId',type:'int'},
		   											{name:'engineCode',mapping:'engineCode'},
		   											{name:'engineName',mapping:'engineName'},
		   											{name:'actionName',mapping:'actionName'},
		   											{name:'actionConfig',mapping:'actionConfig'},
		   											{name:'engineType',mapping:'engineType'},
		   											{name:'actionClass',mapping:'actionClass'},
		   											{name:'maxInterval',mapping:'maxInterval',type:'int'}
		   											],
		   											root:'engines'
		   									}),
		   									cm:new Ext.grid.ColumnModel({
		   											defaults:{
		   														width:60,
		   													    menuDisabled:true
		   											},
		   											columns:[
		   											{header:'引擎编号',dataIndex:'engineId'},
		   											{header:'引擎Code',dataIndex:'engineCode'},
		   											{header:'引擎名称',dataIndex:'engineName'},
		   											{header:'交易名称',dataIndex:'actionName'},
		   											{header:'引擎类型',dataIndex:'engineType'},
		   											{header:'延迟',dataIndex:'maxInterval'}
		   											]
		   									}),
		   									sm:new Ext.grid.RowSelectionModel({
								    			singleSelect:true
								    		}), 
								    		viewConfig:{
								    		 		forceFit: true
								    		}
		   					});
		   					
		   					
		   			        	
		   }
});



Ems.page.bskpPageViewer=Ext.extend(Ext.Panel,{
		region:'center',
		initComponent:function(){
				this.tbar=['选项','-',{
					text:'实时数据',
					handler:function(){
						  if(!this.DataWindow){
						  		this.DataWindow=new Ems.page.RealTimeDataWindow({
						  			closeAction:'hide',
						  			resizable:false
						  		});
						  }
						  this.DataWindow.show(this.getEl());
					}
				}]; 
				this.on({
					afterrender:this.onAfterRender,
					scope:this
				})
				Ems.page.bskpPageViewer.superclass.initComponent.call(this);
		},
		onAfterRender:function(c){
				c.getEl().on({
					contextmenu:this.onContextmenu
				})
		},
		onContextmenu:function(e){
				if(!this.CMenu){
						this.CMenu=new Ext.menu.Menu({
								items:[{
									text:'页面组件列表',
									handler:function(e){
										   var  currentPage=Ext.getCmp('bskpPagePanel').PageView.selectedPage;
										   if(!currentPage){
										   				Ext.example.msg('错误','未选取页面');
										   				return 1;
										   }
										   
										    if(!this.PageResourceWindow){
										    			var  ResTool=new  Ext.Toolbar({
										    					items:[{
										    							text:'组件数据绑定',
										    							iconCls:'silk-connect',
										    							handler:function(){
										    										var   record=this.ownerCt.ownerCt.getSelectionModel().getSelected();
										    										if(!record){
										    												Ext.example.msg('错误','请选定需绑定的组件');
										    												return 1;
										    										}
										    										if(!this.DeviceWindow){
										    													this.DeviceDataPanel=new  Ems.page.DeviceDataPanel();
										    													this.DeviceDataPanel.setPageRes(record); 
										    													this.DeviceWindow=new Ext.Window({
										    																	height:600,
										    																	width:800,
										    																	closeAction:'hide',
										    																	resizable:false,
										    																	items:[
										    																			this.DeviceDataPanel
										    																	]
										    													})
										    													this.DeviceWindow.on({
										    															hide:function(win){
										    																	   var  cmpWin=Ext.getCmp('PageCmpWin');
										    																	    var  currentPage=Ext.getCmp('bskpPagePanel').PageView.selectedPage;
										    																	   if(!cmpWin){
										    																	   			return 1;
										    																	   }else{
										    																	   			cmpWin.items.items[0].items.items[0].store.load({
										    																	   					params:{
										    																	   								bspk_page_resource:currentPage.get('bspkPageResource')
										    																	   					}
										    																	   			})
										    																	   			cmpWin.show();
										    																	   }
										    															}
										    													})
										    										}else{
										    													this.DeviceDataPanel.setPageRes(record); 
										    										}
										    										Ext.WindowMgr.getActive().hide();
										    										this.DeviceWindow.show();
										    							}
										    					},'-',{
										    						     text:'组件数据绑定关系解除',
										    						     iconCls:'silk-delete',
										    						     handler:function(){
										    						     		
										    						     }
										    					}]
										    			});
										    			
										    			
										    				
										    		     this.reletionBindPanel=new  Ext.grid.GridPanel({
										    		     				title:'绑定关系',
										    		     				border:false,
										    		     				id:'bind_reletion',
										    							store:new Ext.data.JsonStore({
										    																		url:'QryBindReletion.action',
										    																		fields:[
										    																		{name:'deviceName',mapping:'deviceName'},
										    																		{name:'deviceType',mapping:'deviceType'},
										    																		{name:'xtypeCode',mapping:'xtypeCode'},
										    																		{name:'resourceId',mapping:'resourceId',type:'int'},
										    																		{name:'valueId',mapping:'valueId'},
										    																		{name:'variableName',mapping:'variableName'}
										    																		],
										    																	    root:'reletions'
										    																}),
										    																cm:new Ext.grid.ColumnModel({
										    																		defaults:{
										    																				width:100,
										    																				menuDisabled:true
										    																		},
										    																		columns:[
										    																		{header:'设备名称',dataIndex:'deviceName'},
										    																		{header:'设备种类',dataIndex:'deviceType'},
										    																		{header:'变量名称',dataIndex:'variableName'},
										    																		{header:'XTYPE',dataIndex:'xtypeCode'},
										    																		{header:'资源ID',dataIndex:'resourceId'},
										    																		{header:'值配置ID',dataIndex:'valueId'}
										    																		]
										    																}),
										    								sm:new  Ext.grid.RowSelectionModel({
											 																				singleSelect:true
										    								})
										    			});
										    			
										    			
										    			this.PageResource= new  Ext.grid.GridPanel({
											 									tbar:ResTool,
											 									border:false,
											 									title:'页面资源',
											 									sm:new  Ext.grid.RowSelectionModel({
											 											singleSelect:true
											 									}),
											 									cm:new  Ext.grid.ColumnModel({
											 											defaults:{
											 														width:60,
																									menuDisabled:true
											 											},
											 											columns:[
											 											{header:'资源ID',dataIndex:'resourceId'},
											 											{header:'页面资源ID',dataIndex:'pageResource'},
											 											{header:'Xtype',dataIndex:'xtypeCode'},
											 											{header:'Axis Y',dataIndex:'resourceTop'},
											 											{header:'Axis X',dataIndex:'resourceLeft'},
											 											{header:'Width',dataIndex:'resourceWidth'},
											 											{header:'Height',dataIndex:'resourceHeight'},
											 											{header:'数据配置ID',dataIndex:'valueId',width:80}
											 											]
											 									}),
											 									store:new Ext.data.JsonStore({
											 											 url:'QryBspkPageResource.action',
											 											 root:'page_res',
											 											 fields:[
											 											 {name:'resourceId',mapping:'resourceId',type:'int'},
											 											 {name:'pageResource',mapping:'pageResource'},
											 											 {name:'xtypeCode',mapping:'xtypeCode'},
											 											 {name:'resourceTop',mapping:'resourceTop'},
											 											 {name:'resourceLeft',mapping:'resourceLeft'},
											 											 {name:'resourceWidth',mapping:'resourceWidth'},
											 											 {name:'resourceHeight',mapping:'resourceHeight'},
											 											 {name:'valueId',mapping:'valueId'},
											 											 {name:'config',mapping:'config'}
											 											 ],
											 											 baseParams:{
											 												bspk_page_resource:currentPage.get('bspkPageResource')
											 											},
											 											autoLoad:true
											 									})
											 									
											 							});
											 							
											 		  this.tabLayoutPanel=new Ext.TabPanel({
											 		  			activeTab:0,
											 		  			border:false,
											 		  			height:360,
											 		  			items:[
											 		  						this.PageResource,
											 		  						this.reletionBindPanel
											 		  			]
											 		  });
										    		  
											 		 this.tabLayoutPanel.on({
											 		 		 tabchange:function(tab,panel){
											 		 		  				if(panel.getId()=='bind_reletion'){
											 		 		  							 var  currentPage=Ext.getCmp('bskpPagePanel').PageView.selectedPage;
										  												 if(!currentPage){
										   															Ext.example.msg('错误','未选取页面');
										   															return 1;
										   												}
											 		 		  							panel.store.load({params:{
											 		 		  										bspk_page_resource:currentPage.get('bspkPageResource')}
											 		 		  							})
											 		 		  				}
											 		 		  },
											 		 		  scope:this
											 		 });
											 		  
										    			
											 			this.PageResourceWindow=new  Ext.Window({
											 							id:'PageCmpWin',
											 							width:597,
											 							height:400,
											 							autoScroll:true,
											 							closeAction:'hide',
						  												resizable:false,
						  												title:'页面组件',
											 							items:[
											 							      this.tabLayoutPanel
											 							]
											 			});
											 }else{
											 			this.PageResourceWindow.items.items[0].items.items[0].store.load({
											 						params:{
											 								   bspk_page_resource:currentPage.get('bspkPageResource')
											 						}
											 			});
														
											 }
											 
											 this.PageResourceWindow.show(e.getEl());
										   
									}
								},'-',{
									text:'页面数据引擎列表',
									handler:function(){
										
									}
								},'-',{
									text:'生成普通页面',
									handler:function(){
												  var  currentPage=Ext.getCmp('bskpPagePanel').PageView.selectedPage;
												  if(!currentPage){
										   				Ext.example.msg('错误','未选取页面');
										   				return 1;
										   		  }
										   		 Ext.Ajax.request({
										   		 		url:'CreateInfoPage.action',
										   		 		params:{
										   		 				bspk_page_id:currentPage.get('bspkPageId')
										   		 		},
										   		 		success:function(e){
										   		 			    var  res=Ext.decode(e.responseText);
										   		 			    if(res && res.is_success){
										   		 			    			Ext.example.msg('OK','页面生成成功')
										   		 			    }else{
										   		 			    			if(res && res.message){
										   		 			    						Ext.example.msg('warm',res.message)
										   		 			    			}else{
										   		 			    						Ext.example.msg('error','返回无效值');
										   		 			    			}
										   		 			    }
										   		 		}
										   		 });
									}
								},'-',{
									text:'生成设备页面',
									handler:function(){
										       	  var  currentPage=Ext.getCmp('bskpPagePanel').PageView.selectedPage;
												  if(!currentPage){
										   				Ext.example.msg('错误','未选取页面');
										   				return 1;
										   		  }
										   		 Ext.Ajax.request({
										   		 		url:'CreateDeviceInfoPage.action',
										   		 		params:{
										   		 				bspk_page_id:currentPage.get('bspkPageId')
										   		 		},
										   		 		success:function(e){
										   		 			    var  res=Ext.decode(e.responseText);
										   		 			    if(res && res.is_success){
										   		 			    			Ext.example.msg('OK','页面生成成功')
										   		 			    }else{
										   		 			    			if(res && res.message){
										   		 			    						Ext.example.msg('warm',res.message)
										   		 			    			}else{
										   		 			    						Ext.example.msg('error','返回无效值');
										   		 			    			}
										   		 			    }
										   		 		}
										   		 });
									}
								}]
						})
				}
				e.stopEvent();
				this.CMenu.showAt(e.getXY());
		}
}),




Ems.page.BskpDataApp=function(){
		return {
			BskpInfoPageField:[
						{name:'bspkPageId',mapping:'bspkPageId',type:'int'},
						{name:'bspkPageName',mapping:'bspkPageName'},
						{name:'bspkImagePath',mapping:'bspkImagePath'},
						{name:'bspkImageWidth',mapping:'bspkImageWidth'},
						{name:'bspkImageHeight',mapping:'bspkImageHeight'},
						{name:'bspkPageResource',mapping:'bspkPageResource'},
						{name:'bspkOperCode',mapping:'bspkOperCode'}
						],
			
			
			
			init:function(){
					 this.BspkPageViewer=new Ems.page.bskpPageViewer({
							title:'Preview',
							bodyCssClass:'x-content-panel',
							margins:'5 5 5 0',
							autoScroll:true
						});
				
					 this.MainView=new Ems.page.TplContainer({
						layout:'border',
						items:[this.BspkPageViewer,
					    new Ems.page.DataPanel({
					    	collapsible:true,
							animCollapse:true,
							autoScroll:true,
							animate: false,
        					collapseMode:'mini',
        					header: false,
        					collapseFirst:false,
					    	margins:'5 5 5 5'
					    })],
						container:'container'
					});
			}
		}
}();

Ext.onReady(Ems.page.BskpDataApp.init,Ems.page.BskpDataApp);