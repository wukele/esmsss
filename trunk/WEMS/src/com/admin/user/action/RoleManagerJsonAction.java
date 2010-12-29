package com.admin.user.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.user.service.RoleService;
import com.entries.ulp.InfoRole;
import com.opensymphony.xwork2.ActionSupport;


@SuppressWarnings("serial")
@Component("RoleManagerJsonAction")
@Scope("prototype")
public class RoleManagerJsonAction extends ActionSupport {

	private InfoRole role;
	private List<InfoRole> lstRole;
	private String[] aRoleCode;
	
	private int returnNo=0;
	private String returnMsg;
	private RoleService roleService;
	public RoleManagerJsonAction() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 添加角色
	 * 
	 * @return
	 * @throws Exception
	 * 
	 */
	public String addRole() throws Exception {
		if(role==null)
			throw new RuntimeException("role entity is null");
		try{
			roleService.addRole(role);
		}catch (RuntimeException e) {
			returnNo=1;
			returnMsg=e.getMessage();
			throw e;
		}
		returnNo=0;
		returnMsg="添加角色成功";
		return SUCCESS;
	}

	/**
	 * 删除角色
	 * 
	 * @return
	 * @throws Exception
	 */
	public String removeRole() throws Exception {
		try {
			roleService.removeRoles(aRoleCode);
		} catch (RuntimeException e) {
			returnNo=1;
			returnMsg=e.getMessage();
		}
		returnNo=0;
		returnMsg="删除成功";
		return SUCCESS;
	}

	/**
	 * 修改角色
	 * 
	 * @return
	 * @throws Exception
	 */
	public String modifyRole() throws Exception {
		if(role==null)
			throw new RuntimeException("role is null");
		try {
			roleService.modifyRole(role);
		} catch (RuntimeException e) {
			returnNo=1;
			returnMsg=e.getMessage();
		}
		returnNo=0;
		returnMsg="修改角色成功";
		return SUCCESS;
	}

	/**
	 * 无效化角色
	 * 
	 * @return
	 * @throws Exception
	 */
	public String invalidateRole() throws Exception {
		try {
			roleService.invaildateRoles(aRoleCode);
		} catch (RuntimeException e) {
			returnNo=1;
			returnMsg="无效化角色失败:"+e.getMessage();
		}
		
		returnNo=0;
		returnMsg="无效化角色成功";
		return SUCCESS;
	}

	/**
	 * 查询角色
	 * @return
	 * @throws Exception
	 */
	public String qryRole() throws Exception{
		if(role==null)
			role=new InfoRole();
		
		return SUCCESS;
	}
	public InfoRole getRole() {
		return role;
	}

	public List<InfoRole> getLstRole() {
		return lstRole;
	}


	public void setRole(InfoRole role) {
		this.role = role;
	}

	public void setLstRole(List<InfoRole> lstRole) {
		this.lstRole = lstRole;
	}

	public RoleService getRoleService() {
		return roleService;
	}
	
	@Resource(name="RoleService")
	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	public String[] getaRoleCode() {
		return aRoleCode;
	}

	public void setaRoleCode(String[] aRoleCode) {
		this.aRoleCode = aRoleCode;
	}

	public int getReturnNo() {
		return returnNo;
	}

	public String getReturnMsg() {
		return returnMsg;
	}

	public void setReturnNo(int returnNo) {
		this.returnNo = returnNo;
	}

	public void setReturnMsg(String returnMsg) {
		this.returnMsg = returnMsg;
	}

}
