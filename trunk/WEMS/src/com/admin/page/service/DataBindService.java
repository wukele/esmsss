package com.admin.page.service;

import javax.annotation.Resource;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.page.dao.DataBindDao;


@Component("DataBindService")
public class DataBindService {
	
	private static final Log log = LogFactory.getLog(DataBindService.class);
	private DataBindDao   bindDao;
	
	@Resource(name="DataBindDao")
	public void setBindDao(DataBindDao bindDao) {
		this.bindDao = bindDao;
	}
	
	@Transactional
	public void BindDeviceVar(boolean isCreateNew, String deviceValueId,
			String valueId,Integer  resourceId) {
		// TODO Auto-generated method stub
		if(isCreateNew){
					valueId=RandomStringUtils.random(4, true, false).toUpperCase()+RandomStringUtils.random(4, false, true);
					log.info("������:ֵID:=="+valueId);
					try{
						    bindDao.addDataBindRule(valueId,deviceValueId);
							bindDao.upDatePageResource(valueId,resourceId);
					}catch(Exception  e){
							log.error("�����󶨴���:"+e.getMessage());
							throw new  RuntimeException();
					}
		}else{
					log.info("�󶨹�ϵ���");
					bindDao.ModifyBindRule(valueId,deviceValueId);
		}
	}
				
		
}
