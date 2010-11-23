package com.ems.entity;

import java.sql.Timestamp;

/**
 * RealTimeData entity. @author MyEclipse Persistence Tools
 */

public class RealTimeData implements java.io.Serializable {

	// Fields

	private Integer dataSn;
	private String deviceVarId;
	private String varPhyValue;
	private String varLogicValue;
	private Timestamp collectTime;

	// Constructors

	/** default constructor */
	public RealTimeData() {
	}

	/** minimal constructor */
	public RealTimeData(Integer dataSn, String deviceVarId) {
		this.dataSn = dataSn;
		this.deviceVarId = deviceVarId;
	}

	/** full constructor */
	public RealTimeData(Integer dataSn, String deviceVarId, String varPhyValue,
			String varLogicValue, Timestamp collectTime) {
		this.dataSn = dataSn;
		this.deviceVarId = deviceVarId;
		this.varPhyValue = varPhyValue;
		this.varLogicValue = varLogicValue;
		this.collectTime = collectTime;
	}

	// Property accessors

	public Integer getDataSn() {
		return this.dataSn;
	}

	public void setDataSn(Integer dataSn) {
		this.dataSn = dataSn;
	}

	public String getDeviceVarId() {
		return this.deviceVarId;
	}

	public void setDeviceVarId(String deviceVarId) {
		this.deviceVarId = deviceVarId;
	}

	public String getVarPhyValue() {
		return this.varPhyValue;
	}

	public void setVarPhyValue(String varPhyValue) {
		this.varPhyValue = varPhyValue;
	}

	public String getVarLogicValue() {
		return this.varLogicValue;
	}

	public void setVarLogicValue(String varLogicValue) {
		this.varLogicValue = varLogicValue;
	}

	public Timestamp getCollectTime() {
		return this.collectTime;
	}

	public void setCollectTime(Timestamp collectTime) {
		this.collectTime = collectTime;
	}

}