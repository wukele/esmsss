package com.device.action;

import org.springframework.stereotype.Component;

import com.opensymphony.xwork2.ActionSupport;


@Component("DeviceStateEngine")
public class DeviceStateEngine extends ActionSupport {
				private String name;
				private String values;
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
							
							return   SUCCESS;
				}
}
