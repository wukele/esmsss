package com.admin.page.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.admin.page.struct.PageResourceStruct;
import com.ems.dao.EmsDao;
import com.page.entity.TplPageResource;
@Component("TplPageResourceDao")
public class TplPageResourceDao extends EmsDao {
			@SuppressWarnings("unchecked")
			public   List<PageResourceStruct>  findPageResource(String tplPageResource){
				  String  resourceQry="select new com.admin.page.struct.PageResourceStruct(tr.resourceId,tr.pageResource,cc.componentName," +
				  		"tr.xtypeCode,tr.resourceTop,tr.resourceLeft,tr.resourceWidth,tr.resourceHeight,tr.valueId,tr.config,tr.baseCls" +
				  		") from CodeComponent as  cc,TplPageResource as tr where cc.codeXtype=tr.xtypeCode and tr.pageResource=?";
				  
				  return  getHibernateTemplate().find(resourceQry, tplPageResource);
			}
			
			/**
			 * ����ҳ����Դ(����������޸�)
			 * @param tpr ҳ����Դ
			 */
			public  void saveTplPageResource(TplPageResource tpr){
				getHibernateTemplate().saveOrUpdate(tpr);
			}
			
			
			/**
			 * ɾ��ҳ����Դ
			 * @param resourceId ��ԴID
			 */
			public void deleteTplPageResource(Integer resourceId){
				String hql="delete from TplPageResource as pr where pr.resourceId=?";
				
				getHibernateTemplate().bulkUpdate(hql, resourceId);
			}
			
}
