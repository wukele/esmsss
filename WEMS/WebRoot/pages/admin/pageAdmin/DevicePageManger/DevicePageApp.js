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
		   	 				 			title:'ҳ������',
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
							//�豸�б�
									this.DeviceTableGrid=new   Ext.grid.GridPanel({
												title:'ϵͳ�豸',
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
								    							{header:'�豸ID',dataIndex:'deviceId'},
								    							{header:'�豸����',dataIndex:'deviceName'},
								    							{header:'�豸����',dataIndex:'deviceType'},
								    							{header:'�豸IP',dataIndex:'deviceIp',width:100},
								    							{header:'�ɼ�����ID',dataIndex:'collectTaskId'},
								    							{header:'�Ƿ�����',dataIndex:'actionFlag',renderer: function(value, metaData, record, rowIndex, colIndex, store) {
								    																											if(value){
								    																														return  '��';
								    																											}else{
								    																														return   '��';
								    																											}
								    																								 }
								    							},
								    							{header:'����ID',dataIndex:'roomId'}
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
												title:'�豸ҳ��',
												margins: '2 2 2 0',
												autoScroll:true,
												tbar:new Ext.Toolbar({
															items:[{
																	text:'�����豸',
																	iconCls:'silk-connect',
																	handler:function(){
																						var   record=this.ownerCt.ownerCt.getSelectionModel().getSelected();
																						if(!record ||  !record.get('pageId')){
																										Ext.example.msg('warn','��ѡȡ����ҳ��');
																										return  1;
																						}else{
																										 var  linkDev=Ems.page.DevicePageApp.DeviceTableGrid.getSelectionModel().getSelected();
																										 if(!linkDev || !linkDev.get('deviceId') ){
																										 		  Ext.example.msg('warn','��ѡȡ�����豸');	
																										 		  return 1
																										 }else{
																										 		if(record.get('deviceId')){
																										 					Ext.example.msg('warn','ҳ���ѱ�ռ��');
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
																										 														Ext.example.msg('success','���ӳɹ�');
																										 														Ems.page.DevicePageApp.DevicePageGrid.store.load();
																										 											}else{
																										 														Ext.example.msg('faild','����ʧ��');
																										 											}
																										 								}
																										 					})
																										 		}
																										 }	
																						}
																	}
															},'-',{
																	text:'������ӹ�ϵ',
																	iconCls:'silk-delete',
																	handler:function(){
																					var   record=this.ownerCt.ownerCt.getSelectionModel().getSelected();
																						if(!record ||  !record.get('pageId')){
																										Ext.example.msg('warn','��ѡ��ҳ��');
																										return  1;
																						}else{
																										if(!record.get('deviceId')){
																													Ext.example.msg('warn','ѡ��ҳ��δ������');
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
																																		 			Ext.example.msg('success','����ɹ�');
																																		 			Ems.page.DevicePageApp.DevicePageGrid.store.load();
																																		 }else{
																																		 			Ext.example.msg('faild','�������ʧ��');
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
															{header:'ҳ��ID',dataIndex:'pageId'},
															{header:'ҳ����ԴID',dataIndex:'pageResourceId'},
															{header:'ҳ������',dataIndex:'pageName'},
															{header:'ҳ����',dataIndex:'pageImageWidth'},
															{header:'ҳ��߶�',dataIndex:'pageImageHeight'},
															{header:'�豸ID',dataIndex:'deviceId',renderer:function(value){
																		if(!value){
																					return  'δ�����豸';
																		}else{
																					return  value;
																		}
															}},
															{header:'�豸����',dataIndex:'deviceType',renderer:function(value){
																		if(!value){
																					return  'δ�����豸';
																		}else{
																					return  value;
																		}
															}},
															{header:'ҳ���ͼ',dataIndex:'pageImageUrl',renderer:function(value){
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