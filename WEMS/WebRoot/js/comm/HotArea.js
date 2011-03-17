Ext.ns('Ems.Component')

Ems.Component.HotArea=Ext.extend(Ext.BoxComponent,{
		defaultWidth:100,
		defaultHeight:100,
		designMode:1,
		setDesignMode:function(d){
						this.designMode=d;
		},
		
		
		constructor:function(cfg){
				cfg=cfg||{
					width:this.defaultWidth,
					height:this.defaultHeight,
					border:false
				}
				cfg.autoEl={
					 tag:'div'
				}
				this.deviceId=cfg.id;
				cfg.overCls='x-hotarea';
				Ems.Component.HotArea.superclass.constructor.call(this,cfg); 
		},
		DEVICE_NOR:0,
		DEVICE_EXCEPTION:1,		
		setStatus:function(val){
				if(val || val==this.DEVICE_EXCEPTION){
						this.getEl().replaceClass('x-hotarea-nor','x-hotarea-exception');
				}else{
						this.getEl().replaceClass('x-hotarea-exception','x-hotarea-nor');
				}	
		},
		
		afterRender:function(){
				Ems.Component.HotArea.superclass.afterRender.call(this);
				
				if(this.deviceId &&  !this.designMode){
					this.setStatus(0);
				}else{
					this.setStatus(1);
				}
				this.getEl().on({
						click:this.OnHotAreaClick,
						scope:this
				});
		},
		
				
		OnHotAreaClick:function(e){
				if(this.deviceId  && !this.designMode){
					clearAllTask();
					Ext.getCmp('content-panel').load({
						url:'EmsHotAreaNav.action',
						scripts:true,
						 params:{
						 		value_id:this.deviceId
						 }
					})
				}
		}
});

Ext.reg('hotarea',Ems.Component.HotArea);









