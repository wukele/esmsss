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
		// 查询临时页面
		BspkInfoPage   bi = bspkDao.findBspkPageByPageId(bspkPageId);
		
		// 新增页面信息
		
		InfoPage  info=new InfoPage();
		
		info.setPageName(bi.getBspkPageName());
		info.setPageImageHeight(bi.getBspkImageHeight());
		info.setPageImageUrl(bi.getBspkImagePath());
		info.setPageImageWidth(bi.getBspkImageWidth());
		info.setPageType("NOR");
		String pageResource=GetPageResource();
		log.info("新增页面资源ID:"+pageResource);
		info.setPageResourceId(pageResource);
		// 页面资源查询
		List<BspkPageResource>   bprs=bspkDao.findBspkPageResource(bi.getBspkPageResource());
		
		
		//页面组件数据绑定关系查询
		List<BspkDataDevice>   bd=bspkDao.findBindRule(bi.getBspkPageId());
		
		
		try{
			builderDao.addInfoPage(info);
			
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
						
						builderDao.addInfoPageResource(ipr);
			}
			//添加组件数据绑定关系
			for(int  i=0;i<bd.size();i++){
						RuleDataDevice  rdd=new RuleDataDevice();
						BspkDataDevice  bdd=bd.get(i);
						rdd.setDeviceValueId(bdd.getDeviceValueId());
						rdd.setDeviceNumber(bdd.getDeviceNumber());
						rdd.setValueId(bdd.getValueId());
						
						builderDao.addRuleDataDevice(rdd);
			}
			
			result=true;
			
			log.info("新增页面成功");
			
		}catch(Exception e){
			message=e.getMessage();
			log.error("新增页面失败:"+ e.getMessage());
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
		// 查询临时页面
		BspkInfoPage   bi = bspkDao.findBspkPageByPageId(bspkPageId);
		
		// 新增设备页面信息
		 InfoDevicePage  dp=new InfoDevicePage();
		dp.setDeviceType("Dev");
		dp.setPageImageHeight(bi.getBspkImageHeight());
		dp.setPageImageWidth(bi.getBspkImageWidth());
		dp.setPageImageUrl(bi.getBspkImagePath());
		dp.setPageName(bi.getBspkPageName());
		String   pageResource=GetPageResource();
		log.info("新增设备页面,页面资源ID："+ pageResource	);
		dp.setPageResourceId(pageResource);
		dp.setPageType("Dev");
		
		List<BspkPageResource>   bprs=bspkDao.findBspkPageResource(bi.getBspkPageResource());
		
		
		//页面组件数据绑定关系查询
		List<BspkDataDevice>   bd=bspkDao.findBindRule(bi.getBspkPageId());
		
		
		try{
			builderDao.AddInfoDevicePage(dp);
			
			//新增页面组件
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
			//添加组件数据绑定关系
			for(int  i=0;i<bd.size();i++){
				RuleDataDevice  rdd=new RuleDataDevice();
				BspkDataDevice  bdd=bd.get(i);
				rdd.setDeviceValueId(bdd.getDeviceValueId());
				rdd.setDeviceNumber(bdd.getDeviceNumber());
				rdd.setValueId(bdd.getValueId());
				
				builderDao.addRuleDataDevice(rdd);
			}
	
			result=true;
	
			log.info("新增设备页面成功");
			
			
			
		}catch(Exception e){
			message=e.getMessage();
			log.error("新增页面失败:"+ e.getMessage());
			throw new RuntimeException(message);
		}
		
		return  result;
	}

}
