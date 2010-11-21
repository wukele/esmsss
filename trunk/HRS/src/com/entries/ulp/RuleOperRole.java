package com.entries.ulp;

/**
 * RuleOperRole entity. @author MyEclipse Persistence Tools
 */

public class RuleOperRole implements java.io.Serializable {

	// Fields

	private Integer rid;
	private String operNo;
	private String roleCode;

	// Constructors

	/** default constructor */
	public RuleOperRole() {
	}

	/** full constructor */
	public RuleOperRole(Integer rid, String operNo, String roleCode) {
		this.rid = rid;
		this.operNo = operNo;
		this.roleCode = roleCode;
	}

	// Property accessors

	public Integer getRid() {
		return this.rid;
	}

	public void setRid(Integer rid) {
		this.rid = rid;
	}

	public String getOperNo() {
		return this.operNo;
	}

	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}

	public String getRoleCode() {
		return this.roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

}