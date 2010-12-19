package com.environment.action;

import org.apache.log4j.Logger;

import com.opensymphony.xwork2.ActionSupport;

public class TemphumidityMonitorAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5463572106873394220L;
	public String  execute(){
		Logger.getLogger("").info("TemphumidityMonitorAction");
		
		return SUCCESS;
	}
	
}
