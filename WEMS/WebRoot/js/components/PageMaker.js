// JavaScript Document
	Ext.ns("pagemaker");
	
	pagemaker.bgList={};  // 背景列表
	
	pagemaker.dsList=[];	// 数据源列表
	
	pagemaker.compList=null;  // 组件类型COMBO
	
	pagemaker.regList={};  	//受管理组件列表

	// 设置数背景清单
	pagemaker.setBGList=function(list){
		pagemaker.bgList=list;
	};
	
	// 设置数据源列表
	pagemaker.setDSList=function(list){
		pagemaker.dsList=list;
	};
	
	// 注册受管理的组件
	pagemaker.reg=function(comp){
		pagemaker.regList[comp.id]=comp;
	};

	// 注销受管理的组件
	pagemaker.unreg=function(compId){
		delete pagemaker.regList[compId];
	};


	// Begin 生成组件编辑窗口
	pagemaker.getPropertyWin=function(comp){
		var items=[];	// 属性项目
		// 名称
		items[0]={
			xtype: 'textfield',
			id: "compName",
			name: "compName",
			isFormField:true,
			fieldLabel: "组件名称",
			allowBlank:false,
			value: comp.name
		};
		// Begin 坐标控件
		items[1]={
					xtype: 'compositefield',
					anchor: '-20',
					defaults: {
						flex: 1
					},
					items: [{
						xtype: 'numberfield',
						id: "coordX",
						name: "coordX",
						isFormField:true,
						minValue: 0,
						maxValue:1600,
						fieldLabel: "X",
						value: comp.el.getOffsetsTo(comp.el.parent())[0]
					},
					{
						xtype: 'numberfield',
						id: "coordY",
						name: "coordY",
						isFormField:true,
						minValue: 0,
						maxValue:1600,
						fieldLabel: "Y",
						allowBlank:false,
						value: comp.el.getOffsetsTo(comp.el.parent())[1]
					},
					{
						xtype: 'numberfield',
						id: "coordWidth",
						name: "coordWidth",
						isFormField:true,
						minValue: 0,
						maxValue:1600,
						fieldLabel: "宽",
						allowBlank:false,
						value: comp.el.getWidth()
					},
					{
						xtype: 'numberfield',
						id: "coordHeight",
						name: "coordHeight",
						isFormField:true,
						minValue: 0,
						maxValue:1600,
						fieldLabel: "高",
						allowBlank:false,
						value: comp.el.getHeight()
					}]
				};
		// End 坐标控件
		
		// Begin 列举全部需配置属性
		if(comp.cfgItems){
			comp.cfgItems.each(function(record){
				var prop=record.data;
				var itemId=comp.id+"proped"+prop.name;
				// 添加编辑项目
				items[items.length]={
					id: itemId,
					name: prop.name,
					fieldLabel: prop.title,
					allowBlank:false,
					value: comp[prop.name]
				};
			});
		}
		// 添加数据源区
		items[items.length]={
			xtype: "textfield",
			name: "dsType",
			id: comp.id+"dsType",
			fieldLabel: "数据来源",
			allowBlank:true,
			value: comp.dsType
		};
		items[items.length]={
			xtype: "textfield",
			name: "dsPara",
			fieldLabel: "编号参数",
			allowBlank:true,
			value: comp.dsPara
		};
		// 添加初始数据编辑区
		items[items.length]={
			xtype: "textarea",
			name: "data",
			fieldLabel: "初始数据",
			allowBlank:true,
			value: Ext.util.JSON.encode(comp.getData())
		};
		
		
		// End 列举全部需配置属性

		// Begin 属性控件表单		
		var form=new Ext.FormPanel({
				labelWidth: 75, // label settings here cascade unless overridden
				frame:false,
				bodyStyle:'padding:5px 5px 0',
				width: 350,
				defaults: {width: 230},
				defaultType: 'textfield',
				items: items
		});
		// End 属性控件表单

		// Begin 编辑窗口
		var win = new Ext.Window({
			title: "组件设置 "+comp.id+" ("+comp.getXType()+")",
			layout:'fit',
			width:450,
			height:320,
			closeAction:'close',
			modal:true,
			plain: true,

			items:form,

			buttons: [{
				text:'应用',
				handler: function(){
					var formDom=form.el.child("form").dom;
					// 检查数据格式并获取数据
					var data=null;
					try{
						data=Ext.util.JSON.decode(formDom["data"].value);
					}catch(ex){
						alert("数据语法格式有误！\r\n"+ex);
						return;
					}
					// 获取配置参数
					var config={};
					config["name"]=formDom["compName"].value;
					config["x"]=parseInt(formDom["coordX"].value);
					config["y"]=parseInt(formDom["coordY"].value);
					config["width"]=parseInt(formDom["coordWidth"].value);
					config["height"]=parseInt(formDom["coordHeight"].value);
					config["dsType"]=formDom["dsType"].value;
					config["dsPara"]=formDom["dsPara"].value;
					if(comp.cfgItems){
						comp.cfgItems.each(function(record){
							var prop=record.data;
							config[prop.name]=formDom[prop.name].value;
						});
						comp.reconfig(config);  // 重设配置
					}
					comp.setData(data);		// 设置数据
					win.close();
				}
			},{
				text: '放弃',
				handler: function(){
					win.close();
				}
			}]
		});
		// End 编辑窗口
		// Begin 窗口激活事件
		win.on({"activate":function(e){
			// Begin 列举全部需配置属性
			if(comp.cfgItems){
				comp.cfgItems.each(function(record){
					var prop=record.data;
					var itemId=comp.id+"proped"+prop.name;
					// 把可选项作为Combo附加到属性编辑框上
					if(prop.options){
						 new Ext.form.ComboBox({
							typeAhead: true,
							triggerAction: 'all',
							lazyRender:false,
							mode: 'local',
							store: prop.options.split(";"),
							emptyText:'请选择...',
							applyTo: itemId
						});
					}
				});
			}
			// End 列举全部需配置属性
			// Begin 数据源Combo
			 new Ext.form.ComboBox({
				typeAhead: true,
				triggerAction: 'all',
				lazyRender:false,
				mode: 'local',
				store: pagemaker.dsList,
				emptyText:'请选择...',
				applyTo: comp.id+"dsType"
			});
			// End 数据源Combo
		}});
		// End 窗口激活事件

		return win;
	};
	// End 生成组件编辑窗口

	
	
	
	
	// Begin 生成页面编辑窗口
	pagemaker.getPageWin=function(pageName, bgName, callback){
		var bgImgList=null;
		var items=[
			{
				xtype: 'textfield',
				id: "pageName",
				name: "pageName",
				isFormField:true,
				fieldLabel: "页面名称",
				allowBlank:false,
				value: pageName
			},
			{
				xtype: 'textfield',
				id: "bgName",
				name: "bgName",
				isFormField:true,
				fieldLabel: "底图名称",
				allowBlank:false,
				value: bgName
			}
		];
		// Begin 属性控件表单		
		var form=new Ext.FormPanel({
				labelWidth: 75, // label settings here cascade unless overridden
				frame:false,
				bodyStyle:'padding:5px 5px 0',
				width: 350,
				defaults: {width: 230},
				defaultType: 'textfield',
				items: items
		});
		// End 属性控件表单

		// Begin 编辑窗口
		var win = new Ext.Window({
			title: "页面设置",
			layout:'fit',
			width:450,
			height:280,
			closeAction:'close',
			modal:true,
			plain: true,

			items:form,

			buttons: [{
				text:'应用',
				handler: function(){
					var formDom=form.el.child("form").dom;
					// 回调
					callback(formDom["pageName"].value, formDom["bgName"].value, bgImgList.getValue());
					win.close();
				}
			},{
				text: '放弃',
				handler: function(){
					win.close();
				}
			}]
		});
		// End 编辑窗口
		// Begin 窗口激活事件
		win.on({"activate":function(e){
			// Begin 附加底图选单
			bgImgList = new Ext.form.ComboBox({
				typeAhead: true,
				triggerAction: 'all',
				lazyRender:false,
				mode: 'local',
				store: pagemaker.bgList,
				valueField: 'url',
				displayField: 'name',
				emptyText:'请选择一个底图....',
				applyTo: 'bgName'
			});
			bgImgList.on({"select":function(combo, record, index){
					//Ext.select("#bgimg").set({src:record.data.url});
			}});
			// End 附加底图选单
		}});
		// End 窗口激活事件

		return win;
	};
	// End 生成页面编辑窗口
	
	
	
	
	
	/*提取组件信息*/
	pagemaker.getCompProfile=function(comp){
		var ret={};
		// 类型
		ret.xtype=comp.getXType();
		// 名称
		ret.name=comp.name;
		// Begin 坐标
		var offset=comp.el.getOffsetsTo(comp.el.parent());
		ret.x=offset[0];
		ret.y=offset[1];
		ret.width=comp.el.getWidth();
		ret.height=comp.el.getHeight();
		// End 坐标
		// 数据来源
		ret.dsType=comp.dsType;
		ret.dsPara=comp.dsPara;
		
		// Begin 列举全部需配置属性
		if(comp.cfgItems){
			comp.cfgItems.each(function(record){
				var prop=record.data;
				ret[prop.name]=comp[prop.name];
			});
		}
		// End 列举全部需配置属性
		
		// 数据
		ret.data=comp.getData();

		return ret;
	};
	
	// 定义组件快捷菜单
	pagemaker.contextMenu = new Ext.menu.Menu({
		items: [{text: '设置', handler: function(e){
				alert("功能暂未实现");
			}},
			{
				text: '删除',
			handler: function(e){
				alert("功能暂未实现");
			}
		}]
	});

	// 动态创建组件
	pagemaker.createComp=function(xtype){
		if(xtype){
			// 创建
			var comp=new Ext.ComponentMgr.types[xtype]({
				developMode: true,
				x:16,
				y:16,
				width: 32,
				height: 32
			});
			// 渲染
			comp.render(Ems.component.box.dom);
			// 注册
			pagemaker.reg(comp);
			// 清除其它选择
			Ems.component.deselectComponents();
			// 选择本组件
			comp.setSelect();
			// 设置当前组件
			pagemaker.setComp();
		}else{
			alert("未指定组件类型，无法创建。");
		}
	};
	
	// 编辑组件属性
	pagemaker.setComp=function(){
		var found=false;
		var list=Ems.component.getSelectedComp();
		for(var id in list){
			var comp=list[id];
			if(typeof(comp)=="object"){
				var win=pagemaker.getPropertyWin(comp);
				win.show(this);
				found=true;
			}
		};
		if(!found) alert("未选择组件，无法设置。");
	};

	// Begin 提取组件信息
	pagemaker.getCompProfiles=function(){
		var list=Ems.component.getSelectedComp();
		var found=false;
		for(var id in list){
			var comp=list[id];
			if(typeof(comp)=="object"){
				var profile=pagemaker.getCompProfile(comp);
				Ext.Msg.alert('组件信息', Ext.util.JSON.encode(profile));
				found=true;
			}
		};
		if(!found) alert("未选择组件，无法提取信息。");
	};
	// End 提取组件信息
	
	
	// Begin 输入组件信息
	pagemaker.promptCompProfile=function(callback){
		Ext.Msg.minPromptWidth=300;
		Ext.Msg.prompt('组件信息', '请在此输入组件信息：', function(btn, text){
			if (btn == 'ok'){
				// 检查数据格式并获取数据
				var profile=null;
				try{
					profile=Ext.util.JSON.decode(text);
				}catch(ex){
					alert("语法格式有误！\r\n"+ex);
					return;
				}
				if(!(profile.xtype)){
					alert("组件类型未定义，不能应用！");
					return;
				}
				callback(profile);
			}
		}, this, 160);  // End prompt 函数
	};
	// End 输入组件信息
	

	
	// Begin 应用组件信息
	pagemaker.applyCompProfiles=function(){
		pagemaker.promptCompProfile(function(profile){
			// Begin 重设配置
			var list=Ems.component.getSelectedComp();
			var found=false;
			for(var id in list){
				var comp=list[id];
				if(typeof(comp)=="object"){
					if(profile.xtype!=comp.getXType()){
						alert("组件类型不一致，不能应用！");
						return;
					}else{
						comp.reconfig(profile);
						found=true;
					}
					
				}
			};
			if(!found) alert("未选择目标组件，无法应用信息。");
			// End 重设配置
		});
	};
	// End 应用组件信息
	
	// Begin 生成组件
	pagemaker.produce=function(){
		pagemaker.promptCompProfile(function(profile){
			profile.developMode=true;  // 根据需要指定是否开发模式
			var comp=new Ext.ComponentMgr.types[profile.xtype](profile);
		    comp.render(Ems.component.box.dom);
			pagemaker.reg(comp);
			Ems.component.deselectComponents();
			comp.setSelect();
		});
	};
	// End 生成组件
	
	// Begin 删除组件
	pagemaker.deleteComp=function(){
		var list=Ems.component.getSelectedComp();
		var doDel=function(){
			Ems.component.deselectComponents();
			var found=false;
			for(var id in list){
				var comp=list[id];
				if(typeof(comp)=="object"){
					pagemaker.unreg(comp.id);
					//本该使用comp.destroy(); destotry 方法存在bug，暂时只是把组件隐藏
					comp.getEl().setStyle({"display":"none"});
					found=true;
				}
			};
			if(!found) alert("未选择组件，无法删除。");
		};
		Ext.Msg.show({
			title:'确认删除',
			msg: '即将删除选中的组件。是否继续？',
			buttons: Ext.Msg.YESNO,
			fn: function(btn){
				if(btn=="yes") doDel();
			},
			icon: Ext.MessageBox.QUESTION
		});
	};
	// End 删除组件
	
	
	// Begin 设置页面对话框
	pagemaker.setPageDlg=function(){
		var pageName=Ext.get(Ems.component.box).getAttribute("pagename")||"";
		var bgName=Ext.get(Ems.component.box).getAttribute("bgname")||"";
		var win=pagemaker.getPageWin(pageName, bgName, Ems.component.setPage);
		win.show();
	};
	// End 设置页面对话框

	// Begin 提取页面信息
	pagemaker.getPageProfile=function(){
		var pageName=Ext.get(Ems.component.box).getAttribute("pagename")||"";
		var bgName=Ext.get(Ems.component.box).getAttribute("bgname")||"";
		var bgUrl=Ext.get("bgimg").getAttribute("src")||"";
		var profile={pageName:pageName, bgName:bgName, bgUrl:bgUrl};
		var components=[];
		for(var id in pagemaker.regList){
			var comp=pagemaker.regList[id];
			components[components.length]=pagemaker.getCompProfile(comp);
		}
		profile["components"]=components;
		Ext.Msg.alert('页面信息', Ext.util.JSON.encode(profile));
	};
	// End 提取页面信息
	
	// Begin 应用页面信息
	pagemaker.applyPageProfile=function(){
		Ext.Msg.minPromptWidth=300;
		Ext.Msg.prompt('页面信息', '请在此输入页面信息：', function(btn, text){
			if (btn == 'ok'){
				// 检查数据格式并获取数据
				var profile=null;
				try{
					profile=Ext.util.JSON.decode(text);
				}catch(ex){
					alert("语法格式有误！\r\n"+ex);
					return;
				}
				if(!(profile.bgUrl)){
					alert("底图未定义，不能应用！");
					return;
				}
				Ems.component.applyPageProfile(profile);
			}
		}, this, 160);  // End prompt 函数
	};
	// End 应用页面信息
	
		
	
