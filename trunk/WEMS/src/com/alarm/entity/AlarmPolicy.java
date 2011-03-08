package com.alarm.entity;

import java.sql.Timestamp;

/**
 * AlarmPolicy entity. @author MyEclipse Persistence Tools
 */

public class AlarmPolicy implements java.io.Serializable {

	// Fields

	private Integer alarmPolicyId;
	private String alarmLevelId;
	private Timestamp policyWorkStarttime;
	private Timestamp policyWorkEndtime;
	private Short alarmFormat;
	private String informationSendAddress;
	private String intormationContent;
	private Timestamp unrelieveEventRealarmTime;
	private Short alarmRelieveRecoverInform;

	// Constructors

	/** default constructor */
	public AlarmPolicy() {
	}

	/** full constructor */
	public AlarmPolicy(String alarmLevelId, Timestamp policyWorkStarttime,
			Timestamp policyWorkEndtime, Short alarmFormat,
			String informationSendAddress, String intormationContent,
			Timestamp unrelieveEventRealarmTime, Short alarmRelieveRecoverInform) {
		this.alarmLevelId = alarmLevelId;
		this.policyWorkStarttime = policyWorkStarttime;
		this.policyWorkEndtime = policyWorkEndtime;
		this.alarmFormat = alarmFormat;
		this.informationSendAddress = informationSendAddress;
		this.intormationContent = intormationContent;
		this.unrelieveEventRealarmTime = unrelieveEventRealarmTime;
		this.alarmRelieveRecoverInform = alarmRelieveRecoverInform;
	}

	// Property accessors

	public Integer getAlarmPolicyId() {
		return this.alarmPolicyId;
	}

	public void setAlarmPolicyId(Integer alarmPolicyId) {
		this.alarmPolicyId = alarmPolicyId;
	}

	public String getAlarmLevelId() {
		return this.alarmLevelId;
	}

	public void setAlarmLevelId(String alarmLevelId) {
		this.alarmLevelId = alarmLevelId;
	}

	public Timestamp getPolicyWorkStarttime() {
		return this.policyWorkStarttime;
	}

	public void setPolicyWorkStarttime(Timestamp policyWorkStarttime) {
		this.policyWorkStarttime = policyWorkStarttime;
	}

	public Timestamp getPolicyWorkEndtime() {
		return this.policyWorkEndtime;
	}

	public void setPolicyWorkEndtime(Timestamp policyWorkEndtime) {
		this.policyWorkEndtime = policyWorkEndtime;
	}

	public Short getAlarmFormat() {
		return this.alarmFormat;
	}

	public void setAlarmFormat(Short alarmFormat) {
		this.alarmFormat = alarmFormat;
	}

	public String getInformationSendAddress() {
		return this.informationSendAddress;
	}

	public void setInformationSendAddress(String informationSendAddress) {
		this.informationSendAddress = informationSendAddress;
	}

	public String getIntormationContent() {
		return this.intormationContent;
	}

	public void setIntormationContent(String intormationContent) {
		this.intormationContent = intormationContent;
	}

	public Timestamp getUnrelieveEventRealarmTime() {
		return this.unrelieveEventRealarmTime;
	}

	public void setUnrelieveEventRealarmTime(Timestamp unrelieveEventRealarmTime) {
		this.unrelieveEventRealarmTime = unrelieveEventRealarmTime;
	}

	public Short getAlarmRelieveRecoverInform() {
		return this.alarmRelieveRecoverInform;
	}

	public void setAlarmRelieveRecoverInform(Short alarmRelieveRecoverInform) {
		this.alarmRelieveRecoverInform = alarmRelieveRecoverInform;
	}

}