Ext.ns('Ems.page');

Ems.page.ComponentPanel=Ext.extend(Ext.Panel,{
		layout:'absolute',
		constructor:function(config){
				config=config||{
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