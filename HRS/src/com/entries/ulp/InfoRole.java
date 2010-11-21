package com.entries.ulp;

/**
 * InfoRole entity. @author MyEclipse Persistence Tools
 */

public class InfoRole implements java.io.Serializable {

	// Fields

	private String roleCode;
	private String regionId;
	private String roleLevel;
	private String localNet;
	private String comments;
	private String roleName;
	private String operNo;
	private Integer isactive;
	private String resChar;
	private String sysType;
	private String roleType;
	private String belongType;
	private String deptNo;

	// Constructors

	/** default constructor */
	public InfoRole() {
	}

	/** minimal constructor */
	public InfoRole(String roleCode, String regionId, String roleLevel,
			String operNo, Integer isactive) {
		this.roleCode = roleCode;
		this.regionId = regionId;
		this.roleLevel = roleLevel;
		this.operNo = operNo;
		this.isactive = isactive;
	}

	/** full constructor */
	public InfoRole(String roleCode, String regionId, String roleLevel,
			String localNet, String comments, String roleName, String operNo,
			Integer isactive, String resChar, String sysType, String roleType,
			String belongType, String deptNo) {
		this.roleCode = roleCode;
		this.regionId = regionId;
		this.roleLevel = roleLevel;
		this.localNet = localNet;
		this.comments = comments;
		this.roleName = roleName;
		this.operNo = operNo;
		this.isactive = isactive;
		this.resChar = resChar;
		this.sysType = sysType;
		this.roleType = roleType;
		this.belongType = belongType;
		this.deptNo = deptNo;
	}

	// Property accessors

	public String getRoleCode() {
		return this.roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRegionId() {
		return this.regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	public String getRoleLevel() {
		return this.roleLevel;
	}

	public void setRoleLevel(String roleLevel) {
		this.roleLevel = roleLevel;
	}

	public String getLocalNet() {
		return this.localNet;
	}

	public void setLocalNet(String localNet) {
		this.localNet = localNet;
	}

	public String getComments() {
		return this.comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getOperNo() {
		return this.operNo;
	}

	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}

	public Integer getIsactive() {
		return this.isactive;
	}

	public void setIsactive(Integer isactive) {
		this.isactive = isactive;
	}

	public String getResChar() {
		return this.resChar;
	}

	public void setResChar(String resChar) {
		this.resChar = resChar;
	}

	public String getSysType() {
		return this.sysType;
	}

	public void setSysType(String sysType) {
		this.sysType = sysType;
	}

	public String getRoleType() {
		return this.roleType;
	}

	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	public String getBelongType() {
		return this.belongType;
	}

	public void setBelongType(String belongType) {
		this.belongType = belongType;
	}

	public String getDeptNo() {
		return this.deptNo;
	}

	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}

}