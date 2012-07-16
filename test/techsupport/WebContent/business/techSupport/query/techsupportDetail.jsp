<%@page import="com.aisino2.techsupport.common.Constants"%>
<%@ page language="java" pageEncoding="utf8"%>
<%@include file="../../../public/common.jsp"%>
<%@include file="../common/base.jsp" %>
 
<script type="text/javascript" src="<%=tsBase %>/query/techsupportDetail.js"></script>
<link href="<%=tsBase %>/common/css/basets.css" type="text/css" rel="stylesheet"></link>

<style type="text/css">

.date {
	width: 100px !important;
}
.label-90{
	width: 90px !important;
}
</style>
<input type="hidden" id="id">
<input type="hidden" id="track_stId">
<input type="hidden" id="sv_st_id">
<input type="hidden" id="att_stId">
	<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
    <tr>
      <td align="left" class="title1">支持单详情</td>
      <td align="right"><a href="#" id="closeDiv" onclick='$("#detailCt").hideAndRemove("show");' class="close"></a></td>
    </tr>
</table>
<div id="techsupportDetail" style="margin-left:auto; margin-right:auto; margin-top:auto; width: 840px; text-align: center;padding-top:10px;padding-bottom:5px;">
	<fieldset>
		<legend>支持单信息</legend>
		<div class="row">
			<div class="column">
				<label class="label">技术支持单编号:</label>
				<input type="text" class="item ro inputstyle" id="stNo" name="st.stNo">
				<div class="clear-column"></div>
			</div>
			<div class="column column-250">
				<label class="label label-80">技术支持部门:</label>
				<input type="text" class="item ro inputstyle" id="deptName" name="st.supportDeptList.departname">
				<div class="clear-column"></div>
			</div>
			<div class="column column-250">
				<label class="label label-80">版本出库领用单编号:</label>
				<input type="text" class="item ro inputstyle" id="archive_code" name="st.archive_code">
				<div class="clear-column"></div>
			</div>
			<div class="clear-row"></div>
		</div>
		
		
		<div class="row">
			<div class="column">
				<label class="label">技术支持单负责人:</label>
				<input type="text" class="item ro inputstyle" name="st.supportLeader.username" id="q_slName"> 
				<div class="clear-column"></div>
			</div>
			<div class="column column-250">
				<label class="label label-80">大区/区域:</label>
				<input type="text" class="item ro inputstyle" name="st.region" id="region">
				<div class="clear-column"></div>
			</div>
			<div class="column column-250">
				<label class="label label-80">申请人:</label>
				<input type="text" class="item inputstyle ro" name="st.applicant.username" id="applicant">
				<div class="clear-column"></div>
			</div>
			<div class="clear-row"></div>
		</div>
		
		<div class="row">
			<div class="column"  style="width: 800px;">
				<label class="label">技术支持单内容:</label>
				<textarea style="width:658px ! important;height: 79px;" class="ro item inputstyle" name="st.supportContent" id="supportContent"></textarea>
				<div class="clear-column"></div>
			</div>
			
			<div class="clear-row"></div>
		</div>
		
		<div class="row">
			<div class=" column" style="width: 240px;">
				<label class="label">产品方案部:</label>
				<div class="clear-column"></div>
				
				<div class="row">
					<div class="column">
						<label class="label">计划完成时间:</label>
						<input type="text" class=" item ro label-80 inputstyle" name="st.psgScheDate" id="psgScheDate">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<label class="label">阶段:</label>
						<input type="checkbox" class=" item" id="psgstage">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<div class="psgstage">
							<label class="label" >需求:</label>
							<input type="text" class=" item label-80 ro " name="st.psgDsScheDate" id="psgDsScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<div class="psgstage">
							<label class="label" >实施:</label>
							<input type="text" class=" item label-80 ro" name="st.psgIsScheDate" id="psgIsScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
			</div>
			
			<div class="column " style="line-height: 16px;">
				<div>
					<label class="label label-80"></label>
				</div>
				<div class="clear-column"></div>
				
				
				<div class="row">
					<div class="column">
						<label class="label label-80">实际完成时间:</label>
						<input type="text" class=" item ro label-80 inputstyle" name="st.psgCompDate" id="psgCompDate">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				<div class="row">
					<div class="column">
						<label class="label label-80">阶段:</label>
						<input type="checkbox" class=" item" id="psgcpstage">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<div class="psgcpstage">
							<label class="label label-80" >需求:</label>
							<input type="text" class=" item label-80 ro  inputstyle" name="st.psgDsCompDate" id="psgDsCompDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<div class="psgcpstage">
							<label class="label label-80" >实施:</label>
							<input type="text" class=" item label-80 ro inputstyle" name="st.psgIsCompDate" id="psgIsCompDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="clear-column"></div>
			</div>
			
			<div class=" column" style="width:190px;">
				<label class="label label-80">技术开发部:</label>
				<div class="clear-column"></div>
				
				<div class="row">
					<div class="column">
						<label class="label label-80">计划完成时间:</label>
						<input type="text" class=" item ro label-80 inputstyle" name="st.devScheDate" id="devScheDate">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				<div class="row">
					<div class="column">
						<label class="label label-80">阶段:</label>
						<input type="checkbox" class=" item"  id="devstage">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<div class="devstage">
							<label class="label label-80" >设计:</label>
							<input type="text" class=" item label-80 ro inputstyle" name="st.devDsScheDate" id="devDsScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
			
				<div class="row">
					<div class="column">
						<div class="devstage">
							<label class="label label-80" >开发:</label>
							<input type="text" class=" item label-80 ro inputstyle" name="st.devDdScheDate" id="devDdScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<%-- 添加测试计划时间 --%>
				<div class="row">
					<div class="column">
						<div class="devstage">
							<label class="label label-80" >测试:</label>
							<input type="text" class=" item label-80 ro inputstyle" name="st.devDtScheDate" id="devDtScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
			</div>
			
			<div class="column ">
				<div>
					<label class="label label-80"></label>
				</div>
				<div class="clear-column"></div>
				
				
				<div class="row">
					<div class="column">
						<label class="label label-80">实际完成时间:</label>
						<input type="text" class=" item ro label-80 inputstyle" name="st.devCompDate" id="devCompDate">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<label class="label label-80">阶段:</label>
						<input type="checkbox" class=" item" id="devcpstage">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<div class="devcpstage">
							<label class="label label-80" >设计:</label>
							<input type="text" class=" item label-80 ro inputstyle" name="st.devDsCompDate" id="devDsCompDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
			
				<div class="row">
					<div class="column">
						<div class="devcpstage">
							<label class="label label-80" >开发:</label>
							<input type="text" class=" item label-80 ro inputstyle" name="st.devDdCompDate" id="devDdCompDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<%-- 添加测试时间 --%>
				<div class="row">
					<div class="column">
						<div class="devcpstage">
							<label class="label label-80" >测试:</label>
							<input type="text" class=" item label-80 ro inputstyle" name="st.devDtCompDate" id="devDtCompDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
			</div>
			<div class="clear-row"></div>
		</div>
		<div class="row">
			<div class="column">
				<label class="label">提请反馈日期:</label>
				<input type="text" class="item ro inputstyle" id="applyingFeedbackDate" name="st.applyingFeedbackDate">
				<div class="clear-column"></div>
			</div>
			<div class="column">
				<label class="label">反馈确认日期:</label>
				<input type="text" class="ro item inputstyle" name="st.feedbackConfirmDate" id="feedbackConfirmDate" >
				<div class="clear-column"></div>
			</div>
			<div class="clear-row"></div>
		</div>		
	</fieldset>

	
<!--	<fieldset>-->
<!--		<legend>进展</legend>-->
<!--		<div class="row" style="width: 90%; margin: 0 auto; ">-->
<!--			<div class="column" style="width: 100%;">-->
<!--				<div id="trackingTableDiv" style="margin-left: auto;margin-right: auto;text-align: center;">-->
<!--					<table id="trackingTable" width="100%" border="1" cellpadding="0" cellspacing="0">-->
<!--					  <thead>-->
<!--					    <tr>       -->
<!--					     	<th name="l_stNo">日期</th>-->
<!--					     	<th name="l_region">进展</th>-->
<!--					     	<th name="l_applicant">填写人员</th>-->
<!--					    </tr>-->
<!--					  </thead>-->
<!--					</table>-->
<!--				</div>-->
<!--				<div class="clear-column"></div>-->
<!--			</div>-->
<!--			<div class="clear-row"></div>-->
<!--		</div>-->
<!--	</fieldset>-->
<!--	-->
<!--	<fieldset>-->
<!--		<legend>督办进展</legend>-->
<!--		<div class="row" style="width: 90%; margin: 0 auto; ">-->
<!--			<div class="column" style="width: 100%;">-->
<!--				<div id="supervision_list_div" style="margin-left: auto;margin-right: auto;text-align: center;">-->
<!--					<table id="supervision_list_table" >-->
<!--						<thead>-->
<!--							<tr>-->
<!--								<th>督办人</th>-->
<!--								<th>督办进展</th>-->
<!--								<th>督办时间</th>-->
<!--							</tr>-->
<!--						</thead>-->
<!--					</table>-->
<!--				</div>-->
<!--				<div class="clear-column"></div>-->
<!--			</div>-->
<!--			<div class="clear-row"></div>-->
<!--		</div>				-->
<!--	</fieldset>-->
	<div class="row" style="width: 100%;">
	
			<div class="column" style="width: 49%;">
				<fieldset>
					<legend>督办进展</legend>
					<div id="supervision_list_div" style="margin-left: auto;margin-right: auto;text-align: center;">
						<table id="supervision_list_table" >
							<thead>
								<tr>
									<th>督办人</th>
									<th>督办进展</th>
									<th>督办时间</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="clear-column"></div>
				
				<%-- 修改问题记录序号-11 技术支持单查询，详情中的备注框有些大。 --%>
				<div class="row">
					<div class="column">
						<div>
							<label class="label" style="width: 8%;">备注:</label>
							<input class="item ro inputstyle" 
								style="width:88% ! important;" 
								name="st.comments" id="comments">
						</div>
						<div class="clear-column"></div>
					</div>
					
					<div class="clear-row"></div>
				</div>
				
				</fieldset>
			</div>
			
	
			<div class="column" style="width: 49%;float: right;">
				<fieldset>
					<legend>进展信息</legend>
					<div id="trackingTableDiv" >
						<table id="trackingTable" width="100%" border="1" cellpadding="0" cellspacing="0">
						  <thead>
						    <tr>       
						     	<th name="l_stNo">日期</th>
						     	<th name="l_region">进展</th>
						     	<th name="l_applicant">填写人员</th>
						    </tr>
						  </thead>
						</table>
					</div>
					<div class="clear-column"></div>
				</fieldset>
			</div>
		</div>
		<fieldset>
			<legend>附件</legend>
			<div class="row">
				<div class="column" style="width: 100%;">
					<label></label>
					<div class="item">
						<div id="attachment_list_div">
							<table id="attachment_list_table">
								<thead>
									<th>文件名</th>
									<th>文件大小</th>
									<th>备注</th>
									<th>操作</th>
								</thead>
								
							</table>
						</div>
					</div>
					<div class="clear-column"></div>
				</div>
				<div class="clear-row"></div>
			</div>	
		</fieldset>
</div>