package com.ems.component.action;

import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ActionSupport;

public class DirectDataEngine extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7207204941229237867L;
	
	private String page_id;

	private String type;
	private String name;
	private String values;
	
	public String getValues() {
		return values;
	}

	public void setValues(String values) {
		this.values = values;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public  String  execute(){
		type="event";
		name="message";
		
		System.out.println(values);
		return SUCCESS;
	}

	
}
