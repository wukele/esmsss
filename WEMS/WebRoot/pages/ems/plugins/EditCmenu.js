Ext.ns('Ems.plugins')


Ems.plugins.EditWindow=Ext.extend(Ext.Window,{
		
		initComponent:function(){
				this.EditForm=new Ext.FormPanel({
						frame:true,
						labelAlign:'center',
						defaultType:'textfield',
						labelWidth:100,
						height:270,
						defaults:{
							width:100,
							allowBlank:true
						},
						items:[{
							name:'comp.resourceId',
							fieldLabel:'�����ԴID',
							readOnly:true
						},{
							name:'comp.pageResource',
							fieldLabel:'ҳ����Դ',
							readOnly:true
						},{
							name:'comp.xtypeCode',
							fieldLabel:'XTYPE',
							readOnly:true
						},{
							name:'comp.resourceLeft',
							fieldLabel:'X Axis',
							xtype:'numberfield'
						},{
							name:'comp.resourceTop',
							fieldLabel:'Y Axis',
							xtype:'numberfield'
						},{
							name:'comp.resourceWidth',
							fieldLabel:'���',
							xtype:'numberfield',
							maxLength:4
						},{
							name:'comp.resourceHeight',
							fieldLabel:'�߶�',
							xtype:'numberfield',
							maxLength:4
						}]
						
				});
				this.items=[this.EditForm];
				this.buttons=[{
							text:'�ύ',
							handler:function(){
								 this.ownerCt.ownerCt.EditForm.getForm().submit({
								 		url:'ModifyTplComp.action',
								 		success:function(form,action){
								 				Ext.example.msg('OK','Success');
								 				var cmp=Ext.getCmp(form.findField('comp.resourceId').getValue());
								 				cmp.x=form.findField('comp.resourceLeft').getValue();
								 				cmp.y=form.findField('comp.resourceTop').getValue();
								 				cmp.getEl().setLeft(cmp.x);
								 				cmp.getEl().setTop(cmp.y);
								 				cmp.width=form.findField('comp.resourceWidth').getValue();
								 				cmp.height=form.findField('comp.resourceHeight').getValue();
								 				cmp.setHeight(form.findField('comp.resourceHeight').getValue());
								 				cmp.setWidth(form.findField('comp.resourceWidth').getValue());
								 				Ext.WindowMgr.getActive().hide();
								 		}
								 });
							}
						},{
							text:'ȡ��',
							handler:function(){
								this.ownerCt.ownerCt.hide();
							}
						}]
				Ems.plugins.EditWindow.superclass.initComponent.call(this);
		}
})



Ems.plugins.EditCmenu=Ext.extend(Object,{	
		constructor:function(cfg){
				this.pageResource=cfg.pageResource||'';
				Ems.plugins.EditCmenu.superclass.constructor.call(this,cfg); 
		},
		
	
		init:function(component){
				this.component=component;
				component.on({afterrender:this.onAfterRender,
							  scope:this
				});
				
				if(!this.ewindow){
					  this.ewindow=new Ems.plugins.EditWindow({
					  		width:260,
					  		height:270,
					  		closeAction:'hide'
					  });
				}
		},
		onAfterRender:function(e){
				this.component.getEl().on({
						click:this.onContextmenu,
						scope:this
				})	
		},
		
		
		onContextmenu:function(e){
				 var m = this.createMenu();
				 var p=  e.getXY();
				 //p[0]=p[0]+e.getWidth();
				  m.showAt(p);
		},
		createMenu:function(){
				if(!this.menu){
						var items=[{
							  scope:this,
							  text:'�༭',
							  handler:function(){
							  		if(this.component){
							  			Ext.WindowMgr.each(function(w){
							  				w.hide();
							  			})
							  			
							  			var record=new Ext.data.Record();
							  			record.set('comp.resourceId',this.component.id);
							  			record.set('comp.xtypeCode',this.component.xtype);
							  			record.set('comp.resourceTop',this.component.y);
							  			record.set('comp.resourceLeft',this.component.x);
							  			record.set('comp.resourceWidth',this.component.width);
							  			record.set('comp.resourceHeight',this.component.height);
							  			record.set('comp.pageResource',this.pageResource);
							  			this.ewindow.EditForm.getForm().loadRecord(record);
							  			this.ewindow.show();	
							  		}
							  }
						},'-',{
							  scope:this,
							  text:'ɾ��',
							  handler:function(){
							  	   Ext.Ajax.request({
							  	   		url:'removeTplComponent.action',
							  	   		params:{
							  	   			'comp.resourceId':this.component.id
							  	   		},
							  	   		success:function(rsp,params){
							  	   			var cid=params.params['comp.resourceId'];
							  	   			var c=Ext.getCmp(cid);
							  	   			c.ownerCt.remove(c);
							  	   			delete c;
							  	   			Ext.example.msg('Success','���ɾ���ɹ�');
							  	   		},
							  	   		failure:function(rsp,cid){
							  	   			Ext.example.msg('error','���ɾ��ʧ��');
							  	   		}
							  	   })
							  }
						}]
						this.menu=new Ext.menu.Menu({
							items: items
						});
				}
				return this.menu;
		},
		destroy : function(){
        	Ext.destroy(this.menu);
        	Ext.destroy(this.ewindow);
        	delete this.ewindow;
        	delete this.menu;
    	}
});


Ext.preg('EditCmenu',Ems.plugins.EditCmenu);