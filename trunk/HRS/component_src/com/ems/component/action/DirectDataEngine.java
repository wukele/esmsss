package com.ems.component.action;

import com.opensymphony.xwork2.ActionSupport;

public class DirectDataEngine extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7207204941229237867L;
	
	private String page_id;
	
	public String getPage_id() {
		return page_id;
	}

	public void setPage_id(String pageId) {
		page_id = pageId;
	}

	public  String  execute(){
		System.out.println("request");
		return SUCCESS;
	}
}
