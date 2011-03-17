package com.device.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.alarm.entity.AlarmOperate;
import com.data.entity.RuleDataDevice;
import com.ems.dao.EmsDao;

@Component("DeviceDataDao")
public class DeviceDataDao extends EmsDao {

	public List<RuleDataDevice> findRuleDevice(String valueId) {
		// TODO Auto-generated method stub
		
		return getHibernateTemplate().find("from  RuleDataDevice  where valueId=?",valueId);
	}

	public List<RuleDataDevice> qryDeviceIdByEngine(String values) {
		// TODO Auto-generated method stub
		return  getHibernateTemplate().find("select rdd " +
				"from RuleEngineData  as red, " +
				"RuleDataDevice  as rdd  where rdd.valueId = red.valueId  and  red.engineCode=?", values);
	}

	public List<AlarmOperate> qryAlarmByDeviceId(Integer intdevice) {
		// TODO Auto-generated method stub
		return  getHibernateTemplate().find("select  ao  from  DeviceVariable  as dv," +
				"AlarmOperate as ao where  dv.deviceVariableId = ao.deviceVariableId " +
				"and  dv.deviceId=?",intdevice);
	}
			
}
