/*!
 * 状态图标
 */
/**
 * @class Ems.component.StateIcon
 * @extends Ext.BoxComponent
 * 将有限的整数状态值用对应的图像来表示
 构造时提供状态集数据stateSet，例如：
 stateSet: {
		"0":{title:"未知", url:"unknown.gif"},
		"1":{title:"合格", url:"yes.gif"},
		"2":{title:"不合格", url:"no.gif"},
	}
 * 图标可以是任何GIF图片
 * @constructor
 * @xtype icon
 */

Ext.ns("Ems.component");

Ems.component.StateIcon = Ext.extend(Ext.BoxComponent, {
	iconPath: "./state_icon_images",  // 图标路径
	iconType: "default", // 图标类型
	iconExt: ".gif", // 图片文件后缀名
	curState: null,  // 当前状态
	
	// 构造
	constructor: function(config){
		config=config||{};
		config.autoEl={
			tag:'span'
		};
		Ext.apply(this, config);
		Ems.component.StateIcon.superclass.constructor.call(this, config);
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
			'click':this.doClick,
			scope:this
		});
		//  设置组件为拖放源
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
	    
	},
	
	// 单击
	doClick:function(e){  // Stub
		//alert("Do not click me!");
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

Ext.reg('StateIcon',Ems.component.StateIcon);
