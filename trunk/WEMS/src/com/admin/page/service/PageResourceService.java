package com.admin.page.service;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.page.dao.TplPageResourceDao;
import com.admin.page.struct.PageResourceStruct;

@Component("PageResourceService")
public class PageResourceService {
		private TplPageResourceDao   resDao;

		public TplPageResourceDao getResDao() {
			return resDao;
		}
		@Resource(name="TplPageResourceDao")
		public void setResDao(TplPageResourceDao resDao) {
			this.resDao = resDao;
		}
		
		public List<PageResourceStruct>  QueryPageResource(String  tplPageResource){
			return  resDao.findPageResource(tplPageResource);
		}
}
