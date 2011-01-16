package com.admin.page.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
import com.page.entity.BspkInfoPage;
import com.page.entity.BspkPageResource;

@Component("BskpPageDao")
public class BskpPageDao extends EmsDao {
		public  List<BspkInfoPage>  findAllBskpInfoPage(){
			    return  getHibernateTemplate().find("from  BspkInfoPage");
		}
		
		public  BspkInfoPage   findBspkPageByPageId(Integer  pageId){
				BspkInfoPage   page=(BspkInfoPage)getHibernateTemplate().get(BspkInfoPage.class, pageId);
				return  page;
		}
		
		public  List<BspkPageResource> findBspkPageResource(String  pageResource){
			     String  qryStr="from BspkPageResource where pageResource=? ";
			     return  getHibernateTemplate().find(qryStr,pageResource);
		}
}
