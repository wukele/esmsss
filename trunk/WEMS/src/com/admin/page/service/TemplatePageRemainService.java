package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.page.dao.TplInfoPageDao;
import com.page.entity.TplInfoPage;


@Component("TemplatePageRemainService")
public class TemplatePageRemainService {
		
	   private  TplInfoPageDao   tplDao;
	   @Resource(name="TplInfoPageDao")
		public void setTplDao(TplInfoPageDao tplDao) {
		this.tplDao = tplDao;
	}

		public  List<TplInfoPage>  QryTemplatePages(String  tpl_page_id,String tpl_page_name){
			if((tpl_page_id==null && tpl_page_name==null) || (tpl_page_id=="" && tpl_page_name=="")
					||  ("".equals(tpl_page_name) && "".equals(tpl_page_id))){
						return  tplDao.findAllTplInfoPage();
			}else{
						return  tplDao.findTplByIdAndName(tpl_page_id, tpl_page_name);
			}
		}
}
