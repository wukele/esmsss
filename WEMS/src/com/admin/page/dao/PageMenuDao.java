package com.admin.page.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.admin.page.struct.MenuTreeNode;
import com.admin.page.struct.PageResourceDataRuleStruct;
import com.admin.page.struct.PageResourceView;
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

	public List<PageResourceView> findCurrenPageRes(Integer pageId) {
		// TODO Auto-generated method stub
		return  getHibernateTemplate().find("select   new com.admin.page.struct.PageResourceView(pr.pageResource, pr.xtypeCode , cc.componentName , pr.valueId , pr.resourceLeft , pr.resourceTop) " +
				"from InfoPageResource  as  pr,InfoPage as  ip,CodeComponent  cc where  pr.pageResource= ip.pageResourceId  and  pr.xtypeCode = cc.codeXtype " +
				" and   ip.pageId=?",pageId);
	}

	public List<PageResourceDataRuleStruct> findCurrentPageData(Integer pageId) {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("select  new  com.admin.page.struct.PageResourceDataRuleStruct(" +
				"pr.resourceId,pr.pageResource,cc.componentName,rdd.valueId,dv.variableName,dt.deviceId,dt.deviceName,dt.deviceType) " +
				"from InfoPageResource  as  pr,InfoPage as  ip,CodeComponent  as  cc,RuleDataDevice  as rdd,DeviceVariable  as  dv,DeviceTable  as  dt " +
				"where  pr.pageResource= ip.pageResourceId  and  pr.xtypeCode = cc.codeXtype " +
				"and   pr.valueId = rdd.valueId  and   rdd.deviceValueId =  dv.deviceVariableId " +
				"and   dv.deviceId = dt.deviceId and  ip.pageId=?",pageId);
	}
	 		
	 		
}
