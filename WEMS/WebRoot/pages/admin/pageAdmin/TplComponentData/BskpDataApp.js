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
			'</div><div class="x-item-text"><p>ҳ��ID : {bspkPageId}</p>',
			'<p>ҳ������ : {bspkPageName}</p></div><div class="x-item-text"><p>���(px)��{bspkImageWidth}</p><p>',
			'�߶�(px) : {bspkImageHeight}</p>',
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
					'<div class="x-item-text"><p>ģ��ҳ����  : {bspkPageName}</p>',
					'<p>��ԴID �� {bspkPageResource}</p>',
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
									text:'ɾ��',
									handler:function(){
										//Ext.Msg.alert('ko',this.ownerCt.record.get('bspkPageId'));
										Ext.Ajax.request({
												url:'removeDataPage.action',
												params:{
													bspk_page_id:this.ownerCt.record.get('bspkPageId')
												},
												success:function(){
												    dv.store.load();
												    Ext.example.msg('Success','��ʱ����ҳ��ɾ���ɹ�');
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
					 Ext.example.msg('����','��δѡ��ҳ��');
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
						title:'��ʱҳ��',
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
						{header:'�豸ID',dataIndex:'deviceId'},
						{header:'�豸����',dataIndex:'deviceName'},
						{header:'�豸����',dataIndex:'deviceType'},
						{header:'�豸IP',dataIndex:'deviceIp',width:120},
						{header:'�ɼ�����ID',dataIndex:'collectTaskId'},
						{header:'��������',dataIndex:'variableName'},
						{header:'�豸����ID',dataIndex:'deviceVarId'},
						{header:'����ֵ',dataIndex:'varPhyValue'},
						{header:'�߼�ֵ',dataIndex:'varLogicValue'},
						{header:'�ɼ�ʱ��',dataIndex:'collectTime',width:180}]
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






Ems.page.bskpPageViewer=Ext.extend(Ext.Panel,{
		region:'center',
		initComponent:function(){
				this.tbar=['ѡ��','-',{
					text:'ʵʱ����',
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
									text:'ҳ������б�',
									handler:function(){
										   var  currentPage=Ext.getCmp('bskpPagePanel').PageView.selectedPage;
										   if(!currentPage){
										   				Ext.example.msg('����','δѡȡҳ��');
										   				return 1;
										   }
										   
										    if(!this.PageResourceWindow){
											 			this.PageResourceWindow=new  Ext.Window({
											 							width:597,
											 							height:400,
											 							autoScroll:true,
											 							closeAction:'hide',
						  												resizable:false,
											 							items:[new  Ext.grid.GridPanel({
											 									width:580,
											 									height:367,
											 									border:false,
											 									sm:new  Ext.grid.RowSelectionModel({
											 											singleSelect:true
											 									}),
											 									cm:new  Ext.grid.ColumnModel({
											 											defaults:{
											 														width:60,
																									menuDisabled:true
											 											},
											 											columns:[
											 											{header:'��ԴID',dataIndex:'resourceId'},
											 											{header:'ҳ����ԴID',dataIndex:'pageResource'},
											 											{header:'Xtype',dataIndex:'xtypeCode'},
											 											{header:'Axis Y',dataIndex:'resourceTop'},
											 											{header:'Axis X',dataIndex:'resourceLeft'},
											 											{header:'Width',dataIndex:'resourceWidth'},
											 											{header:'Height',dataIndex:'resourceHeight'},
											 											{header:'��������ID',dataIndex:'config'}
											 											]
											 									}),
											 									store:new Ext.data.JsonStore({
											 											 url:'QryBspkPageResource.action',
											 											 baseParams:{
											 											 			 bspk_page_resource:currentPage.get('bspkPageResource')
											 											 },
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
											 											 autoLoad:true
											 									})
											 							})]
											 			});
											 }else{
											 			this.PageResourceWindow.items.items[0].store.load({
											 						params:{
											 								   bspk_page_resource:currentPage.get('bspkPageResource')
											 						}
											 			});
														
											 }
											 
											 this.PageResourceWindow.show();
										   
									}
								},'-',{
									text:'ҳ�����������б�',
									handler:
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