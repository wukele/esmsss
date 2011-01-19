package com.admin.user.action;


import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.user.service.InfoDeptService;
import com.admin.user.service.RoleService;
import com.admin.user.service.RuleOperRoleService;
import com.entries.ulp.InfoDept;
import com.entries.ulp.InfoDeptDAO;
import com.entries.ulp.InfoOper;
import com.entries.ulp.InfoRole;
import com.entries.ulp.IntermedialData;
import com.entries.ulp.RuleOperRole;
import com.entries.ulp.RuleOperRoleDAO;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Component("RuleOperRoleManagerAction")
@Scope("prototype")
public class RuleOperRoleManagerAction extends ActionSupport implements ServletRequestAware {
	private static final Log log = LogFactory.getLog(RuleOperRoleManagerAction.class);
	private HttpServletRequest  request;
	/**
	 * 
	 */

	/*��ҳ�õ�3������*/
	private int totalProperty=0;
	private int start=0;
	private int limit=10;
	private int ret=0;
	private String msg="";
	
	private List<IntermedialData>  ruleOperRoles;
	private RuleOperRoleService   ruleOperRoleService;
	private RuleOperRoleDAO ruleOperRoleDao;
	private List<InfoRole> infoRoles;
	/*����������ҳ�洫�����*/
	private IntermedialData pageParam;

	
	/**
	 * action�ⲿ��¶����
	 * @return
	 */
	public  String selectRuleOperRole(){
		if(pageParam==null){
			pageParam=new IntermedialData();
		}
		ruleOperRoles=ruleOperRoleService.selectRuleOperRole(pageParam);
		return  SUCCESS;
	}
	public  String insertRuleOperRole(){
		ret=0;
		try {
			ruleOperRoleService.insertRuleOperRole(pageParam);
		}
		 catch (RuntimeException e) {
			log.error("insert RuleOperRole failed...");
			setRet(1);
			setMsg("insert RuleOperRole failed..."+e.getMessage());
		}
		return  SUCCESS;
	}
	public String deleteRuleOperRole(){
		ret=0;
		try {
			ruleOperRoleService.deleteRuleOperRole(pageParam);
		}
		 catch (RuntimeException e) {
			log.error("deleteRuleOperRole failed...");
			setRet(1);
			setMsg("deleteRuleOperRole failed..."+e.getMessage());
		}
		return  SUCCESS;
	}
	public String selectInfoRole(){
		if(pageParam==null){
			pageParam=new IntermedialData();
		}
		infoRoles=ruleOperRoleService.selectInfoRole(pageParam);
		return  SUCCESS;
	}
	
	public void setServletRequest(HttpServletRequest request) {
		// TODO Auto-generated method stub
		setRequest(request);
	}
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	



	public void setTotalProperty(int totalProperty) {
		this.totalProperty = totalProperty;
	}



	public int getTotalProperty() {
		return totalProperty;
	}





	public void setStart(int start) {
		this.start = start;
	}
	public int getStart() {
		return start;
	}


	



	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getLimit(){
		return limit;
	}





	public void setRet(int ret) {
		this.ret = ret;
	}

	public int getRet() {
		return ret;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	@Resource(name="RuleOperRoleService")
	public void setRuleOperRoleService(RuleOperRoleService ruleOperRoleService) {
		this.ruleOperRoleService = ruleOperRoleService;
	}
	@Resource(name="RuleOperRoleDAO")
	public void setRuleOperRoleDao(RuleOperRoleDAO ruleOperRoleDao) {
		this.ruleOperRoleDao = ruleOperRoleDao;
	}
	public void setRuleOperRoles(List<IntermedialData> ruleOperRoles) {
		this.ruleOperRoles = ruleOperRoles;
	}
	public List<IntermedialData> getRuleOperRoles() {
		return ruleOperRoles;
	}

	public void setPageParam(IntermedialData pageParam) {
		this.pageParam = pageParam;
	}

	public IntermedialData getPageParam() {
		return pageParam;
	}

	public void setInfoRoles(List<InfoRole> infoRoles) {
		this.infoRoles = infoRoles;
	}

	public List<InfoRole> getInfoRoles() {
		return infoRoles;
	}
	

}
