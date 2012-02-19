package com.aisino2.techsupport.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.jbpm.api.task.Participation;
import org.jbpm.api.task.Task;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.domain.Department;
import com.aisino2.sysadmin.domain.User;
import com.aisino2.sysadmin.service.IUserService;
import com.aisino2.techsupport.common.Constants;
import com.aisino2.techsupport.domain.SupportTicket;
import com.aisino2.techsupport.domain.Tracking;
import com.aisino2.techsupport.service.ISupportChangeService;
import com.aisino2.techsupport.service.SupportTicketService;
import com.aisino2.techsupport.service.TrackingService;
import com.aisino2.techsupport.workflow.WorkflowUtil;

@Component("SupportChangeServiceImpl")
@Scope("prototype")
public class SupportChangeServiceImpl implements ISupportChangeService {
	private SupportTicketService support_ticket_service;
	private TrackingService tracking_service;
	private WorkflowUtil workflow;
	private IUserService user_service;

	@Resource(name = "userService")
	public void setUser_service(IUserService user_service) {
		this.user_service = user_service;
	}

	@Resource(name = "SupportTicketServiceImpl")
	public void setSupport_ticket_service(
			SupportTicketService support_ticket_service) {
		this.support_ticket_service = support_ticket_service;
	}

	@Resource(name = "TrackingServiceImpl")
	public void setTracking_service(TrackingService tracking_service) {
		this.tracking_service = tracking_service;
	}

	@Resource(name = "WorkflowUtil")
	public void setWorkflow(WorkflowUtil workflow) {
		this.workflow = workflow;
	}

	/**
	 * 重新指派机构
	 */
	public void change_support_department(String taskId, SupportTicket st,
			Tracking tracking) {
		if (st.getSupportDeptList() == null
				|| st.getSupportDeptList().isEmpty())
			throw new RuntimeException("需要变更的部门为空");
		// 保存支持单信息指派部门信息
		support_ticket_service.updateSupportTicket(st);
		// 保存变更原因为进展
		tracking_service.insertTracking(tracking);

		// 流程部分
		// 先通过TASKID查询当前实例的ID，通过实例ID查询部署ID。通过部署ID+环境名称，插叙到 关联的
		// 环节信息。

		String reassign_department_process_id = workflow
				.getExecutionService()
				.findExecutionById(
						workflow.getTaskService().getTask(taskId)
								.getExecutionId()).getProcessInstance().getId();
		Task reassign_support_leader_task = workflow.getTaskService()
				.createTaskQuery()
				.processInstanceId(reassign_department_process_id)
				.activityName(Constants.ST_PROCESS_REASSGIN_STLEADER)
				.uniqueResult();
		List<Participation> candidate_user_list = workflow.getTaskService()
				.getTaskParticipations(reassign_support_leader_task.getId());

		Map<String, Object> params = workflow.setDeptAssigneeVariable(st
				.getSupportDeptList());

		String[] new_assign_department_approval_users = params
				.get("deptApprovalUsers").toString().split(",");
		// 清除以前指派的部门
		for (Participation p : candidate_user_list) {
			workflow.getTaskService().removeTaskParticipatingUser(
					reassign_support_leader_task.getId(), p.getUserId(),
					Participation.CANDIDATE);
		}
		try {
			// 重新指派
			for (String assign_user : new_assign_department_approval_users) {

				workflow.getTaskService().addTaskParticipatingUser(
						reassign_support_leader_task.getId(), assign_user,
						Participation.CANDIDATE);

			}

			params.put("reassign_depart_repeat", "to reassign_depart");
			// 到下一个流程
			workflow.getTaskService().completeTask(taskId, params);
		} catch (Exception e) {
			// 恢复以前的指派的部门审批人
			List<Participation> new_reassign_support_leader_users = workflow
					.getTaskService().getTaskParticipations(
							reassign_support_leader_task.getId());
			for (Participation p : new_reassign_support_leader_users) {
				workflow.getTaskService().removeTaskParticipatingUser(
						reassign_support_leader_task.getId(), p.getUserId(),
						Participation.CANDIDATE);
			}

			for (Participation p : candidate_user_list) {
				workflow.getTaskService().addTaskParticipatingUser(
						reassign_support_leader_task.getId(), p.getUserId(),
						Participation.CANDIDATE);
			}
			throw new RuntimeException("流程控制指派部门审批人候选人发生错误",
					e.fillInStackTrace());
		}
	}

	/**
	 * 重新指派负责人
	 */
	public void change_support_leader(String taskId, SupportTicket st,
			Tracking tracking) {
		if (st.getLstSupportLeaders() == null
				|| st.getLstSupportLeaders().isEmpty())
			throw new RuntimeException("需要变更的支持单负责人为空");
		// 保存支持单信息指派部门信息
		support_ticket_service.updateSupportTicket(st);
		// 保存变更原因为进展
		tracking_service.insertTracking(tracking);

		// 流程部分
		String reassign_support_leader_process_id = workflow
				.getExecutionService()
				.findExecutionById(
						workflow.getTaskService().getTask(taskId)
								.getExecutionId()).getProcessInstance().getId();
		Task tracking_task = workflow.getTaskService().createTaskQuery()
				.processInstanceId(reassign_support_leader_process_id)
				.activityName(Constants.ST_PROCESS_TRACKING).uniqueResult();
		// 之前的 追踪批复 候选人
		List<Participation> tracking_candidate_users = workflow
				.getTaskService().getTaskParticipations(tracking_task.getId());

		SupportTicket comm_st = support_ticket_service.getSupportTicket(st);
		
		if(tracking_candidate_users.isEmpty()){
			try {
				
				workflow.getTaskService().addTaskParticipatingUser(
						tracking_task.getId(), st.getLstSupportLeaders().get(0).getUserid().toString(),
						Participation.CANDIDATE);

				Map<String, String> params = new HashMap<String, String>();
				params.put("reassign_stleader_repeat",
						"to_reassgin_stleader");
				// 完成本流程跳转到下一个流程
				workflow.getTaskService().completeTask(taskId,params);
				return;
			} catch (Exception e) {
				List<Participation> new_tracking_candidate_users = workflow
						.getTaskService().getTaskParticipations(
								tracking_task.getId());
				// 当添加出错的时候，滚回以前的状态
				for(Participation new_p : new_tracking_candidate_users){
					if (Integer.parseInt(new_p.getUserId()) == st.getLstSupportLeaders().get(0).getUserid()) {
						workflow.getTaskService().addTaskParticipatingUser(
								tracking_task.getId(), st.getLstSupportLeaders().get(0).getUserid().toString(),
								Participation.CANDIDATE);
					}
				}
				
				
				throw new RuntimeException("流程控制 追踪批复 候选人发生错误",
						e.fillInStackTrace());
			}
		}
		
		for (Participation p : tracking_candidate_users) {
			User old_tracking_user = new User();
			old_tracking_user.setUserid(Integer.parseInt(p.getUserId()));
			old_tracking_user = user_service.getUser(old_tracking_user);
			User sl = user_service.getUser(st.getLstSupportLeaders().get(0));
			boolean is_support_department = false;
			//验证以往的 追踪批复候选人是不是在支持部门里面,如果在就移除支持单候选
			for(Department d : comm_st.getSupportDeptList()){
				if(d.getDepartid().equals( old_tracking_user.getDepartid())){
					is_support_department=true;
					break;
				}
			}
			
			if (!is_support_department)
				workflow.getTaskService().removeTaskParticipatingUser(
						tracking_task.getId(), p.getUserId(),
						Participation.CANDIDATE);
			//因为一个部门只允许指派一个
			else if (sl.getDepartid().equals(old_tracking_user.getDepartid()))
				workflow.getTaskService().removeTaskParticipatingUser(
						tracking_task.getId(), p.getUserId(),
						Participation.CANDIDATE);
			
			if (!sl.getUserid().equals(old_tracking_user.getUserid())) {
				try {
					
					workflow.getTaskService().addTaskParticipatingUser(
							tracking_task.getId(), sl.getUserid().toString(),
							Participation.CANDIDATE);

					Map<String, String> params = new HashMap<String, String>();
					params.put("reassign_stleader_repeat",
							"to_reassgin_stleader");
					// 完成本流程跳转到下一个流程
					workflow.getTaskService().completeTask(taskId,params);
					break;
				} catch (Exception e) {
					List<Participation> new_tracking_candidate_users = workflow
							.getTaskService().getTaskParticipations(
									tracking_task.getId());
					// 当添加出错的时候，滚回以前的状态
					if (!new_tracking_candidate_users.contains(p)) {
						workflow.getTaskService().addTaskParticipatingUser(
								tracking_task.getId(), p.getUserId(),
								Participation.CANDIDATE);
					}
					throw new RuntimeException("流程控制 追踪批复 候选人发生错误",
							e.fillInStackTrace());
				}

			}

		}

	}
}
