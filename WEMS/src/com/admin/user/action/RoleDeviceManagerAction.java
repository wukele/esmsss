package com.admin.user.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;


import com.admin.user.service.RoleDeviceService;
import com.ems.entity.DeviceTable;
import com.entries.ulp.RuleRoleFunc;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Component("RoleDeviceManagerAction")
@Scope("prototype")
public class RoleDeviceManagerAction extends ActionSupport  implements  ServletRequestAware{
		private  RoleDeviceService  role_device_service;
		private  List<DeviceTable> devices;
		private  HttpServletRequest  request;
		private  String device_id;
		public int getErr_code() {
			return err_code;
		}

		public void setDevice_id(String deviceId) {
			device_id = deviceId;
		}

		private  int  start;
		private  int  limit;
		private  int  err_code;
		public void setStart(int start) {
			this.start = start;
		}

		public void setLimit(int limit) {
			this.limit = limit;
		}

		private  int  results;
		public int getResults() {
			return results;
		}

		private  String role_code;
		
		
		public void setRole_code(String roleCode) {
			role_code = roleCode;
		}

		@Resource(name="RoleDeviceService")
		public void setRole_device_service(RoleDeviceService roleDeviceService) {
			role_device_service = roleDeviceService;
		}
		
		public  String  RoleDeviceManagerActionQryDevice(){
			HttpSession   session=request.getSession();
			if(session.getAttribute(CommKeyUserAdmin.ALL_DEVICES)==null){
						devices=role_device_service.QueryAllDevice();
						session.setAttribute(CommKeyUserAdmin.ALL_DEVICES, devices);
			}else{
						devices=(List<DeviceTable>)session.getAttribute(CommKeyUserAdmin.ALL_DEVICES);
			}
		    results=devices.size();
		    int end=limit+start;
		    if(results<end){
		    		end=results;
		    }
		    devices=devices.subList(start, end);
			return  SUCCESS;
		}
		
		

		public List<DeviceTable> getDevices() {
			return devices;
		}
		
		public String   RoleDeviceManagerActionQryRoleDev(){
			/*HttpSession  session = request.getSession();
			if(role_code!=null && role_code!=""){
						//session.removeAttribute(CommKeyUserAdmin.ROLE_DEVICES);
						devices=role_device_service.QueryRoleDevice(role_code);
						session.setAttribute(CommKeyUserAdmin.ROLE_DEVICES, devices);
			}else{
						if(session.getAttribute(CommKeyUserAdmin.ROLE_DEVICES)!=null)
							devices=(List<DeviceTable>)session.getAttribute(CommKeyUserAdmin.ROLE_DEVICES);
						
			}*/
			devices=role_device_service.QueryRoleDevice(role_code);
			   results=devices.size();
			    int end=limit+start;
			    if(results<end){
			    		end=results;
			    }
			    devices=devices.subList(start, end);
			return SUCCESS;
		}
		
	
		public  String  RoleDeviceManagerActionAddDev(){
			RuleRoleFunc    rrf=new RuleRoleFunc();
			rrf.setEntityType("E");
			rrf.setRoleCode(role_code);
			rrf.setEntityCode(device_id);
			err_code=role_device_service.AddRoleDevice(rrf);
			return SUCCESS;
		}
		
		public  String  RoleDeviceManagerActionDelDev(){
			RuleRoleFunc    rrf=new RuleRoleFunc();
			rrf.setEntityType("E");
			rrf.setRoleCode(role_code);
			rrf.setEntityCode(device_id);
			err_code=role_device_service.DelRoleDevice(rrf);
			return SUCCESS;
		}
		

		public void setServletRequest(HttpServletRequest arg0) {
			// TODO Auto-generated method stub
			request=arg0;
		}
}
