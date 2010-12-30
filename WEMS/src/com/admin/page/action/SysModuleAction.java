package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.page.service.SysModuleService;
import com.entries.ulp.InfoSysModule;
import com.opensymphony.xwork2.ActionSupport;
@Component("SysModuleAction")
public class SysModuleAction extends ActionSupport {
	   
	   private  List<InfoSysModule>   modules;
	
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
		
}
