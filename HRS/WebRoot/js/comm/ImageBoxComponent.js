/**
 * @author zhangchangfeng
 */

Ext.namespace('Ext.ems.');



Ext.ems.ImageBox=Ext.extend(Ext.BoxComponent,{
	constructor:function(config){
		Ext.Image.ImageBox.superclass.constructor.call(this, config);
		this.ImageSrc=config.src;
		this.autoEl={
			tag:'img',
			src:this.ImageSrc
		}
		this.on({
		'render':this.OnRender,
		 scope:this
		});
	},
	ImageSrc:"",
	OnRender:function(e){
		e.getEl().on({
			'click':this.OnImageClick,
			scope:this
		})
	},
	OnImageClick:function(e){
		//Ext.Msg.alert('info','1234');
		
		var exp=/\w+@\w+.\w{3}/;
		
		var m='whitecell@hotmail.com1 '.match(exp);
		Ext.Msg.alert('match',m);
		
	}
	
	
});


Ext.reg('ImageBox',Ext.ems.ImageBox);