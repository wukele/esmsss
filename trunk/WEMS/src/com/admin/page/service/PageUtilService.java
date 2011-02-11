package com.admin.page.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.admin.page.dao.PageUtilDao;
import com.admin.page.struct.RealTimeDeviceDataStruct;

@Component("PageUtilService")
public class PageUtilService {
	     
	    private  PageUtilDao  uDao; 
		
		 public  List<RealTimeDeviceDataStruct>  GetRealTimeDeviceData(){
			 			return uDao.findAllRealTimeData();
		 }

		 
		public void setuDao(PageUtilDao uDao) {
			this.uDao = uDao;
		}
}
