package com.admin.user.action;


import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.stereotype.Component;

import com.admin.user.service.InfoDeptService;
import com.admin.user.service.RoleService;
import com.entries.ulp.InfoDept;
import com.entries.ulp.InfoRole;
import com.opensymphony.xwork2.ActionSupport;
@Component("InfoDeptManagerAction")
public class InfoDeptManagerAction extends ActionSupport implements ServletRequestAware {

	private HttpServletRequest  request;
	/**
	 * 
	 */
	private static final long serialVersionUID = 2917992252063549075L;
	
	private List<InfoDept>  infoDepts;
	private InfoDeptService   infoDeptService;
	
	@Resource(name="InfoDeptService")
	public void setInfoDeptService(InfoDeptService infoDeptService) {
		this.infoDeptService = infoDeptService;
	}
	public InfoDeptService getInfoDeptService() {
		return infoDeptService;
	}

	public  String findAllInfoDept(){
		setInfoDepts(infoDeptService.findAllInfoDept());
		return  SUCCESS;
	}
	public void setInfoDepts(List<InfoDept> infoDepts) {
		this.infoDepts = infoDepts;
	}
	public List<InfoDept> getInfoDepts() {
		return infoDepts;
	}
	public void setServletRequest(HttpServletRequest request) {
		// TODO Auto-generated method stub
		setRequest(request);
	}
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	public HttpServletRequest getRequest() {
		return request;
	}
	
}