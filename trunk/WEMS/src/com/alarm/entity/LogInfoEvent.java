package com.alarm.entity;

import java.sql.Timestamp;

/**
 * LogInfoEvent entity. @author MyEclipse Persistence Tools
 */

public class LogInfoEvent implements java.io.Serializable {

	// Fields

	private Integer logEventSn;
	private Integer eventSn;
	private String eventName;
	private String eventDescription;
	private Timestamp fireTime;
	private Integer eventLevel;
	private Integer isConfirm;
	private String sourceEntityCode;
	private Timestamp processTime;
	private String operNo;
	private String deviceVarId;

	// Constructors

	/** default constructor */
	public LogInfoEvent() {
	}

	/** minimal constructor */
	public LogInfoEvent(Integer eventSn, String sourceEntityCode) {
		this.eventSn = eventSn;
		this.sourceEntityCode = sourceEntityCode;
	}

	/** full constructor */
	public LogInfoEvent(Integer eventSn, String eventName,
			String eventDescription, Timestamp fireTime, Integer eventLevel,
			Integer isConfirm, String sourceEntityCode, Timestamp processTime,
			String operNo, String deviceVarId) {
		this.eventSn = eventSn;
		this.eventName = eventName;
		this.eventDescription = eventDescription;
		this.fireTime = fireTime;
		this.eventLevel = eventLevel;
		this.isConfirm = isConfirm;
		this.sourceEntityCode = sourceEntityCode;
		this.processTime = processTime;
		this.operNo = operNo;
		this.deviceVarId = deviceVarId;
	}

	// Property accessors

	public Integer getLogEventSn() {
		return this.logEventSn;
	}

	public void setLogEventSn(Integer logEventSn) {
		this.logEventSn = logEventSn;
	}

	public Integer getEventSn() {
		return this.eventSn;
	}

	public void setEventSn(Integer eventSn) {
		this.eventSn = eventSn;
	}

	public String getEventName() {
		return this.eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getEventDescription() {
		return this.eventDescription;
	}

	public void setEventDescription(String eventDescription) {
		this.eventDescription = eventDescription;
	}

	public Timestamp getFireTime() {
		return this.fireTime;
	}

	public void setFireTime(Timestamp fireTime) {
		this.fireTime = fireTime;
	}

	public Integer getEventLevel() {
		return this.eventLevel;
	}

	public void setEventLevel(Integer eventLevel) {
		this.eventLevel = eventLevel;
	}

	public Integer getIsConfirm() {
		return this.isConfirm;
	}

	public void setIsConfirm(Integer isConfirm) {
		this.isConfirm = isConfirm;
	}

	public String getSourceEntityCode() {
		return this.sourceEntityCode;
	}

	public void setSourceEntityCode(String sourceEntityCode) {
		this.sourceEntityCode = sourceEntityCode;
	}

	public Timestamp getProcessTime() {
		return this.processTime;
	}

	public void setProcessTime(Timestamp processTime) {
		this.processTime = processTime;
	}

	public String getOperNo() {
		return this.operNo;
	}

	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}

	public String getDeviceVarId() {
		return this.deviceVarId;
	}

	public void setDeviceVarId(String deviceVarId) {
		this.deviceVarId = deviceVarId;
	}

}