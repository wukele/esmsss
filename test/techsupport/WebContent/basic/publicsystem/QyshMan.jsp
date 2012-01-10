<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%> 
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@include file="../../public/common.jsp" %>
<script type="text/javascript">
$(document).ready(function() {
	daggleDiv(detailid);
	pageUrl="publicsystem/querylist_qysh.action";
	divnid="QyshData";
	tableid="QyshTable";
	addUrl="publicsystem/insert_qysh.action";
	addHtml="business/publicsystem/QyshAdd.jsp";
	addWidth="800";
	delUrl="publicsystem/delete_qysh.action";
	delid="d_qyshid";
	modHtml="business/publicsystem/QyshModify.jsp";
	modUrl="publicsystem/modify_qysh.action";
	modWidth="800";
	detailHtml="business/publicsystem/QyshDetail.jsp";
	detailid="qysh_detail";
	detailUrl="publicsystem/query_qysh.action";
	detailWidth="800";
	loadPage(divnid);
		$("#p_shsj").attr("readonly","true");
		$("#p_shsj").datepicker();
	
}); 
	
function setPageList(pageno,url){	
	if (manVerify()){
		url=setList(pageno,url);
		// create the grid
		// returns a jQ object with a 'g' property - that's ingrid
		var mygrid1 = $("#"+tableid).ingrid({ 
										url: url,	
										height: 250,
										pageNumber: pageno,
										colWidths: ["11%","11%","11%","11%","11%","11%","11%","11%","11%"]									
									});				
		}
}	
	function manVerify(){
		if (!checkControlValue("p_qyshid","Integer",-9999999999,9999999999,null,0,"企业审核ID"))
			return false;
		if (!checkControlValue("p_qyid","Integer",-9999999999,9999999999,null,0,"企业ID"))
			return false;
		if (!checkControlValue("p_shsj","Date",null,null,null,0,"审核时间"))
			return false;
		if (!checkControlValue("p_shr","String",1,60,null,0,"审核人"))
			return false;
		if (!checkControlValue("p_shdwdm","String",1,20,null,0,"审核单位代码"))
			return false;
		if (!checkControlValue("p_shdwmc","String",1,60,null,0,"审核单位名称"))
			return false;
		if (!checkControlValue("p_shsbyy","String",1,2000,null,0,"审核失败原因"))
			return false;
		if (!checkControlValue("p_sjshid","Integer",-9999999999,9999999999,null,0,"上级审核ID"))
			return false;
		if (!checkControlValue("p_shzt","String",1,2,null,0,"审核状态"))
			return false;
		return true;
	}
</script>

<body>
	
	<input type="hidden" id="d_qyshid" value="">
<table width="100%" cellpadding="0" cellspacing="0"  class="tableborder">
  <tr>
    <td class="queryfont">查询选项</td>
  </tr>
  <tr>
    <td class="tdbg">
    	<table width="100%" border="0" cellspacing="0" cellpadding="2">
				<tr>
					<td width="10%" class="pagedistd">企业审核ID</td>
					<td width="23%" class="pagetd"><input type="text" id="p_qyshid" value="0"></td>
					<td width="10%" class="pagedistd">企业ID</td>
					<td width="23%" class="pagetd"><input type="text" id="p_qyid" value="0"></td>
					<td width="10%" class="pagedistd">审核时间</td>
					<td width="23%" class="pagetd"><input type="text" id="p_shsj" value=""></td>
				</tr>
				<tr>
					<td width="10%" class="pagedistd">审核人</td>
					<td width="23%" class="pagetd"><input type="text" id="p_shr" value=""></td>
					<td width="10%" class="pagedistd">审核单位代码</td>
					<td width="23%" class="pagetd"><input type="text" id="p_shdwdm" value=""></td>
					<td width="10%" class="pagedistd">审核单位名称</td>
					<td width="23%" class="pagetd"><input type="text" id="p_shdwmc" value=""></td>
				</tr>
				<tr>
					<td width="10%" class="pagedistd">审核失败原因</td>
					<td width="23%" class="pagetd"><input type="text" id="p_shsbyy" value=""></td>
					<td width="10%" class="pagedistd">上级审核ID</td>
					<td width="23%" class="pagetd"><input type="text" id="p_sjshid" value="0"></td>
					<td width="10%" class="pagedistd">审核状态</td>
					<td width="23%" class="pagetd"><input type="text" id="p_shzt" value=""></td>
				</tr>
    		<tr>
    		  <td colspan="6">
    		  	<table  border="0" align="right"  cellpadding="2"  cellspacing="0">
    		    	<tr>
    		    	  <td width="50%" ><a href="#" class="searchbutton" id="querys" onclick="setPageList(1);">查询</a></td>
    		    	  <td width="50%" ><a href="#" class="addbutton" onclick='setAddPage()'>添加</a></td>
    		    	</tr>
    		  	</table>
    		  </td>
    		</tr>
    	</table>
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td height="3"></td>
	</tr>
</table>
<div id="qysh_detail" class="page-layout" src="#"
		style="top:180px; left:160px;">
</div>	

<div id="QyshData" style="width:100%;">
	<table id="QyshTable" width="100%">
	  <thead>
	    <tr>       
	     	<th name="l_qyid">企业ID</th>
	     	<th name="l_shsj">审核时间</th>
	     	<th name="l_shr">审核人</th>
	     	<th name="l_shdwdm">审核单位代码</th>
	     	<th name="l_shdwmc">审核单位名称</th>
	     	<th name="l_shsbyy">审核失败原因</th>
	     	<th name="l_sjshid">上级审核ID</th>
	     	<th name="l_shzt">审核状态</th>
				<th name="">操作</th>
	    </tr>
	  </thead>
	  
	</table>	
</div>



</body>
</html>