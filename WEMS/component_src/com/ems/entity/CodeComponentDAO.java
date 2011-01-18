package com.ems.entity;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;

/**
 * A data access object (DAO) providing persistence and search support for
 * CodeComponent entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see com.ems.entity.CodeComponent
 * @author MyEclipse Persistence Tools
 */
@Component("CodeComponentDAO")
public class CodeComponentDAO extends EmsDao {
	private static final Log log = LogFactory.getLog(CodeComponentDAO.class);
	// property constants
	public static final String CODE_XTYPE = "codeXtype";
	public static final String COMPONENT_NAME = "componentName";
	public static final String COMPONENT_RESOURCE_ID = "componentResourceId";
	public static final String FULL_TYPE = "fullType";

	protected void initDao() {
		// do nothing
	}

	public void save(CodeComponent transientInstance) {
		log.debug("saving CodeComponent instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(CodeComponent persistentInstance) {
		log.debug("deleting CodeComponent instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public CodeComponent findById(java.lang.Integer id) {
		log.debug("getting CodeComponent instance with id: " + id);
		try {
			CodeComponent instance = (CodeComponent) getHibernateTemplate()
					.get("com.ems.entity.CodeComponent", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(CodeComponent instance) {
		log.debug("finding CodeComponent instance by example");
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
		log.debug("finding CodeComponent instance with property: "
				+ propertyName + ", value: " + value);
		try {
			String queryString = "from CodeComponent as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByCodeXtype(Object codeXtype) {
		return findByProperty(CODE_XTYPE, codeXtype);
	}

	public List findByComponentName(Object componentName) {
		return findByProperty(COMPONENT_NAME, componentName);
	}

	public List findByComponentResourceId(Object componentResourceId) {
		return findByProperty(COMPONENT_RESOURCE_ID, componentResourceId);
	}

	public List findByFullType(Object fullType) {
		return findByProperty(FULL_TYPE, fullType);
	}

	public List findAll() {
		log.debug("finding all CodeComponent instances");
		try {
			String queryString = "from CodeComponent";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public CodeComponent merge(CodeComponent detachedInstance) {
		log.debug("merging CodeComponent instance");
		try {
			CodeComponent result = (CodeComponent) getHibernateTemplate()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(CodeComponent instance) {
		log.debug("attaching dirty CodeComponent instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(CodeComponent instance) {
		log.debug("attaching clean CodeComponent instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static CodeComponentDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (CodeComponentDAO) ctx.getBean("CodeComponentDAO");
	}
}