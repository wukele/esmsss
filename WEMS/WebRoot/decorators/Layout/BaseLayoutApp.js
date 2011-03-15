Ext.ns('Ems.App')

/*Ems.App.DeviceTree=Ext.extend(Ext.tree.TreePanel,{
	title:'�豸',
	root:new Ext.tree.TreeNode({
		  text:'ϵͳ�豸',
		  expanded:true
	})
});*/



Ems.App.MainTab=Ext.extend(Ext.TabPanel,{
	  	margins:'2 0 2 2',
        region:'west',
        split: true,
        height: 400,
        width: 200,
	    minSize: 100,
	    maxSize: 500,
        autoScroll: true,
        activeTab: 0,
	  initComponent:function(){
	  		this.funcTree=CreateMenuBar();
	  		this.rootDevNode=new Ext.tree.AsyncTreeNode({
	  				iconCls:'silk-table-refresh',
	  				text:'ϵͳ�豸'
	  			});
	  		this.devT=new Ext.tree.TreePanel({
	  			title:'�豸',
	  			id:'devT',
	  			root:this.rootDevNode,
	  			dataUrl:'EmsSystemDeviceAction.action',
	  			listeners:{
	  					click:function( Node, e ){
	  							var deviceId=Node.attributes.url;
	  							if(deviceId && deviceId!=''){
	  									Ext.getCmp('content-panel').load({
	  											url:'EmsSysDeviceDispatcher.action',
	  											params:{
	  												device_id:deviceId
	  											},
	  											scripts:true
	  									});
	  							}
	  							clearAllTask();
	  					}
	  			}
	  		});
	  		this.items=[this.funcTree,this.devT];
	  		Ems.App.MainTab.superclass.initComponent.call(this);
	  },
	  listeners:{
	  		tabchange:function(e,tab){
	  				if(tab.getId()=='devT'){
	  						this.rootDevNode.reload();
	  				}
	  		}
	  }
});



Ems.App.FootPanel=Ext.extend(Ext.TabPanel,{
			constructor:function(cfg){
						var  config=cfg||{
								id:'footPanel',
								region:'south',
								split:true,
								border: 1,
								height:200,
								collapsible:true,
								animCollapse:true,
								collapsed:true,
								title:'�¼�/����',
								activeTab: 0,
								tabPosition:'bottom'
						};
						Ems.App.FootPanel.superclass.constructor.call(this,config);
			},
			initComponent:function(){
						this.alarmStore=new Ext.data.JsonStore({
									url:'LoadCurrentAlarms.action',
									fields:[
									{name:'alarmOperateId',mapping:'alarmOperateId',type:'int'},
									{name:'alarmPolicyId',mapping:'alarmPolicyId',type:'int'},
									{name:'deviceVariableId',mapping:'deviceVariableId',type:'int'},
									{name:'alarmTime',mapping:'alarmTime',type:'date'},
									{name:'alarmFormat',mapping:'alarmFormat'},
									{name:'alarmSendAddress',mapping:'alarmSendAddress'},
									{name:'alarmOperateResult',mapping:'alarmOperateResult'},
									{name:'alarmAffirmPersonnel',mapping:'alarmAffirmPersonnel'},
									{name:'alarmAffirmTime',mapping:'alarmAffirmTime'},
									{name:'alarmRelieveTime',mapping:'alarmRelieveTime'},
									{name:'alarmRelieveSendAddress',mapping:'alarmRelieveSendAddress'},
									{name:'alarmRelieveOperateResult',mapping:'alarmRelieveOperateResult'}
									],
									root:'alarms'
						});
						this.alarmGrid=new  Ext.grid.GridPanel({
									store:this.alarmStore,
									title:'����',
									cm:new Ext.grid.ColumnModel({
												defaults:{
															menudisable:true,
															width:100
												},
												columns:[
												{header:'����ID',dataIndex:'alarmOperateId'},
												{header:'��������ID',dataIndex:'alarmPolicyId'},
												{header:'�豸����ID',dataIndex:'deviceVariableId'},
												{header:'����ʱ��',dataIndex:'alarmTime',renderer:Ext.util.Format.dateRenderer('y-m-d h:i:s')},
												{header:'������ʽ',dataIndex:'alarmFormat'},
												{header:'�������͵�ַ',dataIndex:'alarmSendAddress'},
												{header:'�����������',dataIndex:'alarmOperateResult'},
												{header:'����ȷ����Ա',dataIndex:'alarmAffirmPersonnel'},
												{header:'����ȷ��ʱ��',dataIndex:'alarmAffirmTime'},
												{header:'�������ʱ��',dataIndex:'alarmRelieveTime'},
												{header:'����������͵�ַ',dataIndex:'alarmRelieveSendAddress'},
												{header:'��������������',dataIndex:'alarmRelieveOperateResult'}
												]
									}),
									sm:new  Ext.grid.RowSelectionModel({
												singleSelect:true
									}),
									viewConfig:{
												forceFit: true
									}
						});
						
						this.eventStore=new  Ext.data.JsonStore({
									url:'LoadCurrentEvents.action',
									fields:[
									{name:'eventSn',mapping:'eventSn',type:'int'},
									{name:'eventName',mapping:'eventName'},
									{name:'eventDescription',mapping:'eventDescription'},
									{name:'fireTime',mapping:'fireTime',type:'date'},
									{name:'eventLevel',mapping:'eventLevel',type:'int'},
									{name:'isConfirm',mapping:'isConfirm',type:'int'},
									{name:'sourceEntityCode',mapping:'sourceEntityCode'},
									{name:'deviceVarId',mapping:'deviceVarId'}
									],
									root:'event'
						});
						this.eventGrid=new Ext.grid.GridPanel({
									store:this.eventStore,
									title:'�¼�',
									cm:new  Ext.grid.ColumnModel({
												defaults:{
														menudisable:true,
														width:100
												},
												columns:[
												{header:'�¼����к�',dataIndex:'eventSn',type:'int'},
												{header:'�¼�����',dataIndex:'eventName'},
												{header:'�¼�����',dataIndex:'eventDescription'},
												{header:'�¼�ʱ��',dataIndex:'fireTime'},
												{header:'�¼��ȼ�',dataIndex:'eventLevel'},
												{header:'�Ƿ�ȷ���¼�',dataIndex:'isConfirm',renderer:function(value){
															if(value){
																		return  '��ȷ��';
															}else{
																		return  '��';
															}
												}},
												{header:'�豸����',dataIndex:'deviceVarId'}
												]
										}),
										sm:new  Ext.grid.RowSelectionModel({
												singleSelect:true
										}),
									viewConfig:{
												forceFit: true
										}
							});
							this.items=[this.alarmGrid,this.eventGrid];
							this.on({
										expand:this.onTabCollapse,
										scope:this
							});
							this.on({
										tabchange:this.onTabActivate,
										scope:this
							});
							
							
							Ems.App.FootPanel.superclass.initComponent.call(this);
			},
			
			onTabCollapse:function(){
						 	if(this.getActiveTab()){
						 				this.getActiveTab().store.load();
						 	}
			},
			
			onTabActivate:function(tab,panel){
							if(panel.store){
										panel.store.load();
							}
			}
		
});

function appLoad(){
			
	Ext.QuickTips.init();
	
	// This is an inner body element within the Details panel created to provide a "slide in" effect
	// on the panel body without affecting the body's box itself.  This element is created on
	// initial use and cached in this var for subsequent access.
	
	
	// This is the main content center region that will contain each example layout panel.
	// It will be implemented as a CardLayout since it will contain multiple panels with
	// only one being visible at any given time.
	var contentPanel =new Ext.Panel({
		id: 'content-panel',
		region: 'center', // this is what makes this panel into a region within the containing layout
		margins: '2 2 2 0',
		activeItem: 0,
		border: 1,
		autoScroll: true
		/*autoLoad:{
			//url:'home.action',
			scripts:true
		}*/
	});
	
	
	/*var footPanel =new Ext.Panel({
		id:'footPanel',
		region:'south',
		split:true,
		border: 1,
		height:200,
		collapsible:true,
		animCollapse:true,
		collapsed:true,
		title:'�¼�'
	});*/
	var footPanel =  new Ems.App.FootPanel();
	
	
    
    
    var MenuBar=new Ems.App.MainTab();
    
    
	// Assign the changeLayout function to be called on tree node click.
   
    

    
    new Ext.Viewport({
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [{
			xtype: 'container',
			region: 'north',
			applyTo: 'header',
			height: 30
		},MenuBar,
			contentPanel,
			footPanel
		],
        renderTo: Ext.getBody()
    });	
    
   
}

Ext.onReady(appLoad);