Ext.namespace('Ext.ems.engine');


Ext.ems.engine.DirectDataEngine=Ext.extend(Ext.Component,{
		constructor:function(config){
				//this.els=config.items;
				if(config.type==null){
					config.type='polling';
				}
				Ext.ems.engine.DirectDataEngine.superclass.constructor.call(this,config);
				this.on({
					message:this.flashPageData
				});
		},
		flashPageData:function(e){
				/*var item = this.els;
				for(var i=0;i<els.length;i++){
					 	
				}*/
			Ext.Msg.alert(e.data.length);
		}
});