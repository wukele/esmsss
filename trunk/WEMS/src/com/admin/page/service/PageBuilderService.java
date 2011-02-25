package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.page.dao.BskpPageDao;
import com.admin.page.dao.PageBuilderDao;
import com.data.entity.RuleDataDevice;
import com.ems.entity.InfoDevicePage;
import com.ems.entity.InfoPage;
import com.ems.entity.InfoPageResource;
import com.page.entity.BspkDataDevice;
import com.page.entity.BspkInfoPage;
import com.page.entity.BspkPageResource;


@Component("PageBuilderService")
public class PageBuilderService {
	
	private  BskpPageDao   bspkDao;
	
	private  PageBuilderDao    builderDao;
	
	@Resource(name="BskpPageDao")
	public void setBspkDao(BskpPageDao bspkDao) {
		this.bspkDao = bspkDao;
	}
	
	@Resource(name="PageBuilderDao")
	public void setBuilderDao(PageBuilderDao builderDao) {
		this.builderDao = builderDao;
	}

	private static final Log log = LogFactory.getLog(PageBuilderService.class);
	
	@Transactional
	public boolean CreateNorPage(Integer bspkPageId, String message) {
		// TODO Auto-generated method stub
		boolean  result=false;
		// ��ѯ��ʱҳ��
		BspkInfoPage   bi = bspkDao.findBspkPageByPageId(bspkPageId);
		
		// ����ҳ����Ϣ
		
		InfoPage  info=new InfoPage();
		
		info.setPageName(bi.getBspkPageName());
		info.setPageImageHeight(bi.getBspkImageHeight());
		info.setPageImageUrl(bi.getBspkImagePath());
		info.setPageImageWidth(bi.getBspkImageWidth());
		info.setPageType("NOR");
		String pageResource=GetPageResource();
		log.info("����ҳ����ԴID:"+pageResource);
		info.setPageResourceId(pageResource);
		// ҳ����Դ��ѯ
		List<BspkPageResource>   bprs=bspkDao.findBspkPageResource(bi.getBspkPageResource());
		
		
		//ҳ��������ݰ󶨹�ϵ��ѯ
		List<BspkDataDevice>   bd=bspkDao.findBindRule(bi.getBspkPageId());
		
		
		try{
			builderDao.addInfoPage(info);
			
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
						
						builderDao.addInfoPageResource(ipr);
			}
			//���������ݰ󶨹�ϵ
			for(int  i=0;i<bd.size();i++){
						RuleDataDevice  rdd=new RuleDataDevice();
						BspkDataDevice  bdd=bd.get(i);
						rdd.setDeviceValueId(bdd.getDeviceValueId());
						rdd.setDeviceNumber(bdd.getDeviceNumber());
						rdd.setValueId(bdd.getValueId());
						
						builderDao.addRuleDataDevice(rdd);
			}
			
			result=true;
			
			log.info("����ҳ��ɹ�");
			
		}catch(Exception e){
			message=e.getMessage();
			log.error("����ҳ��ʧ��:"+ e.getMessage());
			throw new RuntimeException(message);
		}
		
		
		return  result;
	}
	
	
	

	private String GetPageResource() {
		// TODO Auto-generated method stub
		String  temp=RandomStringUtils.random(4, true, false).toUpperCase()+RandomStringUtils.random(4, false,true);
		if(builderDao.checkUniPageResource(temp)){
					return   temp;	
		}else{
					return  GetPageResource();
		}
	}
	
	
	@Transactional
	public boolean CreateDevicePage(Integer bspkPageId, String message) {
		// TODO Auto-generated method stub
		boolean  result=false;
		// ��ѯ��ʱҳ��
		BspkInfoPage   bi = bspkDao.findBspkPageByPageId(bspkPageId);
		
		// �����豸ҳ����Ϣ
		 InfoDevicePage  dp=new InfoDevicePage();
		dp.setDeviceType("Dev");
		dp.setPageImageHeight(bi.getBspkImageHeight());
		dp.setPageImageWidth(bi.getBspkImageWidth());
		dp.setPageImageUrl(bi.getBspkImagePath());
		dp.setPageName(bi.getBspkPageName());
		String   pageResource=GetPageResource();
		log.info("�����豸ҳ��,ҳ����ԴID��"+ pageResource	);
		dp.setPageResourceId(pageResource);
		dp.setPageType("Dev");
		
		List<BspkPageResource>   bprs=bspkDao.findBspkPageResource(bi.getBspkPageResource());
		
		
		//ҳ��������ݰ󶨹�ϵ��ѯ
		List<BspkDataDevice>   bd=bspkDao.findBindRule(bi.getBspkPageId());
		
		
		try{
			builderDao.AddInfoDevicePage(dp);
			
			//����ҳ�����
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
				
				builderDao.addInfoPageResource(ipr);
			}
			//���������ݰ󶨹�ϵ
			for(int  i=0;i<bd.size();i++){
				RuleDataDevice  rdd=new RuleDataDevice();
				BspkDataDevice  bdd=bd.get(i);
				rdd.setDeviceValueId(bdd.getDeviceValueId());
				rdd.setDeviceNumber(bdd.getDeviceNumber());
				rdd.setValueId(bdd.getValueId());
				
				builderDao.addRuleDataDevice(rdd);
			}
	
			result=true;
	
			log.info("�����豸ҳ��ɹ�");
			
			
			
		}catch(Exception e){
			message=e.getMessage();
			log.error("����ҳ��ʧ��:"+ e.getMessage());
			throw new RuntimeException(message);
		}
		
		return  result;
	}

}
