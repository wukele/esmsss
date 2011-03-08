package com.alarm.entity;

/**
 * AlarmLevelSetup entity. @author MyEclipse Persistence Tools
 */

public class AlarmLevelSetup implements java.io.Serializable {

	// Fields

	private Integer alarmLevelId;
	private Integer deviceVariableId;
	private Double effectRangeMinimumValue;
	private Double effectRangeMaximumValue;
	private Short correspondAlarmLevel;
	private String name;

	// Constructors

	/** default constructor */
	public AlarmLevelSetup() {
	}

	/** minimal constructor */
	public AlarmLevelSetup(Integer deviceVariableId,
			Double effectRangeMinimumValue, Double effectRangeMaximumValue,
			Short correspondAlarmLevel) {
		this.deviceVariableId = deviceVariableId;
		this.effectRangeMinimumValue = effectRangeMinimumValue;
		this.effectRangeMaximumValue = effectRangeMaximumValue;
		this.correspondAlarmLevel = correspondAlarmLevel;
	}

	/** full constructor */
	public AlarmLevelSetup(Integer deviceVariableId,
			Double effectRangeMinimumValue, Double effectRangeMaximumValue,
			Short correspondAlarmLevel, String name) {
		this.deviceVariableId = deviceVariableId;
		this.effectRangeMinimumValue = effectRangeMinimumValue;
		this.effectRangeMaximumValue = effectRangeMaximumValue;
		this.correspondAlarmLevel = correspondAlarmLevel;
		this.name = name;
	}

	// Property accessors

	public Integer getAlarmLevelId() {
		return this.alarmLevelId;
	}

	public void setAlarmLevelId(Integer alarmLevelId) {
		this.alarmLevelId = alarmLevelId;
	}

	public Integer getDeviceVariableId() {
		return this.deviceVariableId;
	}

	public void setDeviceVariableId(Integer deviceVariableId) {
		this.deviceVariableId = deviceVariableId;
	}

	public Double getEffectRangeMinimumValue() {
		return this.effectRangeMinimumValue;
	}

	public void setEffectRangeMinimumValue(Double effectRangeMinimumValue) {
		this.effectRangeMinimumValue = effectRangeMinimumValue;
	}

	public Double getEffectRangeMaximumValue() {
		return this.effectRangeMaximumValue;
	}

	public void setEffectRangeMaximumValue(Double effectRangeMaximumValue) {
		this.effectRangeMaximumValue = effectRangeMaximumValue;
	}

	public Short getCorrespondAlarmLevel() {
		return this.correspondAlarmLevel;
	}

	public void setCorrespondAlarmLevel(Short correspondAlarmLevel) {
		this.correspondAlarmLevel = correspondAlarmLevel;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

}