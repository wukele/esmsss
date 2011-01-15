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
		 * ��ѯҳ����Դ
		 * @param tplPageResource ҳ����Դ
		 * @return ҳ����Դ�б�
		 */
		public List<PageResourceStruct>  QueryPageResource(String  tplPageResource){
			return  resDao.findPageResource(tplPageResource);
		}
		
		/**
		 * ����ҳ����Դ
		 * @param pageResource ҳ����Դ
		 */
		@Transactional
		public void addPageResource(TplPageResource pageResource){
			log.debug("addPageResource starting..");
			try {
				if(pageResource==null)
					throw new RuntimeException("pageResource is null | ҳ����Դ Ϊ��");
				
				resDao.saveTplPageResource(pageResource);
				log.debug("addPageResource finished ..");
			} catch (RuntimeException e) {
				log.error("addPageResource failed...");
				log.error(e);
				throw e;
			}
		}
		
		/**
		 * ɾ��ҳ����Դ
		 * @param resourceId ��ԴID
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
		 * ����ɾ��ҳ����Դ
		 * @param lstResourceId ҳ����Դ�б�
		 */
		@Transactional
		public void removeMutiPageResource(List<Integer> lstResourceId){
			log.debug("removeMutiPageResource start..");
			try {
				if(lstResourceId==null || lstResourceId.size()>0)
					throw new RuntimeException("lstResourceId is null or lstResourceId.size equal 0 || ��ԴID�б�Ϊ�ջ��߳���Ϊ0");
				log.debug("removeMutiPageResource finished..");
			} catch (RuntimeException e) {
				log.error("removeMutiPageResource failed..");
				log.error(e);
				throw e;
			}
		}
		
		
}
