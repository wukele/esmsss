package com.page.entity;

/**
 * BspkInfoPage entity. @author MyEclipse Persistence Tools
 */

public class BspkInfoPage implements java.io.Serializable {

	// Fields

	private Integer bspkPageId;
	private String bspkPageName;
	private String bspkImagePath;
	private Integer bspkImageWidth;
	private Integer bspkImageHeight;
	private String bspkPageResource;
	private String bspkOperCode;
	private String bspkPageType;

	// Constructors

	/** default constructor */
	public BspkInfoPage() {
	}

	/** minimal constructor */
	public BspkInfoPage(String bspkPageType) {
		this.bspkPageType = bspkPageType;
	}

	/** full constructor */
	public BspkInfoPage(String bspkPageName, String bspkImagePath,
			Integer bspkImageWidth, Integer bspkImageHeight,
			String bspkPageResource, String bspkOperCode, String bspkPageType) {
		this.bspkPageName = bspkPageName;
		this.bspkImagePath = bspkImagePath;
		this.bspkImageWidth = bspkImageWidth;
		this.bspkImageHeight = bspkImageHeight;
		this.bspkPageResource = bspkPageResource;
		this.bspkOperCode = bspkOperCode;
		this.bspkPageType = bspkPageType;
	}

	// Property accessors

	public Integer getBspkPageId() {
		return this.bspkPageId;
	}

	public void setBspkPageId(Integer bspkPageId) {
		this.bspkPageId = bspkPageId;
	}

	public String getBspkPageName() {
		return this.bspkPageName;
	}

	public void setBspkPageName(String bspkPageName) {
		this.bspkPageName = bspkPageName;
	}

	public String getBspkImagePath() {
		return this.bspkImagePath;
	}

	public void setBspkImagePath(String bspkImagePath) {
		this.bspkImagePath = bspkImagePath;
	}

	public Integer getBspkImageWidth() {
		return this.bspkImageWidth;
	}

	public void setBspkImageWidth(Integer bspkImageWidth) {
		this.bspkImageWidth = bspkImageWidth;
	}

	public Integer getBspkImageHeight() {
		return this.bspkImageHeight;
	}

	public void setBspkImageHeight(Integer bspkImageHeight) {
		this.bspkImageHeight = bspkImageHeight;
	}

	public String getBspkPageResource() {
		return this.bspkPageResource;
	}

	public void setBspkPageResource(String bspkPageResource) {
		this.bspkPageResource = bspkPageResource;
	}

	public String getBspkOperCode() {
		return this.bspkOperCode;
	}

	public void setBspkOperCode(String bspkOperCode) {
		this.bspkOperCode = bspkOperCode;
	}

	public String getBspkPageType() {
		return this.bspkPageType;
	}

	public void setBspkPageType(String bspkPageType) {
		this.bspkPageType = bspkPageType;
	}

}