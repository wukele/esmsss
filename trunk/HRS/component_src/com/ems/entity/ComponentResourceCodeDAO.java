package com.ems.entity;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * A data access object (DAO) providing persistence and search support for
 * ComponentResourceCode entities. Transaction control of the save(), update()
 * and delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see com.ems.entity.ComponentResourceCode
 * @author MyEclipse Persistence Tools
 */

public class ComponentResourceCodeDAO extends HibernateDaoSupport {
	private static final Log log = LogFactory
			.getLog(ComponentResourceCodeDAO.class);
	// property constants
	public static final String RESOURCE_TYPE = "resourceType";
	public static final String SCRIPT_URL = "scriptUrl";
	public static final String NEED_SCRIPT = "needScript";
	public static final String COMPONENT_RESOURCE_ID = "componentResourceId";

	protected void initDao() {
		// do nothing
	}

	public void save(ComponentResourceCode transientInstance) {
		log.debug("saving ComponentResourceCode instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(ComponentResourceCode persistentInstance) {
		log.debug("deleting ComponentResourceCode instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public ComponentResourceCode findById(java.lang.Integer id) {
		log.debug("getting ComponentResourceCode instance with id: " + id);
		try {
			ComponentResourceCode instance = (ComponentResourceCode) getHibernateTemplate()
					.get("com.ems.entity.ComponentResourceCode", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(ComponentResourceCode instance) {
		log.debug("finding ComponentResourceCode instance by example");
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
		log.debug("finding ComponentResourceCode instance with property: "
				+ propertyName + ", value: " + value);
		try {
			String queryString = "from ComponentResourceCode as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByResourceType(Object resourceType) {
		return findByProperty(RESOURCE_TYPE, resourceType);
	}

	public List findByScriptUrl(Object scriptUrl) {
		return findByProperty(SCRIPT_URL, scriptUrl);
	}

	public List findByNeedScript(Object needScript) {
		return findByProperty(NEED_SCRIPT, needScript);
	}

	public List findByComponentResourceId(Object componentResourceId) {
		return findByProperty(COMPONENT_RESOURCE_ID, componentResourceId);
	}

	public List findAll() {
		log.debug("finding all ComponentResourceCode instances");
		try {
			String queryString = "from ComponentResourceCode";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public ComponentResourceCode merge(ComponentResourceCode detachedInstance) {
		log.debug("merging ComponentResourceCode instance");
		try {
			ComponentResourceCode result = (ComponentResourceCode) getHibernateTemplate()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(ComponentResourceCode instance) {
		log.debug("attaching dirty ComponentResourceCode instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(ComponentResourceCode instance) {
		log.debug("attaching clean ComponentResourceCode instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static ComponentResourceCodeDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (ComponentResourceCodeDAO) ctx
				.getBean("ComponentResourceCodeDAO");
	}
}