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
}
