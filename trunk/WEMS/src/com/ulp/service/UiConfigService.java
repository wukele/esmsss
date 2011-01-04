package com.ulp.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.entries.ulp.InfoConfig;
import com.entries.ulp.InfoConfigDAO;

@Component("UiConfigService")
public class UiConfigService {
		private  InfoConfigDAO  configDao;
		@Resource(name="InfoConfigDAO")
		public void setConfigDao(InfoConfigDAO configDao) {
			this.configDao = configDao;
		}
		
	    public List<InfoConfig>   QueryConfigByName(String configName){
	    	
	    	return   configDao.findByConfigName(configName);
	    }
}
