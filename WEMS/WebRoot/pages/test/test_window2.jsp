<%-- 
    Document   : test_window2
    Created on : 2010-12-7, 14:45:23
    Author     : hooxin
--%>

<%@page contentType="text/html" pageEncoding="GBK"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%
    String cp=request.getContextPath();
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=GBK">
        <title>JSP Page</title>
        <script type="text/javascript"
	src="<%=cp%>/ext3/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=cp%>/ext3/ext-all.js"></script>
<link href="<%=cp%>/ext3/resources/css/ext-all.css" rel="stylesheet"
	type="text/css"/>
        <script type="text/javascript" >
             Ext.onReady(function() {
	var _window = new Ext.Window( {
		title : "窗体",
		frame : true,
		width : 260,
		height : 130,
		layout : "form",
		labelWidth : 45,
		plain : true,
		resizable : false,
		buttonAlign:"center",
		colseAction :"hide",
		closable:false,
		defaults : {
			xtype : "textfield",
			width : 180
		},
		bodyStyle : "padding:3px",
		items : [ {
			fieldLabel : "账号",
			id:"account"
		}, {
			fieldLabel : "密码",
			id:"password"
		} ],
		buttons : [ {
			text : "确定" ,
			handler:function(){
				//var account=Ext.getCmp("account").getValue();
				//var password=Ext.getCmp("password").getValue();
				//alert(account);
				//alert(password);
                                //this is 'button' ,this.ownerCt is Anonymous panel
				alert(this.ownerCt.ownerCt.items.first().getValue());
			}
		}, {
			text : "取消"
		} ]
	});
	_window.show();
})
        </script>
    </head>
    <body>
        <h1>extjs window test2</h1>
    </body>
</html>
