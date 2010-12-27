package com.admin.user.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.ems.dao.impl.InfoDeviceDao;
import com.ems.entity.DeviceTable;

@Component("RoleDeviceService")
public class RoleDeviceService {
	
	private InfoDeviceDao   devDao;
	@Resource(name="InfoDeviceDao")
	public void setDevDao(InfoDeviceDao devDao) {
		this.devDao = devDao;
	}

	public   List<DeviceTable>  QueryAllDevice(){
			return  devDao.findAllInfoDevice();
	}
}
