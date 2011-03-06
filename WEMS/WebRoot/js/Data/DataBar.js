Ext.ns('Ems.Component')


Ems.Component.DataBar=Ext.extend(Ext.BoxComponent,{
			
			constructor:function(cfg){
						  var  config=cfg||{
						  				width:20,
						  				height:200
						  };
						  config.autoEl={
						  			tag:'canvas'
						  }
						  Ems.Component.DataBar.superclass.constructor.call(this,config);
			},
				
			initComponent:function(){
						  	this.on({
						  			afterrender:this.initDrawCtx,
						  			scope:this
						  	})	;
							Ems.Component.DataBar.superclass.initComponent.call(this);
			},
			
			initDrawCtx:function(){
							this.ctx = this.getEl().dom.getContext("2d");
							if(!this.ctx){
										Ext.Msg.alert('warn','ä¯ÀÀÆ÷ ²»Ö§³Ö2D »æÍ¼');
							}
							 
			}			
})