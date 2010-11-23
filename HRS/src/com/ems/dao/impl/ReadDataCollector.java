package com.ems.dao.impl;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ems.dao.IReadDataConllector;
import com.ems.entity.RealTimeData;

public class ReadDataCollector extends HibernateDaoSupport implements
		IReadDataConllector {

	public List<RealTimeData> GetRealTimeDataByValueId(List<String> values) {
		// TODO Auto-generated method stub
		
		return null;
	}

	public List<RealTimeData> findRealtimedataByDE(String deCode) {
		// TODO Auto-generated method stub
		
		
		
		return null;
	}

}
