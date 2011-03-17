package com.device.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.device.service.DeviceDataService;
import com.opensymphony.xwork2.ActionSupport;

@Component("EmsHotAreaNav")
@Scope("prototype")
public class EmsHotAreaNav extends ActionSupport {
				
				private  Integer  device_id;
				
				private  DeviceDataService    dev_serv;
				
				private  String  value_id;
			
				public   String  NavToEmsPage(){
							device_id=dev_serv.qryDeviceIdByValueId(value_id);
							if(device_id==null){
										return  CommDevKey.DEV_PAGE_NOT_FOUND;
							}else{
										return   SUCCESS;
							}
					
				}

				public Integer getDevice_id() {
					return device_id;
				}

				public void setDevice_id(Integer deviceId) {
					device_id = deviceId;
				}

				public String getValue_id() {
					return value_id;
				}

				public void setValue_id(String valueId) {
					value_id = valueId;
				}
				@Resource(name="DeviceDataService")
				public void setDev_serv(DeviceDataService devServ) {
					dev_serv = devServ;
				}
}
