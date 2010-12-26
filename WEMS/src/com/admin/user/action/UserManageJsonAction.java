package com.admin.user.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.user.service.UserService;
import com.entries.ulp.InfoOper;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Component("UserManageJsonAction")
@Scope("prototype")
public class UserManageJsonAction extends ActionSupport {
	private InfoOper user;
	private List<InfoOper> lstUser;
	private UserService userService;
	private int errorCode;
	private String errorMsg;

	/**
	 * ����û�
	 * 
	 * @return
	 * @throws Exception
	 */
	public String addUser() throws Exception {
		if (user == null)
			throw new RuntimeException("user [InfoOper] is null!");
		errorCode = userService.appendUser(user);
		errorMsg = userService.getErrorMsg();
		return SUCCESS;
	}

	/**
	 * �û���ѯ
	 * 
	 * @return
	 * @throws Exception
	 */
	public String queryUser() throws Exception {
		if (user == null)
			user = new InfoOper();
		lstUser = userService.findUsers(user.getOperNo(), user.getOperName());

		return SUCCESS;
	}

	/**
	 * �޸��û�
	 * 
	 * @return
	 * @throws Exception
	 */
	public String modifyUser() throws Exception {
		if (user == null)
			throw new RuntimeException("user [InfoOper] is null!");
		errorCode = userService.modifyUser(user);
		errorMsg = userService.getErrorMsg();

		return SUCCESS;
	}

	public InfoOper getUser() {
		return user;
	}

	/**
	 * ɾ������ʧЧ�û�
	 * 
	 * @throws Exception
	 * @author yunlong.yuan time 2010.12.25
	 */
	public String delOrDenialUser() throws Exception {
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/JSON;charset=GBK");
		response.setHeader("Cache-Control", "no-cache");
		HttpServletRequest request = ServletActionContext.getRequest();
		String operNo = request.getParameter("operNo");
		String flag = request.getParameter("flag");
		user=new InfoOper();
		if (flag.equals("ɾ��")) {
			user.setOperNo(operNo);
			user.setRegionId("0");
			user.setDealType("0");
			user.setStatisticalDeptNo("999999");
			userService.removeUser(user);
			return SUCCESS;
		} else if (flag.equals("ʧЧ")) {
			user.setOperNo(operNo);
			user.setFlag(1);
			user.setRegionId("0");
			user.setDealType("0");
			user.setStatisticalDeptNo("999999");
			userService.accessDenial(user);
			return SUCCESS;
		}
		return null;
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUser(InfoOper user) {
		this.user = user;
	}

	@Resource(name = "UserService")
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public List<InfoOper> getLstUser() {
		return lstUser;
	}

	public void setLstUser(List<InfoOper> lstUser) {
		this.lstUser = lstUser;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public int getErrorCode() {
		return errorCode;
	}
}
