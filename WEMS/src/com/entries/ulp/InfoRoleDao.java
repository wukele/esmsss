package com.entries.ulp;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
@Component("InfoRoleDao")
public class InfoRoleDao extends EmsDao {
			public  List<InfoRole>  findAllinfoRole(){
							return  getHibernateTemplate().find("from InfoRole");
			}
			
			public  List<InfoRole>  findInfoRolebyRoleCodeOrName(String roleCode,String roleName){
							String  queryStr="from  InfoRole  as r where " +
									"r.roleCode=? or  r.roleName=?";
							return getHibernateTemplate().find(queryStr, new String[]{roleCode,roleName});
			}
}
