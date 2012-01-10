<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../public/common.jsp" %>
<script type="text/javascript">
	$(document).ready(function() {
		
		pageUrl="publicsystem/querylist_qyyyrz.action";
		divnid="QyyyrzData";
		tableid="QyyyrzTable";
		addUrl="publicsystem/insert_qyyyrz.action";
		addHtml="basic/publicsystem/QyyyrzAdd.jsp";
		addWidth="720";
		delUrl="publicsystem/delete_qyyyrz.action";
		delid="d_yyrzid";
		modHtml="basic/publicsystem/QyyyrzModify.jsp";
		modUrl="publicsystem/modify_qyyyrz.action";
		modWidth="720";
		detailHtml="basic/publicsystem/QyyyrzDetail.jsp";
		detailid="qyyyrz_detail";
		detailUrl="publicsystem/query_qyyyrz.action";
		detailWidth="380";
		loadPage(divnid);
		setPageList(1);
		daggleDiv(detailid);
			$("#p_riqi").attr("readonly","true");
			$("#p_riqi").datepicker();
			$("#p_ksyysj").attr("readonly","true");
			$("#p_ksyysj").datepicker();
			$("#p_jsyysj").attr("readonly","true");
			$("#p_jsyysj").datepicker();
		$("#p_hylbdm").selectBoxhylb({code:"ggmk"});//行业类别
		checkmc();

	});
	
	function isHaveDwfzrAndZafzr(){ //娱乐场所（单位负责人）和场地人员（治安负责人）
		jQuery.post("publicsystem/queryfzry_qyyyrz.action",params,isHaveDwfzrAndZafzrBack,"json");
	}
	
	function isHaveDwfzrAndZafzrBack(json){
		if(setNull(json.LQyyyrz[0].csfe)!=""&&setNull(json.LQyyyrz[0].zafzrxm)!=""){
			$("#qyryrzAddBut").attr("disabled",false);
		}
	}

	function checkmc(){
		if($("#p_hylbdm").val()!="J"){
			$('body').find('div [@id=qy]').each(function(r){
				$(this).show();
			});
			$('body').find('div [@id=cs]').each(function(){
				$(this).hide();
			});
		}
	}
	
	
	function setPageList(pageno,url){	
		if (manVerify()){
			url=setList(pageno,url);
			// create the grid
			// returns a jQ object with a 'g' property - that's ingrid
			var mygrid1 = $("#"+tableid).ingrid({ 
											url: url,	
											height: pageHeight-209,
	                                       ingridPageParams:sXML,
											pageNumber: pageno,
											onRowSelect:null,
											colWidths: ["14%","19%","19%","10%","16%","14%","8%"]	
																			
										});				
			}
		checkmc();
}	
	function manVerify(){
		return true;
	}
	
	function setQuery(id){
		dataid=id;
		setWidth(detailid,detailWidth);
		setUrl(detailid,detailHtml);
		bindDocument(detailid);
	}

</script>

<body>
	<input type="hidden" id="d_yyrzid" value="">
	<input type="hidden" id="p_yyrzid" value="">
	<div style="display:none"><select id="p_hylbdm"></select></div>
<table width="100%" cellpadding="0" cellspacing="0"  class="tableborder">
  <tr>
    <td class="queryfont">营业日志</td>
  </tr>
  <tr>
    <td class="tdbg">
    	<table width="100%" border="0" cellspacing="0" cellpadding="2">
			<tr>
				<td width="5%" class="pagedistd">营业日期</td>
				<td width="30%" class="pagetd" ><input type="text" class="inputstyle"  id="p_ksyysj" value="">至  <input type="text" class="inputstyle"  id="p_jsyysj" value=""></td>
				<td width="5%" class="pagedistd" >治安负责人</td>
				<td width="10%" class="pagetd"><input type="text" class="inputstyle"  id="p_zafzrxm" value=""></td>
				<td width="23%" class="pagetd">
    		  	<table  border="0" align="right" cellpadding="2" cellspacing="0">
    		    	<tr>
    		    	  <td width="62"><a href="#" class="searchbutton" id="querys" onClick="setPageList(1);">查询</a></td>
    		    	  <td width="62"><a href="#"  class="addbutton" onClick="setAddPage();" id="qyryrzAddBut">添加</a></td>
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
<div id="qyyyrz_detail" class="page-layout" src="#"
		style="top:180px; left:160px;">
</div>	

<div id="QyyyrzData" style="width:100%;">
	<table id="QyyyrzTable" width="100%">
	  <thead>
	    <tr>       
	     	<th name="l_riqi">登记日期</th>
	     	<th name="l_ksyysj">营业开始时间</th>
	     	<th name="l_jsyysj">营业结束时间</th>
	     	<th name="l_csfe"><div id="cs" >场所负责人</div><div id="qy" style="display:none">企业负责人</div></th>
	     	<th name="l_sffsaj">治安、刑事或事故</th>
	     	<th name="l_sfglbmjc">管理部门检查</th>
			<th name="">操作</th>
	    </tr>
	  </thead>
	  
	</table>	
</div>
</body>