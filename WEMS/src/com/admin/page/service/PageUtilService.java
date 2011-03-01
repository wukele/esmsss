package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.page.dao.PageUtilDao;
import com.admin.page.struct.RealTimeDeviceDataStruct;
import com.ems.entity.DeviceTable;
import com.ems.entity.InfoPage;

@Component("PageUtilService")
public class PageUtilService {
	     
	    private  PageUtilDao  uDao; 
		
		 public  List<RealTimeDeviceDataStruct>  GetRealTimeDeviceData(){
			 			return uDao.findAllRealTimeData();
		 }

		 @Resource(name="PageUtilDao")
		public void setuDao(PageUtilDao uDao) {
			this.uDao = uDao;
		}

		public List<DeviceTable> GetDeviceInfo() {
			// TODO Auto-generated method stub
			
			return   uDao.findDeviceTable();
		}

		public List<RealTimeDeviceDataStruct> GetRealTimeDeviceDataBYDev(
				Integer deviceId) {
			// TODO Auto-generated method stub
			return uDao.findRealTimeDeviceDataBYDev(deviceId);
		}

		public List<InfoPage> QryInfoPageA() {
			// TODO Auto-generated method stu
			
			return uDao.findInfoPageA();
		}
}
