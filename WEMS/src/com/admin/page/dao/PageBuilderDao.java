package com.admin.page.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.data.entity.RuleDataDevice;
import com.ems.dao.EmsDao;
import com.ems.entity.InfoDevicePage;
import com.ems.entity.InfoPage;
import com.ems.entity.InfoPageResource;

@Component("PageBuilderDao")
public class PageBuilderDao extends EmsDao {

	public boolean checkUniPageResource(String temp) {
		// TODO Auto-generated method stub
		List  l=getHibernateTemplate().find("from InfoPageResource where pageResource=?", temp);
		if(l!=null && l.size()>0){
					return false;
		}else{
					return true;
		}
	}

	public void addInfoPage(InfoPage info) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(info);
	}

	public void addInfoPageResource(InfoPageResource ipr) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(ipr);
	}

	public void addRuleDataDevice(RuleDataDevice rdd) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(rdd);
	}

	public void AddInfoDevicePage(InfoDevicePage dp) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(dp);
	}
		
}
