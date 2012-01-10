<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.aisino2.sysadmin.domain.User"%>
<%@page import="com.aisino2.sysadmin.Constants"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%> 
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%
	String userName = "";
	String departName = "";
	String departCode = "";
	User user = (User)session.getAttribute(Constants.userKey);
	if(user!=null){
		userName = user.getUsername();
		departName = user.getDepartment().getDepartname();
		departCode = user.getDepartment().getDepartcode();
	}
%>
<script type="text/javascript">
	$(document).ready(function(){
		if(dangQianHylbdm=="J"){
			$("#td_qybaxxtjTitle").text("场所备案信息添加");
			$("#td_qyxxbaTitle").text("场所信息备案");
			$("#td_qyfl_zhu").text("场所分类（主）");
			$("#qyflf").text("场所分类（副）"); 
			$("#td_csjyxxTitle").text(" 场所简要信息");
			$("#td_qybm_add").text("场所编码");
			$("#td_qymc_add").text("场所名称");
		}
	
	    bc_bottonMoveRight(1); 
	 
		$("#tjclxx").empty();
		$("#tjclxx").load(csbaxx_tjclHtml); //提交材料信息
		$("#q_qyid").attr("value",ylcsjbxx_dataid);
		$("#a_qyid").attr("value",ylcsjbxx_dataid);
		ylcsjbxx_setDetail();
		
		$("#a_barq").attr("readonly","true");
		$("#a_barq").datepicker();
	});
	function CompleteEnd(){
		var date = new Date();
		var newTime = date.getYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
		$("#grid_baxxtjTable").find("input[@id^='tjrq']").attr("value",newTime).attr("readonly","true").datepicker().end();
	}
	function ylcsjbxx_updatediv (json) {
		$("#a_qybm").attr("value",setNull(json.LQyjbxx[0].qybm));
		
		$("#hylb").append(setNull(json.LQyjbxx[0].hylb));
		if(setNull(json.LQyjbxx[0].hylbdm)!="J"){
			$('#qyflf').hide();
			$('#qyflf2').hide();
		}
		$("#cszflmc").append(setNull(json.LQyjbxx[0].qyzflmc));
		$("#gxdwmc").append(setNull(json.LQyjbxx[0].gxdwmc));
		$("#csfflmc").append(setNull(json.LQyjbxx[0].qyfflmc));
		$("#csbm").append(setNull(json.LQyjbxx[0].qybm));
		$("#csmc").append(setNull(json.LQyjbxx[0].qymc));
		$("#jjlxmc").append(setNull(json.LQyjbxx[0].jjlxmc));
		$("#lxdh").append(setNull(json.LQyjbxx[0].lxdh));
		$("#jydz").append(setNull(json.LQyjbxx[0].jydz));
		$("#zczj").append(setNull(json.LQyjbxx[0].zczj));
		$("#jyfwzy").append(setNull(json.LQyjbxx[0].jyfwzy));
		$("#jymj").append(setNull(json.LQyjbxx[0].jymj));
		$("#jyfwjy").append(setNull(json.LQyjbxx[0].jyfwjy));
		$("#frdb").append(setNull(json.LQyjbxx[0].frdb));
		$("#frdbzjlb").append(setNull(json.LQyjbxx[0].frdbzjlb));
		$("#frdbzjhm").append(setNull(json.LQyjbxx[0].frdbzjhm));
		$("#frdblxfs").append(setNull(json.LQyjbxx[0].frdblxfs));
		$("#dwfzr").append(setNull(json.LQyjbxx[0].dwfzr));
		$("#dwfzrzjhm").append(setNull(json.LQyjbxx[0].dwfzrzjhm));
		$("#dwfzrlxfs").append(setNull(json.LQyjbxx[0].dwfzrlxfs));
	}
	function csbaxx_add(){
		if (csbaxx_addVerify()){
			csbaxx_setAdd();
		}
	}
	function csbaxx_addVerify(){
		var isCanPlay = 1;
		if (!checkControlValue("a_barq","Date",null,null,null,1,"备案日期"))
			return false;
		if (!checkControlValue("a_babmmc","String",1,200,null,1,"备案机构"))
			return false;
		$("#grid_baxxtjTable").find("input[type='checkbox']").each(function(){
			if($(this).attr("checked")==true){
				var thisid = $(this).attr("id").replace('sftj_','');
				if (!checkControlValue("tjr_"+thisid,"String",1,200,null,1,"提交人"))
					isCanPlay = 0;
				if (!checkControlValue("tjrq_"+thisid,"Date",null,null,null,1,"提交日期"))
					isCanPlay = 0;
			}
		});
		if(isCanPlay == 0){
			return false;
		}
		$("#grid_baxxtjTable").find("input[type='checkbox']").each(function(){
			if($(this).attr("checked")==true){
				var lxmc = $(this).attr("name");
				var thisid = $(this).attr("id").replace('sftj_','');
				var tjrval = $("#tjr_"+thisid).attr("value");
				var tjrqval = $("#tjrq_"+thisid).attr("value");
				
				$("#a_tjcllx").attr("value",$("#a_tjcllx").attr("value")+lxmc+"|");
				$("#a_tjcllxdm").attr("value",$("#a_tjcllxdm").attr("value")+thisid+"|");
				$("#a_tjrxm").attr("value",$("#a_tjrxm").attr("value")+tjrval+"|");
				$("#a_pageSort").attr("value",$("#a_pageSort").attr("value")+tjrqval+"|"); //提交日期
			}
		});
		
		if($("#sftjwz").attr("checked")==true){
			$("#a_sftjwz").attr("value","1");
		}else{
			$("#a_sftjwz").attr("value","0");
		}
		return true;
	}
</script>
<input type="hidden" id="q_qyid" value="">
<input type="hidden" id="a_qyid" value="">
<input type="hidden" id="a_qybm" value="">

<input type="hidden" id="a_tjcllxdm" value="">
<input type="hidden" id="a_tjcllx" value="">
<input type="hidden" id="a_tjrxm" value="">
<input type="hidden" id="a_pageSort" value="">

<input type="hidden" id="a_sftjwz" value="">



<input type="hidden" id="a_babmbm" value="<%=departCode %>">
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
    <tr>
      <td align="left" class="title1" id="td_qybaxxtjTitle">企业备案信息添加</td>
      <td align="right" class="title1"><a href="#" id="closeDiv" onclick='$("#csbaxx_detail").hide("show");'class="close"></a></td>
    </tr>
</table>	
<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="6"></td>
		</tr>
</table>
<table width="100%" border="0" align="center"  cellpadding="0" cellspacing="0"  id="add" >
<tr>
<td valign="top">
	<table width="100%"  cellspacing="0" cellpadding="0">
	<tr>
	<td><table width="100%" cellpadding="0" cellspacing="0"  class="tableborder">
          <tr>
            <td class="queryfont" id="td_qyxxbaTitle">&nbsp;企业信息备案</td>
          </tr>
          <tr>
            <td valign="top" class="tdbg" >
            <table width="100%" border="0" cellspacing="0" cellpadding="2" class="detail">
             <tr>
                <td class="distd1">行业分类</td>
                <td  class="detailtd2"><span id="hylb"></span></td>
                 <td width="13%" class="distd1">管辖单位</td>
                <td class="detailtd2"><span id="gxdwmc"></span></td>
              </tr>
              <tr>
                <td width="13%" class="distd1" id="td_qyfl_zhu">企业分类（主）</td>
                <td width="20%" class="detailtd2"><span id="cszflmc"></span></td>
                	 <td class="distd1" id="qyflf">企业分类（副）</td>
               				 <td colspan="3" id="qyflf2" class="detailtd2"><span id="csfflmc"></span></td>
               
              </tr>
              
            </table></td>
          </tr>
        </table>	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="3"></td>
		</tr>
	</table>
		<table width="100%" cellpadding="0" cellspacing="0"  class="tableborder">
		  <tr>
		    <td class="queryfont" id="td_csjyxxTitle">&nbsp;企业简要信息</td>
		  </tr>
		  <tr>
          
		    <td valign="top" class="tdbg">
		    <table width="100%" border="0" cellspacing="0" cellpadding="2" class="detail">
		      <tr>
		        <td width="13%" class="distd1" id="td_qybm_add">企业编码</td>
		        <td width="20%" class="detailtd2"><span id="csbm"></span></td>
		        <td width="13%" class="distd1"id="td_qymc_add">企业名称</td>
		        <td width="20%" class="detailtd2"><span id="csmc"></span></td>
		        <td width="13%" class="distd1">经济类型</td>
		        <td width="20%" class="detailtd2"><span id="jjlxmc"></span></td>
		      </tr>
		      <tr>
		        <td class="distd1">联系电话</td>
		        <td class="detailtd2"><span id="lxdh"></span></td>
		        <td class="distd1">经营地址</td>
		        <td class="detailtd2" colspan="3"><span id="jydz"></span></td>
		        </tr>
		      <tr>
		        <td class="distd1">注册资金（万）</td>
		        <td class="detailtd2"><span id="zczj"></span></td>
		        <td class="distd1">经营范围（主营）</td>
		        <td class="detailtd2" colspan="3"><span id="jyfwzy"></span></td>
		      </tr>
		      <tr>
		        <td class="distd1">经营面积（㎡）</td>
		        <td class="detailtd2"><span id="jymj"></span></td>
		        <td class="distd1">经营范围（兼）</td>
		        <td class="detailtd2" colspan="3"><span id="jyfwjy"></span></td>
		      </tr>
		      <tr>
		        <td class="distd1">法定代表人</td>
		        <td class="detailtd2"><span id="frdb"></span></td>
		        <td class="distd1">法人证件类型</td>
		        <td class="detailtd2"><span id="frdbzjlb"></span></td>
		        <td class="distd1">法人证件号码</td>
		        <td class="detailtd2"><span id="frdbzjhm"></span></td>
		      </tr>
		      <tr>
		        <td class="distd1">法人联系方式</td>
		        <td class="detailtd2"><span id="frdblxfs"></span></td>
		        <td class="distd1">单位负责人</td>
		        <td class="detailtd2"><span id="dwfzr"></span></td>
		        <td class="distd1">负责人公民身份号码</td>
		        <td class="detailtd2"><span id="dwfzrzjhm"></span></td>
		      </tr>
              <tr>
		        <td class="distd1">负责人联系方式</td>
		        <td colspan="5" class="detailtd2"><span id="dwfzrlxfs"></span></td>
		      </tr>
		    </table></td>
		  </tr>
		</table>	
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="3"></td>
		</tr>
	</table>
		<table width="100%" cellpadding="0" cellspacing="0"  class="tableborder">
			<tr>
			  <td class="queryfont">备案信息</td>
			</tr>
			<tr><td class="tdbg">
				<table width="100%" border="0" cellspacing="0" cellpadding="3">
				      <tr>
				        <td width="13%" class="pagedistd1">备案编号</td>
				        <td width="20%" class="pagetd1"><input type="text" readonly class="readonly"/></td>
				        <td width="13%" class="pagedistd1">备案机构</td>
				        <td class="pagetd1"><input type="text" id="a_babmmc" value="<%=departName %>" readonly class="readonly"/></td>
			          </tr>
				      <tr>
				        <td class="red">备案日期</td>
				        <td class="pagetd1"><input id="a_barq" type="text"/></td>
				        <td class="pagedistd1">备案人</td>
				        <td class="pagetd1"><input value="<%=userName %>" id="a_bar" type="text" readonly class="readonly"/></td>
			          </tr>
                      <tr>
				        <td colspan="4" class="pagetd1">
				        <div style="width:100%" id=tjclxx></div>
				        </td>
		              </tr>
                      <tr>
				      <td class="pagedistd1">
				          <input type="checkbox" name="checkbox" id="sftjwz"/></td>
			            <td colspan="3" class="pagetd1">备案信息提交完整</td>
		              </tr>
                      <tr>
                         <td colspan="4">
                         <table width="100%" border="0" cellspacing="0" cellpadding="0" >
						 <tr>
						   <td height="6"></td>
						 </tr>
						 <tr>
						   <td>
						   <a href="#" hidefocus="true" class="submitbutton" title="添加" onclick='csbaxx_add();'>保存</a></td>
						 </tr>
						 </table></td>
               	    </tr>                     
				</table>
			</td>
			</tr>
		</table>
	</td>
	</tr>
	</table>
</td>
</tr>
</table>
	