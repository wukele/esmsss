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
 * InfoMenu entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see com.entries.ulp.InfoMenu
 * @author MyEclipse Persistence Tools
 */
@Component("InfoMenuDAO")
public class InfoMenuDAO extends EmsDao {
	private static final Log log = LogFactory.getLog(InfoMenuDAO.class);
	// property constants
	public static final String PARENT_MENU_CODE = "parentMenuCode";
	public static final String MODULE_CODE = "moduleCode";
	public static final String PATH_CODE = "pathCode";
	public static final String MENU_COL = "menuCol";
	public static final String MENU_ROW = "menuRow";
	public static final String ISSHOW = "isshow";
	public static final String MENU_URL = "menuUrl";
	public static final String MENU_TITLE = "menuTitle";
	public static final String COMMENTS = "comments";
	public static final String ICON_URL = "iconUrl";
	public static final String ISACTIVE = "isactive";
	public static final String RES_CHAR1 = "resChar1";
	public static final String RES_CHAR2 = "resChar2";
	public static final String RES_CHAR3 = "resChar3";
	public static final String RES_INIT1 = "resInit1";
	public static final String RES_INIT2 = "resInit2";
	public static final String RES_INIT3 = "resInit3";
	public static final String DEPLOY_SYS_CODE = "deploySysCode";

	protected void initDao() {
		// do nothing
	}

	public void save(InfoMenu transientInstance) {
		log.debug("saving InfoMenu instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(InfoMenu persistentInstance) {
		log.debug("deleting InfoMenu instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public InfoMenu findById(java.lang.String id) {
		log.debug("getting InfoMenu instance with id: " + id);
		try {
			InfoMenu instance = (InfoMenu) getHibernateTemplate().get(
					"com.entries.ulp.InfoMenu", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(InfoMenu instance) {
		log.debug("finding InfoMenu instance by example");
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
		log.debug("finding InfoMenu instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from InfoMenu as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByParentMenuCode(Object parentMenuCode) {
		return findByProperty(PARENT_MENU_CODE, parentMenuCode);
	}

	public List findByModuleCode(Object moduleCode) {
		return findByProperty(MODULE_CODE, moduleCode);
	}

	public List findByPathCode(Object pathCode) {
		return findByProperty(PATH_CODE, pathCode);
	}

	public List findByMenuCol(Object menuCol) {
		return findByProperty(MENU_COL, menuCol);
	}

	public List findByMenuRow(Object menuRow) {
		return findByProperty(MENU_ROW, menuRow);
	}

	public List findByIsshow(Object isshow) {
		return findByProperty(ISSHOW, isshow);
	}

	public List findByMenuUrl(Object menuUrl) {
		return findByProperty(MENU_URL, menuUrl);
	}

	public List findByMenuTitle(Object menuTitle) {
		return findByProperty(MENU_TITLE, menuTitle);
	}

	public List findByComments(Object comments) {
		return findByProperty(COMMENTS, comments);
	}

	public List findByIconUrl(Object iconUrl) {
		return findByProperty(ICON_URL, iconUrl);
	}

	public List findByIsactive(Object isactive) {
		return findByProperty(ISACTIVE, isactive);
	}

	public List findByResChar1(Object resChar1) {
		return findByProperty(RES_CHAR1, resChar1);
	}

	public List findByResChar2(Object resChar2) {
		return findByProperty(RES_CHAR2, resChar2);
	}

	public List findByResChar3(Object resChar3) {
		return findByProperty(RES_CHAR3, resChar3);
	}

	public List findByResInit1(Object resInit1) {
		return findByProperty(RES_INIT1, resInit1);
	}

	public List findByResInit2(Object resInit2) {
		return findByProperty(RES_INIT2, resInit2);
	}

	public List findByResInit3(Object resInit3) {
		return findByProperty(RES_INIT3, resInit3);
	}

	public List findByDeploySysCode(Object deploySysCode) {
		return findByProperty(DEPLOY_SYS_CODE, deploySysCode);
	}

	public List findAll() {
		log.debug("finding all InfoMenu instances");
		try {
			String queryString = "from InfoMenu";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public InfoMenu merge(InfoMenu detachedInstance) {
		log.debug("merging InfoMenu instance");
		try {
			InfoMenu result = (InfoMenu) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(InfoMenu instance) {
		log.debug("attaching dirty InfoMenu instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(InfoMenu instance) {
		log.debug("attaching clean InfoMenu instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static InfoMenuDAO getFromApplicationContext(ApplicationContext ctx) {
		return (InfoMenuDAO) ctx.getBean("InfoMenuDAO");
	}

	public String GetMaxMenuCode(String moduleCode) {
		// TODO Auto-generated method stub
		List  l=getHibernateTemplate().find("select  max(im.menuCode)+1 from  InfoMenu  as im" +
				" where  im.moduleCode=? group by  im.moduleCode",moduleCode);
		if(l==null ||  l.size()==0){
					return  moduleCode+1;
		}else{
				return String.valueOf(l.get(0));		
		}
	}
}