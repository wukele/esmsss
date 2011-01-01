package com.ems.entity;

/**
 * TlpPageImage entity. @author MyEclipse Persistence Tools
 */

public class TlpPageImage implements java.io.Serializable {

	// Fields

	private Integer imageId;
	private String imageName;
	private String imagePath;
	private String imageDisplayName;
	private String flag;
	private String imageDesc;
	private String operNo;

	// Constructors

	/** default constructor */
	public TlpPageImage() {
	}

	/** minimal constructor */
	public TlpPageImage(String imageDisplayName) {
		this.imageDisplayName = imageDisplayName;
	}

	/** full constructor */
	public TlpPageImage(String imageName, String imagePath,
			String imageDisplayName, String flag, String imageDesc,
			String operNo) {
		this.imageName = imageName;
		this.imagePath = imagePath;
		this.imageDisplayName = imageDisplayName;
		this.flag = flag;
		this.imageDesc = imageDesc;
		this.operNo = operNo;
	}

	// Property accessors

	public Integer getImageId() {
		return this.imageId;
	}

	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}

	public String getImageName() {
		return this.imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getImagePath() {
		return this.imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getImageDisplayName() {
		return this.imageDisplayName;
	}

	public void setImageDisplayName(String imageDisplayName) {
		this.imageDisplayName = imageDisplayName;
	}

	public String getFlag() {
		return this.flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getImageDesc() {
		return this.imageDesc;
	}

	public void setImageDesc(String imageDesc) {
		this.imageDesc = imageDesc;
	}

	public String getOperNo() {
		return this.operNo;
	}

	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}

}