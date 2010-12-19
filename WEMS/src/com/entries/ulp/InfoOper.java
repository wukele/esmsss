package com.entries.ulp;

import java.util.Date;

/**
 * InfoOper entity. @author MyEclipse Persistence Tools
 */

public class InfoOper implements java.io.Serializable {

	// Fields

	private String operNo;
	private String regionId;
	private String deptNo;
	private String roleCode;
	private String operName;
	private String loginName;
	private String operPwd;
	private String question;
	private String answer;
	private Integer gender;
	private String positions;
	private String phone;
	private String email;
	private String mobileNo;
	private Integer needSms;
	private String operMessage;
	private Date effDate;
	private Date expHintDate;
	private Date expDate;
	private Integer initFlag;
	private String dealType;
	private String appType;
	private String statisticalDeptNo;
	private String operAlias;
	private Double loginCount;
	private Integer resInit1;
	private Integer resInit2;
	private String resChar1;
	private String resChar2;
	private String pwdEncode;
	private String operStatus;
	private String operKind;
	private Integer flag;
	private String acctStatus;
	private String busiType;
	private String derateFlag;
	private String isOnline;
	private String loginIp;

	// Constructors

	/** default constructor */
	public InfoOper() {
	}

	/** minimal constructor */
	public InfoOper(String operNo, String regionId, String dealType,
			String statisticalDeptNo) {
		this.operNo = operNo;
		this.regionId = regionId;
		this.dealType = dealType;
		this.statisticalDeptNo = statisticalDeptNo;
	}

	/** full constructor */
	public InfoOper(String operNo, String regionId, String deptNo,
			String roleCode, String operName, String loginName, String operPwd,
			String question, String answer, Integer gender, String positions,
			String phone, String email, String mobileNo, Integer needSms,
			String operMessage, Date effDate, Date expHintDate, Date expDate,
			Integer initFlag, String dealType, String appType,
			String statisticalDeptNo, String operAlias, Double loginCount,
			Integer resInit1, Integer resInit2, String resChar1,
			String resChar2, String pwdEncode, String operStatus,
			String operKind, Integer flag, String acctStatus, String busiType,
			String derateFlag, String isOnline, String loginIp) {
		this.operNo = operNo;
		this.regionId = regionId;
		this.deptNo = deptNo;
		this.roleCode = roleCode;
		this.operName = operName;
		this.loginName = loginName;
		this.operPwd = operPwd;
		this.question = question;
		this.answer = answer;
		this.gender = gender;
		this.positions = positions;
		this.phone = phone;
		this.email = email;
		this.mobileNo = mobileNo;
		this.needSms = needSms;
		this.operMessage = operMessage;
		this.effDate = effDate;
		this.expHintDate = expHintDate;
		this.expDate = expDate;
		this.initFlag = initFlag;
		this.dealType = dealType;
		this.appType = appType;
		this.statisticalDeptNo = statisticalDeptNo;
		this.operAlias = operAlias;
		this.loginCount = loginCount;
		this.resInit1 = resInit1;
		this.resInit2 = resInit2;
		this.resChar1 = resChar1;
		this.resChar2 = resChar2;
		this.pwdEncode = pwdEncode;
		this.operStatus = operStatus;
		this.operKind = operKind;
		this.flag = flag;
		this.acctStatus = acctStatus;
		this.busiType = busiType;
		this.derateFlag = derateFlag;
		this.isOnline = isOnline;
		this.loginIp = loginIp;
	}

	// Property accessors

	public String getOperNo() {
		return this.operNo;
	}

	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}

	public String getRegionId() {
		return this.regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	public String getDeptNo() {
		return this.deptNo;
	}

	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}

	public String getRoleCode() {
		return this.roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getOperName() {
		return this.operName;
	}

	public void setOperName(String operName) {
		this.operName = operName;
	}

	public String getLoginName() {
		return this.loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getOperPwd() {
		return this.operPwd;
	}

	public void setOperPwd(String operPwd) {
		this.operPwd = operPwd;
	}

	public String getQuestion() {
		return this.question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return this.answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Integer getGender() {
		return this.gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public String getPositions() {
		return this.positions;
	}

	public void setPositions(String positions) {
		this.positions = positions;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobileNo() {
		return this.mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public Integer getNeedSms() {
		return this.needSms;
	}

	public void setNeedSms(Integer needSms) {
		this.needSms = needSms;
	}

	public String getOperMessage() {
		return this.operMessage;
	}

	public void setOperMessage(String operMessage) {
		this.operMessage = operMessage;
	}

	public Date getEffDate() {
		return this.effDate;
	}

	public void setEffDate(Date effDate) {
		this.effDate = effDate;
	}

	public Date getExpHintDate() {
		return this.expHintDate;
	}

	public void setExpHintDate(Date expHintDate) {
		this.expHintDate = expHintDate;
	}

	public Date getExpDate() {
		return this.expDate;
	}

	public void setExpDate(Date expDate) {
		this.expDate = expDate;
	}

	public Integer getInitFlag() {
		return this.initFlag;
	}

	public void setInitFlag(Integer initFlag) {
		this.initFlag = initFlag;
	}

	public String getDealType() {
		return this.dealType;
	}

	public void setDealType(String dealType) {
		this.dealType = dealType;
	}

	public String getAppType() {
		return this.appType;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}

	public String getStatisticalDeptNo() {
		return this.statisticalDeptNo;
	}

	public void setStatisticalDeptNo(String statisticalDeptNo) {
		this.statisticalDeptNo = statisticalDeptNo;
	}

	public String getOperAlias() {
		return this.operAlias;
	}

	public void setOperAlias(String operAlias) {
		this.operAlias = operAlias;
	}

	public Double getLoginCount() {
		return this.loginCount;
	}

	public void setLoginCount(Double loginCount) {
		this.loginCount = loginCount;
	}

	public Integer getResInit1() {
		return this.resInit1;
	}

	public void setResInit1(Integer resInit1) {
		this.resInit1 = resInit1;
	}

	public Integer getResInit2() {
		return this.resInit2;
	}

	public void setResInit2(Integer resInit2) {
		this.resInit2 = resInit2;
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

	public String getPwdEncode() {
		return this.pwdEncode;
	}

	public void setPwdEncode(String pwdEncode) {
		this.pwdEncode = pwdEncode;
	}

	public String getOperStatus() {
		return this.operStatus;
	}

	public void setOperStatus(String operStatus) {
		this.operStatus = operStatus;
	}

	public String getOperKind() {
		return this.operKind;
	}

	public void setOperKind(String operKind) {
		this.operKind = operKind;
	}

	public Integer getFlag() {
		return this.flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public String getAcctStatus() {
		return this.acctStatus;
	}

	public void setAcctStatus(String acctStatus) {
		this.acctStatus = acctStatus;
	}

	public String getBusiType() {
		return this.busiType;
	}

	public void setBusiType(String busiType) {
		this.busiType = busiType;
	}

	public String getDerateFlag() {
		return this.derateFlag;
	}

	public void setDerateFlag(String derateFlag) {
		this.derateFlag = derateFlag;
	}

	public String getIsOnline() {
		return this.isOnline;
	}

	public void setIsOnline(String isOnline) {
		this.isOnline = isOnline;
	}

	public String getLoginIp() {
		return this.loginIp;
	}

	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}

}