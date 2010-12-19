
<%@page import="com.ui.TreeMenuItems"%>
<%@page import="com.ulp.comm.CommUlpKey"%>
<%@page import="com.ui.UIContainer"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ page language="java" import="java.util.*" pageEncoding="gbk"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<title>	
		<decorator:title default="system"></decorator:title>
</title>
	<link rel="stylesheet" type="text/css" href="<%=path %>/ext3/resources/css/ext-all-notheme.css" /> 
    <link rel="stylesheet" type="text/css" href="<%=path %>/ext3/resources/css/xtheme-gray.css" />
    <link rel="stylesheet" type="text/css" href="<%=path %>/resources/layout1.css" />
    <!-- GC -->
        <!-- LIBS -->
    <script type="text/javascript" src="<%=path %>/ext3/adapter/ext/ext-base.js"></script>
        <!-- ENDLIBS -->

    <script type="text/javascript" src="<%=path %>/ext3/ext-all-debug.js"></script>
    

    <!-- Common Styles for the examples -->
    
    <script type="text/javascript">
    		Ext.chart.Chart.CHART_URL = "<%=path %>/ext3/resources/charts.swf";
    		var basePath="<%= path%>";
    </script>
    
    
    
   	<script type="text/javascript" src="<%=path %>/decorators/Layout/Layout1.js"></script>
   	<script type="text/javascript" src="<%=path %>/decorators/Layout/initCommPage.js"></script>
   	<script type="text/javascript" src="<%=path %>/dwr/engine.js"></script>
   	<script type="text/javascript" src="<%=path %>/dwr/util.js"></script>
</head>
<body>
<div id='header'><h1>数据中心采集系统</h1></div>
<div id='menuContent'>
	<!-- 建立功能菜单树 -->
	<script type="text/javascript">
	<%
		UIContainer  ui=(UIContainer)session.getAttribute(CommUlpKey.KEY_UI_CONTIANER);
		StringBuffer  buff=new StringBuffer();
		String accordionItems=ui.CreateAccordion(buff);  
	%>
		
		
	</script>	
	
	
	
	<!-- 建立功能菜单树结束 -->
	<script type="text/javascript">
			function CreateMenuBar(){
				<%=buff.toString()%>				
				
            	var accordion = new Ext.Panel({
                	margins:'2 0 2 2',
                	region:'west',
       			    split: true,
        			height: 400,
        			width: 200,
	        		minSize: 100,
	       			 maxSize: 500,
        			autoScroll: true,
                	layout:'accordion',
                	items: [<%=accordionItems%>]
            	});
			
				return accordion;
		    }
	
	</script>
</div>
<%
	
%>


</body>
</html>
