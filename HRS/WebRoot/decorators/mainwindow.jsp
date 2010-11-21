<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
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

    <link rel="stylesheet" type="text/css" href="<%=path %>/ext3/resources/css/ext-all.css" />
    <!-- GC -->
        <!-- LIBS -->
    <script type="text/javascript" src="<%=path %>/ext3/adapter/ext/ext-base.js"></script>
        <!-- ENDLIBS -->

    <script type="text/javascript" src="<%=path %>/ext3/ext-all.js"></script>
    

    <!-- Common Styles for the examples -->
   
</head>
<body>

<decorator:body>
	
</decorator:body>


</body>
</html>
