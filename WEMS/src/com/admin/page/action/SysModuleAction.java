package com.admin.page.action;

import java.awt.print.Printable;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOExceptionWithCause;
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

	public String SysModuleActionQry() {
		modules = sysModuleService.QueryAllModules();
		return SUCCESS;
	}

	public List<String> getMoudle_codes() {
		return moudle_codes;
	}

	public void setMoudle_codes(List<String> moudleCodes) {
		moudle_codes = moudleCodes;
	}

	/**
	 * 添加子系统
	 * 
	 * @return
	 */
	public String SysModuleActionAdd() throws IOException{
		String msg;
		HttpServletResponse response=ServletActionContext.getResponse();
		PrintWriter out=response.getWriter();
		response.setContentType("text/html; charset=GBK");
		if(isActive.equals("是")){
			sm.setIsActive(1);
		}
		if (isActive.equals("否")) {
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
		
		returnMsg = "添加成功 ";
		return SUCCESS;
	}

	/**
	 * 删除子系统
	 * 
	 * @return
	 */
	public String SysModuleActionDel() {
		System.out.println("!!!!!!!!!!!!!!!! del");
		System.out.println("@@@@@@@@@@@@@"+ moudle_codes.size());
		System.out.println("@@@@@@@@@@@@@"+ moudle_codes.get(0));
		try {
			sysModuleService.delModules(moudle_codes);
		} catch (RuntimeException e) {
			returnMsg = e.getMessage();
			throw e;
		}
		returnMsg = "删除执行成功";
		return SUCCESS;
	}

	/**
	 * 更新子系统
	 */
	public String SysModuleActionUpdate() {
//		sm = new InfoSysModule();
//		sm.setModuleCode(module_code);
//		sm.setModuleIndex(module_index);
//		sm.setModuleName(module_name);
//		sm.setIsActive(is_active);
//		try {
//			sysModuleService.updateModules(sm);
//		} catch (Exception e) {
//			// TODO: handle exception
//		}
		return SUCCESS;
	}

}
