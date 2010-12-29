package com.admin.user.action;

import java.util.List;

import com.entries.ulp.InfoRole;
import com.opensymphony.xwork2.ActionSupport;

public class RoleManagerJsonAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3068419661354922305L;

	private InfoRole role;
	private List<InfoRole> lstRole;
	private int errorNo;
	private String errorMsg;

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
		return SUCCESS;
	}

	/**
	 * 删除角色
	 * 
	 * @return
	 * @throws Exception
	 */
	public String removeRole() throws Exception {
		return SUCCESS;
	}

	/**
	 * 修改角色
	 * 
	 * @return
	 * @throws Exception
	 */
	public String modifyRole() throws Exception {
		return SUCCESS;
	}

	/**
	 * 无效化角色
	 * 
	 * @return
	 * @throws Exception
	 */
	public String invalidateRole() throws Exception {
		return SUCCESS;
	}

	public InfoRole getRole() {
		return role;
	}

	public List<InfoRole> getLstRole() {
		return lstRole;
	}

	public int getErrorNo() {
		return errorNo;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setRole(InfoRole role) {
		this.role = role;
	}

	public void setLstRole(List<InfoRole> lstRole) {
		this.lstRole = lstRole;
	}

	public void setErrorNo(int errorNo) {
		this.errorNo = errorNo;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

}
