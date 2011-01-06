package com.admin.page.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
import com.page.entity.TplInfoPage;

@Component("TplInfoPageDao")
public class TplInfoPageDao extends EmsDao {
		public   List<TplInfoPage>  findAllTplInfoPage(){
					return   getHibernateTemplate().find("from TplInfoPage");
		}
		
		public   List<TplInfoPage> findTplByIdAndName(String  tpl_page_id,String tpl_page_name){
					return   getHibernateTemplate().find("from TplInfoPage  where tpl.tplPageId=? or " +
							"tpl.tplPageName like '%?%'", new String[]{tpl_page_id,tpl_page_name});
		}
}
