package com.admin.user.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.user.service.RoleDeviceService;
import com.ems.entity.DeviceTable;
import com.opensymphony.xwork2.ActionSupport;

@Component("RoleDeviceManagerAction")
public class RoleDeviceManagerAction extends ActionSupport {
		private  RoleDeviceService  role_device_service;
		private  List<DeviceTable> devices;
		
		
		@Resource(name="RoleDeviceService")
		public void setRole_device_service(RoleDeviceService roleDeviceService) {
			role_device_service = roleDeviceService;
		}
		
		public  String  RoleDeviceManagerActionQryDevice(){
			devices=role_device_service.QueryAllDevice();
			return  SUCCESS;
		}

		public List<DeviceTable> getDevices() {
			return devices;
		}
}
