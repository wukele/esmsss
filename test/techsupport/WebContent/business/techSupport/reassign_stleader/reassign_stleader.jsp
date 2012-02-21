<%@page import="com.aisino2.techsupport.common.Constants"%>
<%@ page language="java"   pageEncoding="UTF-8"%>
<%@include file="../../../public/common.jsp"%>
<%@include file="../common/base.jsp" %>

<script type="text/javascript" src="<%=tsBase %>/reassign_stleader/reassign_stleader.js"></script>
<link href="<%=tsBase %>/common/css/basets.css" type="text/css" rel="stylesheet"></link>
<style type="text/css">
.date {
	width: 100px !important;
}

</style>
<input type="hidden" id="p_taskId">
<input type="hidden" name="st.id">
<input type="hidden" id="sv_st_id">
	<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
    <tr>
      <td align="left" class="title1">重指派支持单负责人</td>
      <td align="right"><a href="#" id="closeDiv" onclick='$("#detailCt").hideAndRemove("show");' class="close"></a></td>
    </tr>
</table>
<div id="tracking" style="padding: 5 5 5 5;">
	<fieldset>
		<legend>技术支持单</legend>
		<div class="row">
			<div class="column">
				<label class="label">技术支持单编号:</label>
				<input type="text" class="item inputstyle ro" id="p_stNo" name="st.stNo">
				<div class="clear-column"></div>
			</div>
			<div class="column column-250">
				<label class="label label-80">技术支持部门:</label>
				<input type="text" class="item inputstyle ro" id="p_deptName" >
				<div class="clear-column"></div>
			</div>
			<div class="clear-row"></div>
		</div>
		
		
		<div class="row">
			<div class="column">
				<label class="label">技术支持单负责人:</label>
				<input type="text" class="item inputstyle ro" id="p_slName">
				<div class="clear-column"></div>
			</div>
			<div class="column column-250">
				<label class="label label-80">大区/区域:</label>
				<input type="text" class="item inputstyle ro" name="st.region" id="p_region">
				<div class="clear-column"></div>
			</div>
			<div class="column column-250">
				<label class="label label-80">申请人:</label>
				<input type="text" class="item inputstyle ro" name="st.applicant.username" id="p_applicant">
				<div class="clear-column"></div>
			</div>
			<div class="clear-row"></div>
		</div>
		
		<div class="row">
			<div class=" column-block column" >
				<label class="label">技术支持单内容:</label>
				<textarea style="width:250px ! important;height: 124px;" class="ro item  inputstyle" name="st.supportContent" id="p_supportContent"></textarea>
				<div class="clear-column"></div>
			</div>
			<div class="column-block2 column">
				<label class="label label-80">产品方案部:</label>
				<div class="clear-column"></div>
				
				<div class="row">
					<div class="column">
						<label class="label label-80">计划完成时间:</label>
						<input type="text" class=" item inputstyle ro label-100" name="st.psgScheDate" id="p_psgScheDate">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<label class="label label-80">阶段:</label>
						<input type="checkbox" class=" item" id="psgstage">
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<div class="psgstage">
							<label class="label label-80" >需求:</label>
							<input type="text" class="psgstage item inputstyle ro label-100" name="st.psgDsScheDate" id="p_psgDsScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<div class="row">
					<div class="column">
						<div class="psgstage">
							<label class="label label-80" >实施:</label>
							<input type="text" class="psgstage item inputstyle ro label-100" name="st.psgIsScheDate" id="p_psgIsScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
			</div>
			
			
			<div class="column-block2 column">
				<label class="label label-80">技术研发部:</label>
				<div class="clear-column"></div>
				
				<div class="row">
					<div class="column">
						<label class="label label-80">计划完成时间:</label>
						<input type="text" class=" item inputstyle ro label-100" name="st.devScheDate" id="p_devScheDate">
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
							<input type="text" class="devstage item inputstyle ro label-100" name="st.devDsScheDate" id="p_devDsScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
			
				<div class="row">
					<div class="column">
						<div class="devstage">
							<label class="label label-80" >开发:</label>
							<input type="text" class="devstage item inputstyle label-100 ro" name="st.devDdScheDate" id="p_devDdScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
				
				<%-- ++ 新需求 技术开发部添加阶段测试 --%>
				<div class="row">
					<div class="column">
						<div class="devstage">
							<label class="label label-80" >测试:</label>
							<input type="text" class="devstage item inputstyle label-100 ro" name="st.devDtScheDate" id="p_devDtScheDate">
						</div>
						<div class="clear-column"></div>
					</div>
					<div class="clear-row"></div>
				</div>
			
			<%-- -- 新需求 技术开发部添加阶段测试 --%>
			</div>
			
			
			<div class="clear-row"></div>
		</div>
	</fieldset>
	
	
	<fieldset>
		<legend>进展信息</legend>
		
		<div class="row" style="width: 90%; margin: 0 auto; ">
			<div class="column" style="width: 100%;">
				<div id="trackingTableDiv" style="margin-left: auto;margin-right: auto;text-align: center;">
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
			</div>
			<div class="clear-row"></div>
		</div>
	</fieldset>
	
	<fieldset>
		<legend>督办进展</legend>
		<div class="row" style="width: 90%; margin: 0 auto; ">
			<div class="column" style="width: 100%;">
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
			</div>
			<div class="clear-row"></div>
		</div>				
	</fieldset>
	
	<fieldset>
		<legend>变更信息</legend>
		
		<div class="row">
			<div class="column">
				<div>
					<label class="label red">变更原因:</label>
					<textarea class="item  inputstyle" style="width:80% ! important;height: 70px;" name="track.newProcess" id="p_newProcess"></textarea>
				</div>
				<div class="clear-column"></div>
			</div>
			
			<div class="clear-row"></div>
		</div>
		<div class="row">
			<div class="column">
				<div>
					<label class="label red">变更日期:</label>
					<input type="text" class="ro  item  inputstyle" name="track.trackingDate" id="p_trackingDate" value="<%=dateNow%>">
				</div>
				<div class="clear-column"></div>
			</div>
			
			<div class="column">
				<div>
					<label class="label label-80 red">变更人:</label>
					<%--变更人和变更人ID --%>
					<input type="text" class="ro  item  inputstyle" name="track.process.username" id="p_change_person_name" value="<%=username%>">
					<input type="hidden" name="track.processor.userid" id="p_change_person_id" value="<%=user.getUserid()%>">
					<input type="hidden" name="track.type" value="<%=Constants.TRACKING_TYPE_REASSIGN_SUPPORT_LEADER%>">
				</div>
				<div class="clear-column"></div>
			</div>
			<div class="column">
				<div>
					<label class="label label-100 red">新支持单负责人:</label>
					<%--新支持单负责人和新支持单负责人ID --%>
					<input type="text" class="ro  item  inputstyle" name="change_st.lstSupportLeaders[0].username" id="p_processor" >
					<input type="hidden" name="change_st.lstSupportLeaders.userid" id="p_processorId" >
				</div>
				<div class="clear-column"></div>
			</div>
			<div class="clear-row"></div>
		</div>
	</fieldset>
	
	<div class="row">
		<div class="column" style="width: 70%">
			<div class="clear-column"></div>
		</div>
		<div class="column" style="width: 120px;">
			<a class="item submitbutton" id="saveBtn" href="#">保存</a>
			<div class="clear-column"></div>
		</div>
		<div class="clear-row"></div>
	</div>
</div>

