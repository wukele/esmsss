Ext.ns('Ems.page')


Ems.page.ComponentPanel=Ext.extend(Ext.Panel,{
		layout:'absolute',
		constructor:function(config){
				config=config||{
					bodyStyle:Ems.page.BspkPageData.getBspkPagebdStyle(),
					width:Ems.page.BspkPageData.defaultViewWidth,
					height:Ems.page.BspkPageData.defaultViewHeight,
					renderTo:Ext.getDom('PreviewContainer'),
					items:Ems.page.BspkPageData.getBspkPageResource()
				}
				Ems.page.ComponentPanel.superclass.constructor.call(this,config);
		},
		
		initComponent:function(){
			   Ems.page.ComponentPanel.superclass.initComponent.call(this);
		}
});


Ems.page.BspkPagePreViewApp=function(){
		return {
			init:function(){
					new Ems.page.ComponentPanel()
			}
		}
}();


Ext.onReady(Ems.page.BspkPagePreViewApp.init,Ems.page.BspkPagePreViewApp)