package com.admin.page.struct;

import java.io.Serializable;

public class PageResourceView implements Serializable {
	private String pageResource;
	private String xtypeCode;
	private String componentName;
	private String valueId;
	private Integer resourceLeft;
	private Integer resourceTop;
	
	public  PageResourceView(String pageResource,
			String xtypeCode,
			String componentName,
			String valueId,
			Integer resourceLeft,
			Integer resourceTop){
		  this.pageResource     =  pageResource  ;
		  this.xtypeCode        =  xtypeCode     ;
		  this.componentName    =  componentName ;
		  this.valueId          =  valueId       ;
		  this.resourceLeft     =  resourceLeft  ;
		  this.resourceTop      =  resourceTop  ;	
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
	public String getComponentName() {
		return componentName;
	}
	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}
	public String getValueId() {
		return valueId;
	}
	public void setValueId(String valueId) {
		this.valueId = valueId;
	}
	public Integer getResourceLeft() {
		return resourceLeft;
	}
	public void setResourceLeft(Integer resourceLeft) {
		this.resourceLeft = resourceLeft;
	}
	public Integer getResourceTop() {
		return resourceTop;
	}
	public void setResourceTop(Integer resourceTop) {
		this.resourceTop = resourceTop;
	}
	
	
}
