package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.page.dao.BskpPageDao;
import com.page.entity.BspkInfoPage;


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
}
