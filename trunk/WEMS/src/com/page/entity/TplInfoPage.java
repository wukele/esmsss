package com.page.entity;

/**
 * TplInfoPage entity. @author MyEclipse Persistence Tools
 */

public class TplInfoPage implements java.io.Serializable {

	// Fields

	private Integer tplPageId;
	private String tplPageName;
	private String tplImagePath;
	private Integer tplImageWidth;
	private Integer tplImageHeight;
	private String tplPageResource;
	private String tplOperCode;
	private String tplPageType;

	// Constructors

	/** default constructor */
	public TplInfoPage() {
	}

	/** minimal constructor */
	public TplInfoPage(String tplPageType) {
		this.tplPageType = tplPageType;
	}

	/** full constructor */
	public TplInfoPage(String tplPageName, String tplImagePath,
			Integer tplImageWidth, Integer tplImageHeight,
			String tplPageResource, String tplOperCode, String tplPageType) {
		this.tplPageName = tplPageName;
		this.tplImagePath = tplImagePath;
		this.tplImageWidth = tplImageWidth;
		this.tplImageHeight = tplImageHeight;
		this.tplPageResource = tplPageResource;
		this.tplOperCode = tplOperCode;
		this.tplPageType = tplPageType;
	}

	// Property accessors

	public Integer getTplPageId() {
		return this.tplPageId;
	}

	public void setTplPageId(Integer tplPageId) {
		this.tplPageId = tplPageId;
	}

	public String getTplPageName() {
		return this.tplPageName;
	}

	public void setTplPageName(String tplPageName) {
		this.tplPageName = tplPageName;
	}

	public String getTplImagePath() {
		return this.tplImagePath;
	}

	public void setTplImagePath(String tplImagePath) {
		this.tplImagePath = tplImagePath;
	}

	public Integer getTplImageWidth() {
		return this.tplImageWidth;
	}

	public void setTplImageWidth(Integer tplImageWidth) {
		this.tplImageWidth = tplImageWidth;
	}

	public Integer getTplImageHeight() {
		return this.tplImageHeight;
	}

	public void setTplImageHeight(Integer tplImageHeight) {
		this.tplImageHeight = tplImageHeight;
	}

	public String getTplPageResource() {
		return this.tplPageResource;
	}

	public void setTplPageResource(String tplPageResource) {
		this.tplPageResource = tplPageResource;
	}

	public String getTplOperCode() {
		return this.tplOperCode;
	}

	public void setTplOperCode(String tplOperCode) {
		this.tplOperCode = tplOperCode;
	}

	public String getTplPageType() {
		return this.tplPageType;
	}

	public void setTplPageType(String tplPageType) {
		this.tplPageType = tplPageType;
	}

}