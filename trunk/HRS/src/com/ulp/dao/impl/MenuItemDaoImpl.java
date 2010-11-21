package com.ulp.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoOper;
import com.entries.ulp.InfoSysModule;
import com.ui.TreeMenuItems;
import com.ulp.dao.MenuItemDao;

public class MenuItemDaoImpl extends HibernateDaoSupport implements MenuItemDao {

	public List<InfoMenu> QueryOperCMenuItem(InfoOper oper, String parentCode) {
		// TODO Auto-generated method stub
			String QueryCMenu="select new InfoMenu(m.menuCode,m.moduleCode," +
					"m.menuUrl,m.menuCol,m.menuRow,m.isshow,m.menuTitle,m.isactive)" +
					" from InfoMenu as m,RuleOperRole as rr,RuleRoleFunc as rf" +
					" where rf.roleCode=rr.roleCode and rf.entityType='M' and rf.entityCode=m.menuCode and m.isactive=1 " +
					" and rr.operNo=?  and  m.parentMenuCode=";
			List<InfoMenu>  list=null;
			if(parentCode==null  || parentCode.equals("") || parentCode==""){
						QueryCMenu+="null";
						 list=
								getHibernateTemplate().find(QueryCMenu,new Object[]{oper.getOperNo()});
			}else{
				QueryCMenu+="?";
				 list=
						getHibernateTemplate().find(QueryCMenu,new Object[]{oper.getOperNo(),parentCode});
			}
			
			return  list;
	}

	public boolean hasChidren(InfoOper oper, String parentCode) {
		// TODO Auto-generated method stub
		int  count=0;
		boolean  res=false;
		String QueryCMenu="select new map(count(*) as cnt) " +
		" from InfoMenu as m,RuleOperRole as rr,RuleRoleFunc as rf" +
		" where rf.roleCode=rr.roleCode and rf.entityType='M' and rf.entityCode=m.menuCode and m.isactive=1" +
		" and rr.operNo=?  and  m.parentMenuCode=";
		List<Map<String, Integer>>  list=null;
		if(parentCode==null  || parentCode.equals("") || parentCode==""){
					QueryCMenu+="null";
					 list=
							getHibernateTemplate().find(QueryCMenu,new Object[]{oper.getOperNo()});
		}else{
			QueryCMenu+="?";
			 list=
					getHibernateTemplate().find(QueryCMenu,new Object[]{oper.getOperNo(),parentCode});
		}
		count=list.get(0).get("cnt").intValue();
		if(count>0){
					res=true;
		}		
		return res;
	}

	public List<InfoSysModule> QueryOperModule(InfoOper oper) {
		// TODO Auto-generated method stub
		String QueryCMenu="select new InfoSysModule(md.moduleCode,md.moduleName) " +
				"from InfoSysModule as md where md.isActive=1 and md.moduleCode in(" +
				"select distinct m.moduleCode " +
		" from InfoMenu as m,RuleOperRole as rr,RuleRoleFunc as rf" +
		" where rf.roleCode=rr.roleCode and rf.entityType='M' and rf.entityCode=m.menuCode and m.isactive=1" +
		" and rr.operNo=?) ";
		List<InfoSysModule> modules=getHibernateTemplate().find(QueryCMenu, oper.getOperNo());	
		return modules;
	}

}
