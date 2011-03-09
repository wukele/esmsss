package com.alarm.entity;

import java.sql.Timestamp;

/**
 * InfoEvent entity. @author MyEclipse Persistence Tools
 */

public class InfoEvent implements java.io.Serializable {

	// Fields

	private Integer eventSn;
	private String eventName;
	private String eventDescription;
	private Timestamp fireTime;
	private Integer eventLevel;
	private Integer isConfirm;
	private String sourceEntityCode;
	private String deviceVarId;

	// Constructors

	/** default constructor */
	public InfoEvent() {
	}

	/** minimal constructor */
	public InfoEvent(String sourceEntityCode) {
		this.sourceEntityCode = sourceEntityCode;
	}

	/** full constructor */
	public InfoEvent(String eventName, String eventDescription,
			Timestamp fireTime, Integer eventLevel, Integer isConfirm,
			String sourceEntityCode, String deviceVarId) {
		this.eventName = eventName;
		this.eventDescription = eventDescription;
		this.fireTime = fireTime;
		this.eventLevel = eventLevel;
		this.isConfirm = isConfirm;
		this.sourceEntityCode = sourceEntityCode;
		this.deviceVarId = deviceVarId;
	}

	// Property accessors

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

	public String getDeviceVarId() {
		return this.deviceVarId;
	}

	public void setDeviceVarId(String deviceVarId) {
		this.deviceVarId = deviceVarId;
	}

}