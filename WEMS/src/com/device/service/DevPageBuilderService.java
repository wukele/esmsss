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
		log.info("����ҳ����ԴID:"+pageResource);
		dp.setPageResourceId(pageResource);
		
		//��ȡҳ�����
		List<BspkPageResource>   bprs=bspk_dao.findBspkPageResource(bpage.getBspkPageResource());
		
		//��ȡҳ�����ݹ�ϵ
		List<BspkDataDevice>   bd=bspk_dao.findBindRule(bpage.getBspkPageId());
		
		
		try{
			dev_dao.SavaDevicePage(dp);
			
			//���ҳ�����
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
			//���������ݰ󶨹�ϵ
			for(int  i=0;i<bd.size();i++){
						RuleDataDevice  rdd=new RuleDataDevice();
						BspkDataDevice  bdd=bd.get(i);
						rdd.setDeviceValueId(bdd.getDeviceValueId());
						rdd.setDeviceNumber(bdd.getDeviceNumber());
						rdd.setValueId(bdd.getValueId());
						
						dev_dao.addRuleDataDevice(rdd);
			}
			
			result=true;
			
			log.info("����ҳ��ɹ�");
			
		}catch(Exception e){
			String        message=e.getMessage();
			log.error("����ҳ��ʧ��:"+ e.getMessage());
			throw new RuntimeException(message);
		}
		
		
		return false;
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
