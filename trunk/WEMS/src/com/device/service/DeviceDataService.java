package com.device.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.alarm.entity.AlarmOperate;
import com.data.entity.RuleDataDevice;
import com.device.dao.DeviceDataDao;
import com.device.dao.DevicePageDao;
import com.device.struct.DataStatusStruct;


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

	public List<DataStatusStruct> CheckDeviceStatus(String values) {
		// TODO Auto-generated method stub
		List<RuleDataDevice>    deviceIds=data_dao.qryDeviceIdByEngine(values);
		if(deviceIds != null &&  deviceIds.size() >0){
							List<DataStatusStruct>    statuses=new ArrayList<DataStatusStruct>();
							for(int  i=0;i<deviceIds.size();i++){
											DataStatusStruct   dss=new DataStatusStruct();
											String deviceId=deviceIds.get(i).getDeviceNumber();
											dss.setDevice_id(deviceId);
											dss.setValue_id(deviceIds.get(i).getValueId());
											 Integer   intdevice=null;
											try {
												    intdevice=Integer.valueOf(deviceId);
											} catch (Exception e) {
													log.error("设备ID转换错误:"+e.getMessage());
													continue;
											}
											if(checkAlarmDev(intdevice,dss)){
													log.info("设备报警:"+dss.getDevice_id()+"=="+dss.getStatus_message());
													statuses.add(dss);
													continue;
											}else{
													dss.setStatus_code("0");
													dss.setStatus_message("设备工作正常");
													statuses.add(dss);
											}
											
							}
							return  statuses;			
		}
		
		
		return null;
	}

	private boolean checkAlarmDev(Integer intdevice, DataStatusStruct dss) {
		// TODO Auto-generated method stub
		List<AlarmOperate>   alarms=data_dao.qryAlarmByDeviceId(intdevice);
		if(alarms!=null  &&  alarms.size()>0){
							AlarmOperate  ao=alarms.get(0);
							dss.setDevice_var_id(ao.getDeviceVariableId());
							dss.setStatus_code("3");
							dss.setStatus_message(ao.getAlarmOperateResult());
							return   true;
		}else{
			return false;
		}
	}

	

}
