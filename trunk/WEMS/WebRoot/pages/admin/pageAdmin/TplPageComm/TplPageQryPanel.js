Ext.ns('Ems.page')

Ems.page.TplPageQryForm=Ext.extend(Ext.FormPanel,{
	title:'ģ��ҳ���ѯ',
	frame:true,
	iconCls:'silk-plugin',
	defaultType:'textfield',
	labelWidth:100,
	labelPad:0,
	buttonAlign:'left',
	defaults:{
		width:200,
		padding:'50 50 50 50',
		margins:'100 100 100 100'
	},
	initComponent:function(){
		this.items=[
		{
			 id:'tpl_page_id',
			 fieldLabel:'ģ����',
			 name:'tpl_page_id'
		},
		{
			 id:'tpl_page_name',
			 fieldLabel:'ģ������',
			 name:'tpl_page_name'
		}
		
		];
		this.buttons=[
		{
			xtype:'button',
			text:'��ѯ',
			width:40,
			handler:this.DoQry
		},
		{
			xtype:'button',
			text:'����',
			width:40,
			handler:function(){
					this.ownerCt.ownerCt.getForm().reset();
			}
		}
		];
		
		this.addEvents({'doqrytemplate':true});	
		Ems.page.TplPageQryForm.superclass.initComponent.call(this);
	},
	
	DoQry:function(){
		this.ownerCt.ownerCt.fireEvent('doqrytemplate',this.ownerCt.ownerCt);
	}
});

Ems.page.TplPageEditWindow=Ext.extend(Ext.Window,{
	closeAction:'hide',
	title:'ģ����Ϣ�༭',
	width:400,
	height:265,
	resizable:false,
	id:'EditWindow',
	initComponent:function(){
			this.EditForm=new Ext.FormPanel({
					defaultType:'textfield',
					buttonAlign:'center',
					defaults:{
						width:200
					},
					frame:true,
					items:[{
						name:'tplPageId',
						fieldLabel:'ģ��ID',
						readOnly:true
					},{
						name:'tplPageName',
						fieldLabel:'ģ������'
					},{
						name:'tplImagePath',
						fieldLabel:'ģ���ͼ·��'
					},{
						name:'tplPageType',
						fieldLabel:'ģ������'
					},{
						name:'tplPageResource',
						fieldLabel:'��ԴID'
					},{
						name:'tplImageHeight',
						fieldLabel:'��ͼ��',
						xtype:'numberfield'
					},{
						name:'tplImageWidth',
						fieldLabel:'��ͼ��',
						xtype:'numberfield'
					}
					],
					buttons:[
					{
						text:'�ύ',
						handler:function(){
							  if(!this.ownerCt.ownerCt.getForm().isValid())return false;
							 
							  this.ownerCt.ownerCt.getForm().submit({
							  		url:'TplPageModify.action',
							  		success:function(form, action){
							  			if(action.result.res_code==0){
							  				 var ed=Ext.getCmp('EditWindow');
							  				 ed.fireEvent('editsuccess',ed);
							  			}
							  		},
							  		failure: function(form, action) {
							  			if(action.result!=undefined && action.result.res_code==0){
							  				 var ed=Ext.getCmp('EditWindow');
							  				 ed.fireEvent('editsuccess',ed);
							  			}
							  		}
							  });
						}
					},
					{
						text:'ȡ��',
						handler:function(){
							this.ownerCt.ownerCt.getForm().reset();
							this.ownerCt.ownerCt.ownerCt.hide();
						}
					}
					]
			});
			this.items=[this.EditForm];
			Ems.page.TplPageEditWindow.superclass.initComponent.call(this);
			this.addEvents({'editsuccess':true});
	}
})





Ems.page.TplPageQryListPanel=Ext.extend(Ext.Panel,{
	 title:'ģ���б�',
	 iconCls:'silk-table',
	 height:700,
	 tbar:[
	 {
	 	text:'ɾ��',
	 	iconCls:'silk-delete',
	 	handler:function(){
	 		var container=this.ownerCt.ownerCt;
	 		var records=container.listView.getSelectedRecords();
	 		if(records==undefined){
	 			Ext.example.msg('����','��ѡ��ɾ����');
	 			return false;
	 		}
	 		Ext.example.msg('Info','ɾ��:'+ records[0].get('tplPageName'));
	 		Ext.Ajax.request({
	 			url:'TplPageDelete.action',		
	 			method:'POST',
	 			params:{
	 				tpl_page_id:records[0].get('tplPageId')
	 			},
	 			success:function(e){
	 				Ext.example.msg('OK','ɾ��:'+ records[0].get('tplPageName')+ '�ɹ�');
	 				container.store.load({
	 					params:{
	 						start:0,
							limit:7
	 					}
	 				});
	 			}
	 		}); 		
	 	}
	 },'-',
	 {
	 	 text:'�༭',
	 	 iconCls:'silk-user-edit',
	 	 handler:function(){
	 	 	var container=this.ownerCt.ownerCt;
	 		var records=container.listView.getSelectedRecords();
	 		if(records==undefined || records[0]==undefined){
	 			Ext.example.msg('����','��ѡ���༭��');
	 			return false;
	 		}
	 		if(this.editWindow){
	 			this.editWindow.EditForm.getForm().loadRecord(records[0]);
	 			this.editWindow.show();
	 		}else{
	 			this.editWindow=new Ems.page.TplPageEditWindow();
	 			this.editWindow.on('editsuccess',function(window){
	 					Ext.example.msg('OK','�༭�ɹ�');
	 					container.store.load({
	 						params:{
	 							start:0,
								limit:7
	 						}
	 					});
	 					window.hide();
	 			});
	 			this.editWindow.EditForm.getForm().loadRecord(records[0]);
	 			this.editWindow.show();
	 		}
	 	 }
	 }
	 ],
	 
	 initComponent:function(){
	 		this.TPL=new Ext.XTemplate('<tpl for=".">',
	 		'<div class="x-list-wrap"><div class="x-list-image"><img src="{tplImagePath}" width="100" height="80" title="{tplPageName}" /></div>',
	 		'<div class="x-list-text"><p>ģ��ID��{tplPageId} </p><p>ģ������:{tplPageName} </p> <p>ģ������ :{tplPageType}</p></div>',
	 		'<div class="x-list-text"><p>ģ����ԴID��{tplPageResource}</p></div>',
	 		'</div></tpl>');
	 		this.listView=new Ext.DataView({
	 				store:this.store,
	 				tpl:this.TPL,
	 				itemSelector:'div.x-list-wrap',
	 				emptyText: 'No images to display',
					multiSelect:true,
					overClass:'x-view-over'
	 		});
	 		this.items=[this.listView];
	 		this.bbar=new Ext.PagingToolbar({
	 				store:this.store,
					displayInfo: true,
					pageSize:8,
					displayMsg : '��ʾ�� {0} ���� {1} ����¼��һ�� {2} ��',
					emptyMsg : 'û�м�¼'
	 		})
	 		Ems.page.TplPageQryListPanel.superclass.initComponent.call(this);
	 },
	 constructor:function(config){
	 		config=config||{};
	 		this.store=config.store;
	 		Ems.page.TplPageQryListPanel.superclass.constructor.call(config,this);
	 }
	
});



Ems.page.TplPageQryPanel=Ext.extend(Ext.Panel,{
	border:false,
	QueryTemplate:function(e){
			var  tpl_id=e.getForm().findField('tpl_page_id').getValue();
			var  tpl_name=e.getForm().findField('tpl_page_name').getValue();
			this.ownerCt.TplPageQryList.store.load({
				params: {	start:0,
					limit:7,
					tpl_page_id:tpl_id,
					tpl_page_name:tpl_name}
			});
	},
	
	initComponent:function(){
			this.QryForm=new Ems.page.TplPageQryForm();
			this.QryForm.on('doqrytemplate',this.QueryTemplate);
			this.store=new Ext.data.JsonStore({
					proxy:new Ext.data.HttpProxy({url:'TplPageQry.action'}),
					root:'tpls',
					totalProperty:'totalProperty',
					fields:[
					{name:'tplPageType',mapping:'tplPageType'},
					{name:'tplPageId',mapping:'tplPageId'},
					{name:'tplPageResource',mapping:'tplPageResource'},
					{name:'tplPageName',mapping:'tplPageName'},
					{name:'tplImagePath',mapping:'tplImagePath'},
					{name:'tplImageWidth',mapping:'tplImageWidth'},
					{name:'tplImageHeight',mapping:'tplImageHeight'}
					]
			});
			this.store.load({
				params:{
					start:0,
					limit:7
				}
			});
			this.TplPageQryList=new Ems.page.TplPageQryListPanel({
					store:this.store,
					renderTo:Ext.getDom('templateList')
			})
			this.items=[this.QryForm];
			Ems.page.TplPageQryPanel.superclass.initComponent.call(this);
	}
});