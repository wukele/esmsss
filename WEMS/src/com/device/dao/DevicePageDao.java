package com.device.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.data.entity.RuleDataDevice;
import com.ems.dao.EmsDao;

import com.ems.entity.InfoDevicePage;
import com.ems.entity.InfoPageResource;

@Component("DevicePageDao")
public class DevicePageDao extends EmsDao {

	public boolean checkUniPageResource(String temp) {
		// TODO Auto-generated method stub
		List l = getHibernateTemplate().find(
				"from InfoPageResource where pageResource=?", temp);
		if (l != null && l.size() > 0) {
			return false;
		} else {
			return true;
		}
	}

	public void addRuleDataDevice(RuleDataDevice rdd) {
		// TODO Auto-generated method stub
		try{
				getHibernateTemplate().save(rdd);
		}catch(Exception e){
				throw  new   RuntimeException(e.getMessage());
		}
	}

	public void addInfoPageResource(InfoPageResource ipr) {
		// TODO Auto-generated method stub
		try {
			getHibernateTemplate().save(ipr);
		} catch (Exception e) {
			// TODO: handle exception
			throw  new   RuntimeException(e.getMessage());
		}

	}

	public void SavaDevicePage(InfoDevicePage dp) {
		// TODO Auto-generated method stub
		try {
			getHibernateTemplate().save(dp);
		} catch (Exception e) {
			// TODO: handle exception
			throw  new   RuntimeException(e.getMessage());
		}
	}

}
