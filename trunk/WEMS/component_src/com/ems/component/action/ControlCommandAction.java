package com.ems.component.action;



import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ems.data.dao.ControlCommandDAO;
import com.entries.ulp.ControlCommand;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Component("ControlCommandAction")
@Scope("prototype")
public class ControlCommandAction extends ActionSupport implements ServletRequestAware {
	private static final Log log = LogFactory.getLog(ControlCommandAction.class);
	private HttpServletRequest  request;
	/**
	 * 
	 */
	/*分页用的3个属性*/
	private int totalProperty=0;
	private int start=0;
	private int limit=10;
	private int ret=0;
	private String msg="";
	
	
	private ControlCommandDAO controlCommandDao;
	private ControlCommand controlCommand;
	
	
	public String insertControlCommand(){
		controlCommand.setControlLogId("1");
		controlCommand.setDeviceVariableId("1");
		controlCommand.setSetupTime("1");
		controlCommand.setLoseEfficacyTime("1");
		controlCommand.setSetupPersonnel("1");
		controlCommand.setStatus("1");
		controlCommand.setStatusTime("1");
		try {
			controlCommandDao.insertControlCommand(controlCommand);
		} catch (Throwable e) {
			setRet(1);
			setMsg("insertInfoDept failed..."+e.getMessage());
			log.error(getMsg());
		}
		return  SUCCESS;
	}
	
	
	public void setRet(int ret) {
		this.ret = ret;
	}

	public int getRet() {
		return ret;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}


	public void setServletRequest(HttpServletRequest request) {
		// TODO Auto-generated method stub
		setRequest(request);
	}
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}


	@Resource(name="ControlCommandDAO")
	public void setControlCommandDao(ControlCommandDAO controlCommandDao) {
		this.controlCommandDao = controlCommandDao;
	}
	


	public void setControlCommand(ControlCommand controlCommand) {
		this.controlCommand = controlCommand;
	}


	public ControlCommand getControlCommand() {
		return controlCommand;
	}


	public void setTotalProperty(int totalProperty) {
		this.totalProperty = totalProperty;
	}


	public int getTotalProperty() {
		return totalProperty;
	}


	public void setStart(int start) {
		this.start = start;
	}


	public int getStart() {
		return start;
	}


	public void setLimit(int limit) {
		this.limit = limit;
	}


	public int getLimit() {
		return limit;
	}



}
