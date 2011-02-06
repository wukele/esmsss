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
			   					text:'������ʱ����ҳ��',
			   					handler:function(){
			   							Ext.MessageBox.prompt(
			   									'��ʱҳ������',
			   									'������ҳ������:',
			   									function(btn,text){
			   											if(!text || text.length>255){
			   													Ext.example.msg('����','���Ƴ��ȴ���')
			   											}else if(btn=='ok'){
			   												var tplPageId=Ems.page.tplContianerData.getTplPageID();
			   												Ext.Ajax.request({
			   													url:'tplCreateBspkPage.action',
			   													params:{
			   															tpl_page_id:tplPageId,
			   															bspk_page_name:text
			   													},
			   													success:function(){
			   														 	Ext.example.msg('Success','��ʱ����ҳ�����ɳɹ�');
			   													}
			   												})
			   											}
			   									}
			   							)
			   					}
			   				},'-',{
			   					text:'ɾ��ģ��ҳ',
			   					handler:function(){
			   						 	var tplPageId=Ems.page.tplContianerData.getTplPageID();
			   						 	Ext.Ajax.request({
			   						 		url:'TplPageDelete.action',
			   						 		params:{
			   						 				tpl_page_id:tplPageId
			   						 		},
			   						 		success:function(){
			   						 				Ext.example.msg('Success','ģ��ҳɾ���ɹ�')
			   						 				//Ext.getCmp('PageView').getEl().update('');
			   						 				Ems.page.TplPageResourceApp.tplPageCompTab.setActiveTab(1);
			   						 				Ems.page.TplPageResourceApp.TplPageQryPanel.store.load({
			   						 					params:{
															start:0,
															limit:8
														}
			   						 				});
			   						 		}
			   						 	});
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