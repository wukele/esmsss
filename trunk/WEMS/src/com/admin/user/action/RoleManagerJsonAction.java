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
	 * ��ӽ�ɫ
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
		returnMsg="��ӽ�ɫ�ɹ�";
		return SUCCESS;
	}

	/**
	 * ɾ����ɫ
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
		returnMsg="ɾ���ɹ�";
		return SUCCESS;
	}

	/**
	 * �޸Ľ�ɫ
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
		returnMsg="�޸Ľ�ɫ�ɹ�";
		return SUCCESS;
	}

	/**
	 * ��Ч����ɫ
	 * 
	 * @return
	 * @throws Exception
	 */
	public String invalidateRole() throws Exception {
		try {
			roleService.invaildateRoles(aRoleCode);
		} catch (RuntimeException e) {
			returnNo=1;
			returnMsg="��Ч����ɫʧ��:"+e.getMessage();
		}
		
		returnNo=0;
		returnMsg="��Ч����ɫ�ɹ�";
		return SUCCESS;
	}

	/**
	 * ��ѯ��ɫ
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
