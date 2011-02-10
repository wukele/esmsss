package com.ems.entity;

/**
 * DeviceVariable entity. @author MyEclipse Persistence Tools
 */

public class DeviceVariable implements java.io.Serializable {

	// Fields

	private Integer deviceVariableId;
	private Integer deviceId;
	private Integer variableTypeId;
	private String variableName;
	private String variableDescribe;
	private String readWriteAuthority;
	private Integer readWayCodeTypeId;
	private String readWayCodeValue;
	private String variableAddressing;
	private String adjustedValue;
	private String offset;
	private String conversionCoefficient;
	private Integer variableAnalysisCodeTypeId;
	private String maximumValue;
	private String minimumValue;
	private Integer collectFrequency;
	private Short isSaveLog;
	private Short actionFlag;

	// Constructors

	/** default constructor */
	public DeviceVariable() {
	}

	/** minimal constructor */
	public DeviceVariable(Integer deviceId, Integer variableTypeId,
			String variableName, String readWriteAuthority,
			Integer readWayCodeTypeId, String readWayCodeValue,
			String variableAddressing, String adjustedValue,
			Integer variableAnalysisCodeTypeId, Integer collectFrequency) {
		this.deviceId = deviceId;
		this.variableTypeId = variableTypeId;
		this.variableName = variableName;
		this.readWriteAuthority = readWriteAuthority;
		this.readWayCodeTypeId = readWayCodeTypeId;
		this.readWayCodeValue = readWayCodeValue;
		this.variableAddressing = variableAddressing;
		this.adjustedValue = adjustedValue;
		this.variableAnalysisCodeTypeId = variableAnalysisCodeTypeId;
		this.collectFrequency = collectFrequency;
	}

	/** full constructor */
	public DeviceVariable(Integer deviceId, Integer variableTypeId,
			String variableName, String variableDescribe,
			String readWriteAuthority, Integer readWayCodeTypeId,
			String readWayCodeValue, String variableAddressing,
			String adjustedValue, String offset, String conversionCoefficient,
			Integer variableAnalysisCodeTypeId, String maximumValue,
			String minimumValue, Integer collectFrequency, Short isSaveLog,
			Short actionFlag) {
		this.deviceId = deviceId;
		this.variableTypeId = variableTypeId;
		this.variableName = variableName;
		this.variableDescribe = variableDescribe;
		this.readWriteAuthority = readWriteAuthority;
		this.readWayCodeTypeId = readWayCodeTypeId;
		this.readWayCodeValue = readWayCodeValue;
		this.variableAddressing = variableAddressing;
		this.adjustedValue = adjustedValue;
		this.offset = offset;
		this.conversionCoefficient = conversionCoefficient;
		this.variableAnalysisCodeTypeId = variableAnalysisCodeTypeId;
		this.maximumValue = maximumValue;
		this.minimumValue = minimumValue;
		this.collectFrequency = collectFrequency;
		this.isSaveLog = isSaveLog;
		this.actionFlag = actionFlag;
	}

	// Property accessors

	public Integer getDeviceVariableId() {
		return this.deviceVariableId;
	}

	public void setDeviceVariableId(Integer deviceVariableId) {
		this.deviceVariableId = deviceVariableId;
	}

	public Integer getDeviceId() {
		return this.deviceId;
	}

	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}

	public Integer getVariableTypeId() {
		return this.variableTypeId;
	}

	public void setVariableTypeId(Integer variableTypeId) {
		this.variableTypeId = variableTypeId;
	}

	public String getVariableName() {
		return this.variableName;
	}

	public void setVariableName(String variableName) {
		this.variableName = variableName;
	}

	public String getVariableDescribe() {
		return this.variableDescribe;
	}

	public void setVariableDescribe(String variableDescribe) {
		this.variableDescribe = variableDescribe;
	}

	public String getReadWriteAuthority() {
		return this.readWriteAuthority;
	}

	public void setReadWriteAuthority(String readWriteAuthority) {
		this.readWriteAuthority = readWriteAuthority;
	}

	public Integer getReadWayCodeTypeId() {
		return this.readWayCodeTypeId;
	}

	public void setReadWayCodeTypeId(Integer readWayCodeTypeId) {
		this.readWayCodeTypeId = readWayCodeTypeId;
	}

	public String getReadWayCodeValue() {
		return this.readWayCodeValue;
	}

	public void setReadWayCodeValue(String readWayCodeValue) {
		this.readWayCodeValue = readWayCodeValue;
	}

	public String getVariableAddressing() {
		return this.variableAddressing;
	}

	public void setVariableAddressing(String variableAddressing) {
		this.variableAddressing = variableAddressing;
	}

	public String getAdjustedValue() {
		return this.adjustedValue;
	}

	public void setAdjustedValue(String adjustedValue) {
		this.adjustedValue = adjustedValue;
	}

	public String getOffset() {
		return this.offset;
	}

	public void setOffset(String offset) {
		this.offset = offset;
	}

	public String getConversionCoefficient() {
		return this.conversionCoefficient;
	}

	public void setConversionCoefficient(String conversionCoefficient) {
		this.conversionCoefficient = conversionCoefficient;
	}

	public Integer getVariableAnalysisCodeTypeId() {
		return this.variableAnalysisCodeTypeId;
	}

	public void setVariableAnalysisCodeTypeId(Integer variableAnalysisCodeTypeId) {
		this.variableAnalysisCodeTypeId = variableAnalysisCodeTypeId;
	}

	public String getMaximumValue() {
		return this.maximumValue;
	}

	public void setMaximumValue(String maximumValue) {
		this.maximumValue = maximumValue;
	}

	public String getMinimumValue() {
		return this.minimumValue;
	}

	public void setMinimumValue(String minimumValue) {
		this.minimumValue = minimumValue;
	}

	public Integer getCollectFrequency() {
		return this.collectFrequency;
	}

	public void setCollectFrequency(Integer collectFrequency) {
		this.collectFrequency = collectFrequency;
	}

	public Short getIsSaveLog() {
		return this.isSaveLog;
	}

	public void setIsSaveLog(Short isSaveLog) {
		this.isSaveLog = isSaveLog;
	}

	public Short getActionFlag() {
		return this.actionFlag;
	}

	public void setActionFlag(Short actionFlag) {
		this.actionFlag = actionFlag;
	}

}