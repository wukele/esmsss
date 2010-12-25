package com.admin.user.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;



import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoRole;
import com.entries.ulp.InfoRoleDao;
import com.entries.ulp.RuleRoleFunc;

@Component("RoleService")
public class RoleService {
	    
	 	private InfoRoleDao  roleDao;
	 	@Resource(name="InfoRoleDao")
		public void setRoleDao(InfoRoleDao roleDao) {
			this.roleDao = roleDao;
		}
	 	
	 	public List<InfoMenu> getRoleMenus(String role_code){
	 		  return  roleDao.findRoleMenuByRoleCode(role_code);
	 	}
	 	
	 	public List<InfoMenu> getOperMenu(String operNo){
	 		 return roleDao.findRoleMenuWithOper(operNo);
	 	}
	 	
	  
		public  List<InfoRole>   queryInfoRoles(String role_code,String  role_name){
			   List<InfoRole>   rs=null;
				if("".equals(role_code)  &&  "".equals(role_name)){
							rs=roleDao.findAllinfoRole();
				}else{
							rs=roleDao.findInfoRolebyRoleCodeOrName(role_code, role_name);
				}
			   return rs;
		}
		
		@Transactional
		public  void  AddRoleMenu(String role_code,String  menu_code){
				RuleRoleFunc   rrf=new RuleRoleFunc();
				rrf.setEntityCode(menu_code);
				rrf.setEntityType("M");
				rrf.setRoleCode(role_code);
				roleDao.saveRuleRoleFunc(rrf);
		}
		
		
}
