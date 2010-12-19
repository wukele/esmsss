package com.data.entity;

/**
 * EngineParameter entity. @author MyEclipse Persistence Tools
 */

public class EngineParameter implements java.io.Serializable {

	// Fields

	private Integer parameterId;
	private String engineId;
	private String parameterName;
	private String parameterValue;

	// Constructors

	/** default constructor */
	public EngineParameter() {
	}

	/** minimal constructor */
	public EngineParameter(Integer parameterId) {
		this.parameterId = parameterId;
	}

	/** full constructor */
	public EngineParameter(Integer parameterId, String engineId,
			String parameterName, String parameterValue) {
		this.parameterId = parameterId;
		this.engineId = engineId;
		this.parameterName = parameterName;
		this.parameterValue = parameterValue;
	}

	// Property accessors

	public Integer getParameterId() {
		return this.parameterId;
	}

	public void setParameterId(Integer parameterId) {
		this.parameterId = parameterId;
	}

	public String getEngineId() {
		return this.engineId;
	}

	public void setEngineId(String engineId) {
		this.engineId = engineId;
	}

	public String getParameterName() {
		return this.parameterName;
	}

	public void setParameterName(String parameterName) {
		this.parameterName = parameterName;
	}

	public String getParameterValue() {
		return this.parameterValue;
	}

	public void setParameterValue(String parameterValue) {
		this.parameterValue = parameterValue;
	}

}