package com.admin.page.struct;

import java.io.Serializable;

public class MenuTreeNode implements Serializable {
	  private  String id;
	  private  String text;
	  private  boolean  leaf;
	  private  String  iconCls;
	  private  String  url;
	  private  String  menu_code;
	  private  String  module_code;
	  private  String  parent_code;
	  
	public String getParent_code() {
		return parent_code;
	}

	public void setParent_code(String parentCode) {
		parent_code = parentCode;
	}

	public  MenuTreeNode(
			  String text,
			  Integer  leaf,
			  String  moduleCode
	){
				this.text=text;
				if(leaf.intValue()==1){
							this.leaf=true;
				}else{
							this.leaf=false;
				}
				this.module_code=moduleCode;
	}
	
	public  MenuTreeNode(
			 String  menuCode,
			  String  moduleCode	,
			  String text,
			  Integer  leaf
	){
				this.text=text;
				if(leaf.intValue()==1){
							this.leaf=true;
				}else{
							this.leaf=false;
				}
				this.module_code=moduleCode;
				this.menu_code=menuCode;
	}
	
	
	public  MenuTreeNode(
			 String  menuCode,
			  String  moduleCode	,
			  String text,
			  Integer  leaf,
			  String p_code
	){
				this.text=text;
				if(leaf.intValue()==1){
							this.leaf=true;
				}else{
							this.leaf=false;
				}
				this.module_code=moduleCode;
				this.menu_code=menuCode;
				this.parent_code=p_code;
	}
	
	
	  
	  
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getMenu_code() {
		return menu_code;
	}
	public void setMenu_code(String menuCode) {
		menu_code = menuCode;
	}
	public String getModule_code() {
		return module_code;
	}
	public void setModule_code(String moduleCode) {
		module_code = moduleCode;
	}
}
