package com.admin.page.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
				log.info("ģ��ɾ���ɹ�  del:"+res);
		}
		
		@Transactional
		public  void  ModifyTemplatePages(TplInfoPage  tpl){
				tplDao.UpdateTplInfoPage(tpl);
				log.info("ģ���޸ĳɹ�");
		}
		
		// add by ffmmx
		/**
		 * ��ͨ����ģ��ҳ������
		 * @param tpl ��ͨģ��ҳ��
		 */
		@Transactional
		public void add_template_page(TplInfoPage tpl){
			log.debug("add_template_page is starting");
			try{
				if(tpl==null)
					throw new RuntimeException("��ͨģ��ҳ��ʵ�� tpl Ϊ��;TplInfoPage tpl is null");
				if(tpl.getTplPageType()==null || tpl.getTplPageType().trim().length()==0)
					throw new RuntimeException("ҳ������ TplPageType Ϊ��; TplInfoPage TplPageType is null	");
				
				tplDao.add_tpl_info_page(tpl);
				log.debug("add_template_page finished");
			}catch (RuntimeException e) {
				log.error("add_template_page faild");
				log.error("ģ��ҳ������ʧ��");
				log.error(e);
				throw e;
			}
		}
		
		/**
		 * ��ѯҳ��ģ��
		 * @param tplPageId ģ��ID
		 * @param tplPageName ģ������
		 * @return 
		 */
		public List<TplInfoPage> findTemplatePages(Integer tplPageId,String tplPageName){
			Map<String, Object > map = new HashMap<String, Object>();
			List<TplInfoPage> lst=null;
			log.debug("qryTemplatePages is starting");
			try {
				if(tplPageId!=null)
					map.put("tplPageId", tplPageId);
				if(tplPageName!=null)
					map.put("tplPageName", tplPageName);
				lst = tplDao.findByPropertiesMap(map);
				log.debug("qryTemplatePages finished");
			} catch (RuntimeException e) {
				log.error("qryTemplatePages faild");
				log.error("ģ��ҳ������ʧ��");
				log.error(e);
				throw e;
			}
			return lst;
		}
}
