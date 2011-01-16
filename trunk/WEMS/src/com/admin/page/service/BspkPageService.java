package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.page.dao.BskpPageDao;
import com.page.entity.BspkInfoPage;
import com.page.entity.BspkPageResource;


@Component("BspkPageService")
public class BspkPageService {
		private  BskpPageDao  bskpDao;
		@Resource(name="BskpPageDao")
		public void setBskpDao(BskpPageDao bskpDao) {
			this.bskpDao = bskpDao;
		}
		
		public  List<BspkInfoPage>  GetALLBspkInfoPage(){
			return  bskpDao.findAllBskpInfoPage();
		}
		
		public  BspkInfoPage GetBspkInfoPageById(Integer  pageId){
			return  bskpDao.findBspkPageByPageId(pageId);
		}
		
		public  List<BspkPageResource>  GetbspkPageResource(String  pageResource){
			return  bskpDao.findBspkPageResource(pageResource);
		}
}
