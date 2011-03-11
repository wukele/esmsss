package com.device.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.page.dao.BskpPageDao;
import com.data.entity.RuleDataDevice;
import com.device.dao.DevicePageDao;
import com.ems.entity.InfoDevicePage;
import com.ems.entity.InfoPageResource;
import com.page.entity.BspkDataDevice;
import com.page.entity.BspkInfoPage;
import com.page.entity.BspkPageResource;


@Component("DevPageBuilderService")
public class DevPageBuilderService {
	
	private   BskpPageDao   bspk_dao;
	
	private   DevicePageDao   dev_dao;
	
	private static final Log log = LogFactory.getLog(DevPageBuilderService.class);
	@Resource(name="BskpPageDao")
	public void setBspk_dao(BskpPageDao bspkDao) {
		bspk_dao = bspkDao;
	}
	
	@Resource(name="DevicePageDao")
	public void setDev_dao(DevicePageDao devDao) {
		dev_dao = devDao;
	}
	
	@Transactional
	public boolean BuildDevicePage(Integer bspkPageId, StringBuffer sb) {
		// TODO Auto-generated method stub
		boolean  result=false;
		BspkInfoPage   bpage=bspk_dao.findBspkPageByPageId(bspkPageId);
		InfoDevicePage   dp=new InfoDevicePage();
		dp.setPageName(bpage.getBspkPageName());
		dp.setOperCode(bpage.getBspkOperCode());
		dp.setPageImageUrl(bpage.getBspkImagePath());
		dp.setPageType("D");
		dp.setPageImageHeight(bpage.getBspkImageWidth());
		dp.setPageImageWidth(bpage.getBspkImageWidth());
		String pageResource=GetPageResource();
		log.info("新增页面资源ID:"+pageResource);
		dp.setPageResourceId(pageResource);
		
		//获取页面组件
		List<BspkPageResource>   bprs=bspk_dao.findBspkPageResource(bpage.getBspkPageResource());
		
		//获取页面数据关系
		List<BspkDataDevice>   bd=bspk_dao.findBindRule(bpage.getBspkPageId());
		
		
		try{
			dev_dao.SavaDevicePage(dp);
			
			//添加页面组件
			for(int  i=0;i<bprs.size();i++){
						InfoPageResource  ipr=new InfoPageResource();
						BspkPageResource  br=bprs.get(i);
						ipr.setBaseCls(br.getBaseCls());
						ipr.setConfig(br.getConfig());
						ipr.setPageResource(pageResource);
						ipr.setResourceHeight(br.getResourceHeight());
						ipr.setResourceWidth(br.getResourceWidth());
						ipr.setResourceLeft(br.getResourceLeft());
						ipr.setResourceTop(br.getResourceTop());
						ipr.setValueId(br.getValueId());
						ipr.setXtypeCode(br.getXtypeCode());
						
						dev_dao.addInfoPageResource(ipr);
			}
			//添加组件数据绑定关系
			for(int  i=0;i<bd.size();i++){
						RuleDataDevice  rdd=new RuleDataDevice();
						BspkDataDevice  bdd=bd.get(i);
						rdd.setDeviceValueId(bdd.getDeviceValueId());
						rdd.setDeviceNumber(bdd.getDeviceNumber());
						rdd.setValueId(bdd.getValueId());
						
						dev_dao.addRuleDataDevice(rdd);
			}
			
			result=true;
			
			log.info("新增页面成功");
			
		}catch(Exception e){
			String        message=e.getMessage();
			log.error("新增页面失败:"+ e.getMessage());
			throw new RuntimeException(message);
		}
		
		
		return  result;
	}

	private String GetPageResource() {
		// TODO Auto-generated method stub
		String  temp=RandomStringUtils.random(4, true, false).toUpperCase()+RandomStringUtils.random(4, false,true);
		if(dev_dao.checkUniPageResource(temp)){
					return   temp;
		}else{
					return GetPageResource();
		}
	}

}
