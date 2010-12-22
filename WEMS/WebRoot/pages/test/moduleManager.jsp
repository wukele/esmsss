<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String cp = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript"
	src="<%=cp%>/ext3/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=cp%>/ext3/ext-all.js"></script>
<link href="<%=cp%>/ext3/resources/css/ext-all.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript">
	Ext.QuickTips.init();
	Ext.ns('com.hrs.ext.test.modulemanager');

	com.hrs.ext.test.modulemanager.userManager = function() {
		var viewport;
		var grid;
		var dataStroe;
		var tree;
		var pagesize = 5;
		var leftPanel;
		var rightPanel;
		var sm;
		var rowRumber;

		var data = {
			user : [ {
				userCode : '1',
				userName : 'admin1',
				password : 'admin1',
				email : 'admin1@',
				address : 'admin1'
			}, {
				userCode : '2',
				userName : 'admin2',
				password : 'admin2',
				email : 'admin2@',
				address : 'admin2'
			}, {
				userCode : '3',
				userName : 'admin3',
				password : 'admin3',
				email : 'admin3@',
				address : 'admin3'
			}, {
				userCode : '4',
				userName : 'admin4',
				password : 'admin4',
				email : 'admin4@',
				address : 'admin4'
			}, {
				userCode : '5',
				userName : 'admin5',
				password : 'admin5',
				email : 'admin5@',
				address : 'admin5'
			}, {
				userCode : '6',
				userName : 'admin6',
				password : 'admin6',
				email : 'admin6@',
				address : 'admin6'
			} ]
		};
		dataStroe = new Ext.data.JsonStore(
				{
					fields : [ 'userCode', 'userName', 'password', 'email',
							'address' ],
					proxy : new Ext.data.MemoryProxy(data),
					idProperty : 'userCode',
					root : 'user'
				});

		dataStroe.load();

		return {
			init : function() {
				leftPanel = new Ext.Panel({
					region : 'west',
					layout : 'accordion',
					width : 200,
					split : true,
					defaults : {
						// applied to each contained panel
						bodyStyle : 'padding:2px'
					},
					layoutConfig : {
						// layout-specific configs go here
						titleCollapse : false,
						animate : true,
						activeOnTop : true
					},
					items : [ {
						xtype : 'panel',
						title : '模块管理',
						layout : 'fit',
						items : []
					} ]
				});
			},
			getContentPanel : function() {
				return rightPanel;
			}
		};
	}();

	com.hrs.ext.test.modulemanager.moduleManager = function() {
		var viewport;
		var grid;
		var dataStore;
		var tree;
		var pagesize = 5;
		var leftPanel;
		var rightPanel;
		var sm;
		var rowRumber;
		var window;

		sm = new Ext.grid.CheckboxSelectionModel();
		rowRumber = new Ext.grid.RowNumberer();

		var data = {
			infoSysModules : [ {
				'moduleCode' : '1000001',
				'moduleName' : '动力配电监控',
				'moduleIndex' : '1',
				'isActive' : '1'
			}, {
				'moduleCode' : '2000001',
				'moduleName' : '场地环境监控',
				'moduleIndex' : '2',
				'isActive' : '1'
			}, {
				'moduleCode' : '3000001',
				'moduleName' : '场地安全监控',
				'moduleIndex' : '3',
				'isActive' : '1'
			}, {
				'moduleCode' : '4000001',
				'moduleName' : '机柜微环境监控',
				'moduleIndex' : '4',
				'isActive' : '1'
			}, {
				'moduleCode' : '5000001',
				'moduleName' : '设备通讯状态监控',
				'moduleIndex' : '5',
				'isActive' : '1'
			} ]
		};
		dataStore = new Ext.data.JsonStore({
			proxy : new Ext.data.MemoryProxy(data),
			root : 'infoSysModules',
			idProperty : 'moduleCode',
			fields : [ {
				name : 'moduleCode',
				mapping : 'moduleCode'
			}, {
				name : 'moduleName',
				mapping : 'moduleName'
			}, {
				name : 'moduleIndex',
				mapping : 'moduleIndex',
				type : 'int'
			}, {
				name : 'isActive',
				mapping : 'isActive',
				type : 'int'
			} ]
		});

		dataStore.load({
			params : {
				start : 0,
				limit : pagesize
			}
		});

		return {
			init : function() {
				window = new Ext.Window({
					title : "添加模块",
					frame : true,
					width : 260,
					height : 130,
					layout : "form",
					labelWidth : 60,
					autoHeight : true,
					plain : true,
					resizable : true,
					buttonAlign : "center",
					closeAction : "hide",
					defaults : {
						xtype : "textfield",
						width : 180
					},
					bodyStyle : "padding:3px",
					items : [ {
						fieldLabel : '模块代码',
						id : 'moduleCode',
						name : 'moduleCode',
						allowBlank:false,
						blankText:'不可以为空'
					}, {
						fieldLabel : '模块名称',
						id : 'moduleName',
						name : "moduleName",
						allowBlank:false,
						blankText:'模块名称不能为空',
						minLength:2,
						minLengthText:'模块名称至少2位',
						maxLengthText:'模块名称至多10位'
					}, {
						fieldLabel : '模块顺序',
						id : "moduleIndex",
						name : 'moduleIndex',
						minLength:1,
						minLengthText:'长度至少1',
						maxLength:2,
						maxLengthText:'长度最多2',
						regex:/[0-9]{1,2}/,
						regexText:'模块顺序必须为数字'
					}, {
						fieldLabel : '是否激活',
						id : 'isActive',
						name : 'isActive',
						regex:/[01]/,
						regexText:'是否激活必须为0和1'
					} ],
					buttons : [
							{
								xtype : 'button',
								text : '确认',
								name : 'okBtn',
								handler : function() {
									var record = new Ext.data.Record({
										'moduleCode' : this.ownerCt.ownerCt
												.findById('moduleCode')
												.getValue(),
										'moduleName' : this.ownerCt.ownerCt
												.findById('moduleName')
												.getValue(),
										'moduleIndex' : this.ownerCt.ownerCt
												.findById('moduleIndex')
												.getValue(),
										'isActive' : this.ownerCt.ownerCt
												.findById('isActive')
												.getValue()
									}, dataStore.getCount() + 1);
									dataStore.add(record);
									this.ownerCt.ownerCt.hide();
								}
							}, {
								xtype : 'button',
								text : '取消',
								name : 'cancelBtn',
								handler : function() {
									this.ownerCt.ownerCt.hide();
								}
							} ]
				});
				//功能节点 
				var rootNode = new Ext.tree.TreeNode({
					id : 'root',
					hidden : false
				});
				rootNode.appendChild([ new Ext.tree.TreeNode({
					id : 'moduleNode1',
					text : '模块管理',
					leaf : true,
					url: com.hrs.ext.test.modulemanager.moduleManager
				}), new Ext.tree.TreeNode({
					id : 'moduleNode2',
					text : '用户管理',
					leaf : true,
					url : com.hrs.ext.test.modulemanager.userManager
				}), new Ext.tree.TreeNode({
					id : 'moduleNode3',
					text : '菜单管理',
					leaf : true,
					url : com.hrs.ext.test.modulemanager.menuManager
				}), new Ext.tree.TreeNode({
					id : 'moduleNode4',
					text : '权限管理',
					leaf : true,
					url : com.hrs.ext.test.modulemanager.roleManager
				}) ]);

				tree = new Ext.tree.TreePanel({
					width : 200,
					root : rootNode,
					listeners : {
						'click' : function(node, evt) {
							var obj = eval(node.attributes.url);
							obj.init();
							rightPanel = obj.getContentPanel();
							rightPanel.load();
						}
					}
				});

				grid = new Ext.grid.GridPanel({
					store : dataStore,
					columns : [ rowRumber, sm, {
						id : 'moduleCode',
						header : '模块编号',
						dataIndex : 'moduleCode'
					}, {
						header : '模块名称',
						dataIndex : 'moduleName'
					}, {
						header : '模块模块顺序',
						dataIndex : 'moduleIndex'
					}, {
						header : '是否激活',
						dataIndex : 'isActive'
					} ],
					defaults : {
						sortable : true,
						menuDisabled : true,
						width : 100
					},
					sm : sm,
					layout : 'fit',
					bbar : [
							{
								xtype : 'button',
								name : 'addModuleBtn',
								text : '添加',
								handler : function() {
									var textfields = window.findByType('textfield');
									Ext.each(textfields,function(item,index,allItems){
										item.setValue('');
									});
									window.show();
								}
							},
							{
								xtype : 'button',
								name : 'delModuleBtn',
								text : '删除',
								handler : function() {
									var recs = grid.getSelectionModel()
											.getSelections();
									dataStore.remove(recs);
								}
							} ]

				});
				leftPanel = new Ext.Panel({
					region : 'west',
					layout : 'accordion',
					split : true,
					width : 200,
					minSize : 100,
					maxSize : 500,
					defaults : {
						// applied to each contained panel
						bodyStyle : 'padding:1px'
					},
					layoutConfig : {
						// layout-specific configs go here
						titleCollapse : false,
						animate : true,
						activeOnTop : true
					},
					items : [ {
						xtype : 'panel',
						title : '模块管理',
						items : [ tree ]
					} ]
				});
				rightPanel = new Ext.Panel({
					id : 'rightPanel',
					region : 'center',
					layout : 'fit',
					split : true,
					items : [ grid ]
				});
				viewport = new Ext.Viewport({
					layout : 'border',
					autoScroll : true,
					border : true,
					items : [ leftPanel, rightPanel ]
				});
			},
			getContentPanel:function(){return rightPanel;}
		};
	}();
	Ext.onReady(function() {
		com.hrs.ext.test.modulemanager.moduleManager.init();
	});
</script>
<title>模块维护</title>
</head>
<body>

</body>
</html>