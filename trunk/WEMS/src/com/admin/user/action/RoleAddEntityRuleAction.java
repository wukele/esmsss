package com.admin.user.action;


import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.user.service.RoleService;
import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoRole;
import com.opensymphony.xwork2.ActionSupport;
import com.ulp.comm.CommUlpKey;
@Component("RoleAddEntityRuleAction")
@Scope("prototype")
public class RoleAddEntityRuleAction extends ActionSupport implements ServletRequestAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9120789797018893831L;
	private String role_code;
	private String role_name;
	private List<InfoRole>  roles;
	private RoleService   rs;
	private HttpServletRequest  request;
	private List<InfoMenu> operMenu;
	private List<InfoMenu> roleMenu;
	//private 
	
	public List<InfoMenu> getOperMenu() {
		return operMenu;
	}
	public List<InfoMenu> getRoleMenu() {
		return roleMenu;
	}
	public List<InfoRole> getRoles() {
		return roles;
	}
	@Resource(name="RoleService")
	public void setRs(RoleService rs) {
		this.rs = rs;
	}
	
	
	public  String doQueryRoleInfo(){
		roles=rs.queryInfoRoles(role_code, role_name);
		return  SUCCESS;
	}
	
	public String doQueryRoleMenu(){
		roleMenu=rs.getRoleMenus(role_code);
		String   operNo=String.valueOf(request.getSession().getAttribute(CommUlpKey.KEY_INFO_OPER));
		operMenu=rs.getOperMenu(operNo);
		return SUCCESS;
	}
	
	public void setRole_code(String roleCode) {
		role_code = roleCode;
	}
	public void setRole_name(String roleName) {
		role_name = roleName;
	}
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		request=arg0;
	}
	
}
