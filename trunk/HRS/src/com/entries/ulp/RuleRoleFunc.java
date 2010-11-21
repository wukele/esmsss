package com.entries.ulp;

/**
 * RuleRoleFunc entity. @author MyEclipse Persistence Tools
 */

public class RuleRoleFunc implements java.io.Serializable {

	// Fields

	private String entityCode;
	private String roleCode;
	private String entityType;

	// Constructors

	/** default constructor */
	public RuleRoleFunc() {
	}

	/** full constructor */
	public RuleRoleFunc(String entityCode, String roleCode, String entityType) {
		this.entityCode = entityCode;
		this.roleCode = roleCode;
		this.entityType = entityType;
	}

	// Property accessors

	public String getEntityCode() {
		return this.entityCode;
	}

	public void setEntityCode(String entityCode) {
		this.entityCode = entityCode;
	}

	public String getRoleCode() {
		return this.roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getEntityType() {
		return this.entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

}