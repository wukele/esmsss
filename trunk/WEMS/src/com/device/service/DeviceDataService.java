package com.device.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.data.entity.RuleDataDevice;
import com.device.dao.DeviceDataDao;
import com.device.dao.DevicePageDao;


@Component("DeviceDataService")
public class DeviceDataService {
	
	private   DeviceDataDao   data_dao;
	private static final Log log = LogFactory.getLog(DeviceDataService.class);
	@Resource(name="DeviceDataDao")
	public void setData_dao(DeviceDataDao dataDao) {
		data_dao = dataDao;
	}

	public Integer qryDeviceIdByValueId(String valueId) {
		// TODO Auto-generated method stub
		List<RuleDataDevice>   rdds=data_dao.findRuleDevice(valueId);
		Integer  result=null;
		if(rdds==null  || rdds.size()<1){
					log.error("未查询到设备数据数据规则");
		}else{
						RuleDataDevice   rdd=rdds.get(0);
						try {
							result=Integer.valueOf(rdd.getDeviceNumber());
							log.info("设备导航:"+ result.intValue());
						} catch (Exception e) {
							// TODO: handle exception
							log.error(e.getMessage());
						}
		}
		
		return result;
	}

}
