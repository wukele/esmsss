package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.entries.ulp.InfoSysModule;
import com.entries.ulp.InfoSysModuleDAO;

@Component("SysModuleService")
public class SysModuleService {
	private InfoSysModuleDAO sysModuleDao;

	@Resource(name = "InfoSysModuleDAO")
	public void setSysModuleDao(InfoSysModuleDAO sysModuleDao) {
		this.sysModuleDao = sysModuleDao;
	}

	public List<InfoSysModule> QueryAllModules() {
		return sysModuleDao.findAll();
	}

	/**
	 * �����ϵͳ
	 * @param sm
	 */
	@Transactional
	public void AddModules(InfoSysModule sm) {
		sysModuleDao.save(sm);
	}
	
	/**
	 * ����ɾ����ϵͳ
	 * @param module_codes
	 */
	@Transactional
	public void delModules(List<String> module_codes){
		if(module_codes==null || module_codes.size()==0){
			throw new RuntimeException("ϵͳ�б�Ϊ��");
		}
		for (String module_code : module_codes) {
			InfoSysModule moudle=new InfoSysModule();
			moudle.setModuleCode(module_code);
			sysModuleDao.delete(moudle);
		}
	}
	
	public void updateModules(InfoSysModule sm){
		sysModuleDao.update(sm);
	}
}
