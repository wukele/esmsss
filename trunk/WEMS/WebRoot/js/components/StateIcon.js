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
 * 
 * 数据值格式：
 *   {
 * 	   code:String,	//状态码，对应目录下的文件名
 * 	   title:String	//状态提示，可选
 *   }
 *
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
	cfgItems:new Ext.data.ArrayStore({
		fields: ['name', 'title', 'type', 'options'],
		data: [["iconType", "图标类型", "string", "default;machine;temperature;yes_no"],
				["iconExt", "后缀名", "string", ".gif;.jpg;.jpeg;.bmp;.png"]]
	}),
	iconPath: Ems.component.getCodeBase()+"/state_icon_images",  // 图标路径
	name: "某某设备",
	iconType: "yes_no", // 图标类型
	iconExt: ".gif", // 图片文件后缀名
	data: {code: "yes", title:"正常"},
	
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
			'configchange':this.OnConfigChange,
			'datachange':this.OnDataChange,
			 scope:this
		});
	},
	
	// 图片地址
	getIconUrl:function(){
		return this.iconPath+"/"+this.iconType+"/"+(this.data.code||this.data)+this.iconExt;
	},
	
	// 图片提示
	getIconTitle:function(){
		return this.name+(this.data.title?"："+this.data.title:"");
	},
	
	// 渲染
	OnRender:function(e){
		var me=e.getEl();
		me.position ("absolute");
		me.insertFirst({tag:"img", stateicon:"yes", src:this.getIconUrl(), border:0, title:this.getIconTitle()});
		me.on({
			'dblclick':null,
			scope:this
		});
	},
	
	// 数据变更
	OnDataChange:function(){
		var icon=this.el.child("img[stateicon]");
		icon.set({src:this.getIconUrl(), title:this.getIconTitle()});
	},
	
	// 配置发生改变 
	OnConfigChange:function(e){
		this.OnDataChange(e);
	}
	
});

Ext.reg('emsstateicon',Ems.component.StateIcon);
Ems.component.reg('emsstateicon',Ems.component.StateIcon, "状态图标");
