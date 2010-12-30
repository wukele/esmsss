package com.admin.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
				role.setRegionId("1");
				role.setOperNo("1");
				roleDao.insertRole(role);
				log.debug("addRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				e.printStackTrace();
				throw e;
			}
		}
		
		/**
		 * 删除角色
		 * @param roleCode 角色代码
		 */
		@Transactional
		public void removeRole(String roleCode){
			log.debug("removeRole instance");
			try {
				roleDao.deleteRole(roleCode);
				log.debug("removeRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				e.printStackTrace();
				throw e;
			}
		}
		/**
		 * 批量删除角色
		 * @param aRoleCode 角色代码
		 */
		@Transactional
		public void removeRoles(String[] aRoleCode){
			log.debug("removeRole instance");
			try {
				if(aRoleCode==null || aRoleCode.length==0)
					throw new RuntimeException("aRoleCode is null");
				for(String roleCode:aRoleCode)
					roleDao.deleteRole(roleCode);
				log.debug("removeRole finish.");
			} catch (RuntimeException e) {
				log.error(e);
				e.printStackTrace();
				throw e;
			}
		}
		
		/**
		 * 修改角色
		 * @param role 角色实体
		 */
		@Transactional
		public void modifyRole(InfoRole role){
			log.debug("modifyRole instance");
			try {
				roleDao.updateRole(role);
				log.debug("modifyRole finish.");
			} catch (RuntimeException e) {
				log.error(e);
				e.printStackTrace();
				throw e;
			}
		}
		
		/**
		 * 批量无效化角色
		 * @param aRoleCode 角色代码
		 */
		@Transactional
		public void invaildateRoles(String[] aRoleCode){
			log.debug("invaildateRole instance");
			try {
				if(aRoleCode==null|| aRoleCode.length==0)
					throw new RuntimeException("aRoleCode is null");
				for(String roleCode:aRoleCode)
					roleDao.changeRoleStatus(roleCode, 0);
				log.debug("invaildateRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				throw e;
			}
		}
		
		/**
		 * 无效化角色
		 * @param roleCode 角色代码
		 */
		@Transactional
		public void invaildateRole(String roleCode){
			log.debug("invaildateRole instance");
			try {
				roleDao.changeRoleStatus(roleCode, 0);
				log.debug("invaildateRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				e.printStackTrace();
				throw e;
			}
		}
		/**
		 * 有效化角色
		 * @param roleCode 角色代码
		 */
		@Transactional
		public void vaildateRole(String roleCode){
			log.debug("vaildateRole instance");
			try {
				roleDao.changeRoleStatus(roleCode, 1);
				log.debug("vaildateRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				e.printStackTrace();
				throw e;
			}
		}
		@Transactional
		public void vaildateRoles(String[] aRoleCode){
			log.debug("invaildateRole instance");
			try {
				if(aRoleCode==null|| aRoleCode.length==0)
					throw new RuntimeException("aRoleCode is null");
				for(String roleCode:aRoleCode)
					roleDao.changeRoleStatus(roleCode, 1);
				log.debug("invaildateRole finish.");
			} catch (RuntimeException e) {
				log.error(e);	
				e.printStackTrace();
				throw e;
			}
		}
		/**
		 * 查询角色信息，条件皆为可选
		 * @param roleCode 角色代码
		 * @param roleName 角色名称
		 * @param roleLevel 角色级别
		 * @param isactive 是否激活
		 * @param roleType 角色类型
		 * @param comments 注释
		 * @return 角色信息列表
		 */
		public List<InfoRole> findRoles(String roleCode,String roleName,String roleLevel,
				Integer isactive,String roleType,String comments){
			log.debug("findRoles instance");
			Map<String, Object> map=new HashMap<String, Object>();
			List<InfoRole> lst=null;
			
			if(roleCode!=null && roleCode.trim().length()>0)
				map.put("roleCode", roleCode);
			if(roleName!=null && roleName.trim().length()>0)
				map.put("roleName", roleName);
			if(roleLevel!=null && roleLevel.trim().length()>0)
				map.put("roleLevel", roleLevel);
			if(roleType!=null && roleType.trim().length()>0)
				map.put("roleType", roleType);
			if(comments!=null && comments.trim().length()>0)
				map.put("comments", comments);
			if(isactive!=null)
				map.put("isactive", isactive);
			try {
				lst=roleDao.findRoleByMap(map);
				log.debug("findRoles finish.");
			} catch (RuntimeException e) {
				log.error(e);
				e.printStackTrace();
				throw e;
			}
			
			return lst;
		}
}
