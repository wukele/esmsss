package com.admin.page.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
import com.page.entity.BspkInfoPage;

@Component("BskpPageDao")
public class BskpPageDao extends EmsDao {
		public  List<BspkInfoPage>  findAllBskpInfoPage(){
			    return  getHibernateTemplate().find("from  BspkInfoPage");
		}
}
