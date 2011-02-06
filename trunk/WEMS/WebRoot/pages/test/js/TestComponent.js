Ext.ns('Ems.test')

Ems.test.ComponentApp=function(){
	return {
			init:function(){
					new Ext.Panel({
							renderTo:Ext.getDom('TestContainer'),
							border:false,
							layout:'absolute',
							height:800,
							width:1024,
							items:[
							{
								xtype:'hotarea',
								x: 20,
        						y: 20,
        						width:100,
        						height:100,
        						id:'h011'
							}
							]
					})
			}
	}
}();

Ext.onReady(Ems.test.ComponentApp.init,Ems.test.ComponentApp);