package com.admin.page.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
import com.page.entity.TplInfoPage;

@Component("TplInfoPageDao")
public class TplInfoPageDao extends EmsDao {
		public   List<TplInfoPage>  findAllTplInfoPage(){
					return   getHibernateTemplate().find("from TplInfoPage");
		}
		
		public   List<TplInfoPage> findTplByIdAndName(String  tpl_page_id,String tpl_page_name){
				   	String qryStr="from  TplInfoPage  as tpl";
				   	if("".equals(tpl_page_id)){
				   			qryStr+=" where tpl.tplPageName=?";
				   			return getHibernateTemplate().find(qryStr,tpl_page_name);
				   	}else{
				   		    qryStr+=" where tpl.tplPageId="+tpl_page_id;
				   		    return getHibernateTemplate().find(qryStr);
				   	}
		}

		public int delTplInfoPage(String tplPageId) {
			// TODO Auto-generated method stub
				return getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery("delete from  tpl_info_page " +
						"where tpl_page_id="+tplPageId).executeUpdate();
		}

		public void UpdateTplInfoPage(TplInfoPage tpl) {
			// TODO Auto-generated method stub
			getHibernateTemplate().merge(tpl);
		}
		
		/**
		 * 新增模板页面
		 * @param tpl 模板页面
		 */
		public void add_tpl_info_page(TplInfoPage tpl){
			
			getHibernateTemplate().save(tpl);
		}
		
		/**
		 * 查询页面模板，通过属性映射
		 * @param map 属性映射
		 * @return 页面模板列表
		 */
		@SuppressWarnings("unchecked")
		public List<TplInfoPage> findByPropertiesMap(Map<String, Object> map){
			List<Object> lstProperties=new ArrayList<Object>();
			String hql="from TplInfoPage as tip where 1=1";
			if(map.containsKey("tplPageId")){
				hql+=" and tip.tplPageId=?";
				lstProperties.add(map.get("tplPageId"));
			}
			if(map.containsKey("tplPageName")){
				hql+=" and tip.tplPageName=?";
				lstProperties.add(map.get("tplPageName"));
			}
			if(map.containsKey("tplPageResource")){
				hql+=" and tip.tplPageResource=?";
				lstProperties.add(map.get("tplPageResource"));
			}
			
			return getHibernateTemplate().find(hql, lstProperties.toArray());
		}
}
