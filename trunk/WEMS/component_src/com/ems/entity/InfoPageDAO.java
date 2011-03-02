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
 * InfoPage entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see com.ems.entity.InfoPage
 * @author MyEclipse Persistence Tools
 */


@Component("InfoPageDAO")
public class InfoPageDAO extends EmsDao {
	private static final Log log = LogFactory.getLog(InfoPageDAO.class);
	// property constants
	public static final String PAGE_RESOURCE_ID = "pageResourceId";
	public static final String PAGE_TYPE = "pageType";
	public static final String PAGE_IMAGE_URL = "pageImageUrl";
	public static final String PAGE_NAME = "pageName";
	public static final String PAGE_ICON = "pageIcon";
	public static final String PAGE_IMAGE_WIDTH = "pageImageWidth";
	public static final String PAGE_IMAGE_HEIGHT = "pageImageHeight";
	public static final String PAGE_TOP = "pageTop";
	public static final String PAGE_LEFT = "pageLeft";
	public static final String OPER_CODE = "operCode";
	public static final String MENU_CODE = "menuCode";

	protected void initDao() {
		// do nothing
	}

	public void save(InfoPage transientInstance) {
		log.debug("saving InfoPage instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(InfoPage persistentInstance) {
		log.debug("deleting InfoPage instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public InfoPage findById(java.lang.Integer id) {
		log.debug("getting InfoPage instance with id: " + id);
		try {
			InfoPage instance = (InfoPage) getHibernateTemplate().get(
					"com.ems.entity.InfoPage", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(InfoPage instance) {
		log.debug("finding InfoPage instance by example");
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
		log.debug("finding InfoPage instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from InfoPage as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByPageResourceId(Object pageResourceId) {
		return findByProperty(PAGE_RESOURCE_ID, pageResourceId);
	}

	public List findByPageType(Object pageType) {
		return findByProperty(PAGE_TYPE, pageType);
	}

	public List findByPageImageUrl(Object pageImageUrl) {
		return findByProperty(PAGE_IMAGE_URL, pageImageUrl);
	}

	public List findByPageName(Object pageName) {
		return findByProperty(PAGE_NAME, pageName);
	}

	public List findByPageIcon(Object pageIcon) {
		return findByProperty(PAGE_ICON, pageIcon);
	}

	public List findByPageImageWidth(Object pageImageWidth) {
		return findByProperty(PAGE_IMAGE_WIDTH, pageImageWidth);
	}

	public List findByPageImageHeight(Object pageImageHeight) {
		return findByProperty(PAGE_IMAGE_HEIGHT, pageImageHeight);
	}

	public List findByPageTop(Object pageTop) {
		return findByProperty(PAGE_TOP, pageTop);
	}

	public List findByPageLeft(Object pageLeft) {
		return findByProperty(PAGE_LEFT, pageLeft);
	}

	public List findByOperCode(Object operCode) {
		return findByProperty(OPER_CODE, operCode);
	}

	public List findByMenuCode(Object menuCode) {
		return findByProperty(MENU_CODE, menuCode);
	}

	public List findAll() {
		log.debug("finding all InfoPage instances");
		try {
			String queryString = "from InfoPage";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public InfoPage merge(InfoPage detachedInstance) {
		log.debug("merging InfoPage instance");
		try {
			InfoPage result = (InfoPage) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(InfoPage instance) {
		log.debug("attaching dirty InfoPage instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(InfoPage instance) {
		log.debug("attaching clean InfoPage instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static InfoPageDAO getFromApplicationContext(ApplicationContext ctx) {
		return (InfoPageDAO) ctx.getBean("InfoPageDAO");
	}
}