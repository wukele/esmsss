package com.admin.page.struct;

import java.io.Serializable;

public class PageResourceStruct implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7735944951516380173L;
	
	
	public  PageResourceStruct(){
		
	}
	
	public  PageResourceStruct( Integer resourceId,
			 String pageResource,
			 String xtypeCode,
			 String resourceName,
			 Integer resourceTop,
			 Integer resourceLeft,
			 Integer resourceWidth,
			 Integer resourceHeight,
			 String valueId,
			 String config,
			 String baseCls) {
		this.pageResource = pageResource;
		this.xtypeCode = xtypeCode;
		this.resourceTop = resourceTop;
		this.resourceLeft = resourceLeft;
		this.resourceWidth = resourceWidth;
		this.resourceHeight = resourceHeight;
		this.valueId = valueId;
		this.config = config;
		this.baseCls = baseCls;
		this.resourceName=resourceName;
		this.resourceId = resourceId;
	}
	
	
	public Integer getResourceId() {
		return resourceId;
	}

	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}

	public String getPageResource() {
		return pageResource;
	}

	public void setPageResource(String pageResource) {
		this.pageResource = pageResource;
	}

	public String getXtypeCode() {
		return xtypeCode;
	}

	public void setXtypeCode(String xtypeCode) {
		this.xtypeCode = xtypeCode;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public Integer getResourceTop() {
		return resourceTop;
	}

	public void setResourceTop(Integer resourceTop) {
		this.resourceTop = resourceTop;
	}

	public Integer getResourceLeft() {
		return resourceLeft;
	}

	public void setResourceLeft(Integer resourceLeft) {
		this.resourceLeft = resourceLeft;
	}

	public Integer getResourceWidth() {
		return resourceWidth;
	}

	public void setResourceWidth(Integer resourceWidth) {
		this.resourceWidth = resourceWidth;
	}

	public Integer getResourceHeight() {
		return resourceHeight;
	}

	public void setResourceHeight(Integer resourceHeight) {
		this.resourceHeight = resourceHeight;
	}

	public String getValueId() {
		return valueId;
	}

	public void setValueId(String valueId) {
		this.valueId = valueId;
	}

	public String getConfig() {
		return config;
	}

	public void setConfig(String config) {
		this.config = config;
	}

	public String getBaseCls() {
		return baseCls;
	}

	public void setBaseCls(String baseCls) {
		this.baseCls = baseCls;
	}


	private Integer resourceId;
	private String pageResource;
	private String xtypeCode;
	private String resourceName;
	private Integer resourceTop;
	private Integer resourceLeft;
	private Integer resourceWidth;
	private Integer resourceHeight;
	private String valueId;
	private String config;
	private String baseCls;

}
