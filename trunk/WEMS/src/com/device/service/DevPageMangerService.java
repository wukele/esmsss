package com.device.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.page.struct.PageResourceDataRuleStruct;
import com.admin.page.struct.PageResourceView;
import com.component.DataEngine;
import com.data.entity.InfoEngine;
import com.device.dao.DevicePageDao;
import com.ems.entity.DeviceTable;
import com.ems.entity.InfoDevicePage;
import com.ems.entity.InfoPageResource;


@Component("DevPageMangerService")
public class DevPageMangerService {
			private   DevicePageDao   dev_dao;

			public List<PageResourceView> QryPageCompById(Integer pageId) {
				// TODO Auto-generated method stub
				return   dev_dao.FindPageCompById(pageId);
				
			}
			
			@Resource(name="DevicePageDao")
			public void setDev_dao(DevicePageDao devDao) {
				dev_dao = devDao;
			}

			public List<PageResourceDataRuleStruct> QryPageDataRule(
					Integer pageId) {
				// TODO Auto-generated method stub
				return  dev_dao.FindPageDataRule(pageId);
			}
			
			@Transactional
			public boolean LinkPageDevice(Integer pageId, Integer deviceId) {
				// TODO Auto-generated method stub
				InfoDevicePage   idp=dev_dao.FindDevPageByPid(pageId);
				DeviceTable   dt=dev_dao.FindDevById(deviceId);
				idp.setDeviceId(dt.getDeviceId());
				idp.setDeviceType(dt.getDeviceType());
				dev_dao.margeDevpage(idp);
				
				return true;
			}

			public boolean delinkPage(Integer pageId) {
				// TODO Auto-generated method stub
				InfoDevicePage   idp=dev_dao.FindDevPageByPid(pageId);
				idp.setDeviceId(null);
				idp.setDeviceType(null);
				dev_dao.margeDevpage(idp);
				return true;
			}

			public InfoDevicePage QryDevPage(Integer deviceId) {
		
				InfoDevicePage   dp=dev_dao.findDevPage(deviceId);
				return  dp;
			}

			public List<String> qryScripts(String pageResourceId) {
				// TODO Auto-generated method stub
				return   dev_dao.findDevPageScript(pageResourceId);
			}

			public List<InfoPageResource> qryDevPageRes(String pageResourceId) {
				// TODO Auto-generated method stub
				return   dev_dao.findDevPageComp(pageResourceId);
			}

			public List<DataEngine> QryDevPageEngine(String pageResourceId) {
				// TODO Auto-generated method stub
				return  dev_dao.FindDevPageDE(pageResourceId);
			}
}
