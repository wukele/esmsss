<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%> 
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<script type="text/javascript">
	$(document).ready(function() {
	}); 
	function addVerify(){
		if (!checkControlValue("a_bjxxid2","Integer",-9999999999,9999999999,null,0,"报警信息ID"))
			return false;
		if (!checkControlValue("a_wpbjgzid","Integer",-9999999999,9999999999,null,0,"物品报警规则ID"))
			return false;
		if (!checkControlValue("a_ywbm","String",1,100,null,0,"业务表名"))
			return false;
		if (!checkControlValue("a_ywbzdm","String",1,60,null,0,"业务表字段名"))
			return false;
		if (!checkControlValue("a_bdbm","String",1,100,null,0,"比对表名"))
			return false;
		if (!checkControlValue("a_bdbzdm","String",1,60,null,0,"比对表字段名"))
			return false;
		if (!checkControlValue("a_bdlxdm","String",1,2,null,0,"比对类型代码"))
			return false;
		if (!checkControlValue("a_bdlx","String",1,2,null,0,"比对类型"))
			return false;
		if (!checkControlValue("a_sfyx","String",1,2,null,0,"是否有效"))
			return false;
		if (!checkControlValue("a_fbcl","String",1,300,null,0,"发布策略"))
			return false;
		if (!checkControlValue("a_fbfs","String",1,2,null,0,"发布方式"))
			return false;
		if (!checkControlValue("a_txdwzd","String",1,60,null,0,"特行单位字段"))
			return false;
		if (!checkControlValue("a_gxdwzd","String",1,60,null,0,"管辖单位字段"))
			return false;
		if (!checkControlValue("a_bjjb","String",1,2,null,0,"报警级别"))
			return false;
		if (!checkControlValue("a_bjfs","String",1,60,null,0,"报警方式"))
			return false;
		if (!checkControlValue("a_bjlxdm","String",1,4,null,0,"报警类型代码"))
			return false;
		if (!checkControlValue("a_bjlx","String",1,60,null,0,"报警类型"))
			return false;
		if (!checkControlValue("a_hylbdm","String",1,2,null,0,"行业类别代码"))
			return false;
		if (!checkControlValue("a_hylb","String",1,100,null,0,"行业类别"))
			return false;
		return true;
	}
</script>
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
    <tr>
      <td align="left" class="title1">新增</td>
      <td><a href="#" id="closeDiv" onclick='$("#Wpbjgz_detail").hideAndRemove("show");' class="close"></a></td>
    </tr>
</table>
<table width="100%" id="add">
	<tr height="20">
		<td class="distd">报警信息ID</td>
		<td class="detailtd"><input type="text" id="a_bjxxid2" value="0"></td>
		<td class="distd">物品报警规则ID</td>
		<td class="detailtd"><input type="text" id="a_wpbjgzid" value="0"></td>
	</tr>
	<tr height="20">
		<td class="distd">业务表名</td>
		<td class="detailtd"><input type="text" id="a_ywbm" value=""></td>
		<td class="distd">业务表字段名</td>
		<td class="detailtd"><input type="text" id="a_ywbzdm" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">比对表名</td>
		<td class="detailtd"><input type="text" id="a_bdbm" value=""></td>
		<td class="distd">比对表字段名</td>
		<td class="detailtd"><input type="text" id="a_bdbzdm" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">比对类型代码</td>
		<td class="detailtd"><input type="text" id="a_bdlxdm" value=""></td>
		<td class="distd">比对类型</td>
		<td class="detailtd"><input type="text" id="a_bdlx" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">是否有效</td>
		<td class="detailtd"><input type="text" id="a_sfyx" value=""></td>
		<td class="distd">发布策略</td>
		<td class="detailtd"><input type="text" id="a_fbcl" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">发布方式</td>
		<td class="detailtd"><input type="text" id="a_fbfs" value=""></td>
		<td class="distd">特行单位字段</td>
		<td class="detailtd"><input type="text" id="a_txdwzd" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">管辖单位字段</td>
		<td class="detailtd"><input type="text" id="a_gxdwzd" value=""></td>
		<td class="distd">报警级别</td>
		<td class="detailtd"><input type="text" id="a_bjjb" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">报警方式</td>
		<td class="detailtd"><input type="text" id="a_bjfs" value=""></td>
		<td class="distd">报警类型代码</td>
		<td class="detailtd"><input type="text" id="a_bjlxdm" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">报警类型</td>
		<td class="detailtd"><input type="text" id="a_bjlx" value=""></td>
		<td class="distd">行业类别代码</td>
		<td class="detailtd"><input type="text" id="a_hylbdm" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">行业类别</td>
		<td class="detailtd"><input type="text" id="a_hylb" value=""></td>
	</tr>
<tr height="25" align="center"><td  colspan="4"><a href="#" id="addbutton" hidefocus="true" class="submitbutton" title="保存" onclick='setadd();'>保存</a></td></tr>
</table>