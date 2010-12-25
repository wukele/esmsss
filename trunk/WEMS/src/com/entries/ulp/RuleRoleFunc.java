package com.entries.ulp;

/**
 * RuleRoleFunc entity. @author MyEclipse Persistence Tools
 */

public class RuleRoleFunc implements java.io.Serializable {

	// Fields

	private Integer entityId;
	private String roleCode;
	private String entityType;
	private String entityCode;

	// Constructors

	/** default constructor */
	public RuleRoleFunc() {
	}

	/** full constructor */
	public RuleRoleFunc(Integer entityId, String roleCode, String entityType,
			String entityCode) {
		this.entityId = entityId;
		this.roleCode = roleCode;
		this.entityType = entityType;
		this.entityCode = entityCode;
	}

	// Property accessors

	public Integer getEntityId() {
		return this.entityId;
	}

	public void setEntityId(Integer entityId) {
		this.entityId = entityId;
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

	public String getEntityCode() {
		return this.entityCode;
	}

	public void setEntityCode(String entityCode) {
		this.entityCode = entityCode;
	}

}