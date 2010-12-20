package com.ems.data.dao.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

import com.component.BaseComponent;
import com.ems.dao.EmsDao;
import com.ems.data.dao.IPageResourcesManager;
import com.ems.entity.InfoPage;
import com.ems.entity.InfoPageResource;
@Component("EmsPageRourceManager")
public class EmsPageRourceManager extends EmsDao implements
		IPageResourcesManager {

	public List<String> GetPageScripts(String menuCode) {
		// TODO Auto-generated method stub
		String  queryScript="select distinct cres.scriptUrl " +
				"from InfoPage as page," +
				"InfoPageResource  as pres," +
				"CodeComponent as code," +
				"ComponentResourceCode as cres " +
				"where page.pageResourceId=pres.pageResource " +
				"and pres.xtypeCode=code.codeXtype " +
				"and code.componentResourceId=cres.componentResourceId " +
				"and cres.needScript=1 " +
				"and page.menuCode=?";
		List<String > js=this.getHibernateTemplate().find(queryScript, menuCode);
		
		return js;
	}

	public InfoPage GetCurrentPage(String menuCode) {
		List<InfoPage>  page=(List<InfoPage>)this.getHibernateTemplate().find("from InfoPage " +
				"where menuCode=?", menuCode);
		return page.get(0);
	}

	public List<BaseComponent> GetPageComponent(String pageResource) {
		// TODO Auto-generated method stub
		List<InfoPageResource>  pageRes=this.getHibernateTemplate().find("from InfoPageResource where" +
				" pageResource=?",pageResource);
		if(pageRes==null){
					return null;
		}else{
			List<BaseComponent>    comps=new ArrayList<BaseComponent>();
			for(int  i=0;i<pageRes.size();i++){
							BaseComponent  cp=new BaseComponent();
							InfoPageResource  res=pageRes.get(i);
							cp.setHeight(res.getResourceHeight());
							cp.setWidth(res.getResourceWidth());
							cp.setXtype(res.getXtypeCode());
							cp.setX(res.getResourceLeft());
							cp.setY(res.getResourceHeight());
							cp.setId(res.getValueId());
							comps.add(cp);
			}
			
			return comps;
		}
	}

}
