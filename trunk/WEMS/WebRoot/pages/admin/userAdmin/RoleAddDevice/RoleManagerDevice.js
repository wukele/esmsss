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
		{header:'�豸ID',dataIndex:'deviceId'},
		{header:'�豸����',dataIndex:'deviceName'},
		{header:'�豸����',dataIndex:'deviceType'},
		{header:'�豸IP��ַ',dataIndex:'deviceIp'},
		{header:'�豸�ɼ��߳�',dataIndex:'collectTaskId'}
				];
				config=config || {columns:columns};
				
				
				EMS.RoleQuery.DeviceDataColunmModel.superclass.constructor.call(this,config);
		}
		
});

EMS.RoleQuery.RoleOperDeviceArea=Ext.extend(Ext.Panel,{
		title:'�豸Ȩ�޲���',
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
						title:'ϵͳ�豸',
						bbar:new Ext.PagingToolbar({
								store:deviceStore,
								displayInfo: true,
								pageSize:6,
								displayMsg : '��ʾ�� {0} ���� {1} ����¼��һ�� {2} ��',
								emptyMsg : 'û�м�¼'
						}),
						tbar:new Ext.Toolbar([
				 								{
				 									text: '����',
            										iconCls: 'silk-add',
            										handler: function(){
            												var record=Ext.getCmp('DeviceDataView').getSelectionModel().getSelected();
            												if(!record){
            													Ext.example.msg('����','��ѡ������豸');
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
								displayMsg : '��ʾ�� {0} ���� {1} ����¼��һ�� {2} ��',
								emptyMsg : 'û�м�¼'
						}),
						tbar:new Ext.Toolbar([
						{
							text: 'ɾ��',
            			    iconCls: 'silk-delete',
            			    handler:function(){
            			    	var  record=Ext.getCmp('roleDeviceView').getSelectionModel().getSelected();
            			    	if(!record){
            			    		Ext.example.msg('����','��ѡ��ɾ���豸');
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
            			    				Ext.example.msg('OK','�豸{0}ɾ���ɹ�',record.get('deviceName'));
            			    			}else{
            			    				Ext.example.msg('OK','�豸{0}ɾ��ʧ��',record.get('deviceName'));
            			    			}
            			    		},
            			    		failure: function(e){
                         				Ext.example.msg('����','��ɫ�豸ɾ��ʧ��');
                  				    }
            			    	});
            			    	
            			    }
						}
						]),
						frame:true,
						enableDragDrop   : true,
						title:'��ɫ�豸',
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
				//Ext.example.msg('�豸',record.get('deviceName'));
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
			  				 Ext.example.msg('OK','�豸{0}��ӳɹ�',record.get('deviceName'));
			  				 
			  			 }else{
			  			 	 Ext.example.msg('OK','�豸{0}���ʧ��',record.get('deviceName'));
			  			 }
			  		},
			  		failure: function(e){
                         Ext.example.msg('����','��ɫ�豸����ʧ��');
                    }
			  });
	          return true;
		}else{
			  Ext.example.msg('����','�豸{0}�����ظ����',record.get('deviceName'));
			  return false;
		}
}







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

