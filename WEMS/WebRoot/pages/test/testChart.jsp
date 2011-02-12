<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String cp=request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>test for chart</title>
<link rel="stylesheet" type="text/css" href="<%=cp %>/ext3/resources/css/ext-all-notheme.css" /> 
    <link rel="stylesheet" type="text/css" href="<%=cp %>/ext3/resources/css/xtheme-gray.css" />
    <script type="text/javascript" src="<%=cp %>/ext3/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=cp %>/ext3/ext-all-debug.js"></script>
<script type="text/javascript" src="js/testChart.js"></script>
</head>
<body>

<div id="container"></div>
</body>
</html>