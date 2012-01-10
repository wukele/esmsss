<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<html>
	<head>
		<script type="text/javascript">
var gnIckSlHtml,gwIckSlHtml,gnRyHtml,gwRyHtml,QyHtml;
$(document).ready(function() {
	pageUrl="icksystem/querylist_icksl.action";
	divnid="tabledata";
	tableid="table1";
	addUrl="icksystem/insert_icksl.action";
	addHtml="basic/icksystem/IckslgnDetail.jsp";
	addWidth="500";
	delUrl="icksystem/delete_icksl.action";
	delid="d_ryid";
	gwIckSlHtml="basic/icksystem/IckslgwDetail.jsp";
	gnIckSlHtml="basic/icksystem/IckslgnDetail.jsp";
	//从业人员详细信息页面
	gnRyHtml="basic/publicsystem/QyryxxDetail.jsp";
	gwRyHtml="basic/publicsystem/WgcyryxxDetail.jsp";
	//场所详细信息页面
	QyHtml="basic/publicsystem/QyjbxxDetail.jsp";
	
	modUrl="icksystem/modify_icksl.action";
	modWidth="800";
	detailHtml="basic/icksystem/IckslDetail.jsp";
	detailid="icksl_detail";
	detailUrl="icksystem/query_icksl.action";
	detailWidth="800";
	loadPage("tabledata");
		$("#p_cjsjf").attr("readonly","true");
		$("#p_cjsjf").datepicker();
		$("#p_cjsjt").attr("readonly","true");
		$("#p_cjsjt").datepicker();
		
		$("#p_cyzjdm").selectBox({code:"dm_rycyzj"});
		
		daggleDiv("icksl_detail");
		daggleDiv("qyjbxx_detail");
}); 
	
function setPageList(pageno,url){	
	if (manVerify()){
		url=setList(pageno,url);
		// create the grid
		// returns a jQ object with a 'g' property - that's ingrid
		var mygrid1 = $("#"+tableid).ingrid({ 
										ingridPageParams:sXML,
										ingridPageWidth: pageWidth,
										tableid:'icksltableid',
										onRowSelect: null,
										colClasses: ['grid-col-style2','grid-col-style2'],
										colIndex: [0,1],
										onTdSelect: function(tr){
											$(tr).find("td").click(function(){
													var tdnum = $(tr).find("td").index(this);
													if(tdnum!=$(tr).find("td").length-1){
														if(tdnum==0||tdnum==1)
															setRyDetail(tr);
														else if(tdnum==4)
															setCsDetail(tr);
													}
											});
										},
										url: url,	
										height: pageHeight-236,
										pageNumber: pageno,
										hideColIndex:[4,8,9],
										colWidths: ["22%","12%","15%","7%","0%","13%","13%","12%","0%","0%","6%"]									
									});				
		}
}	

function manVerify(){
	//if (!checkControlValue("p_qymc","String",1,40,null,0,"企业名称"))
	//	return false;
	//if (!checkControlValue("p_qybm","String",1,40,null,0,"企业编码"))
	//	return false;
	if (!checkControlValue("p_xm","String",1,20,null,0,"姓名"))
		return false;
	if (!checkControlValue("p_cyzjdm","String",1,40,null,0,"证件类型"))
		return false;
	if (!checkControlValue("p_cjsjf","Date",null,null,null,0,"采集时间"))
		return false;
	if (!checkControlValue("p_cjsjt","Date",null,null,null,0,"采集时间至"))
		return false;
	if (!checkControlValue("p_zjhm","String",1,20,null,0,"证件号码"))
		return false;
		
	var cjsjf = $("#p_cjsjf").val();
		var cjsjt = $("#p_cjsjt").val();
		if(cjsjf!=null && cjsjf!="" && cjsjt!=null && cjsjt!=""){
			if(cjsjf>cjsjt){
				jAlert("采集时间必须大于采集时间至","验证信息",null,"p_cjsjf");
				return false;
			}
		}
	return true;
}
//IC卡受理
function setSlIck(id){
	detailUrl="icksystem/query_icksl.action";
	dataid=id;
	sFlag="false";
	setWidth(detailid,modWidth);
	var rylbValue = $("#icksltableid #"+id).find("td:nth(8)").text();
	$("#f_rylbbm").val(rylbValue);
	if(rylbValue == 0){
		setUrl(detailid,gnIckSlHtml);
	}else{
		setUrl(detailid,gwIckSlHtml);
	}
	bindDocument(detailid);
}

//人员详细查询
function setRyDetail(obj){
	dataid=$(obj).attr("id");
	sFlag="false";
	setWidth(detailid,modWidth);
	var rylbValue = $(obj).find("td:nth(8)").text();
	$("#f_rylbbm").val(rylbValue);
	if(rylbValue == 0){
		detailUrl="publicsystem/query_qyryxx.action";
		setUrl(detailid,gnRyHtml);
	}else{
		detailUrl="publicsystem/query_publicwgcyryxx.action";
		setUrl(detailid,gwRyHtml);
	}
	bindDocument(detailid);
}

//场所详细查询
var qyjbxx_requestType;
var qyjbxx_dataid;
var qyjbxx_detailWidth="990";

function setCsDetail(obj){
	detailUrl="publicsystem/query_qyjbxx.action";
	qyjbxx_requestType="detail";
	qyjbxx_dataid=$(obj).find("td:nth(9)").text();
	setWidth("qyjbxx_detail",qyjbxx_detailWidth);
	setUrl("qyjbxx_detail",QyHtml);
	sFlag="false";
	bindDocument("qyjbxx_detail");
}
function qyjbxx_setDetail(){
	setParams("q_");
	jQuery.post("publicsystem/query_qyjbxx.action",params,qyjbxx_updatediv,"json");
}
// 行业类别	
//$("#p_hylbdm").selectBoxhylb();
// 企业筛选框
//$("#p_qymc").click(function(){
//    dataid=$('#p_hylbdm').val();
// 	getTy_item("p_qymc","p_qybm");
//  });


</script>

	</head>
	<body>

		<input type="hidden" id="d_ryid" value="">
		<input type="hidden" id="f_rylbbm" value="">
		<table width="100%" cellpadding="0" cellspacing="0"
			class="tableborder">
			<tr>
				<td class="queryfont">
					IC卡受理管理
				</td>
			</tr>
			<tr>
				<td class="tdbg">
					<table width="100%" border="0" cellspacing="0" cellpadding="2">
						<!-- <tr>
						    <td width="10%" class="pagedistd">
								行业类别
							</td>
							<td width="23%" class="pagetd">
								<select  id="p_hylbdm" >
								</select>
							</td>
							<td width="10%" class="pagedistd">
								企业名称
							</td>
							<td width="23%" class="pagetd">
								<input type="text" id="p_qymc" readonly class="inputstyle">
							</td>
							<td width="10%" class="pagedistd">
								企业编码
							</td>
							<td width="23%" class="pagetd">
								<input type="text" class="inputstyle" id="p_qybm">
							</td>
						</tr>
						 -->
						<tr>
						    <td width="10%" class="pagedistd">
								姓名
							</td>
							<td width="23%" class="pagetd">
								<input type="text" class="inputstyle" id="p_xm">
							</td>
							<td width="10%" class="pagedistd">
								证件类型
							</td>
							<td width="23%" class="pagetd">
								<select id="p_cyzjdm">
									<option></option>
								</select>
							</td>
							<td width="10%" class="pagedistd">
								证件号码
							</td>
							<td width="23%" class="pagetd">
								<input type="text" class="inputstyle" id="p_zjhm">
							</td>
						</tr>
						<tr>
							<td width="10%" class="pagedistd">
								采集时间
							</td>
							<td width="23%" class="pagetd">
								<input type="text" class="inputstyle" id="p_cjsjf">
							</td>
							<td width="10%" class="pagedistd">
								至
							</td>
							<td width="23%" class="pagetd">
								<input type="text" class="inputstyle" id="p_cjsjt">
							</td>
							<td width="10%" class="pagedistd">
								&nbsp;
							</td>
							<td width="23%" class="pagetd">
								<table border="0" align="right" cellpadding="0" cellspacing="0">
									<tr>
										<td width="100%" height="28px">
											<a href="#" class="searchbutton" id="querys"
												onClick="setPageList(1);">查询</a>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td colspan="6"></td>
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
		<div id="icksl_detail" class="page-layout" src="#"
			style="top: 20px; left: 160px; width: 500px;">
		</div>

		<div id="qyjbxx_detail" class="page-layout" src="#"
			style="display: none; top: 20px; left: 160px; width: 500px;">
		</div>
		<div id="tabledata" style="width: 100%;">
			<table id="table1" width="100%">
				<thead>
					<tr>
						<th name="l_cyrybh">
							人员编号
						</th>
						<th name="l_xm">
							姓名
						</th>
						<th name="l_zjhm">
							证件号码
						</th>
						<th name="l_xb" nowrap>
							性别
						</th>
						<th name="l_qymc">
							企业名称
						</th>
						<th name="l_cjsj">
							采集时间
						</th>
						<th name="l_cylb">
							人员类别
						</th>
						<th name="l_cyryzt">
							状态
						</th>
						<th name="l_cyrylbdm">
							从业人员类别代码
						</th>
						<th name="l_qyid">
							企业ID
						</th>
						<th name="">
							操作
						</th>
					</tr>
				</thead>
			</table>
		</div>
	</body>
</html>