<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	//登录用户账号密码
	//String useraccount = "xxsgaj";
	//String password = "c4ca4238a0b923820dcc509a6f75849b";
	String useraccount = "";
	String password = "";
	useraccount = request.getParameter("useraccount");
	password = request.getParameter("password");
	if (useraccount == null||password==null)
		response.sendRedirect("login-baojing.jsp");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link href="<%=request.getContextPath()%>/css/ingrid.css" rel="stylesheet"  type="text/css"/>
<link href="css/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />
<script  src="javascript/jquery.js" type="text/javascript"></script>
<script src="javascript/jquery.ui.draggable.js" type="text/javascript"></script>
<script src="javascript/jquery.alerts.js" type="text/javascript"></script>
<script src="javascript/ui.datepicker.js" type="text/javascript" charset="utf-8"></script>	
<script src="javascript/htmlConfig.js" type="text/javascript"></script>
<script src="javascript/md5.js" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录</title>
<script type="text/javascript">


//$.ajax()方式
$(document).ready(function (){

   	 	  if (checkControlValue("p_useraccount","String",1,20,null,1,"帐号") && checkControlValue("p_password","String",1,100,null,1,"密码"))
   	 	  {	
          		setParams("p_");
          		var sUrl="sysadmin/login_login.action";
          		//$("#div_login").show(); //打开 AJAX 等待动画
          		jQuery.ajax({
					type: 'POST',
					url: sUrl,
					data: params,
					async: true,
					dataType: 'json',
					success: update_page,
					complete: function(){
						//$("#div_login").hide(); //关闭 AJAX 等待动画
					}
				});
          }		
	/*pageWidth=document.body.clientWidth;
	pageHeight=document.body.clientHeight;
    $("#div_login").css({
		position: 'absolute',
		zIndex: 99999999,
		padding: 0,
		margin: 0,
		top: (pageHeight/2+20) + 'px',
		left: (pageWidth/2-120) + 'px'
	});
	$("#div_login").hide();*/
});

function update_page (json) { //回传函数实体，参数为XMLhttpRequest.responseText
		$("#waitTable").css("display","none");
      if (json.result=="baojingsuccess"){
      	window.location="temp-baojing.jsp";//
      }else{
      	//jAlert(json.result, '登录信息');
      	//$("#p_useraccount").val("");
      	//$("#p_password").val("");
      	window.location="login-baojing.jsp";//验证失败，跳转到登录界面
      }
      
}
//光标处于密码框时，按回车时进行登录

function fnkeypress()
{
	if(event.keyCode == 13)
	{
		$('#sendajax').click();
	}
}

//点击取消
function fnreset()
{
	 $("#p_useraccount").val("");
     $("#p_password").val("");
}
//返回首页
        function fnloginSy()
        {
			
        }


</script>
</head>
<body style="padding-top:90px" bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" scroll="no" >
<!-- ImageReady Slices  -->
<input type="hidden" id="p_baojingflag" value="baojingyes" />
<input  type="hidden" name="p_useraccount" id="p_useraccount" value="<%=useraccount%>"/>
<input name="p_password" id="p_password" type="hidden" value="<%=password%>"/>

<!-- End ImageReady Slices -->

</body>
</html>