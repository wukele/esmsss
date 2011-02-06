<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.admin.page.action.CommPageKeys"%>
<%@page import="java.util.List"%>
<%
String path = request.getContextPath();
List<String>  scripts=null;
if(session.getAttribute(CommPageKeys.KEY_CODE_SCRIPTS)!=null){
		scripts=(List<String>)session.getAttribute(CommPageKeys.KEY_CODE_SCRIPTS);
}
if(scripts!=null){
		for(int i=0;i<scripts.size();i++){
				 String st=path+scripts.get(i);
%>
<script type="text/javascript"  src="<%=st %>"></script>
<% 				 
		}
}
%>
<div id='container' class='x-content-container'></div>
<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/TplPageComm/SeachField.js"></script>
<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/TplPageResource/ComponentList.js"></script>
<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/TplPageComm/TplContainer.js"></script>
<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/TplPageResource/TplPageQryPanel.js"></script>
<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/TplPageResource/TplPageResourceApp.js"></script>

