package com.admin.page.struct;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

public class RealTimeDeviceDataStruct implements Serializable {
	private Integer deviceId;
	private String deviceName;
	private String deviceType;
	private String deviceIp;
	private Integer collectTaskId;
	private String variableName;
	private String deviceVarId;
	private String varPhyValue;
	private String varLogicValue;
	private Date collectTime;
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
	public String getDeviceIp() {
		return deviceIp;
	}
	public void setDeviceIp(String deviceIp) {
		this.deviceIp = deviceIp;
	}
	public Integer getCollectTaskId() {
		return collectTaskId;
	}
	public void setCollectTaskId(Integer collectTaskId) {
		this.collectTaskId = collectTaskId;
	}
	public String getVariableName() {
		return variableName;
	}
	public void setVariableName(String variableName) {
		this.variableName = variableName;
	}
	public String getDeviceVarId() {
		return deviceVarId;
	}
	public void setDeviceVarId(String deviceVarId) {
		this.deviceVarId = deviceVarId;
	}
	public String getVarPhyValue() {
		return varPhyValue;
	}
	public void setVarPhyValue(String varPhyValue) {
		this.varPhyValue = varPhyValue;
	}
	public String getVarLogicValue() {
		return varLogicValue;
	}
	public void setVarLogicValue(String varLogicValue) {
		this.varLogicValue = varLogicValue;
	}
	public Date getCollectTime() {
		return collectTime;
	}
	public void setCollectTime(Timestamp collectTime) {
		this.collectTime = collectTime;
	}
	
	public  RealTimeDeviceDataStruct(
			Integer deviceId,     
			String deviceName,    
			String deviceType,    
			String deviceIp,      
			Integer collectTaskId,
			String variableName,  
			String deviceVarId,   
			String varPhyValue,   
			String varLogicValue, 
			Date collectTime
	){
		this.deviceId        =  		deviceId;      	
		this.deviceName      =      deviceName;     
		this.deviceType      =      deviceType;     
		this.deviceIp        =      deviceIp;       
		this.collectTaskId   =      collectTaskId;  
		this.variableName    =      variableName;   
		this.deviceVarId     =      deviceVarId;    
		this.varPhyValue     =      varPhyValue;    
		this.varLogicValue   =      varLogicValue;  
		this.collectTime     =      collectTime;    		
	}
	
}
