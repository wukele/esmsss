package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.SysModuleService;
import com.entries.ulp.InfoSysModule;
import com.opensymphony.xwork2.ActionSupport;
@Component("SysModuleAction")
@Scope("prototype")
public class SysModuleAction extends ActionSupport {
	   
	   private  List<InfoSysModule>   modules;
	   private  String module_code;
	   public void setModule_code(String moduleCode) {
		module_code = moduleCode;
	}

	private  InfoSysModule   sm;
	
		public void setSm(InfoSysModule sm) {
		this.sm = sm;
	}

		public List<InfoSysModule> getModules() {
		return modules;
	}

		private  SysModuleService   sysModuleService;
		@Resource(name="SysModuleService")
		public void setSysModuleService(SysModuleService sysModuleService) {
			this.sysModuleService = sysModuleService;
		}
		
		public String  SysModuleActionQry(){
			modules=sysModuleService.QueryAllModules();
			return SUCCESS;
		}
		
		
		public String  SysModuleActionAdd(){
			sm.setModuleCode(module_code);
			sysModuleService.AddModules(sm);
			return SUCCESS;
		}
		
}
