/*!
 * EMS组件
 */
/**
 * ------------------------------------------------------------------------------
 * @namespace Ems.component 组件命名空间
 * ------------------------------------------------------------------------------
 * @Ems.component.reg(xtype:String, cls:Contructor, name:String):void 注册本类组件
 * @Ems.component.getSelectedDom(): Array[DOM] 查询当前选中组件的DOM，结果放在数组中
 * @Ems.component.getSelectedComp(): Array[Component] 查询当前选中组件的JS对象，结果放在数组中
 * @Ems.component.deselectComponents(): void 取消选择，不选择任何组件
 * @Ems.component.getTypeAS(): ArrayStore 取注册组件表
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
 * @setData(data: Object):void 设置组件数据（组件应在datachange事件处理代码中进行显示刷新等操作）
 * @getData():Object 获取组件正在使用的数据
 *
 * 特性：
 * 		鼠标拖拽定位、鼠标单击选定、Ctrl+光标键移动位置、显示指定的右键菜单
 * 
 * 
 */

Ext.ns("Ems.component");

/*
内部组件类型注册表
*/
Ems.component.__types=new Array();

/*
容器
*/
Ems.component.box=null;

/*
选中组件
*/
Ems.component.__selectedComponents=new Array();


// 设置编辑容器
Ems.component.setContainer=function(id){
	var comp=new Ext.BoxComponent({applyTo:id});
	if(comp.el){
		// 登记
		Ems.component.box=comp.el;
		// 设置基本外观
		Ems.component.box.setStyle({"position": "relative", "border":"thin", "border-color":"black", "border-style":"solid"});
		// 设置容器为拖放目标
		var dropTargetEl =  Ems.component.box.dom;
		var dropTarget = new Ext.dd.DropTarget(dropTargetEl, {
		notifyDrop  : function(ddSource, e, data){
			Ext.get(ddSource.id).setXY(e.getXY());  // 移动源组件到目标位置
			return(true);
		}
		});
		// 初始化背景
		Ems.component.box.update("<img id='bgimg' src='' />");
	}
};

// Begin 设置页面
Ems.component.setPage=function(pageName, bgName, bgUrl){
	// 保存设置
	Ext.get(Ems.component.box).set({pagename:pageName});
	Ext.get(Ems.component.box).set({bgname:bgName});
	Ext.get("bgimg").set({src:bgUrl});
};
// End 设置页面


// Begin 应用页面信息
Ems.component.applyPageProfile=function(profile){
	// 页面信息
	Ext.get(Ems.component.box).set({pagename:profile.pageName});
	Ext.get(Ems.component.box).set({bgname:profile.bgName});
	Ext.get("bgimg").set({src:profile.bgUrl});
	// 组件信息组
	for(var i=0; i<profile.components.length; i++){
		var compProfile=profile.components[i];
		if(typeof(pagemaker)=="object") compProfile.developMode=true;  // 根据需要指定是否开发模式
		var comp=new Ext.ComponentMgr.types[compProfile.xtype](compProfile);
		comp.render(Ems.component.box.dom);
		if(typeof(pagemaker)=="object" && pagemaker.reg) pagemaker.reg(comp);
	};  // End for
};
// End 应用页面信息



/*
注册本类组件
*/
Ems.component.reg=function(xtype, cls, name){
	Ems.component.__types[xtype]={xtype:xtype, cls:cls, name:name};
	var s=xtype;
};

/*
查找组件注册列表，返回ArrayStore格式的Store
*/
Ems.component.getTypeAS=function(){
	var data=[];
	var types=Ems.component.__types;
	for(var xtype in types){
		var item=types[xtype];
		if(typeof(item)=="object") data[data.length]=[xtype, item.name];
	};
	return new Ext.data.ArrayStore({
		id: 0,
		fields: ['xtype', 'name'],
		data: data
	});
};

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

/*增加选择的组件*/
Ems.component.addSelection=function(comp){
	Ems.component.__selectedComponents[comp.id]=comp;
};

/*清除选择的组件*/
Ems.component.removeSelection=function(){
	Ems.component.__selectedComponents=[];
};

/*
获取当前选中的组件DOM
*/
Ems.component.getSelectedDom=function(){
	return Ext.query("*[ems_selected_comp]");
};

/*
获取当前选中的组件的JS对象
*/
Ems.component.getSelectedComp=function(){
	return Ems.component.__selectedComponents;
};

/*
清除组件选择
*/
Ems.component.deselectComponents=function(){
	var list=Ems.component.getSelectedDom();
	if(list){
		Ext.each(list, function(item){
			item.removeAttribute("ems_selected_comp");
			Ext.get(item).setStyle({"border-style":"none", "margin":"3px"});
		});
	};
	Ems.component.removeSelection();
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


/*
工具方法：获取当前本JS文件
*/
Ems.component.getCodeBase = function() {
	var fileName="EmsComponents.js";
	var ret = "./";
	var path=document.location.pathname;
	while(path.indexOf("\\")>0) {path=path.replace("\\", "/");}
	var docPath = document.location.pathname.substr(0, path.lastIndexOf("/") + 1);
	var oElm = document;
	var strTagName = "script";
	var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm
			.getElementsByTagName(strTagName);
	var oAttributeValue = new RegExp("(^|\\s)src(\\s|$)");
	var oCurrent;
	var oAttribute;
	for ( var i = 0; i < arrElements.length; i++) {
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute("src");
		if (typeof oAttribute == "string" && oAttribute.length > 0) {
			var index = oAttribute.lastIndexOf(fileName);
			if (index > 0) {
				ret = oAttribute.substr(0, index);
			}
		}
	}
	// Process the relative path
	if (ret.indexOf(".") == 0) {
		ret = docPath + ret;
	}
	return ret;
};

/*
基本组件
*/
Ems.component.BaseComponent = Ext.extend(Ext.BoxComponent, {
	cfgRecord: null,			// 配置信息记录，一般在页面设计期指定各字段内容信息
	developMode: false,			// 开发模式，当组件处于页面开发期时设为真，支持拖拽、移动、聚焦等操作
	contextMenu: null,			// 右键菜单
	name: "",					// 组件名称
	dsType: "DirectDataEngine",	// 数据源类型
	dsPara: "DE101",			// 数据源参数
	data: null,					// 当前数据
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
		me.setStyle({"margin": "0px"});
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
						d.style.left=0;
						d.style.top=0;
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
		this.setSelect();
		Ems.component.addSelection(this);
		// 避免事件冒泡
		e.stopEvent();
	},	// End 开发期单击
	
	
	// Begin 设置本组件为选中
	setSelect:function(){
		var me=this.getEl();
		me.setStyle({"border-style":"dotted", "border-width": "3px", "margin": "0px"});
		me.set({"ems_selected_comp": "yes"});
		Ems.component.addSelection(this);
	},
	// End 设置本组件为选中
	
	// Begin 设置数据
	setData:function(data){
		if(!this.data || Ext.util.JSON.encode(this.data)!=Ext.util.JSON.encode(data)){
			this.data=data;
			// 子类应当实现datachange事件处理代码，实现显示刷新
			if(this.events["datachange"]) this.events["datachange"].fire(this);
		}
	},
	// End 设置数据
	
	// Begin 获取数据
	getData:function(){
		return this.data;
	},
	// End 获取数据
	
	// Begin 重设配置
	reconfig: function(config){
		var el=this.el;
		el.setX(el.parent().getX()+config.x);
		el.setY(el.parent().getY()+config.y);
		el.setWidth(config.width);
		el.setHeight(config.height);
		Ext.apply(this, config);
		// 子类应当实现configchange事件处理代码，实现显示刷新
		if(this.events["configchange"]) this.events["configchange"].fire(this);
	}
	// End 重设配置
	
	
});

Ext.reg('emsbase',Ems.component.BaseComponent);
