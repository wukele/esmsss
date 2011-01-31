Ext.ns('Ems.page');

Ems.page.ComponentPanel=Ext.extend(Ext.Panel,{
		layout:'absolute',
		constructor:function(config){
				config=config||{
					id:'ComponentPanel',
					bodyStyle:Ems.page.tplContianerData.getTplPagebdStyle(),
					width:Ems.page.tplContianerData.defaultViewWidth,
					height:Ems.page.tplContianerData.defaultViewHeight,
					renderTo:Ext.getDom('tplContainer'),
					items:Ems.page.tplContianerData.getTplResourceData()
				}
				Ems.page.ComponentPanel.superclass.constructor.call(this,config);
		},
		
		initComponent:function(){
			   Ems.page.ComponentPanel.superclass.initComponent.call(this);
			    if(!this.PanelMenu){
			   		this.PanelMenu=new Ext.menu.Menu({
			   				items:[
			   				{
			   					text:'生成临时数据页面',
			   					handler:function(){
			   							Ext.MessageBox.prompt(
			   									'临时页面名称',
			   									'请输入页面名称:',
			   									function(btn,text){
			   											if(!text || text.length>255){
			   													Ext.example.msg('警告','名称长度错误')
			   											}
			   											var tplPageId=Ems.page.tplContianerData.getTplPageID();
			   											Ext.Ajax.request({
			   													url:'tplCreateBspkPage.action',
			   													params:{
			   															tpl_page_id:tplPageId,
			   															bspk_page_name:text
			   													},
			   													success:function(){
			   														 	Ext.example.msg('Success','临时数据页面生成成功');
			   													}
			   											})
			   									}
			   							)
			   					}
			   				},{
			   					text:'删除模板页',
			   					handler:function(){
			   							
			   					}
			   				}
			   				]
			   		});
			    }
			   this.on({
			   		scope:this,
			   		afterrender:this.onAfterRender
			   })
		},
		
		onAfterRender:function(){
			  
			   this.getEl().on({
			   		 scope: this,
            		 contextmenu: this.onContextMenu
			   })
		},
		onContextMenu:function(e,t,o){
			   e.stopEvent();
			   this.PanelMenu.showAt(e.getXY());
		}	
});

Ems.page.TplPagePreviewApp=function(){
		return {
			init:function(){
				 new Ems.page.ComponentPanel();
			}			
		}
}()


Ext.onReady(Ems.page.TplPagePreviewApp.init,Ems.page.TplPagePreviewApp);