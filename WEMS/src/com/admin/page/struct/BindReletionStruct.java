package com.admin.page.struct;

import java.io.Serializable;

public class BindReletionStruct implements Serializable {
			private   String   deviceName;
			private   String   deviceType;
			private   String   xtypeCode;
			private   Integer  resourceId;
			private   String   valueId;
			private   String  variableName;
			
			public  BindReletionStruct(  String   deviceName,
					  String   deviceType,
					  String   xtypeCode,
					  Integer  resourceId,
					  String   valueId,
					  String   variableName){
				  this.deviceName      =     deviceName;
				  this.deviceType      =     deviceType;
				  this.xtypeCode       =     xtypeCode ;
				  this.resourceId      =     resourceId;
				  this.valueId         =     valueId   ;
				  this.variableName =variableName;
			}

			public String getVariableName() {
				return variableName;
			}

			public void setVariableName(String variableName) {
				this.variableName = variableName;
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

			public String getXtypeCode() {
				return xtypeCode;
			}

			public void setXtypeCode(String xtypeCode) {
				this.xtypeCode = xtypeCode;
			}

			public Integer getResourceId() {
				return resourceId;
			}

			public void setResourceId(Integer resourceId) {
				this.resourceId = resourceId;
			}

			public String getValueId() {
				return valueId;
			}

			public void setValueId(String valueId) {
				this.valueId = valueId;
			}
}
