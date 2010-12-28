Ext.ns('EMS.RoleQuery');

var roleDeviceStore=null;
var deviceStore=null;
var role_code=null;
EMS.RoleQuery.RoleDevicePager=Ext.extend(Ext.PagingToolbar,{
	doLoad : function(start){
        var o = {}, pn = this.getParams();
        o[pn.start] = start;
        o[pn.limit] = this.pageSize;
        o.role_code=role_code;
        //Ext.Msg.alert('req',pn.role_code);
        if(this.fireEvent('beforechange', this, o) !== false){
        	
            this.store.load({params:o});
        }
    }
})

EMS.RoleQuery.DeviceDataColunmModel=Ext.extend(Ext.grid.ColumnModel,{
		defaults:{
				width:100,
				sortable: true,
				editable: false
		},
		constructor:function(config){
				var  columns=[
		{header:'设备ID',dataIndex:'deviceId'},
		{header:'设备名称',dataIndex:'deviceName'},
		{header:'设备类型',dataIndex:'deviceType'},
		{header:'设备IP地址',dataIndex:'deviceIp'},
		{header:'设备采集线程',dataIndex:'collectTaskId'}
				];
				config=config || {columns:columns};
				
				
				EMS.RoleQuery.DeviceDataColunmModel.superclass.constructor.call(this,config);
		}
		
});

EMS.RoleQuery.RoleOperDeviceArea=Ext.extend(Ext.Panel,{
		title:'设备权限操作',
		iconCls:'silk-table-refresh',
		border:false,
		layout:'column',
		refleshRoleDevice:function(roleCode){
				this.roleCode=roleCode;
				roleDeviceStore.load({
						params:{
							role_code:roleCode,
							start:0,
							limit:5
						}
				});
				role_code=roleCode;
		},
		constructor:function(config){
			this.roleCode=config.roleCode;
			this.roleName=config.roleName;
			EMS.RoleQuery.RoleOperDeviceArea.superclass.constructor.call(this,config);
		},
		
		initComponent:function(){
				
						deviceStore=new Ext.data.JsonStore({
								root:'devices',
								proxy:new Ext.data.HttpProxy({
									url:'RoleDeviceManagerActionQryDevice.action'
								}),
								totalProperty: 'results',
								fields:[
								{name:'deviceId',mapping:'deviceId'},
								{name:'deviceName',mapping:'deviceName'},
								{name:'deviceType',mapping:'deviceType'},
								{name:'deviceIp',mapping:'deviceIp'},
								{name:'collectTaskId',mapping:'collectTaskId'}
								]
						});	
						deviceStore.load({
								params:{
									start:0,
									limit:5
								}
						});
				
						roleDeviceStore=new Ext.data.JsonStore({
								root:'devices',
								totalProperty: 'results',
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
						id:'DeviceDataView',
						columnWidth: .5,
						height:300,
						title:'系统设备',
						bbar:new Ext.PagingToolbar({
								store:deviceStore,
								displayInfo: true,
								pageSize:6,
								displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
								emptyMsg : '没有记录'
						}),
						tbar:new Ext.Toolbar([
				 								{
				 									text: '新增',
            										iconCls: 'silk-add',
            										handler: function(){
            												var record=Ext.getCmp('DeviceDataView').getSelectionModel().getSelected();
            												if(!record){
            													Ext.example.msg('错误','请选定添加设备');
            												}
            												addRoleDevice(record);
            										}
				 								 }
				 							  ]),
						iconCls:'silk-cog',
						ddGroup:'roleDeviceDDGrourp',
						enableDragDrop   : true,
						frame:true,
						store:deviceStore,
						cm:new EMS.RoleQuery.DeviceDataColunmModel(),
						sm:new Ext.grid.RowSelectionModel({
								singleSelect:true	
						})
				});
				
				this.roleDeviceView=new Ext.grid.GridPanel({
						columnWidth:.5,
						height:300,
						id:'roleDeviceView',
						bbar:new EMS.RoleQuery.RoleDevicePager({
						     	store:roleDeviceStore,
								displayInfo: true,
								pageSize:6,
								displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
								emptyMsg : '没有记录'
						}),
						tbar:new Ext.Toolbar([
						{
							text: '删除',
            			    iconCls: 'silk-delete',
            			    handler:function(){
            			    	var  record=Ext.getCmp('roleDeviceView').getSelectionModel().getSelected();
            			    	if(!record){
            			    		Ext.example.msg('错误','请选定删除设备');
            			    	}
            			    	Ext.Ajax.request({
            			    		url:'RoleDeviceDel.action',
            			    		method:'POST',
            			    		params:{
            			    			role_code:role_code,
            			    			device_id:record.get('deviceId')
            			    		},
            			    		success:function(e){
            			    			var res=Ext.decode(e.responseText);
            			    			if(res.err_code==0){
            			    				roleDeviceStore.remove(record);
            			    				Ext.example.msg('OK','设备{0}删除成功',record.get('deviceName'));
            			    			}else{
            			    				Ext.example.msg('OK','设备{0}删除失败',record.get('deviceName'));
            			    			}
            			    		},
            			    		failure: function(e){
                         				Ext.example.msg('错误','角色设备删除失败');
                  				    }
            			    	});
            			    	
            			    }
						}
						]),
						frame:true,
						enableDragDrop   : true,
						title:'角色设备',
						iconCls:'silk-cog',
						store:roleDeviceStore,
						cm:new EMS.RoleQuery.DeviceDataColunmModel(),
						sm:new Ext.grid.RowSelectionModel({
								singleSelect:true	
						})
				});
				this.items=[this.DeviceDataView,this.roleDeviceView];
				this.on('afterrender',function(){
			        var  roleDeviceTargetEl=this.roleDeviceView.getView().scroller.dom;
			        var roleDeviceDropTarget = new Ext.dd.DropTarget(roleDeviceTargetEl,{
			        		ddGroup:'roleDeviceDDGrourp',
			        		notifyDrop : this.notifyDropRoleDev
			        });
				});
				
				EMS.RoleQuery.RoleOperDeviceArea.superclass.initComponent.call(this);
		},
		
		notifyDropRoleDev:function(ddSource, e, data){
				var record =  ddSource.dragData.selections[0];
				//Ext.example.msg('设备',record.get('deviceName'));
				return  addRoleDevice(record);
		}
		
});

var  addRoleDevice=function(record){
		var isHas=true;
		roleDeviceStore.each(function(r){
						if(r.get('deviceId')==record.get('deviceId')){
								isHas=false;								
						}
		});
		if(isHas){
			  Ext.Ajax.request({
			  		url:'RoleDeviceManagerActionAddDev.action',
			  		method:'POST',
			  		params:{
			  			role_code:Ext.getCmp('RoleQueryViewPanel').getSelectionModel().getSelected().get('roleCode'),
			  			device_id:record.get('deviceId')
			  		},
			  		success:function(e){
			  			 var res=Ext.decode(e.responseText);
			  			 if(res.err_code==0){
			  			 	 roleDeviceStore.load({
								params:{
									role_code:role_code,
									start:0,
									limit:5
								}
							});
			  				 Ext.example.msg('OK','设备{0}添加成功',record.get('deviceName'));
			  				 
			  			 }else{
			  			 	 Ext.example.msg('OK','设备{0}添加失败',record.get('deviceName'));
			  			 }
			  		},
			  		failure: function(e){
                         Ext.example.msg('错误','角色设备新增失败');
                    }
			  });
	          return true;
		}else{
			  Ext.example.msg('警告','设备{0}不能重复添加',record.get('deviceName'));
			  return false;
		}
}







EMS.RoleQuery.RoleQueryView=Ext.extend(Ext.grid.GridPanel,{
		title:'角色视图',
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
		title:'角色查询',
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
			//Ext.Msg.alert('info','debug');
			if(!this.roleQueryView){
		   		this.roleQueryView=new EMS.RoleQuery.RoleQueryView({
		   			id:'RoleQueryViewPanel',
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

