<%@ page pageEncoding="gbk"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'addUser.jsp' starting page</title>
  

  </head>
  
  <body>
  <div id='infoOper'>
  <script type="text/javascript" src="<%=path %>/js/test/addNewOper.js"></script>
  	</div>
  
    This is my JSP page. <br>
  </body>
</html>
