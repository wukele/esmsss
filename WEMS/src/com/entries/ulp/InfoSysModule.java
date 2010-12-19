package com.entries.ulp;

/**
 * InfoSysModule entity. @author MyEclipse Persistence Tools
 */

public class InfoSysModule implements java.io.Serializable {

	// Fields

	private String moduleCode;
	private String moduleName;
	private String moduleIndex;
	private Integer isActive;

	// Constructors

	/** default constructor */
	public InfoSysModule() {
	}

	/** minimal constructor */
	public InfoSysModule(String moduleCode, String moduleName) {
		this.moduleCode = moduleCode;
		this.moduleName = moduleName;
	}

	/** full constructor */
	public InfoSysModule(String moduleCode, String moduleName,
			String moduleIndex, Integer isActive) {
		this.moduleCode = moduleCode;
		this.moduleName = moduleName;
		this.moduleIndex = moduleIndex;
		this.isActive = isActive;
	}

	// Property accessors

	public String getModuleCode() {
		return this.moduleCode;
	}

	public void setModuleCode(String moduleCode) {
		this.moduleCode = moduleCode;
	}

	public String getModuleName() {
		return this.moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getModuleIndex() {
		return this.moduleIndex;
	}

	public void setModuleIndex(String moduleIndex) {
		this.moduleIndex = moduleIndex;
	}

	public Integer getIsActive() {
		return this.isActive;
	}

	public void setIsActive(Integer isActive) {
		this.isActive = isActive;
	}

}