Ext.ns('Ems.plugins')


Ems.plugins.EditWindow=Ext.extend(Ext.Window,{
		
		initComponent:function(){
				this.EditForm=new Ext.FormPanel({
						frame:true,
						labelAlign:'center',
						defaultType:'textfield',
						labelWidth:100,
						height:250,
						defaults:{
							width:100,
							allowBlank:true
						},
						items:[{
							name:'comp.resourceId',
							fieldLabel:'组件资源ID',
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
							fieldLabel:'宽度',
							xtype:'numberfield',
							maxLength:4
						},{
							name:'comp.resourceHeight',
							fieldLabel:'高度',
							xtype:'numberfield',
							maxLength:4
						}]
						
				});
				this.items=[this.EditForm];
				this.buttons=[{
							text:'提交',
							handler:function(){
								
							}
						},{
							text:'取消',
							handler:function(){
								this.ownerCt.ownerCt.hide();
							}
						}]
				Ems.plugins.EditWindow.superclass.initComponent.call(this);
		}
})



Ems.plugins.EditCmenu=Ext.extend(Object,{	
		init:function(component){
				this.component=component;
				component.on({focus:this.onContextmenu,
							  scope:this
				});
				if(!this.ewindow){
					  this.ewindow=new Ems.plugins.EditWindow({
					  		width:260,
					  		height:250,
					  		closeAction:'hide'
					  });
				}
		},
		onContextmenu:function(e){
				 var m = this.createMenu();
				 var p=  e.ownerCt.el.getLeft()+e.x+e.width;
				  m.showAt([p,e.y+36]);
		},
		createMenu:function(){
				if(!this.menu){
						var items=[{
							  scope:this,
							  text:'编辑',
							  handler:function(){
							  		if(this.component){
							  			var record=new Ext.data.Record();
							  			record.set('comp.resourceId',this.component.id);
							  			record.set('comp.xtypeCode',this.component.xtype);
							  			record.set('comp.resourceTop',this.component.y);
							  			record.set('comp.resourceLeft',this.component.x);
							  			record.set('comp.resourceWidth',this.component.width);
							  			record.set('comp.resourceHeight',this.component.height);
							  			this.ewindow.EditForm.getForm().loadRecord(record);
							  			this.ewindow.show();	
							  		}
							  }
						},'-',{
							  scope:this,
							  text:'删除',
							  handler:function(){
							  	   
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