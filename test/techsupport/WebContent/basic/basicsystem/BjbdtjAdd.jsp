<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%> 
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<script type="text/javascript">
	$(document).ready(function() {
	}); 
	function addVerify(){
		if (!checkControlValue("a_bjgzid","Integer",-9999999999,9999999999,null,0,"报警规则ID"))
			return false;
		if (!checkControlValue("a_bjbdtjid","Integer",-9999999999,9999999999,null,0,"报警比对条件ID"))
			return false;
		if (!checkControlValue("a_tjlx","String",1,2,null,0,"条件类型"))
			return false;
		if (!checkControlValue("a_ywbzdm","String",1,60,null,0,"业务表字段名"))
			return false;
		if (!checkControlValue("a_bdbzdm","String",1,60,null,0,"比对表字段名"))
			return false;
		if (!checkControlValue("a_bdgx","String",1,20,null,0,"比对关系"))
			return false;
		if (!checkControlValue("a_gxc","String",1,200,null,0,"关系串"))
			return false;
		if (!checkControlValue("a_zxsx","String",1,100,null,0,"执行顺序"))
			return false;
		if (!checkControlValue("a_ljgx","String",1,100,null,0,"逻辑关系"))
			return false;
		if (!checkControlValue("a_jibie","Integer",-999999,999999,null,0,"级别"))
			return false;
		return true;
	}
</script>
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
    <tr>
      <td align="left" class="title1">新增</td>
      <td align="right" class="title1"><a href="#" id="closeDiv" onclick='$(&quot;#ylcsjbxx_detail&quot;).hideAndRemove(&quot;show&quot;);'class="close"></a></td>
    </tr>
</table>
<table width="100%" id="add">
	<tr height="20">
		<td class="distd">报警规则ID</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_bjgzid" value="0"></td>
		<td class="distd">报警比对条件ID</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_bjbdtjid" value="0"></td>
	</tr>
	<tr height="20">
		<td class="distd">条件类型</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_tjlx" value=""></td>
		<td class="distd">业务表字段名</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_ywbzdm" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">比对表字段名</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_bdbzdm" value=""></td>
		<td class="distd">比对关系</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_bdgx" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">关系串</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_gxc" value=""></td>
		<td class="distd">执行顺序</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_zxsx" value=""></td>
	</tr>
	<tr height="20">
		<td class="distd">逻辑关系</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_ljgx" value=""></td>
		<td class="distd">级别</td>
		<td class="detailtd"><input type="text" class="inputstyle"  id="a_jibie" value="0"></td>
	</tr>
	<tr height="25" align="center"><td colspan="4"><a href="#" id="addbutton" onclick='setAdd();'><img src="images/submit.gif"  border="0"/></a></td></tr>
</table>