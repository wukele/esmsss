package com.data.entity;

/**
 * InfoEngine entity. @author MyEclipse Persistence Tools
 */

public class InfoEngine implements java.io.Serializable {

	// Fields

	private Integer engineId;
	private String engineCode;
	private String engineName;
	private String actionName;
	private String actionConfig;
	private String engineType;
	private String actionClass;

	// Constructors

	/** default constructor */
	public InfoEngine() {
	}

	/** minimal constructor */
	public InfoEngine(Integer engineId) {
		this.engineId = engineId;
	}

	/** full constructor */
	public InfoEngine(Integer engineId, String engineCode, String engineName,
			String actionName, String actionConfig, String engineType,
			String actionClass) {
		this.engineId = engineId;
		this.engineCode = engineCode;
		this.engineName = engineName;
		this.actionName = actionName;
		this.actionConfig = actionConfig;
		this.engineType = engineType;
		this.actionClass = actionClass;
	}

	// Property accessors

	public Integer getEngineId() {
		return this.engineId;
	}

	public void setEngineId(Integer engineId) {
		this.engineId = engineId;
	}

	public String getEngineCode() {
		return this.engineCode;
	}

	public void setEngineCode(String engineCode) {
		this.engineCode = engineCode;
	}

	public String getEngineName() {
		return this.engineName;
	}

	public void setEngineName(String engineName) {
		this.engineName = engineName;
	}

	public String getActionName() {
		return this.actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}

	public String getActionConfig() {
		return this.actionConfig;
	}

	public void setActionConfig(String actionConfig) {
		this.actionConfig = actionConfig;
	}

	public String getEngineType() {
		return this.engineType;
	}

	public void setEngineType(String engineType) {
		this.engineType = engineType;
	}

	public String getActionClass() {
		return this.actionClass;
	}

	public void setActionClass(String actionClass) {
		this.actionClass = actionClass;
	}

}