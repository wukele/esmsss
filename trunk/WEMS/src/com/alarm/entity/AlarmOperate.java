package com.alarm.entity;

import java.sql.Timestamp;
import java.util.Date;

/**
 * AlarmOperate entity. @author MyEclipse Persistence Tools
 */

public class AlarmOperate implements java.io.Serializable {

	// Fields

	private Integer alarmOperateId;
	private Integer alarmPolicyId;
	private Integer deviceVariableId;
	private Timestamp alarmTime;
	private Short alarmFormat;
	private String alarmSendAddress;
	private String alarmOperateResult;
	private String alarmAffirmPersonnel;
	private Date alarmAffirmTime;
	private Timestamp alarmRelieveTime;
	private Short alarmRelieveSendFormat;
	private String alarmRelieveSendAddress;
	private String alarmRelieveOperateResult;

	// Constructors

	/** default constructor */
	public AlarmOperate() {
	}

	/** full constructor */
	public AlarmOperate(Integer alarmPolicyId, Integer deviceVariableId,
			Timestamp alarmTime, Short alarmFormat, String alarmSendAddress,
			String alarmOperateResult, String alarmAffirmPersonnel,
			Timestamp alarmAffirmTime, Timestamp alarmRelieveTime,
			Short alarmRelieveSendFormat, String alarmRelieveSendAddress,
			String alarmRelieveOperateResult) {
		this.alarmPolicyId = alarmPolicyId;
		this.deviceVariableId = deviceVariableId;
		this.alarmTime = alarmTime;
		this.alarmFormat = alarmFormat;
		this.alarmSendAddress = alarmSendAddress;
		this.alarmOperateResult = alarmOperateResult;
		this.alarmAffirmPersonnel = alarmAffirmPersonnel;
		this.alarmAffirmTime = alarmAffirmTime;
		this.alarmRelieveTime = alarmRelieveTime;
		this.alarmRelieveSendFormat = alarmRelieveSendFormat;
		this.alarmRelieveSendAddress = alarmRelieveSendAddress;
		this.alarmRelieveOperateResult = alarmRelieveOperateResult;
	}

	// Property accessors

	public Integer getAlarmOperateId() {
		return this.alarmOperateId;
	}

	public void setAlarmOperateId(Integer alarmOperateId) {
		this.alarmOperateId = alarmOperateId;
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

	public Timestamp getAlarmTime() {
		return this.alarmTime;
	}

	public void setAlarmTime(Timestamp alarmTime) {
		this.alarmTime = alarmTime;
	}

	public Short getAlarmFormat() {
		return this.alarmFormat;
	}

	public void setAlarmFormat(Short alarmFormat) {
		this.alarmFormat = alarmFormat;
	}

	public String getAlarmSendAddress() {
		return this.alarmSendAddress;
	}

	public void setAlarmSendAddress(String alarmSendAddress) {
		this.alarmSendAddress = alarmSendAddress;
	}

	public String getAlarmOperateResult() {
		return this.alarmOperateResult;
	}

	public void setAlarmOperateResult(String alarmOperateResult) {
		this.alarmOperateResult = alarmOperateResult;
	}

	public String getAlarmAffirmPersonnel() {
		return this.alarmAffirmPersonnel;
	}

	public void setAlarmAffirmPersonnel(String alarmAffirmPersonnel) {
		this.alarmAffirmPersonnel = alarmAffirmPersonnel;
	}

	public Date getAlarmAffirmTime() {
		return this.alarmAffirmTime;
	}

	public void setAlarmAffirmTime(Date alarmAffirmTime) {
		this.alarmAffirmTime = alarmAffirmTime;
	}

	public Timestamp getAlarmRelieveTime() {
		return this.alarmRelieveTime;
	}

	public void setAlarmRelieveTime(Timestamp alarmRelieveTime) {
		this.alarmRelieveTime = alarmRelieveTime;
	}

	public Short getAlarmRelieveSendFormat() {
		return this.alarmRelieveSendFormat;
	}

	public void setAlarmRelieveSendFormat(Short alarmRelieveSendFormat) {
		this.alarmRelieveSendFormat = alarmRelieveSendFormat;
	}

	public String getAlarmRelieveSendAddress() {
		return this.alarmRelieveSendAddress;
	}

	public void setAlarmRelieveSendAddress(String alarmRelieveSendAddress) {
		this.alarmRelieveSendAddress = alarmRelieveSendAddress;
	}

	public String getAlarmRelieveOperateResult() {
		return this.alarmRelieveOperateResult;
	}

	public void setAlarmRelieveOperateResult(String alarmRelieveOperateResult) {
		this.alarmRelieveOperateResult = alarmRelieveOperateResult;
	}

}