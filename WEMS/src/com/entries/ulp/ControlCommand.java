package com.entries.ulp;

/**
 * InfoDept entity. @author MyEclipse Persistence Tools
 */

public class ControlCommand implements java.io.Serializable {

	// Fields

	private String controlLogId;
	private String deviceVariableId;
	private String setupValue;
	private String setupTime;
	private String loseEfficacyTime;
	private String setupPersonnel;
	private String status;
	private String statusTime;

	// Constructors

	/** default constructor */
	public ControlCommand() {
	}
	
	public ControlCommand(String controlLogId,String deviceVariableId,String setupValue,String setupTime,String loseEfficacyTime,String setupPersonnel,String status,String statusTime) {
		this.controlLogId=controlLogId;
		this.deviceVariableId=deviceVariableId;
		this.setupValue=setupValue;
		this.setupTime=setupTime;
		this.loseEfficacyTime=loseEfficacyTime;
		this.setupPersonnel=setupPersonnel;
		this.status=status;
		this.statusTime=statusTime;
	}

	public void setControlLogId(String controlLogId) {
		this.controlLogId = controlLogId;
	}

	public String getControlLogId() {
		return controlLogId;
	}

	public void setDeviceVariableId(String deviceVariableId) {
		this.deviceVariableId = deviceVariableId;
	}

	public String getDeviceVariableId() {
		return deviceVariableId;
	}

	public void setSetupValue(String setupValue) {
		this.setupValue = setupValue;
	}

	public String getSetupValue() {
		return setupValue;
	}

	public void setSetupTime(String setupTime) {
		this.setupTime = setupTime;
	}

	public String getSetupTime() {
		return setupTime;
	}

	public void setLoseEfficacyTime(String loseEfficacyTime) {
		this.loseEfficacyTime = loseEfficacyTime;
	}

	public String getLoseEfficacyTime() {
		return loseEfficacyTime;
	}

	public void setSetupPersonnel(String setupPersonnel) {
		this.setupPersonnel = setupPersonnel;
	}

	public String getSetupPersonnel() {
		return setupPersonnel;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setStatusTime(String statusTime) {
		this.statusTime = statusTime;
	}

	public String getStatusTime() {
		return statusTime;
	}



	/** full constructor */
//	public InfoDept(String deptNo, String parentDeptNo, String pathCode,
//			String deptType, String deptName, String localNet, String comments,
//			String phone, String fax, String address, String flag,
//			String resChar1, String resChar2, String areaId,
//			String channelType, String subChannelType) {
//		this.deptNo = deptNo;
//		this.parentDeptNo = parentDeptNo;
//		this.pathCode = pathCode;
//		this.deptType = deptType;
//		this.deptName = deptName;
//		this.localNet = localNet;
//		this.comments = comments;
//		this.phone = phone;
//		this.fax = fax;
//		this.address = address;
//		this.flag = flag;
//		this.resChar1 = resChar1;
//		this.resChar2 = resChar2;
//		this.areaId = areaId;
//		this.channelType = channelType;
//		this.subChannelType = subChannelType;
//	}

}