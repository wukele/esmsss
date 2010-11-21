package com.ems.entity;

/**
 * CodeComponent entity. @author MyEclipse Persistence Tools
 */

public class CodeComponent implements java.io.Serializable {

	// Fields

	private Integer componentId;
	private String codeXtype;
	private String componentName;
	private String componentResourceId;
	private String fullType;

	// Constructors

	/** default constructor */
	public CodeComponent() {
	}

	/** minimal constructor */
	public CodeComponent(Integer componentId, String codeXtype) {
		this.componentId = componentId;
		this.codeXtype = codeXtype;
	}

	/** full constructor */
	public CodeComponent(Integer componentId, String codeXtype,
			String componentName, String componentResourceId, String fullType) {
		this.componentId = componentId;
		this.codeXtype = codeXtype;
		this.componentName = componentName;
		this.componentResourceId = componentResourceId;
		this.fullType = fullType;
	}

	// Property accessors

	public Integer getComponentId() {
		return this.componentId;
	}

	public void setComponentId(Integer componentId) {
		this.componentId = componentId;
	}

	public String getCodeXtype() {
		return this.codeXtype;
	}

	public void setCodeXtype(String codeXtype) {
		this.codeXtype = codeXtype;
	}

	public String getComponentName() {
		return this.componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}

	public String getComponentResourceId() {
		return this.componentResourceId;
	}

	public void setComponentResourceId(String componentResourceId) {
		this.componentResourceId = componentResourceId;
	}

	public String getFullType() {
		return this.fullType;
	}

	public void setFullType(String fullType) {
		this.fullType = fullType;
	}

}