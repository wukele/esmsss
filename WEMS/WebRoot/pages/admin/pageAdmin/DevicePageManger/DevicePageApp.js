Ext.ns('Ems.page')



Ems.page.DetailDev=Ext.extend(Ext.TabPanel,{
		   	 activeTab: 0,
		   	 width:360,
		   	 constructor:function(cfg){
		   	 				var  config=cfg||{
		   	 					region: 'east', 
								margins: '2 2 2 2',
								activeItem: 0,
								border: 1,
								autoScroll: true
		   	 				};
		   	 				Ems.page.DetailDev.superclass.constructor.call(this,config);
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
		   	 				 				   url:'LoadDevPageComponents.action',
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
		   	 				 						url:'LoadDevPageDataRule.action',
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
		   	 				 
		   	 				 Ems.page.DetailDev.superclass.initComponent.call(this);
		   	 },
		   	 
		   	 
		   	 onTabPanelChange:function(tab,panel){
		   	 				var  record=Ems.page.DevicePageApp.DevicePageGrid.getSelectionModel().getSelected()
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









Ems.page.DevicePageApp=function(){
			return  {
						initApp:function(){
							//设备列表
									this.DeviceTableGrid=new   Ext.grid.GridPanel({
												title:'系统设备',
												autoScroll:true,
												region:'west',
												width:500,
												margins:'2 2 2 2',
												collapsible:true,
												animCollapse:true,
												store:new  Ext.data.GroupingStore({
															proxy:new Ext.data.HttpProxy({
																	url:'DeviceInfoQry.action'
															}),
															reader:new Ext.data.JsonReader({
																 fields:[
													 					{name:'deviceId',mapping:'deviceId',type:'int'},
																	    {name:'deviceName',mapping:'deviceName',width:120},
													 					{name:'deviceType',mapping:'deviceType'},
													 					{name:'deviceIp',mapping:'deviceIp'},
																	    {name:'collectTaskId',mapping:'collectTaskId'},
													 					{name:'actionFlag',mapping:'actionFlag'},
													 					{name:'roomId',mapping:'roomId'}
													 			],
															  root:'deviceInfos'
															}),
															groupField:'deviceType'
												}),
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
									//
									this.DevicePageGrid=new Ext.grid.GridPanel({
												region:'center',
												title:'设备页面',
												margins: '2 2 2 0',
												autoScroll:true,
												tbar:new Ext.Toolbar({
															items:[{
																	text:'链接设备',
																	iconCls:'silk-connect',
																	handler:function(){
																						var   record=this.ownerCt.ownerCt.getSelectionModel().getSelected();
																						if(!record ||  !record.get('pageId')){
																										Ext.example.msg('warn','请选取链接页面');
																										return  1;
																						}else{
																										 var  linkDev=Ems.page.DevicePageApp.DeviceTableGrid.getSelectionModel().getSelected();
																										 if(!linkDev || !linkDev.get('deviceId') ){
																										 		  Ext.example.msg('warn','请选取链接设备');	
																										 		  return 1
																										 }else{
																										 		if(record.get('deviceId')){
																										 					Ext.example.msg('warn','页面已被占用');
																										 					return 1;
																										 		}else{
																										 					Ext.Ajax.request({
																										 								url:'LinkDevPage.action',
																										 								params:{
																										 											page_id:record.get('pageId'),
																										 											device_id:linkDev.get('deviceId')
																										 								},
																										 								success:function(res,opt){
																										 											var  result=Ext.decode(res.responseText);
																										 											if(result.is_success){
																										 														Ext.example.msg('success','链接成功');
																										 														Ems.page.DevicePageApp.DevicePageGrid.store.load();
																										 											}else{
																										 														Ext.example.msg('faild','链接失败');
																										 											}
																										 								}
																										 					})
																										 		}
																										 }	
																						}
																	}
															},'-',{
																	text:'解除链接关系',
																	iconCls:'silk-delete',
																	handler:function(){
																					var   record=this.ownerCt.ownerCt.getSelectionModel().getSelected();
																						if(!record ||  !record.get('pageId')){
																										Ext.example.msg('warn','请选择页面');
																										return  1;
																						}else{
																										if(!record.get('deviceId')){
																													Ext.example.msg('warn','选定页面未被链接');
																													return 1;
																										}else{
																													Ext.Ajax.request({
																															url:'DeLinkDevPage.action',
																															params:{
																																		page_id:record.get('pageId')
																															},
																															success:function(res){
																																		 var result=Ext.decode(res.responseText);
																																		 if(result.is_success){
																																		 			Ext.example.msg('success','解除成功');
																																		 			Ems.page.DevicePageApp.DevicePageGrid.store.load();
																																		 }else{
																																		 			Ext.example.msg('faild','解除链接失败');
																																		 }
																															}
																													});		
																											
																										}
																						}
																	}
															}
															]
												}),
												store:new Ext.data.JsonStore({
															url:'LoadDevPages.action',
															fields:[
															{name:'pageId',mapping:'pageId',type:'int'},
															{name:'pageResourceId',mapping:'pageResourceId'},
															{name:'pageType',mapping:'pageType'},
															{name:'pageImageUrl',mapping:'pageImageUrl'},
															{name:'pageName',mapping:'pageName'},
															{name:'pageImageWidth',mapping:'pageImageWidth',type:'int'},
															{name:'pageImageHeight',mapping:'pageImageHeight',type:'int'},
															{name:'deviceId',mapping:'deviceId'},
															{name:'deviceType',mapping:'deviceType'}
															],
															root:'info_dev_pages'
												}),
												cm:new  Ext.grid.ColumnModel({
															defaults:{
																	width:60,
																	menudisable:true
															},
															columns:[
															{header:'页面ID',dataIndex:'pageId'},
															{header:'页面资源ID',dataIndex:'pageResourceId'},
															{header:'页面名称',dataIndex:'pageName'},
															{header:'页面宽度',dataIndex:'pageImageWidth'},
															{header:'页面高度',dataIndex:'pageImageHeight'},
															{header:'设备ID',dataIndex:'deviceId',renderer:function(value){
																		if(!value){
																					return  '未链接设备';
																		}else{
																					return  value;
																		}
															}},
															{header:'设备类型',dataIndex:'deviceType',renderer:function(value){
																		if(!value){
																					return  '未链接设备';
																		}else{
																					return  value;
																		}
															}},
															{header:'页面地图',dataIndex:'pageImageUrl',renderer:function(value){
																											if(value){
	        																											return  '<img  src="'+value+'" width="40" height="40"  />';
	        																								}else{
	        																											return  '';
	        																								}
															}}
															]
												})
									});
									
									this.DeviceTableGrid.on({
												render:function(){
															this.DeviceTableGrid.store.load();
												},
												scope:this
									});
									
									this.DevicePageGrid.on({
												render:function(){
														   this.DevicePageGrid.store.load();
												},
												scope:this
									});
									
									this.DevicePageGrid.on({
												click:this.onPageGridSelected,
												scope:this
									})
									
									//
									this.DevComp=new  Ems.page.DetailDev();
									 this.Appviewer=new Ems.page.TplContainer({
							  			layout:'border',
							  			container:'container',
							  			items:[
							  						this.DeviceTableGrid,
							  						this.DevicePageGrid,
							  						this.DevComp
							  			]
									 });
								
						},
						onPageGridSelected:function(){
										var  record=this.DevicePageGrid.getSelectionModel().getSelected();
										if(record){
													this.DevComp.getActiveTab().store.load({
																params:{
																		page_id:record.get('pageId')
																}
													})
										}
						}		
			}
}();


Ext.onReady(Ems.page.DevicePageApp.initApp,Ems.page.DevicePageApp);