package com.entries.ulp;

/**
 * InfoDept entity. @author MyEclipse Persistence Tools
 */

public class InfoDept implements java.io.Serializable {

	// Fields

	private String deptNo;
	private String parentDeptNo;
	private String pathCode;
	private String deptType;
	private String deptName;
	private String localNet;
	private String comments;
	private String phone;
	private String fax;
	private String address;
	private String flag;
	private String resChar1;
	private String resChar2;
	private String areaId;
	private String channelType;
	private String subChannelType;

	// Constructors

	/** default constructor */
	public InfoDept() {
	}

	/** minimal constructor */
	public InfoDept(String deptNo, String deptName, String flag) {
		this.deptNo = deptNo;
		this.deptName = deptName;
		this.flag = flag;
	}

	/** full constructor */
	public InfoDept(String deptNo, String parentDeptNo, String pathCode,
			String deptType, String deptName, String localNet, String comments,
			String phone, String fax, String address, String flag,
			String resChar1, String resChar2, String areaId,
			String channelType, String subChannelType) {
		this.deptNo = deptNo;
		this.parentDeptNo = parentDeptNo;
		this.pathCode = pathCode;
		this.deptType = deptType;
		this.deptName = deptName;
		this.localNet = localNet;
		this.comments = comments;
		this.phone = phone;
		this.fax = fax;
		this.address = address;
		this.flag = flag;
		this.resChar1 = resChar1;
		this.resChar2 = resChar2;
		this.areaId = areaId;
		this.channelType = channelType;
		this.subChannelType = subChannelType;
	}

	// Property accessors

	public String getDeptNo() {
		return this.deptNo;
	}

	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}

	public String getParentDeptNo() {
		return this.parentDeptNo;
	}

	public void setParentDeptNo(String parentDeptNo) {
		this.parentDeptNo = parentDeptNo;
	}

	public String getPathCode() {
		return this.pathCode;
	}

	public void setPathCode(String pathCode) {
		this.pathCode = pathCode;
	}

	public String getDeptType() {
		return this.deptType;
	}

	public void setDeptType(String deptType) {
		this.deptType = deptType;
	}

	public String getDeptName() {
		return this.deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getLocalNet() {
		return this.localNet;
	}

	public void setLocalNet(String localNet) {
		this.localNet = localNet;
	}

	public String getComments() {
		return this.comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getFlag() {
		return this.flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getResChar1() {
		return this.resChar1;
	}

	public void setResChar1(String resChar1) {
		this.resChar1 = resChar1;
	}

	public String getResChar2() {
		return this.resChar2;
	}

	public void setResChar2(String resChar2) {
		this.resChar2 = resChar2;
	}

	public String getAreaId() {
		return this.areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	public String getChannelType() {
		return this.channelType;
	}

	public void setChannelType(String channelType) {
		this.channelType = channelType;
	}

	public String getSubChannelType() {
		return this.subChannelType;
	}

	public void setSubChannelType(String subChannelType) {
		this.subChannelType = subChannelType;
	}

}