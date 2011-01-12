package com.entries.ulp;

/**
 * InfoDept entity. @author MyEclipse Persistence Tools
 */

public class IntermedialData implements java.io.Serializable {

	// Fields

	private String operNo;
	private String operName;
	private String roleCode;
	private String roleName;
	private String roleCodes;
	private String roleNames;
	

	// Constructors

	/** default constructor */
	public IntermedialData() {
	}

	

	/** full constructor */
	public IntermedialData(String operNo, String operName, String roleCode,
			String roleName,String roleCodes,String roleNames) {
		this.operNo = operNo;
		this.operName = operName;
		this.roleCode = roleCode;
		this.roleName = roleName;
		this.roleCode=roleCodes;
		this.roleNames=roleNames;
	}

	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}

	public String getOperNo() {
		return operNo;
	}

	public void setOperName(String operName) {
		this.operName = operName;
	}

	public String getOperName() {
		return operName;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleName() {
		return roleName;
	}



	public void setRoleCodes(String roleCodes) {
		this.roleCodes = roleCodes;
	}



	public String getRoleCodes() {
		return roleCodes;
	}



	public void setRoleNames(String roleNames) {
		this.roleNames = roleNames;
	}



	public String getRoleNames() {
		return roleNames;
	}


}