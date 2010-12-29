package com.admin.user.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;



import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoRole;
import com.entries.ulp.InfoRoleDao;
import com.entries.ulp.RuleRoleFunc;

@Component("RoleService")
public class RoleService {
	    private static final Logger log=Logger.getLogger(RoleService.class);
	    
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
		
		@Transactional
		public void  DelRoleMenu(String role_code,String menu_code){
			   roleDao.delRuleRoleFunc(role_code,menu_code);
		}
		
		/**
		 * 添加角色
		 * @param role 角色实体
		 */
		@Transactional
		public void addRole(InfoRole role){
			log.debug("addRole instance.");
			try {
				roleDao.insertRole(role);
				log.debug("addRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				throw e;
			}
		}
		
		/**
		 * 删除角色
		 * @param roleCode 角色代码
		 */
		public void removeRole(String roleCode){
			log.debug("removeRole instance");
			try {
				roleDao.deleteRole(roleCode);
				log.debug("removeRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				throw e;
			}
		}
		
		/**
		 * 修改角色
		 * @param role 角色实体
		 */
		public void modifyRole(InfoRole role){
			log.debug("modifyRole instance");
			try {
				roleDao.updateRole(role);
				log.debug("modifyRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				throw e;
			}
		}
		
		/**
		 * 无效化角色
		 * @param roleCode 角色代码
		 */
		public void invaildateRole(String roleCode){
			log.debug("invaildateRole instance");
			try {
				roleDao.invaildateRole(roleCode);
				log.debug("invaildateRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				throw e;
			}
		}
		
}
