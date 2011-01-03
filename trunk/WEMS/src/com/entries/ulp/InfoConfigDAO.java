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
 	* A data access object (DAO) providing persistence and search support for InfoConfig entities.
 			* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see com.entries.ulp.InfoConfig
  * @author MyEclipse Persistence Tools 
 */
@Component("InfoConfigDAO")
public class InfoConfigDAO extends EmsDao  {
		 private static final Log log = LogFactory.getLog(InfoConfigDAO.class);
		//property constants
	public static final String CONFIG_NAME = "configName";
	public static final String CONFIG_VALUE = "configValue";
	public static final String CONFIG_DESC = "configDesc";



	protected void initDao() {
		//do nothing
	}
    
    public void save(InfoConfig transientInstance) {
        log.debug("saving InfoConfig instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(InfoConfig persistentInstance) {
        log.debug("deleting InfoConfig instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public InfoConfig findById( java.lang.String id) {
        log.debug("getting InfoConfig instance with id: " + id);
        try {
            InfoConfig instance = (InfoConfig) getHibernateTemplate()
                    .get("com.entries.ulp.InfoConfig", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    
    public List findByExample(InfoConfig instance) {
        log.debug("finding InfoConfig instance by example");
        try {
            List results = getHibernateTemplate().findByExample(instance);
            log.debug("find by example successful, result size: " + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }    
    
    public List findByProperty(String propertyName, Object value) {
      log.debug("finding InfoConfig instance with property: " + propertyName
            + ", value: " + value);
      try {
         String queryString = "from InfoConfig as model where model." 
         						+ propertyName + "= ?";
		 return getHibernateTemplate().find(queryString, value);
      } catch (RuntimeException re) {
         log.error("find by property name failed", re);
         throw re;
      }
	}

	public List findByConfigName(Object configName
	) {
		return findByProperty(CONFIG_NAME, configName
		);
	}
	
	public List findByConfigValue(Object configValue
	) {
		return findByProperty(CONFIG_VALUE, configValue
		);
	}
	
	public List findByConfigDesc(Object configDesc
	) {
		return findByProperty(CONFIG_DESC, configDesc
		);
	}
	

	public List findAll() {
		log.debug("finding all InfoConfig instances");
		try {
			String queryString = "from InfoConfig";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public InfoConfig merge(InfoConfig detachedInstance) {
        log.debug("merging InfoConfig instance");
        try {
            InfoConfig result = (InfoConfig) getHibernateTemplate()
                    .merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(InfoConfig instance) {
        log.debug("attaching dirty InfoConfig instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(InfoConfig instance) {
        log.debug("attaching clean InfoConfig instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    
    public  List<String>  findBGImages(){
    	log.info("find all path");
    	return  getHibernateTemplate().find("select cf.configValue  from InfoConfig as cf" +
    			"where cf.configName='BackgroundImagePath'");
    }

	public static InfoConfigDAO getFromApplicationContext(ApplicationContext ctx) {
    	return (InfoConfigDAO) ctx.getBean("InfoConfigDAO");
	}
}