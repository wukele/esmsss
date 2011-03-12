package com.admin.user.action;

import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONSerializer;

import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.user.service.RoleService;
import com.entries.ulp.InfoRole;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Component("RoleManagerJsonAction")
@Scope("prototype")
public class RoleManagerJsonAction extends ActionSupport implements ServletResponseAware {

	private InfoRole role;
	private List<InfoRole> lstRole;
	private List<String> lstRoleCode;
	private Integer roleCount=0; 
	
	private int returnNo = 0;
	private String returnMsg;
	private RoleService roleService;
	private String roleTreeData;
	private HttpServletResponse response;
	
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
		if (role == null)
			throw new RuntimeException("role entity is null");
		try {
			roleService.addRole(role);
		} catch (RuntimeException e) {
			returnNo = 1;
			returnMsg = e.getMessage();
			throw e;
		}
		returnNo = 0;
		returnMsg = "��ӽ�ɫ�ɹ�";
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
			String[] aRoleCode=new String[lstRoleCode.size()];
			for(int i=0;i<lstRoleCode.size();i++)
				aRoleCode[i]=(String) lstRoleCode.get(i);
			roleService.removeRoles(aRoleCode);
		} catch (RuntimeException e) {
			returnNo = 1;
			returnMsg = e.getMessage();
			throw e;
		}
		returnNo = 0;
		returnMsg = "ɾ���ɹ�";
		return SUCCESS;
	}

	/**
	 * �޸Ľ�ɫ
	 * 
	 * @return
	 * @throws Exception
	 */
	public String modifyRole() throws Exception {
		if (role == null)
			throw new RuntimeException("role is null");
		try {
			roleService.modifyRole(role);
		} catch (RuntimeException e) {
			returnNo = 1;
			returnMsg = e.getMessage();
			throw e;
		}
		returnNo = 0;
		returnMsg = "�޸Ľ�ɫ�ɹ�";
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
			String[] aRoleCode=new String[lstRoleCode.size()];
			for(int i=0;i<lstRoleCode.size();i++)
				aRoleCode[i]=(String) lstRoleCode.get(i);
			roleService.invaildateRoles(aRoleCode);
		} catch (RuntimeException e) {
			returnNo = 1;
			returnMsg = "��Ч����ɫʧ��:" + e.getMessage();
			throw e;
		}

		returnNo = 0;
		returnMsg = "��Ч����ɫ�ɹ�";
		return SUCCESS;
	}

	/**
	 * ��Ч����ɫ
	 * @return
	 * @throws Exception
	 */
	public String validateRole() throws Exception {
		try {
			String[] aRoleCode=new String[lstRoleCode.size()];
			for(int i=0;i<lstRoleCode.size();i++)
				aRoleCode[i]=(String) lstRoleCode.get(i);
			roleService.vaildateRoles(aRoleCode);
		} catch (RuntimeException e) {
			returnNo = 1;
			returnMsg = "��Ч����ɫʧ��:" + e.getMessage();
			throw e;
		}

		returnNo = 0;
		returnMsg = "��Ч����ɫ�ɹ�";
		return SUCCESS;
	}
	/**
	 * ��ѯ��ɫ
	 * 
	 * @return
	 * @throws Exception
	 */
	public String qryRole() throws Exception {
		if (role == null)
			role = new InfoRole();
		lstRole = roleService.findRoles(role.getRoleCode(), role.getRoleName(),
				role.getRoleLevel(), role.getIsactive(), role.getRoleType(),
				role.getComments());
		if(lstRole!=null)
			roleCount=lstRole.size();
		
		return SUCCESS;
	}

	public String getRoleTreeData() {
		return roleTreeData;
	}

	public void setRoleTreeData(String roleTreeData) {
		this.roleTreeData = roleTreeData;
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

	@Resource(name = "RoleService")
	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
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

	public Integer getRoleCount() {
		return roleCount;
	}

	public void setRoleCount(Integer roleCount) {
		this.roleCount = roleCount;
	}

	public List<String> getLstRoleCode() {
		return lstRoleCode;
	}

	public void setLstRoleCode(List<String> lstRoleCode) {
		this.lstRoleCode = lstRoleCode;
	}

	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		this.response=arg0;
	}

}
