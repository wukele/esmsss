package com.ems.dao.impl;

import java.util.List;


import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ems.dao.IRealDataCollector;
import com.ems.entity.RealTimeData;

public class RealDataCollector extends HibernateDaoSupport implements
		IRealDataCollector {

	public List<RealTimeData> GetRealTimeDataByValueId(List<String> values) {
		// TODO Auto-generated method stub
		
		return null;
	}

	public List<RealTimeData> findRealtimedataByDE(String deCode) {
		// TODO Auto-generated method stub
		String queryData="select new RealTimeData(rtd.dataSn,rtd.deviceVarId,rtd.varPhyValue,rtd.varLogicValue,red.valueId) " +
				" from RealTimeData as rtd,RuleEngineData as red,RuleDataDevice as rdd" +
				" where red.valueId=rdd.valueId  and rtd.deviceVarId=rdd.deviceValueId and red.engineCode=?";
		
		return getHibernateTemplate().find(queryData, deCode);
	}

	

}
