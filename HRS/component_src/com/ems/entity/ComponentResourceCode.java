package com.ems.entity;

/**
 * ComponentResourceCode entity. @author MyEclipse Persistence Tools
 */

public class ComponentResourceCode implements java.io.Serializable {

	// Fields

	private Integer componentResourceSn;
	private String resourceType;
	private String scriptUrl;
	private Integer needScript;
	private String componentResourceId;

	// Constructors

	/** default constructor */
	public ComponentResourceCode() {
	}

	/** minimal constructor */
	public ComponentResourceCode(Integer componentResourceSn,
			Integer needScript, String componentResourceId) {
		this.componentResourceSn = componentResourceSn;
		this.needScript = needScript;
		this.componentResourceId = componentResourceId;
	}

	/** full constructor */
	public ComponentResourceCode(Integer componentResourceSn,
			String resourceType, String scriptUrl, Integer needScript,
			String componentResourceId) {
		this.componentResourceSn = componentResourceSn;
		this.resourceType = resourceType;
		this.scriptUrl = scriptUrl;
		this.needScript = needScript;
		this.componentResourceId = componentResourceId;
	}

	// Property accessors

	public Integer getComponentResourceSn() {
		return this.componentResourceSn;
	}

	public void setComponentResourceSn(Integer componentResourceSn) {
		this.componentResourceSn = componentResourceSn;
	}

	public String getResourceType() {
		return this.resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	public String getScriptUrl() {
		return this.scriptUrl;
	}

	public void setScriptUrl(String scriptUrl) {
		this.scriptUrl = scriptUrl;
	}

	public Integer getNeedScript() {
		return this.needScript;
	}

	public void setNeedScript(Integer needScript) {
		this.needScript = needScript;
	}

	public String getComponentResourceId() {
		return this.componentResourceId;
	}

	public void setComponentResourceId(String componentResourceId) {
		this.componentResourceId = componentResourceId;
	}

}