package com.admin.page.service;


import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.page.dao.TplPageResourceDao;
import com.admin.page.struct.PageResourceStruct;
import com.page.entity.TplPageResource;

@Component("PageResourceService")
public class PageResourceService {
		private static final Logger log=Logger.getLogger(PageResourceService.class);
		private TplPageResourceDao   resDao;

		public TplPageResourceDao getResDao() {
			return resDao;
		}
		@Resource(name="TplPageResourceDao")
		public void setResDao(TplPageResourceDao resDao) {
			this.resDao = resDao;
		}
		
		/**
		 * 查询页面资源
		 * @param tplPageResource 页面资源
		 * @return 页面资源列表
		 */
		public List<PageResourceStruct>  QueryPageResource(String  tplPageResource){
			return  resDao.findPageResource(tplPageResource);
		}
		
		/**
		 * 新增页面资源
		 * @param pageResource 页面资源
		 */
		@Transactional
		public void addPageResource(TplPageResource pageResource){
			log.debug("addPageResource starting..");
			try {
				if(pageResource==null)
					throw new RuntimeException("pageResource is null | 页面资源 为空");
				
				resDao.saveTplPageResource(pageResource);
				log.debug("addPageResource finished ..");
			} catch (RuntimeException e) {
				log.error("addPageResource failed...");
				log.error(e);
				throw e;
			}
		}
		
		/**
		 * 删除页面资源
		 * @param resourceId 资源ID
		 */
		@Transactional
		public void removePageResource(Integer resourceId) {
			log.debug("removePageResource start..");
			try {
				
				log.debug("removePageResource finished..");
			} catch (RuntimeException e) {
				log.error("removePageResource failed..");
				log.error(e);
				throw e;
			}
		}
		
		
		/**
		 * 批量删除页面资源
		 * @param lstResourceId 页面资源列表
		 */
		@Transactional
		public void removeMutiPageResource(List<Integer> lstResourceId){
			log.debug("removeMutiPageResource start..");
			try {
				if(lstResourceId==null || lstResourceId.size()>0)
					throw new RuntimeException("lstResourceId is null or lstResourceId.size equal 0 || 资源ID列表为空或者长度为0");
				log.debug("removeMutiPageResource finished..");
			} catch (RuntimeException e) {
				log.error("removeMutiPageResource failed..");
				log.error(e);
				throw e;
			}
		}
		
		
}
