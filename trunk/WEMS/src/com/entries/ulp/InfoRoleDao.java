package com.entries.ulp;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
@Component("InfoRoleDao")
public class InfoRoleDao extends EmsDao {
			public  List<InfoRole>  findAllinfoRole(){
							return  getHibernateTemplate().find("from InfoRole");
			}
			
			public  List<InfoMenu> findRoleMenuByRoleCode(String roleCode){
				String queryStr="select m from RuleRoleFunc as rrf," +
						"InfoMenu as m where rrf.roleCode=? and " +
						"rrf.entityType='M' and m.menuCode=rrf.entityCode";
				
				return getHibernateTemplate().find(queryStr,roleCode);
			}
			
			public List<InfoMenu>  findRoleMenuWithOper(String operNo){
				String queryStr="select m from RuleRoleFunc as rrf," +
						"InfoMenu as m,RuleOperRole as rr,where rrf.roleCode=" +
						"rr.roleCode and rrf.entityType='M' and m.menuCode=rrf.entityCode and " +
						"rr.operNo=?";
				return getHibernateTemplate().find(queryStr,operNo);
			}
			
			
			public  List<InfoRole>  findInfoRolebyRoleCodeOrName(String roleCode,String roleName){
							String  queryStr="from  InfoRole  as r where " +
									"r.roleCode=? or  r.roleName=?";
							return getHibernateTemplate().find(queryStr, new String[]{roleCode,roleName});
			}
}
