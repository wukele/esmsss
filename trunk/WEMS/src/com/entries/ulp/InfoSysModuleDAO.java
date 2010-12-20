package com.entries.ulp;

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
 * InfoSysModule entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see com.entries.ulp.InfoSysModule
 * @author MyEclipse Persistence Tools
 */
@Component("InfoSysModuleDAO")
public class InfoSysModuleDAO extends EmsDao {
	private static final Log log = LogFactory.getLog(InfoSysModuleDAO.class);
	// property constants
	public static final String MODULE_NAME = "moduleName";
	public static final String MODULE_INDEX = "moduleIndex";
	public static final String IS_ACTIVE = "isActive";

	protected void initDao() {
		// do nothing
	}

	public void save(InfoSysModule transientInstance) {
		log.debug("saving InfoSysModule instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(InfoSysModule persistentInstance) {
		log.debug("deleting InfoSysModule instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public InfoSysModule findById(java.lang.String id) {
		log.debug("getting InfoSysModule instance with id: " + id);
		try {
			InfoSysModule instance = (InfoSysModule) getHibernateTemplate()
					.get("com.entries.ulp.InfoSysModule", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(InfoSysModule instance) {
		log.debug("finding InfoSysModule instance by example");
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
		log.debug("finding InfoSysModule instance with property: "
				+ propertyName + ", value: " + value);
		try {
			String queryString = "from InfoSysModule as model where model."
					+ propertyName + "= ?";
			
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByModuleName(Object moduleName) {
		return findByProperty(MODULE_NAME, moduleName);
	}

	public List findByModuleIndex(Object moduleIndex) {
		return findByProperty(MODULE_INDEX, moduleIndex);
	}

	public List findByIsActive(Object isActive) {
		return findByProperty(IS_ACTIVE, isActive);
	}

	public List findAll() {
		log.debug("finding all InfoSysModule instances");
		try {
			String queryString = "from InfoSysModule";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public InfoSysModule merge(InfoSysModule detachedInstance) {
		log.debug("merging InfoSysModule instance");
		try {
			InfoSysModule result = (InfoSysModule) getHibernateTemplate()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(InfoSysModule instance) {
		log.debug("attaching dirty InfoSysModule instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(InfoSysModule instance) {
		log.debug("attaching clean InfoSysModule instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static InfoSysModuleDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (InfoSysModuleDAO) ctx.getBean("InfoSysModuleDAO");
	}
}