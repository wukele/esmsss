/*!
 * 状态图标
 */
/*
 * ------------------------------------------------------------------------------
 * @class Ems.component.StateIcon 状态图标，将有限的整数或文本状态值用对应的图像来表示
 * ------------------------------------------------------------------------------
 * @extends Ext.BaseComponent
 * @xtype emsstateicon
 * @config.iconPath : String 图标路径，默认为 js文件目录/state_icon_images
 * @config.iconType : String 图标类型，对应于iconPath下面的子目录名称
 * @config.iconExt: String 图片文件后缀名
 * @config.x: int x坐标，相对于容器，优先于cfgRecord.x
 * @config.y: int y坐标，相对于容器，优先于cfgRecord.y
 * @curState : String 当前状态
 * 
 * @setState(state:String[,title:String]) : void 设置状态
 * 		state为应状态码，对应目录下的文件名
 * 		title为状态提示，可选
 * 特性：
 * 		通过增加子目录来增加状态类型、通过增加图片来增加状态码、GIF文件提供动画功能

/**
 * @class Ems.component.StateIcon
 * @extends Ems.component.BaseComponent
 * 将有限的整数状态值用对应的图像来表示
 * @xtype emsstateicon
 * @author ken liu
 */

Ems.component.StateIcon = Ext.extend(Ems.component.BaseComponent, {
	iconPath: "./state_icon_images",  // 图标路径
	iconType: "default", // 图标类型
	iconExt: ".gif", // 图片文件后缀名
	curState: null,  // 当前状态
	
	// 构造
	constructor: function(config){
		config=config||{};
		config.autoEl={
			tag:'div'
		};
		Ems.component.StateIcon.superclass.constructor.call(this, config);
		Ext.apply(this, config);
		this.on({
			'render':this.OnRender,
			 scope:this
		});
	},
	
	// 渲染
	OnRender:function(e){
		var me=e.getEl();
		me.position ("absolute");
		me.insertFirst({tag:"img", stateicon:"yes", border:0, title:""});
		me.on({
			'dblclick':null,
			scope:this
		});
	},
	
	// 变更状态
	setState:function(state, title){
		if(!title) title="";
		if(this.curState!=state){  //仅当状态改变时处理
			this.curState=state;
			var icon=this.el.child("img[stateicon]");
			var url=this.iconPath+"/"+this.iconType+"/"+state+this.iconExt;
			icon.set({src:url, title:title});
		}
	}
});

Ext.reg('emsstateicon',Ems.component.StateIcon);
