/*!
 * EMS组件
 */
/**
 * ------------------------------------------------------------------------------
 * @namespace Ems.component 组件命名空间
 * ------------------------------------------------------------------------------
 * @Ems.component.getSelectedDom(): Array[DOM] 查询当前选中组件的DOM，结果放在数组中
 * @Ems.component.deselectComponents(): void 取消选择，不选择任何组件
 * 
 * 
 * ------------------------------------------------------------------------------
 * @class Ems.component.BaseComponent 基本组件，供其它组件继承
 * ------------------------------------------------------------------------------
 * @extends Ext.BoxComponent
 * @xtype emsbase
 * @config.cfgRecord : Record 配置信息记录，用于保存页面设计期指定的信息，供运行期使用
 * @config.developMode : Bool 开发模式，当组件处于页面开发期时设为真，支持拖拽、移动、聚焦等操作
 * @config.contextMenu: Menu 右键菜单
 * @config.x: int x坐标，相对于容器，优先于cfgRecord.x
 * @config.y: int y坐标，相对于容器，优先于cfgRecord.y
 * 特性：
 * 		鼠标拖拽定位、鼠标单击选定、Ctrl+光标键移动位置、显示指定的右键菜单
 * 
 * 
 */

Ext.ns("Ems.component");

/*
配置记录
用来存储组件的配置信息
*/
Ems.component.ConfigRecord = Ext.data.Record.create([
	// TODO 补充和修改配置字段
    {name: 'name', type: 'string'},		// 组件在页面中的标题
    {name: 'xtype', type: 'string'},	// 组件xtype类型
    {name: 'x', type: 'int'},			// 组件在页面中的X位置 
    {name: 'y', type: 'int'},			// 组件在页面中的Y位置 
    {name: 'varId', type: 'int'}		// 组件组件的变量ID号？
]);

/*
获取当前选中的组件
*/
Ems.component.getSelectedDom=function(){
	return Ext.query("*[ems_selected_comp]");
};

/*
清除组件选择
*/
Ems.component.deselectComponents=function(){
	var list=Ems.component.getSelectedDom();
	if(list){
		Ext.each(list, function(item){
			item.removeAttribute("ems_selected_comp");
			Ext.get(item).setStyle({"border-style":"none"});
		});
	};
}
/*
移动组件
*/
Ems.component.moveBy=function(el, xOrY, step){
	var n = xOrY=="x" ? el.getX(): el.getY();
	n+=step;
	if(n<0) n=0;
	//TODO 检查最大边界
	if(xOrY=="x") {el.setX(n);} else {el.setY(n)};
};

Ems.component.BaseComponent = Ext.extend(Ext.BoxComponent, {
	cfgRecord: null,			// 配置信息记录，一般在页面设计期指定各字段内容信息
	developMode: false,			// 开发模式，当组件处于页面开发期时设为真，支持拖拽、移动、聚焦等操作
	contextMenu: null,			// 右键菜单
	// Begin 构造
	constructor: function(config){
		config=config||{};
		var cfgR=config.cfgRecord||{x:0, y:0};
		this.cfgRecord=config.cfgRecord ? config.cfgRecord.copy() : new Ems.component.ConfigRecord();  //复制或新建组件配置记录
		if(config.cfgRecord){  // 复制EXT通用配置项
			config.x=config.x||cfgR.x;
			config.y=config.y||cfgR.y;
		}
		this.developMode=config.developMode||false;	//开发模式
		this.contextMenu=config.contextMenu||null;	//右键菜单
		config.keys={key:"x", fn:function(e){alert(1);}};
		config.autoEl={
			tag:'div'
		};
		Ext.apply(this, config);
		Ems.component.BaseComponent.superclass.constructor.call(this, config);
		this.on({
			'render':this.OnBaseRender,
			 scope:this
		});
	},	// End 构造
	
	// Begin 渲染
	OnBaseRender:function(e){
		var me=e.getEl();
		me.position ("absolute");
		// Begin 开发模式下支持的事件和操作
		if(e.developMode){
			me.on({
				'click':this.devBaseClick,	// 单击聚焦
				scope:e
			});
			// Begin 设置组件为拖放源
			e.dragZone = new Ext.dd.DragZone(e.getEl(), {
				getDragData: function(e) {
					var sourceEl = e.getTarget(e.itemSelector, 10);
					if (sourceEl) {
						d = sourceEl.cloneNode(true);
						d.id = Ext.id();
						return e.dragData = {
							sourceEl: sourceEl,
							repairXY: Ext.fly(sourceEl).getXY(),
							ddel: d
						}
					}
				},
				getRepairXY: function() {
					return this.dragData.repairXY;
				}
			});
			// <- End 设置组件为拖放源
			// -> Begin 处理按键事件
			new Ext.KeyMap(document, [
				{
					key:[Ext.EventObject.LEFT,Ext.EventObject.RIGHT,Ext.EventObject.UP,Ext.EventObject.DOWN,], 
								ctrl:true, fn: function(e){ // 按光标键移动一个像素  
						var list=Ems.component.getSelectedDom();
						if(list){
							Ext.each(list, function(item){
								var el=Ext.get(item);
								Ems.component.moveBy(el, 
													 (e==Ext.EventObject.LEFT)||(e==Ext.EventObject.RIGHT)?"x":"y", 
													 (e==Ext.EventObject.LEFT)||(e==Ext.EventObject.UP)?-1:1);
							});
						};
					},
					scope: null
				}
				// TODO 添加其它设计期按键事件处理代码
				]
			
			);
			// <- End 处理按键事件
			// -> Begin 附加容器的点击事件为清除组件选择
			if(!this.container.getAttribute("ems_container_click_handler")){
				this.container.addListener("click", function (e){
					// 清除其它组件的选中状态
					Ems.component.deselectComponents();
				});
				this.container.set({"ems_container_click_handler": "set"});
			}
			// <- End 附加容器的点击事件为清除组件选择
		}; // End 开发模式下支持的事件和操作
		// Begin 附加右键菜单
		if(e.contextMenu){
			me.on({
				'contextmenu':function(evt) {
					 evt.preventDefault();
					 e.contextMenu.showAt(evt.getXY());
				},
				scope:e
			});
		};
		// End 附加右键菜单
	    
	},	// End 渲染
	
	// Begin 开发期单击
	devBaseClick:function(e){
		var me=this.getEl();
		// 清除其它组件的选中状态
		Ems.component.deselectComponents();
		// 设置本组件为选中
		me.setStyle({"border-style":"dotted", "border-width": "medium"});
		me.set({"ems_selected_comp": "yes"});
		// 避免事件冒泡
		e.stopEvent();
	}	// End 开发期单击
	
	
});

Ext.reg('emsbase',Ems.component.BaseComponent);
