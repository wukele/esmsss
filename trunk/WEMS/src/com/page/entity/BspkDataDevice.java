package com.page.entity;

/**
 * BspkDataDevice entity. @author MyEclipse Persistence Tools
 */

public class BspkDataDevice implements java.io.Serializable {

	// Fields

	private Integer ruleId;
	private String valueId;
	private String valueName;
	private String deviceNumber;
	private String deviceValueId;

	// Constructors

	/** default constructor */
	public BspkDataDevice() {
	}

	/** minimal constructor */
	public BspkDataDevice(String valueId, String deviceValueId) {
		this.valueId = valueId;
		this.deviceValueId = deviceValueId;
	}

	/** full constructor */
	public BspkDataDevice(String valueId, String valueName,
			String deviceNumber, String deviceValueId) {
		this.valueId = valueId;
		this.valueName = valueName;
		this.deviceNumber = deviceNumber;
		this.deviceValueId = deviceValueId;
	}

	// Property accessors

	public Integer getRuleId() {
		return this.ruleId;
	}

	public void setRuleId(Integer ruleId) {
		this.ruleId = ruleId;
	}

	public String getValueId() {
		return this.valueId;
	}

	public void setValueId(String valueId) {
		this.valueId = valueId;
	}

	public String getValueName() {
		return this.valueName;
	}

	public void setValueName(String valueName) {
		this.valueName = valueName;
	}

	public String getDeviceNumber() {
		return this.deviceNumber;
	}

	public void setDeviceNumber(String deviceNumber) {
		this.deviceNumber = deviceNumber;
	}

	public String getDeviceValueId() {
		return this.deviceValueId;
	}

	public void setDeviceValueId(String deviceValueId) {
		this.deviceValueId = deviceValueId;
	}

}