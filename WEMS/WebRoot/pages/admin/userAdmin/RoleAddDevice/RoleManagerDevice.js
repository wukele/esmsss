Ext.ns('EMS.RoleQuery');

EMS.RoleQuery.DeviceDataColunmModel=Ext.extend(Ext.grid.ColumnModel,{
		defaults:{
				width:100,
				sortable: true,
				editable: false
		},
		constructor:function(config){
				var  columns=[
		{header:'�豸ID',dataIndex:'deviceId'},
		{header:'�豸����',dataIndex:'deviceName'},
		{header:'�豸����',dataIndex:'deviceType'},
		{header:'�豸IP��ַ',dataIndex:'deviceIp'},
		{header:'�豸�ɼ��߳�',dataIndex:'collectTaskId'}
				];
				config=config || {columns:columns};
				
				
				EMS.RoleQuery.DeviceDataColunmModel.superclass.constructor.call(this,config);
		}
		
})

EMS.RoleQuery.RoleOperDeviceArea=Ext.extend(Ext.Panel,{
		title:'�豸Ȩ�޲���',
		iconCls:'silk-table-refresh',
		border:false,
		layout:'column',
		refleshRoleDevice:function(roleCode){
				this.roleCode=roleCode;
				this.roleDeviceStore.load({
						params:{
							role_code:roleCode
						}
				});
		},
		constructor:function(config){
			this.roleCode=config.roleCode;
			this.roleName=config.roleName;
			EMS.RoleQuery.RoleOperDeviceArea.superclass.constructor.call(this,config);
		},
		
		initComponent:function(){
				
						this.deviceStore=new Ext.data.JsonStore({
								root:'devices',
								proxy:new Ext.data.HttpProxy({
									url:'RoleDeviceManagerActionQryDevice.action'
								}),
								autoLoad:true,
								fields:[
								{name:'deviceId',mapping:'deviceId'},
								{name:'deviceName',mapping:'deviceName'},
								{name:'deviceType',mapping:'deviceType'},
								{name:'deviceIp',mapping:'deviceIp'},
								{name:'collectTaskId',mapping:'collectTaskId'}
								]
						});	
			
				
						this.roleDeviceStore=new Ext.data.JsonStore({
								root:'devices',
								proxy:new Ext.data.HttpProxy({
									url:'RoleDeviceManagerActionQryRoleDev.action',
									method:'POST'
								}),
								fields:[
								{name:'deviceId',mapping:'deviceId'},
								{name:'deviceName',mapping:'deviceName'},
								{name:'deviceType',mapping:'deviceType'},
								{name:'deviceIp',mapping:'deviceIp'},
								{name:'collectTaskId',mapping:'collectTaskId'}
								]
						});
						this.refleshRoleDevice(this.roleCode);
				
				this.DeviceDataView=new Ext.grid.GridPanel({
						columnWidth: .5,
						height:300,
						title:'ϵͳ�豸',
						iconCls:'',
						frame:true,
						store:this.deviceStore,
						cm:new EMS.RoleQuery.DeviceDataColunmModel(),
						sm:new Ext.grid.RowSelectionModel({
								singleSelect:true	
						})
				});
				
				this.roleDeviceView=new Ext.grid.GridPanel({
						columnWidth:.5,
						height:300,
						frame:true,
						store:this.roleDeviceStore,
						cm:new EMS.RoleQuery.DeviceDataColunmModel(),
						sm:new Ext.grid.RowSelectionModel({
								singleSelect:true	
						})
				});
				
				
				this.items=[this.DeviceDataView,this.roleDeviceView];
			  	EMS.RoleQuery.RoleOperDeviceArea.superclass.initComponent.call(this);
		}
});


EMS.RoleQuery.RoleQueryView=Ext.extend(Ext.grid.GridPanel,{
		title:'��ɫ��ͼ',
		renderTo:Ext.getDom('RoleQueryView'),
		iconCls: 'silk-grid',
		border:false,
		autoDestroy:true,
		height:150,
		cm:new Ext.grid.ColumnModel({
			defaults:{
				width:120,
				sortable: true,
				editable: false
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
				  		var roleCode=record.get('roleCode');
				  		if(!this.RoleOperDeviceArea){
				  				this.RoleOperDeviceArea=new EMS.RoleQuery.RoleOperDeviceArea({
				  						renderTo:Ext.getDom('RoleDeviceOperArea'),
				  						roleCode:roleCode
				  				});
				  		}else{
				  				this.RoleOperDeviceArea.refleshRoleDevice(roleCode);
				  		}
				  	}
			}
		}),
		initComponent:function(){
				EMS.RoleQuery.RoleQueryView.superclass.initComponent.call(this);
		}
});


EMS.RoleQuery.RoleQueryPanel=Ext.extend(Ext.Panel,{
		title:'��ɫ��ѯ',
		renderTo:Ext.getDom('RoleQuery'),
		layout:'column',
		height:100,
		iconCls: 'silk-user',
    	frame: true,
    	labelAlign: 'right',
    	layout:'column',
		defaults:{
			border:false,
			labelWidth:100
		},
		QueryRole:function(){
			var roleCode=Ext.getCmp('role_code').getValue();
			var roleName=Ext.getCmp('role_name').getValue();
			if(!this.RoleStore){
			 	this.RoleStore=new Ext.data.JsonStore({
					proxy:new Ext.data.HttpProxy({
						url:'RoleAddEntityRuleActionQry.action',
						method:'POST'
					}),
					root:'roles',
					fields:[
						{name:'roleCode',mapping:'roleCode'},
						{name:'comments',mapping:'comments'},
						{name:'roleType',mapping:'roleType'},
						{name:'isactive',mapping:'isactive'},
						{name:'operNo',mapping:'operNo'}
					]
				});
			}
			this.RoleStore.load({
			    params:{
			    	role_code:roleCode,
			    	role_name:roleName
			    }
			});
			if(!this.roleQueryView){
		   		this.roleQueryView=new EMS.RoleQuery.RoleQueryView({
					store:this.RoleStore
				});
			}
		},
		
		
		BuildPanelItems:function(){
			this.items=[
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
						  handler:this.QueryRole
					}]
			}
			];  
		},
		
		initComponent:function(){
				this.BuildPanelItems()
				EMS.RoleQuery.RoleQueryPanel.superclass.initComponent.call(this);
		}
		
});

EMS.RoleQuery.DeviceManger=function(){
	   new EMS.RoleQuery.RoleQueryPanel();
}




Ext.onReady(EMS.RoleQuery.DeviceManger);

