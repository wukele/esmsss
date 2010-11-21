package com.entries.ulp;

/**
 * InfoMenu entity. @author MyEclipse Persistence Tools
 */

public class InfoMenu implements java.io.Serializable {

	// Fields

	private String menuCode;
	private String parentMenuCode;
	private String moduleCode;
	private String pathCode;
	private Integer menuCol;
	private Integer menuRow;
	private Integer isshow;
	private String menuUrl;
	private String menuTitle;
	private String comments;
	private String iconUrl;
	private Integer isactive;
	private String resChar1;
	private String resChar2;
	private String resChar3;
	private Integer resInit1;
	private Integer resInit2;
	private Integer resInit3;
	private String deploySysCode;

	// Constructors

	/** default constructor */
	public InfoMenu() {
	}

	/** minimal constructor */
	public InfoMenu(String menuCode, String moduleCode, Integer menuCol,
			Integer menuRow, Integer isshow, String menuTitle, Integer isactive) {
		this.menuCode = menuCode;
		this.moduleCode = moduleCode;
		this.menuCol = menuCol;
		this.menuRow = menuRow;
		this.isshow = isshow;
		this.menuTitle = menuTitle;
		this.isactive = isactive;
	}
	
	public InfoMenu(String menuCode, String moduleCode, String menuUrl,Integer menuCol,
			Integer menuRow, Integer isshow, String menuTitle, Integer isactive) {
		this.menuCode = menuCode;
		this.moduleCode = moduleCode;
		this.menuCol = menuCol;
		this.menuRow = menuRow;
		this.isshow = isshow;
		this.menuTitle = menuTitle;
		this.isactive = isactive;
		this.menuUrl=menuUrl;
	}
	

	/** full constructor */
	public InfoMenu(String menuCode, String parentMenuCode, String moduleCode,
			String pathCode, Integer menuCol, Integer menuRow, Integer isshow,
			String menuUrl, String menuTitle, String comments, String iconUrl,
			Integer isactive, String resChar1, String resChar2,
			String resChar3, Integer resInit1, Integer resInit2,
			Integer resInit3, String deploySysCode) {
		this.menuCode = menuCode;
		this.parentMenuCode = parentMenuCode;
		this.moduleCode = moduleCode;
		this.pathCode = pathCode;
		this.menuCol = menuCol;
		this.menuRow = menuRow;
		this.isshow = isshow;
		this.menuUrl = menuUrl;
		this.menuTitle = menuTitle;
		this.comments = comments;
		this.iconUrl = iconUrl;
		this.isactive = isactive;
		this.resChar1 = resChar1;
		this.resChar2 = resChar2;
		this.resChar3 = resChar3;
		this.resInit1 = resInit1;
		this.resInit2 = resInit2;
		this.resInit3 = resInit3;
		this.deploySysCode = deploySysCode;
	}

	// Property accessors

	public String getMenuCode() {
		return this.menuCode;
	}

	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}

	public String getParentMenuCode() {
		return this.parentMenuCode;
	}

	public void setParentMenuCode(String parentMenuCode) {
		this.parentMenuCode = parentMenuCode;
	}

	public String getModuleCode() {
		return this.moduleCode;
	}

	public void setModuleCode(String moduleCode) {
		this.moduleCode = moduleCode;
	}

	public String getPathCode() {
		return this.pathCode;
	}

	public void setPathCode(String pathCode) {
		this.pathCode = pathCode;
	}

	public Integer getMenuCol() {
		return this.menuCol;
	}

	public void setMenuCol(Integer menuCol) {
		this.menuCol = menuCol;
	}

	public Integer getMenuRow() {
		return this.menuRow;
	}

	public void setMenuRow(Integer menuRow) {
		this.menuRow = menuRow;
	}

	public Integer getIsshow() {
		return this.isshow;
	}

	public void setIsshow(Integer isshow) {
		this.isshow = isshow;
	}

	public String getMenuUrl() {
		return this.menuUrl;
	}

	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}

	public String getMenuTitle() {
		return this.menuTitle;
	}

	public void setMenuTitle(String menuTitle) {
		this.menuTitle = menuTitle;
	}

	public String getComments() {
		return this.comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getIconUrl() {
		return this.iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

	public Integer getIsactive() {
		return this.isactive;
	}

	public void setIsactive(Integer isactive) {
		this.isactive = isactive;
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

	public String getResChar3() {
		return this.resChar3;
	}

	public void setResChar3(String resChar3) {
		this.resChar3 = resChar3;
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

	public Integer getResInit3() {
		return this.resInit3;
	}

	public void setResInit3(Integer resInit3) {
		this.resInit3 = resInit3;
	}

	public String getDeploySysCode() {
		return this.deploySysCode;
	}

	public void setDeploySysCode(String deploySysCode) {
		this.deploySysCode = deploySysCode;
	}

}