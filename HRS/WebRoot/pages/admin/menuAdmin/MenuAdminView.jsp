<%@ page pageEncoding="gbk"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%
String path = request.getContextPath();
%>
<script type="text/javascript" src="MenuAdminView.js">
</script>
<script type="text/javascript">
	Ext.onReady(function(){
		com.ems.user.usermanager.init();
	});
</script>
<div id="admin_manager"></div>

