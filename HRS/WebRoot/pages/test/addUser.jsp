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
		
		return {init:function(){
			panel=new Ext.Panel({
				layout:'column',
				baseCls:'x-plain',
				items:[
					{
						columnWidth:.5,
						layout:'form',
						labelWidth:55,
						defaultType:'textfield',
						defaults:{width:160},
						baseCls:'x-plain',
						items:[{fieldLabel:'�û���',name:'username'},{fieldLabel:'����',name:'password'},{fieldLabel:'�����ʼ�',name:'email'}]
					},
					{
						columnWidth:.5,
						layout:'form',
						labelWidth:55,
						baseCls:'x-plain',
						items:[{
							xtype:'textfield',
							fieldLabel:'ͷ��',
							width:170,
							height:177,
							inputType:'image'
						}]
					}
				]
			});
			
			window = new Ext.Window({
				title:'����û�',
				showLock:false,
				listeners:{
					'show':function(_window){
						if(!_window['showLock']){
							_window.findByType('textfield')[3].getEl().dom.src='user.jpg';
							_window['showLock']=true;
						}
					}
				},
				buttons:[new Ext.Button({id:'okBtn',text:'ȷ��',listeners:{'click':function(btn,event){
					Ext.MessageBox.alert(window.findByType('textfield')[0].getName(),window.findByType('textfield')[0].getValue());
				}}}),new Ext.Button({id:'cancelBtn',text:'ȡ��',listeners:{'click':function(btn,event){
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
