package com.ems.entity;

/**
 * InfoPageResource entity. @author MyEclipse Persistence Tools
 */

public class InfoPageResource implements java.io.Serializable {

	// Fields

	private Integer resourceId;
	private String pageResource;
	private String xtypeCode;
	private Integer resourceTop;
	private Integer resourceLeft;
	private Integer resourceWidth;
	private Integer resourceHeight;
	private String valueId;
	private String config;
	private String baseCls;

	// Constructors

	/** default constructor */
	public InfoPageResource() {
	}

	/** minimal constructor */
	public InfoPageResource(Integer resourceId) {
		this.resourceId = resourceId;
	}

	/** full constructor */
	public InfoPageResource(Integer resourceId, String pageResource,
			String xtypeCode, Integer resourceTop, Integer resourceLeft,
			Integer resourceWidth, Integer resourceHeight, String valueId,
			String config, String baseCls) {
		this.resourceId = resourceId;
		this.pageResource = pageResource;
		this.xtypeCode = xtypeCode;
		this.resourceTop = resourceTop;
		this.resourceLeft = resourceLeft;
		this.resourceWidth = resourceWidth;
		this.resourceHeight = resourceHeight;
		this.valueId = valueId;
		this.config = config;
		this.baseCls = baseCls;
	}

	// Property accessors

	public Integer getResourceId() {
		return this.resourceId;
	}

	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}

	public String getPageResource() {
		return this.pageResource;
	}

	public void setPageResource(String pageResource) {
		this.pageResource = pageResource;
	}

	public String getXtypeCode() {
		return this.xtypeCode;
	}

	public void setXtypeCode(String xtypeCode) {
		this.xtypeCode = xtypeCode;
	}

	public Integer getResourceTop() {
		return this.resourceTop;
	}

	public void setResourceTop(Integer resourceTop) {
		this.resourceTop = resourceTop;
	}

	public Integer getResourceLeft() {
		return this.resourceLeft;
	}

	public void setResourceLeft(Integer resourceLeft) {
		this.resourceLeft = resourceLeft;
	}

	public Integer getResourceWidth() {
		return this.resourceWidth;
	}

	public void setResourceWidth(Integer resourceWidth) {
		this.resourceWidth = resourceWidth;
	}

	public Integer getResourceHeight() {
		return this.resourceHeight;
	}

	public void setResourceHeight(Integer resourceHeight) {
		this.resourceHeight = resourceHeight;
	}

	public String getValueId() {
		return this.valueId;
	}

	public void setValueId(String valueId) {
		this.valueId = valueId;
	}

	public String getConfig() {
		return this.config;
	}

	public void setConfig(String config) {
		this.config = config;
	}

	public String getBaseCls() {
		return this.baseCls;
	}

	public void setBaseCls(String baseCls) {
		this.baseCls = baseCls;
	}

}