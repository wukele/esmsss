package com.ems.entity;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * A data access object (DAO) providing persistence and search support for
 * InfoPageResource entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see com.ems.entity.InfoPageResource
 * @author MyEclipse Persistence Tools
 */

public class InfoPageResourceDAO extends HibernateDaoSupport {
	private static final Log log = LogFactory.getLog(InfoPageResourceDAO.class);
	// property constants
	public static final String PAGE_RESOURCE = "pageResource";
	public static final String XTYPE_CODE = "xtypeCode";
	public static final String RESOURCE_TOP = "resourceTop";
	public static final String RESOURCE_LEFT = "resourceLeft";
	public static final String RESOURCE_WIDTH = "resourceWidth";
	public static final String RESOURCE_HEIGHT = "resourceHeight";
	public static final String VALUE_ID = "valueId";
	public static final String CONFIG = "config";
	public static final String BASE_CLS = "baseCls";

	protected void initDao() {
		// do nothing
	}

	public void save(InfoPageResource transientInstance) {
		log.debug("saving InfoPageResource instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(InfoPageResource persistentInstance) {
		log.debug("deleting InfoPageResource instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public InfoPageResource findById(java.lang.Integer id) {
		log.debug("getting InfoPageResource instance with id: " + id);
		try {
			InfoPageResource instance = (InfoPageResource) getHibernateTemplate()
					.get("com.ems.entity.InfoPageResource", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(InfoPageResource instance) {
		log.debug("finding InfoPageResource instance by example");
		try {
			List results = getHibernateTemplate().findByExample(instance);
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding InfoPageResource instance with property: "
				+ propertyName + ", value: " + value);
		try {
			String queryString = "from InfoPageResource as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByPageResource(Object pageResource) {
		return findByProperty(PAGE_RESOURCE, pageResource);
	}

	public List findByXtypeCode(Object xtypeCode) {
		return findByProperty(XTYPE_CODE, xtypeCode);
	}

	public List findByResourceTop(Object resourceTop) {
		return findByProperty(RESOURCE_TOP, resourceTop);
	}

	public List findByResourceLeft(Object resourceLeft) {
		return findByProperty(RESOURCE_LEFT, resourceLeft);
	}

	public List findByResourceWidth(Object resourceWidth) {
		return findByProperty(RESOURCE_WIDTH, resourceWidth);
	}

	public List findByResourceHeight(Object resourceHeight) {
		return findByProperty(RESOURCE_HEIGHT, resourceHeight);
	}

	public List findByValueId(Object valueId) {
		return findByProperty(VALUE_ID, valueId);
	}

	public List findByConfig(Object config) {
		return findByProperty(CONFIG, config);
	}

	public List findByBaseCls(Object baseCls) {
		return findByProperty(BASE_CLS, baseCls);
	}

	public List findAll() {
		log.debug("finding all InfoPageResource instances");
		try {
			String queryString = "from InfoPageResource";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public InfoPageResource merge(InfoPageResource detachedInstance) {
		log.debug("merging InfoPageResource instance");
		try {
			InfoPageResource result = (InfoPageResource) getHibernateTemplate()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(InfoPageResource instance) {
		log.debug("attaching dirty InfoPageResource instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(InfoPageResource instance) {
		log.debug("attaching clean InfoPageResource instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static InfoPageResourceDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (InfoPageResourceDAO) ctx.getBean("InfoPageResourceDAO");
	}
}