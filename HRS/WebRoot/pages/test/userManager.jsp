<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String cp = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<script type="text/javascript"
	src="<%=cp%>/ext3/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=cp%>/ext3/ext-all.js"></script>
<link href="<%=cp%>/ext3/resources/css/ext-all.css" rel="stylesheet"
	type="text/css"></link>
<script type="text/javascript">
	Ext.onReady(function() {
		Ext.ns('com.ems.user');

		com.ems.user.usermanager = function() {
			var userGrid;
			var columnModel;
			var jsonStore;
			var addUserBtn;
			var delUserBtn;
			var modifyUserBtn;
			var panel;
			

			jsonStore = new Ext.data.Store({
				proxy : new Ext.data.MemoryProxy([ {
					username : 'test01',
					password : 'test01',
					email : 'email@test01'
				}, {
					username : 'test02',
					password : 'test02',
					email : 'email@test02'
				}, {
					username : 'test03',
					password : 'test03',
					email : 'email@test03'
				} ]),
				reader : new Ext.data.ArrayReader({}, [ {
					name : 'username',
					mapping : 'username'
				}, {
					name : 'password',
					mapping : 'password'
				}, {
					name : 'email',
					mapping : 'email'
				} ])
			});
			jsonStore.load();
			
			/*
			columnModel = new Ext.grid.columnModel({
				columns:[{id:'OPER_NO',header:'用户名',sortale:true,dataIndex:'OPEN_NO'},
				         {dataIndex:'REGION_ID',header:'地区编号'，sortable:true},
				         {dataIndex:'DEPT_NO',header:'单位编号'，sortable:true},
				         {dataIndex:'ROLE_CODE',header:'规则代码'，sortable:true},
				         {dataIndex:'OPER_NAME',header:'真实姓名'，sortable:true},
				         {dataIndex:'LOGIN_NAME',header:'登录名称'，sortable:true},
				         {dataIndex:'OPER_PWD',header:'密码'，sortable:true},
				         {dataIndex:'QUESTION',header:'提问'，sortable:true},
				         {dataIndex:'ANSWER',header:'回答'，sortable:true},
				         {dataIndex:'GENDER',header:'性别'，sortable:true},
				         {dataIndex:'POSITIONS',header:'位置'，sortable:true},
				         {dataIndex:'PHONE',header:'电话'，sortable:true},
				         {dataIndex:'EMAIL',header:'电子邮箱'，sortable:true},
				         {dataIndex:'MOBILE_NO',header:'移动电话'，sortable:true},
				         {dataIndex:'NEED_SMS',header:'是否需要短信'，sortable:true},
				         {dataIndex:'OPER_MESSAGE',header:'用户信息'，sortable:true},
				         {dataIndex:'EFF_DATE',header:'截止时间'，sortable:true},
				         {dataIndex:'EXP_HINT_DATE',header:'注册提示时间'，sortable:true},
				         {dataIndex:'EXP_DATE',header:'注册时间'，sortable:true},
				         {dataIndex:'INIT_FLAG',header:'初始化标记'，sortable:true},
				         {dataIndex:'DEAL_TYPE',header:'交易类型'，sortable:true},
				         {dataIndex:'APP_TYPE',header:'应用类型'，sortable:true},
				         {dataIndex:'STATISTICAL_DEPT_NO',header:'统计单位号'，sortable:true},
				         {dataIndex:'OPER_ALIAS',header:'用户别名'，sortable:true},
				         {dataIndex:'LOGIN_COUNT',header:'登陆次数'，sortable:true},
				         {dataIndex:'EXP_HINT_DATE',header:'注册提示时间'，sortable:true}]
			});
			*/
			var sm = new Ext.grid.CheckboxSelectionModel();
			columnModel = new Ext.grid.ColumnModel({
				columns : [ new Ext.grid.RowNumberer() ,{
					id : 'username',
					header : '用户名',
					dataIndex : 'username'
				}, {
					header : '密码',
					dataIndex : 'password'
				}, {
					header : '邮件',
					dataIndex : 'email'
				},sm],
				defaults: {
				        sortable: true,
				        menuDisabled: true,
				        width: 100
				 }
			});
			return {
				self : this,
				addUser : function() {
					Ext.MessageBox.alert('add');
				},
				delUser : function() {
					Ext.MessageBox.alert('del');
				},
				modifyUser : function() {
					Ext.MessageBox.alert('update');
				},
				init : function() {
					userGrid = new Ext.grid.EditorGridPanel({
						layout:'fit',
						store : jsonStore,
						cm:columnModel,
						sm:sm,
						loadMask:true,
						stripeRows : true,
						// config options for stateful behavior
						stateful : true,
						stateId : 'um-grid'
					});
					
					addUserBtn = new Ext.Button({
						text : '添加用户',
						handler :this.addUser
					});
					delUserBtn = new Ext.Button({
						text : '删除用户',
						handler : self.delUser
					});
					modifyUserBtn = new Ext.Button({
						text : '修改用户',
						handler : this.modifyUser
					});
					
					panel = new Ext.Panel({
						layout:'fit',
						applyTo:Ext.get('um'),
						border:false,
						width:400,
						height:300,
						title:'用户管理',
						items:[
							userGrid
						],
						tools:[{id:'save'},{id:'help',text:'theHelp',handler:function(){alert(2);}}],
						bbar:[{text:'刷新',handler:function(){alert(1);}	},addUserBtn,
								modifyUserBtn,
								delUserBtn]
					});
				}
			};

		}();

		com.ems.user.usermanager.init();
	});
</script>
userManager
<div id="um"></div>