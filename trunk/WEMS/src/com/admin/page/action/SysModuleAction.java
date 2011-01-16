package com.admin.page.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.SysModuleService;
import com.entries.ulp.InfoSysModule;
import com.opensymphony.xwork2.ActionSupport;

@Component("SysModuleAction")
@Scope("prototype")
public class SysModuleAction extends ActionSupport {

	private List<InfoSysModule> modules;
	private InfoSysModule sm;
	private SysModuleService sysModuleService;
	private List<String> moudle_codes;
	private String isActive;
	private String returnMsg;
	private int returnNo;
	  
	public String getIsActive() {
		return isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	public void setSm(InfoSysModule sm) {
		this.sm = sm;
	}

	public List<InfoSysModule> getModules() {
		return modules;
	}
	
	public String getReturnMsg() {
		return returnMsg;
	}

	public void setReturnMsg(String returnMsg) {
		this.returnMsg = returnMsg;
	}

	@Resource(name = "SysModuleService")
	public void setSysModuleService(SysModuleService sysModuleService) {
		this.sysModuleService = sysModuleService;
	}

	public InfoSysModule getSm() {
		return sm;
	}

	public SysModuleService getSysModuleService() {
		return sysModuleService;
	}

	public void setModules(List<InfoSysModule> modules) {
		this.modules = modules;
	}

	public List<String> getMoudle_codes() {
		return moudle_codes;
	}

	public void setMoudle_codes(List<String> moudleCodes) {
		moudle_codes = moudleCodes;
	}
	
	
	/**
	 * ��ϵͳѯ��ѯ
	 * @return
	 */
	public String SysModuleActionQry() {
		modules = sysModuleService.QueryAllModules();
		return SUCCESS;
	}

	/**
	 * ������ϵͳ
	 * 
	 * @return
	 */
	public String SysModuleActionAdd() throws IOException{
		String msg;
		HttpServletResponse response=ServletActionContext.getResponse();
		PrintWriter out=response.getWriter();
		response.setContentType("text/html; charset=GBK");
		if(isActive.equals("��")){
			sm.setIsActive(1);
		}
		if (isActive.equals("��")) {
			sm.setIsActive(0);
		}
		try {
			if(sysModuleService.AddModules(sm)){
				 msg="{success:true}";
				out.print(msg);
			}else{
				msg="{success:false}";
				out.print(msg);
			}
			
		} catch (RuntimeException e) {
			returnMsg = e.getMessage();
			out.close();
			throw e;
		}
		
		returnMsg = "���ӳɹ� ";
		return null;
	}

	/**
	 * ɾ����ϵͳ
	 * 
	 * @return
	 */
	public String SysModuleActionDel() {
		try {
			sysModuleService.delModules(moudle_codes);
		} catch (RuntimeException e) {
			returnMsg = e.getMessage();
			returnNo=1;
			throw e;
		}
		returnNo=0;
		returnMsg = "ɾ��ִ�гɹ�";
		return SUCCESS;
	}
	
	
	
	public String SysModuleActionUpdateSearch(){
		modules=sysModuleService.updateSearch(sm.getModuleCode());
		return SUCCESS;
	}

	/**
	 * ������ϵͳ
	 */
	public String SysModuleActionUpdate() {
		HttpServletResponse response=ServletActionContext.getResponse();
		response.setContentType("text/html; charset=GBK");
		try {
			sysModuleService.updateModules(sm);
		} catch (RuntimeException e) {
			returnMsg = e.getMessage();
			returnNo=1;
			throw e;
		}
		returnMsg = "����ִ�гɹ�";
		return SUCCESS;
	}

}