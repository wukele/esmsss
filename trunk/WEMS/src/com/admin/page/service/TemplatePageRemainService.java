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
					||  ("".equals(tpl_page_name) && "".equals(tpl_page_id))  ||  tpl_page_id=="" ||  tpl_page_id.equals("")){
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
		
		// add by ffmmx
		/**
		 * 普通配置模板页面新增
		 * @param tpl 普通模板页面
		 */
		@Transactional
		public void add_template_page(TplInfoPage tpl){
			log.debug("add_template_page is starting");
			try{
				if(tpl==null)
					throw new RuntimeException("普通模板页面实体 tpl 为空;TplInfoPage tpl is null");
				if(tpl.getTplPageType()==null || tpl.getTplPageType().trim().length()==0)
					throw new RuntimeException("页面类型 TplPageType 为空; TplInfoPage TplPageType is null	");
				
				tplDao.add_tpl_info_page(tpl);
				log.debug("add_template_page finished");
			}catch (RuntimeException e) {
				log.error("add_template_page faild");
				log.error("模板页面新增失败");
				log.error(e);
				throw e;
			}
		}
}
