package com.alarm.entity;

/**
 * AlarmPolicyEffectAreaId entity. @author MyEclipse Persistence Tools
 */

public class AlarmPolicyEffectAreaId implements java.io.Serializable {

	// Fields

	private Integer areaId;
	private Integer alarmPolicyId;
	private Integer deviceVariableId;

	// Constructors

	/** default constructor */
	public AlarmPolicyEffectAreaId() {
	}

	/** full constructor */
	public AlarmPolicyEffectAreaId(Integer areaId, Integer alarmPolicyId,
			Integer deviceVariableId) {
		this.areaId = areaId;
		this.alarmPolicyId = alarmPolicyId;
		this.deviceVariableId = deviceVariableId;
	}

	// Property accessors

	public Integer getAreaId() {
		return this.areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	public Integer getAlarmPolicyId() {
		return this.alarmPolicyId;
	}

	public void setAlarmPolicyId(Integer alarmPolicyId) {
		this.alarmPolicyId = alarmPolicyId;
	}

	public Integer getDeviceVariableId() {
		return this.deviceVariableId;
	}

	public void setDeviceVariableId(Integer deviceVariableId) {
		this.deviceVariableId = deviceVariableId;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof AlarmPolicyEffectAreaId))
			return false;
		AlarmPolicyEffectAreaId castOther = (AlarmPolicyEffectAreaId) other;

		return ((this.getAreaId() == castOther.getAreaId()) || (this
				.getAreaId() != null
				&& castOther.getAreaId() != null && this.getAreaId().equals(
				castOther.getAreaId())))
				&& ((this.getAlarmPolicyId() == castOther.getAlarmPolicyId()) || (this
						.getAlarmPolicyId() != null
						&& castOther.getAlarmPolicyId() != null && this
						.getAlarmPolicyId()
						.equals(castOther.getAlarmPolicyId())))
				&& ((this.getDeviceVariableId() == castOther
						.getDeviceVariableId()) || (this.getDeviceVariableId() != null
						&& castOther.getDeviceVariableId() != null && this
						.getDeviceVariableId().equals(
								castOther.getDeviceVariableId())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getAreaId() == null ? 0 : this.getAreaId().hashCode());
		result = 37
				* result
				+ (getAlarmPolicyId() == null ? 0 : this.getAlarmPolicyId()
						.hashCode());
		result = 37
				* result
				+ (getDeviceVariableId() == null ? 0 : this
						.getDeviceVariableId().hashCode());
		return result;
	}

}