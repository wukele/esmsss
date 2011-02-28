package com.admin.page.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.admin.page.struct.MenuTreeNode;
import com.ems.dao.EmsDao;


 @Component("PageMenuDao")
public class PageMenuDao extends EmsDao {

	public List<MenuTreeNode> getSysModuleNodes() {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("select   new com.admin.page.struct.MenuTreeNode( sm.moduleName, 0, sm.moduleCode)" +
				" from  InfoSysModule  as sm");
	}

	public List<MenuTreeNode> getFristMenus(String moduleCode) {
		// TODO Auto-generated method stub
		
		return  getHibernateTemplate().find("select  new  com.admin.page.struct.MenuTreeNode(im.menuCode, im.moduleCode,  im.menuTitle ," +
				" case   when  (select  count(*)  from  InfoMenu  as m  where  m.parentMenuCode=im.menuCode)>0  then 0  else  1 end)  from  InfoMenu  as im  where  im.moduleCode=?", moduleCode);
	}

	public List<MenuTreeNode> getNodeMenus(String menuCode, String moduleCode) {
		// TODO Auto-generated method stub
		return  getHibernateTemplate().find("select  new  com.admin.page.struct.MenuTreeNode(im.menuCode, im.moduleCode,  im.menuTitle ," +
				" case   when  (select  count(*)  from  InfoMenu  as m  where  m.parentMenuCode=im.menuCode)>0  then 0  else  1 end)  from  InfoMenu  as im  where  im.moduleCode=? " +
				" and im.parentMenuCode=?", new String[]{menuCode,moduleCode});
	}
	 		
	 		
}
