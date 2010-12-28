package com.admin.user.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.user.action.CommKeyUserAdmin;
import com.ems.dao.impl.InfoDeviceDao;
import com.ems.entity.DeviceTable;
import com.entries.ulp.RuleRoleFunc;

@Component("RoleDeviceService")
public class RoleDeviceService {
	private static final Log log = LogFactory.getLog(RoleDeviceService.class);
	private InfoDeviceDao   devDao;
	@Resource(name="InfoDeviceDao")
	public void setDevDao(InfoDeviceDao devDao) {
		this.devDao = devDao;
	}

	public   List<DeviceTable>  QueryAllDevice(){
			return  devDao.findAllInfoDevice();
	}
	@Transactional
	public List<DeviceTable> QueryRoleDevice(String roleCode){
			return  devDao.findRoleDevice(roleCode);
	}
	
	public int  AddRoleDevice(RuleRoleFunc  rrf){
		int    res=1;
		try{
			devDao.SaveRoleDevice(rrf);
			res=CommKeyUserAdmin.CODE_SUCCESS;
			log.info("设备角色加入成功");
		}catch(RuntimeException e){
			log.error("设备角色加入失败:"+e.getMessage());
		}
	    return  res;
	}
	@Transactional
	public int DelRoleDevice(RuleRoleFunc rrf){
		int  res=1;
		try{
			devDao.removeRoleDevice(rrf);
			res=CommKeyUserAdmin.CODE_SUCCESS;
			log.info("设备角色删除成功");
		}catch(RuntimeException e){
			log.error("设备角色删除失败:"+e.getMessage());
		}
		return res;
	}
	
	
	
}