/**
 * @author zhangchangfeng
 */

Ext.namespace('Ems.component');


Ems.component.ImageBox=Ext.extend(Ext.BoxComponent,{
	
	ImageON:'image/ups_s.png',
	ImageOff:'image/ups_s.png',
	
	constructor:function(config){
		config=config||{};
		this.Height=config.height||100;
		this.Width=config.width||100;
		config.autoEl={
			tag:'img',
			src:this.ImageOff
		};
		
		Ems.component.ImageBox.superclass.constructor.call(this, config);
		this.on({
		'render':this.OnRender,
		 scope:this
		});
	},
	OnRender:function(e){
		e.getEl().on({
			'click':this.sendCommand,
			scope:this
		})
	},
	setValues:function(val){
		if(val){
				this.getEl().dom.src=this.ImageON;
		}else{
				this.getEl().dom.src=this.ImageOff;
		}
	},
	sendCommand:function(e){
		
	}
	
});


Ext.reg('ImageBox',Ems.component.ImageBox);