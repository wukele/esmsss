package com.admin.page.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ems.dao.EmsDao;
import com.page.entity.BspkInfoPage;
import com.page.entity.BspkPageResource;

@Component("BskpPageDao")
public class BskpPageDao extends EmsDao {
	public List<BspkInfoPage> findAllBskpInfoPage() {
		return getHibernateTemplate().find("from  BspkInfoPage");
	}

	public BspkInfoPage findBspkPageByPageId(Integer pageId) {
		BspkInfoPage page = (BspkInfoPage) getHibernateTemplate().get(
				BspkInfoPage.class, pageId);
		return page;
	}

	public List<BspkPageResource> findBspkPageResource(String pageResource) {
		String qryStr = "from BspkPageResource where pageResource=? ";
		return getHibernateTemplate().find(qryStr, pageResource);
	}

	/**
	 * get BspkInfoPage list by property map
	 * 
	 * @param map
	 * @return BspkInfoPage list
	 */
	@SuppressWarnings("unchecked")
	public List<BspkInfoPage> findBspkInfoPageByPropertiesMap(
			Map<String, Object> map) {
		List<Object> lstProperties = new ArrayList<Object>();
		String hql = "from BspkInfoPage as bip where 1=1";
		if (map.containsKey("bspkPageId")) {
			hql += " and bip.bspkPageId=?";
			lstProperties.add(map.get("bspkPageId"));
		}
		if (map.containsKey("bspkPageName")) {
			hql += " and bip.bspkPageName=?";
			lstProperties.add(map.get("bspkPageName"));
		}
		if (map.containsKey("bspkPageResource")) {
			hql += " and bip.bspkPageResource=?";
			lstProperties.add(map.get("bspkPageResource"));
		}

		return getHibernateTemplate().find(hql, lstProperties.toArray());
	}

	/**
	 * insert BskpInfoPage
	 * 
	 * @param page
	 *            BskpInfoPage
	 */
	public void insertBskpInfoPage(BspkInfoPage page) {
		getHibernateTemplate().save(page);
	}

	/**
	 * insert BspkPageResource
	 * 
	 * @param resource
	 *            BspkPageResource
	 */
	public void insertBspkPageResource(BspkPageResource resource) {
		getHibernateTemplate().save(resource);
	}
	
	public void importBspkPageResourceConfig(Integer bspkResourceId,Integer tplResourceId){
		String sql="insert into bspk_resource_config(config_parameter,config_value,config_type,configDesc,resource_id) SELECT config_parameter, config_value, config_type, configDesc, ? as bspkResourceId FROM tpl_resource_config WHERE resource_id = ?";
		
		SQLQuery qry=getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql);
		qry.setInteger(0, bspkResourceId);
		qry.setInteger(1, tplResourceId);
		qry.executeUpdate();
	}

	public void addBspkInfoPage(BspkInfoPage bpage) {
		// TODO Auto-generated method stub
			getHibernateTemplate().save(bpage);
		   
	}

	public void insertBspkRes(String tplPageResource) {
		// TODO Auto-generated method stub
				String  insertStr="insert into bspk_page_resource  (page_resource,xtype_code,resource_top,resource_left,resource_width,resource_height,value_id,config,base_cls) " +
						"SELECT " +
						"page_resource,xtype_code,resource_top,resource_left,resource_width,resource_height,value_id,config,base_cls " +
						" FROM tpl_page_resource WHERE page_resource='"+tplPageResource+"'";
				getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(insertStr).executeUpdate();
				 
	}

	public void delBspkInfo(Integer bspkPageId) {
		// TODO Auto-generated method stub
				 BspkInfoPage    bp=new BspkInfoPage();
				 bp=(BspkInfoPage)getHibernateTemplate().find("from BspkInfoPage  as bi where bi.bspkPageId=? ", bspkPageId).get(0);
				 getHibernateTemplate().delete(bp);
	}

	public void delBspkPageResById(Integer bspkPageId) {
		// TODO Auto-generated method stub
				 String  delSql="delete BspkPageResource as bp " +
				 		"where bp.pageResource in ( " +
				 		"select bi.bspkPageResource from BspkInfoPage as  bi where bi.bspkPageId=?)";
				 getHibernateTemplate().bulkUpdate(delSql, bspkPageId);
	}
	
}
