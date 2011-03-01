package com.admin.page.struct;

import java.io.Serializable;

public class PageResourceDataRuleStruct implements Serializable {
	private Integer resourceId;
	private String pageResource;
	private String componentName;
	private String valueId;
	private String variableName;
	private Integer deviceId;
	private String deviceName;
	private String deviceType;
	
	public  PageResourceDataRuleStruct(
			Integer resourceId,
			 String pageResource,
			 String componentName,
			 String valueId,
			 String variableName,
			 Integer deviceId,
			 String deviceName,
			 String deviceType){
		 this.resourceId				=	        resourceId		  ;
		 this.pageResource      =         pageResource    ;
		 this.componentName     =         componentName   ;
		 this.valueId           =         valueId         ;
		 this.variableName      =         variableName    ;
		 this.deviceId          =         deviceId        ;
		 this.deviceName        =         deviceName      ;
		 this.deviceType        =         deviceType      ;	
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
	public String getVariableName() {
		return variableName;
	}
	public void setVariableName(String variableName) {
		this.variableName = variableName;
	}
	public Integer getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getDeviceType() {
		return deviceType;
	}
	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
	
	
}
