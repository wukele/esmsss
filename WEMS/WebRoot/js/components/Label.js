/*!
 * 文字标签
 */
/*
 * ------------------------------------------------------------------------------
 * @class Ems.component.Label 文字标签，显示任意的文字
 * ------------------------------------------------------------------------------
 * @extends Ext.BaseComponent
 * @xtype emslabel
 * @config.x: int x坐标，相对于容器，优先于cfgRecord.x
 * @config.y: int y坐标，相对于容器，优先于cfgRecord.y
 * @config.width: int宽度，相对于容器，优先于cfgRecord.width
 * @config.height: int高度，相对于容器，优先于cfgRecord.height
 * 
 * 特性：
 * 		提供HTML中的SPAN元素具有的一切功能

/**
 * @class Ems.component.Label
 * @extends Ems.component.BaseComponent
 * 文字标签
 * @xtype emsstateicon
 * @author ken liu
 */
Ems.component.Label = Ext.extend(Ems.component.BaseComponent, {	
	cfgItems:new Ext.data.ArrayStore({
		fields: ['name', 'title', 'type', 'options'],
		data: [["innerStyle", "样式", "string", ""]]
	}),
	data: "Label",
	innerStyle: "font-size:14pt; color:black;",
	
	// 构造
	constructor: function(config){
		config=config||{};
		Ems.component.StateIcon.superclass.constructor.call(this, config);
		Ext.apply(this, config);
		this.on({
			'render':this.OnRender,
			'configchange':this.OnConfigChange,
			'datachange':this.OnDataChange,
			 scope:this
		});
	},
	
	// 渲染
	OnRender:function(e){
		var me=e.getEl();
		//me.update("<span id='corespan'>"+this.data+"</span>");
		//me.child("#corespan").set({style:this.style});
		this.OnDataChange(e);
	},
	
	//配置改变
	OnConfigChange:function(e){
		this.OnDataChange(e);  // 直接调用数据改变处理代码来刷新显示
	},
	
	//数据改变
	OnDataChange:function(e){
		var me=e.getEl();
		me.update("<span id='corespan'>"+this.data+"</span>");
		me.child("#corespan").set({style:this.innerStyle});
	}
	
	
});

Ext.reg('emslabel',Ems.component.Label);
Ems.component.reg('emslabel',Ems.component.Label, "文字标签");
 