package com.ems.entity;

/**
 * InfoDevicePage entity. @author MyEclipse Persistence Tools
 */

public class InfoDevicePage implements java.io.Serializable {

	// Fields

	private Integer pageId;
	private String pageResourceId;
	private String pageType;
	private String pageImageUrl;
	private String pageName;
	private String pageIcon;
	private Integer pageImageWidth;
	private Integer pageImageHeight;
	private Integer pageTop;
	private Integer pageLeft;
	private String operCode;
	private Integer deviceId;
	private String deviceType;

	// Constructors

	/** default constructor */
	public InfoDevicePage() {
	}

	/** minimal constructor */
	public InfoDevicePage(Integer pageImageWidth, Integer pageImageHeight) {
		this.pageImageWidth = pageImageWidth;
		this.pageImageHeight = pageImageHeight;
	}

	/** full constructor */
	public InfoDevicePage(String pageResourceId, String pageType,
			String pageImageUrl, String pageName, String pageIcon,
			Integer pageImageWidth, Integer pageImageHeight, Integer pageTop,
			Integer pageLeft, String operCode, Integer deviceId,
			String deviceType) {
		this.pageResourceId = pageResourceId;
		this.pageType = pageType;
		this.pageImageUrl = pageImageUrl;
		this.pageName = pageName;
		this.pageIcon = pageIcon;
		this.pageImageWidth = pageImageWidth;
		this.pageImageHeight = pageImageHeight;
		this.pageTop = pageTop;
		this.pageLeft = pageLeft;
		this.operCode = operCode;
		this.deviceId = deviceId;
		this.deviceType = deviceType;
	}

	// Property accessors

	public Integer getPageId() {
		return this.pageId;
	}

	public void setPageId(Integer pageId) {
		this.pageId = pageId;
	}

	public String getPageResourceId() {
		return this.pageResourceId;
	}

	public void setPageResourceId(String pageResourceId) {
		this.pageResourceId = pageResourceId;
	}

	public String getPageType() {
		return this.pageType;
	}

	public void setPageType(String pageType) {
		this.pageType = pageType;
	}

	public String getPageImageUrl() {
		return this.pageImageUrl;
	}

	public void setPageImageUrl(String pageImageUrl) {
		this.pageImageUrl = pageImageUrl;
	}

	public String getPageName() {
		return this.pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public String getPageIcon() {
		return this.pageIcon;
	}

	public void setPageIcon(String pageIcon) {
		this.pageIcon = pageIcon;
	}

	public Integer getPageImageWidth() {
		return this.pageImageWidth;
	}

	public void setPageImageWidth(Integer pageImageWidth) {
		this.pageImageWidth = pageImageWidth;
	}

	public Integer getPageImageHeight() {
		return this.pageImageHeight;
	}

	public void setPageImageHeight(Integer pageImageHeight) {
		this.pageImageHeight = pageImageHeight;
	}

	public Integer getPageTop() {
		return this.pageTop;
	}

	public void setPageTop(Integer pageTop) {
		this.pageTop = pageTop;
	}

	public Integer getPageLeft() {
		return this.pageLeft;
	}

	public void setPageLeft(Integer pageLeft) {
		this.pageLeft = pageLeft;
	}

	public String getOperCode() {
		return this.operCode;
	}

	public void setOperCode(String operCode) {
		this.operCode = operCode;
	}

	public Integer getDeviceId() {
		return this.deviceId;
	}

	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}

	public String getDeviceType() {
		return this.deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

}