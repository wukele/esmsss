package com.data.entity;

/**
 * RuleEngineData entity. @author MyEclipse Persistence Tools
 */

public class RuleEngineData implements java.io.Serializable {

	// Fields

	private Integer ruleId;
	private String engineName;
	private String engineCode;
	private String engineType;
	private String valueId;
	private String valueType;

	// Constructors

	/** default constructor */
	public RuleEngineData() {
	}

	/** minimal constructor */
	public RuleEngineData(Integer ruleId) {
		this.ruleId = ruleId;
	}

	/** full constructor */
	public RuleEngineData(Integer ruleId, String engineName, String engineCode,
			String engineType, String valueId, String valueType) {
		this.ruleId = ruleId;
		this.engineName = engineName;
		this.engineCode = engineCode;
		this.engineType = engineType;
		this.valueId = valueId;
		this.valueType = valueType;
	}

	// Property accessors

	public Integer getRuleId() {
		return this.ruleId;
	}

	public void setRuleId(Integer ruleId) {
		this.ruleId = ruleId;
	}

	public String getEngineName() {
		return this.engineName;
	}

	public void setEngineName(String engineName) {
		this.engineName = engineName;
	}

	public String getEngineCode() {
		return this.engineCode;
	}

	public void setEngineCode(String engineCode) {
		this.engineCode = engineCode;
	}

	public String getEngineType() {
		return this.engineType;
	}

	public void setEngineType(String engineType) {
		this.engineType = engineType;
	}

	public String getValueId() {
		return this.valueId;
	}

	public void setValueId(String valueId) {
		this.valueId = valueId;
	}

	public String getValueType() {
		return this.valueType;
	}

	public void setValueType(String valueType) {
		this.valueType = valueType;
	}

}