package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.page.dao.TplInfoPageDao;
import com.page.entity.TplInfoPage;


@Component("TemplatePageRemainService")
public class TemplatePageRemainService {
		private static final Log log = LogFactory.getLog(TemplatePageRemainService.class);
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
		
		@Transactional
		public  void  DelTemplatePages(String tpl_page_id){
				int res= tplDao.delTplInfoPage(tpl_page_id);
				log.info("模板删除成功  del:"+res);
		}
		
		@Transactional
		public  void  ModifyTemplatePages(TplInfoPage  tpl){
				tplDao.UpdateTplInfoPage(tpl);
				log.info("模板修改成功");
		}
		
		
}
