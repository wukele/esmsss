package com.device.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.data.entity.RuleDataDevice;
import com.ems.dao.EmsDao;

@Component("DeviceDataDao")
public class DeviceDataDao extends EmsDao {

	public List<RuleDataDevice> findRuleDevice(String valueId) {
		// TODO Auto-generated method stub
		
		return getHibernateTemplate().find("from  RuleDataDevice  where valueId=?",valueId);
	}
			
}
