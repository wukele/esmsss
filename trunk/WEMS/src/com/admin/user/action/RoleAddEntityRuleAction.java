package com.admin.user.action;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.user.service.RoleService;
import com.entries.ulp.InfoRole;
import com.opensymphony.xwork2.ActionSupport;
@Component("RoleAddEntityRuleAction")
public class RoleAddEntityRuleAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9120789797018893831L;
	private String role_code;
	private String role_name;
	private List<InfoRole>  roles;
	private RoleService   rs;
	//private 
	
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
	public void setRole_code(String roleCode) {
		role_code = roleCode;
	}
	public void setRole_name(String roleName) {
		role_name = roleName;
	}
	
}
