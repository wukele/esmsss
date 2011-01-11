<%@ page language="java" pageEncoding="gb2312" %>
<%
String path = request.getContextPath();
%>
<style type="text/css">
#tplPageTemp{
	position:relative;
	width: 360px;
	padding: 20px;
	float: left;
	overflow: hidden;
}

#tplComp{
	width: 600px;
	padding: 20px 20px 20px 0px;
	overflow: hidden;
}

.x-seach-item{
	padding: 5px;
	height: 40px;
}

.x-seach-item-over{
	background-color: #efefef;
	padding: 5px;
	height: 40px;
	border: 1px solid #dddddd; 
}

.x-item-image{
	height: 40px;
	width: 40px;
	float: left;
}

.x-item-text{
	padding:5px 5px 5px 20px;
	overflow: hidden;
}

.x-item-text p{
	font-family: sans-serif;
	font-size: 10px;
}



</style>


<div id='container' class='x-content-panel'>
<div id='tplPageTemp'></div>
<div id='tplComp'></div>
<div class='x-clean'></div>
</div>
<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/TplPageComm/SeachField.js"></script>
<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/TplPageComponentMgr/TemplatePageQryPanel.js"></script>
<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/TplPageComponentMgr/TplPageCompMgr.js"></script>


