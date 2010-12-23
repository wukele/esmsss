package com.admin.user.action;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.opensymphony.xwork2.ActionSupport;
@Component("UserManageAction")
@Scope("prototype")
public class UserManageAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5786350748798769976L;
	private static final Logger log=Logger.getLogger(UserManageAction.class);
	public String displayUserMain() throws Exception{
		
		return SUCCESS;
	}

}
