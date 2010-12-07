<%@ page pageEncoding="gbk"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String cp = path;
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'addUser.jsp' starting page</title>
<script type="text/javascript"
	src="<%=cp%>/ext3/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=cp%>/ext3/ext-all.js"></script>
<link href="<%=cp%>/ext3/resources/css/ext-all.css" rel="stylesheet"
	type="text/css"></link>
<script type="text/javascript">
	Ext.onReady(function(){
		com.hrs.test.usermanager.adduser.init();	
	});
	
	Ext.ns('com.hrs.test.usermanager');
	com.hrs.test.usermanager.adduser=function(){
		var viewport;
		var panel;
		var window;
		
		return {_self:this,init:function(){
			panel=new Ext.Panel({
				layout:'column',
				baseCls:'x-plain',
				items:[
					{
						padding:5,
						columnWidth:.5,
						layout:'form',
						labelWidth:55,
						defaultType:'textfield',
						defaults:{width:160},
						baseCls:'x-plain',
						items:[{fieldLabel:'用户名',name:'username'},{fieldLabel:'密码',name:'password',inputType:"password"},{fieldLabel:'电子邮件',name:'email'},
						       {fieldLabel:'性别',name:'sex',triggerAction:'all',mode:'local',editable:false,xtype:'combo',store:[['y','男性'],['n','女性']]},{fieldLabel:'权限',name:'role',xtype:'combo',store:[['op','操作员'],['admin','管理员']],editable:false,mode:'local',triggerAction: "all"}]
					},
					{
						columnWidth:.5,
						layout:'form',
						labelWidth:55,
						baseCls:'x-plain',
						items:[{
							xtype:'textfield',
							fieldLabel:'头像',
							width:170,
							height:177,
							inputType:'image'
						}]
					}
				]
			});
			
			window = new Ext.Window({
				title:'添加用户',
				showLock:false,
				listeners:{
					'show':function(_window){
						if(!_window['showLock']){
							_window.findByType('textfield')[3].getEl().dom.src='user.jpg';
							_window['showLock']=true;
						}
					}
				},
				buttons:[new Ext.Button({id:'okBtn',text:'确认',listeners:{'click':function(btn,event){
					Ext.MessageBox.alert(window.findByType('textfield')[0].getName(),window.findByType('textfield')[0].getValue());
				}}}),new Ext.Button({id:'cancelBtn',text:'取消',listeners:{'click':function(btn,event){
					window.doHide();
				}}})],
				width:500,
				height:400,
				items:[panel]
			});
			
			viewport=new Ext.Viewport({
				layout:'auto',
				enableScroll:false,
				items:[window]
			});
			window.show();
		}};
	}();
</script>
</head>

<body>
<div id='infoOper'></div>
<br>
</body>
</html>
