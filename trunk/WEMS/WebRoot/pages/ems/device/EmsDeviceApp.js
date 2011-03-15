Ext.ns('Ems.device')

Ems.device.EmsDeviceAppMain=function(){
			return  {
						init:function(){
									 this.MainPanel=new  Ext.Panel({
									 			layout:'absolute',
									 			bodyStyle:Ems.device.EmsDeviceApp.GetDevPageInfo(),
									 			width:Ems.device.EmsDeviceApp.defaultViewWidth,
												height:Ems.device.EmsDeviceApp.defaultViewHeight,
												renderTo:Ext.getDom('DevAppMain'),
												items:Ems.device.EmsDeviceApp.LoadDevPageComponent()
									 });
									 Ems.device.EmsDeviceApp.initPageDataEngines();
						}
			}
}();

Ext.onReady(Ems.device.EmsDeviceAppMain.init,Ems.device.EmsDeviceAppMain);
