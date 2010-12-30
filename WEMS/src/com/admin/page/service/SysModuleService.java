package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.entries.ulp.InfoSysModule;
import com.entries.ulp.InfoSysModuleDAO;

@Component("SysModuleService")
public class SysModuleService {
			private   InfoSysModuleDAO    sysModuleDao;
			
			@Resource(name="InfoSysModuleDAO")
			public void setSysModuleDao(InfoSysModuleDAO sysModuleDao) {
				this.sysModuleDao = sysModuleDao;
			}
			
			public   List<InfoSysModule>   QueryAllModules(){
				return  sysModuleDao.findAll();
			}
}
