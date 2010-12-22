package com.admin.user.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


import com.entries.ulp.InfoRole;
import com.entries.ulp.InfoRoleDao;
@Component("RoleService")
public class RoleService {
	    
	 	private InfoRoleDao  roleDao;
	 	@Resource(name="InfoRoleDao")
		public void setRoleDao(InfoRoleDao roleDao) {
			this.roleDao = roleDao;
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
}
