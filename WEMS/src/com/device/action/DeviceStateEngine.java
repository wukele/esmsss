package com.device.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.device.service.DeviceDataService;
import com.device.struct.DataStatusStruct;
import com.opensymphony.xwork2.ActionSupport;


@Component("DeviceStateEngine")
@Scope("prototype")
public class DeviceStateEngine extends ActionSupport {
				private String name;
				private String values;
				private DeviceDataService    dev_serv;
				private List<DataStatusStruct>   device_status;
				
				public String getName() {
					return name;
				}
				public void setName(String name) {
					this.name = name;
				}
				public String getValues() {
					return values;
				}
				public void setValues(String values) {
					this.values = values;
				}
				public String getType() {
					return type;
				}
				public void setType(String type) {
					this.type = type;
				}
				private String type;
				
				public   String   ChangeDeviceStatus(){
							type="event";
							name="status";
							device_status=dev_serv.CheckDeviceStatus(values);
							return   SUCCESS;
				}
				public List<DataStatusStruct> getDevice_status() {
					return device_status;
				}
				
				@Resource(name="DeviceDataService")
				public void setDev_serv(DeviceDataService devServ) {
					dev_serv = devServ;
				}
}
