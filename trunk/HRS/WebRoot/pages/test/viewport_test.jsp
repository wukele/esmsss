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
	type="text/css"></link>
<title>viewprot + tabpanel test</title>
<script type="text/javascript">
	Ext.ns('com.hrs.extjs.test');
	com.hrs.extjs.test.ViewportTabpanelTest = function(){
		var viewport;
		var tabpanel;
		var tab1;
		var tab2;
		var tab1Data = '<div>H1 这是默认效果</div>';
		
		
		return {
			init:function(){
				//使用Ajax加载
				res = Ext.Ajax.request({url:"viewport_tab1_content.html",async:false,method:'get',success:function(res,opts){
					tab1Data = res.responseText;
					tabpanel.getItem('tab1').update(tab1Data);
				}});
				
				tab1 = {title:'tab1',html:tab1Data,id:'tab1'};
				tab2 = {title:'tab2',html:'tab2',id:'tab2'};
				tabpanel = new Ext.TabPanel({
					region:'center',
					activeTab: 0,
					items:[tab1,tab2]});
				viewport = new Ext.Viewport({
					title:'viewport + tabpanel test',
					enableScroll:true,
					layout:'fit',
					//面板内容
					items:[tabpanel]
				});
			}
		};
	}();
	
	com.hrs.extjs.test.ViewportTabpanelTest.init();
</script>
</head>
<body>

</body>
</html>