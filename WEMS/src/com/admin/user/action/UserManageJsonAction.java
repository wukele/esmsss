package com.admin.user.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.user.service.UserService;
import com.entries.ulp.InfoOper;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Component("UserManageJsonAction")
public class UserManageJsonAction extends ActionSupport {
	private InfoOper user;
	private List<InfoOper> lstUser;
	private UserService userService;
	
	public String addUser() throws Exception{
		
		return SUCCESS;
	}
	
	public String queryUser() throws Exception{
		if(user==null)
			user=new InfoOper();
		lstUser=userService.findUsers(user.getOperNo(),user.getOperName());
		
		return SUCCESS;
	}

	public InfoOper getUser() {
		return user;
	}


	
	public UserService getUserService() {
		return userService;
	}

	public void setUser(InfoOper user) {
		this.user = user;
	}
	@Resource(name="UserService")
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public List<InfoOper> getLstUser() {
		return lstUser;
	}

	public void setLstUser(List<InfoOper> lstUser) {
		this.lstUser = lstUser;
	}
}
