package com.environment.action;

import org.apache.log4j.Logger;

import com.opensymphony.xwork2.ActionSupport;

public class RoomTemparateAction extends ActionSupport {
			/**
	 * 
	 */
	private static final long serialVersionUID = 688188246175078524L;

			public  String  execute(){
						Logger.getLogger("").info("RoomTemparateAction");
						return SUCCESS;
			}
}
