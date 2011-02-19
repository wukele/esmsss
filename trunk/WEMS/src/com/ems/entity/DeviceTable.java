package com.ems.entity;

/**
 * DeviceTable entity. @author MyEclipse Persistence Tools
 */

public class DeviceTable implements java.io.Serializable {

	// Fields

	private Integer deviceId;
	private String deviceName;
	private String deviceType;
	private String deviceIp;
	private Integer collectTaskId;
	private Short actionFlag;
	private String roomId;

	// Constructors

	/** default constructor */
	public DeviceTable() {
	}

	/** minimal constructor */
	public DeviceTable(String deviceName, String deviceType, String deviceIp,
			Integer collectTaskId, Short actionFlag) {
		this.deviceName = deviceName;
		this.deviceType = deviceType;
		this.deviceIp = deviceIp;
		this.collectTaskId = collectTaskId;
		this.actionFlag = actionFlag;
	}

	/** full constructor */
	public DeviceTable(String deviceName, String deviceType, String deviceIp,
			Integer collectTaskId, Short actionFlag, String roomId) {
		this.deviceName = deviceName;
		this.deviceType = deviceType;
		this.deviceIp = deviceIp;
		this.collectTaskId = collectTaskId;
		this.actionFlag = actionFlag;
		this.roomId = roomId;
	}

	// Property accessors

	public Integer getDeviceId() {
		return this.deviceId;
	}

	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}

	public String getDeviceName() {
		return this.deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public String getDeviceType() {
		return this.deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	public String getDeviceIp() {
		return this.deviceIp;
	}

	public void setDeviceIp(String deviceIp) {
		this.deviceIp = deviceIp;
	}

	public Integer getCollectTaskId() {
		return this.collectTaskId;
	}

	public void setCollectTaskId(Integer collectTaskId) {
		this.collectTaskId = collectTaskId;
	}

	public Short getActionFlag() {
		return this.actionFlag;
	}

	public void setActionFlag(Short actionFlag) {
		this.actionFlag = actionFlag;
	}

	public String getRoomId() {
		return this.roomId;
	}

	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}

}