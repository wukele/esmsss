<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
  </head>
<script language="javascript" type="text/javascript" src="javascript/jquery.js"></script>
 <script type="text/javascript">
 	if(window.opener.closed){
 		jQuery.ajax({
					type: 'POST',
					url: "sysadmin/loginout_login.action",
					data: null,
					async: true,
					dataType: 'json',
					success: null
		});
 	}
 	window.close();
 </script>
</html>
