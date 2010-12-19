package com.entries.ulp;

import java.util.Date;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * A data access object (DAO) providing persistence and search support for
 * InfoOper entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see com.entries.ulp.InfoOper
 * @author MyEclipse Persistence Tools
 */

public class InfoOperDAO extends HibernateDaoSupport {
	private static final Log log = LogFactory.getLog(InfoOperDAO.class);
	// property constants
	public static final String REGION_ID = "regionId";
	public static final String DEPT_NO = "deptNo";
	public static final String ROLE_CODE = "roleCode";
	public static final String OPER_NAME = "operName";
	public static final String LOGIN_NAME = "loginName";
	public static final String OPER_PWD = "operPwd";
	public static final String QUESTION = "question";
	public static final String ANSWER = "answer";
	public static final String GENDER = "gender";
	public static final String POSITIONS = "positions";
	public static final String PHONE = "phone";
	public static final String EMAIL = "email";
	public static final String MOBILE_NO = "mobileNo";
	public static final String NEED_SMS = "needSms";
	public static final String OPER_MESSAGE = "operMessage";
	public static final String INIT_FLAG = "initFlag";
	public static final String DEAL_TYPE = "dealType";
	public static final String APP_TYPE = "appType";
	public static final String STATISTICAL_DEPT_NO = "statisticalDeptNo";
	public static final String OPER_ALIAS = "operAlias";
	public static final String LOGIN_COUNT = "loginCount";
	public static final String RES_INIT1 = "resInit1";
	public static final String RES_INIT2 = "resInit2";
	public static final String RES_CHAR1 = "resChar1";
	public static final String RES_CHAR2 = "resChar2";
	public static final String PWD_ENCODE = "pwdEncode";
	public static final String OPER_STATUS = "operStatus";
	public static final String OPER_KIND = "operKind";
	public static final String FLAG = "flag";
	public static final String ACCT_STATUS = "acctStatus";
	public static final String BUSI_TYPE = "busiType";
	public static final String DERATE_FLAG = "derateFlag";
	public static final String IS_ONLINE = "isOnline";
	public static final String LOGIN_IP = "loginIp";

	protected void initDao() {
		// do nothing
	}

	public void save(InfoOper transientInstance) {
		log.debug("saving InfoOper instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(InfoOper persistentInstance) {
		log.debug("deleting InfoOper instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public InfoOper findById(java.lang.String id) {
		log.debug("getting InfoOper instance with id: " + id);
		try {
			InfoOper instance = (InfoOper) getHibernateTemplate().get(
					"com.entries.ulp.InfoOper", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(InfoOper instance) {
		log.debug("finding InfoOper instance by example");
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
		log.debug("finding InfoOper instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from InfoOper as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByRegionId(Object regionId) {
		return findByProperty(REGION_ID, regionId);
	}

	public List findByDeptNo(Object deptNo) {
		return findByProperty(DEPT_NO, deptNo);
	}

	public List findByRoleCode(Object roleCode) {
		return findByProperty(ROLE_CODE, roleCode);
	}

	public List findByOperName(Object operName) {
		return findByProperty(OPER_NAME, operName);
	}

	public List findByLoginName(Object loginName) {
		return findByProperty(LOGIN_NAME, loginName);
	}

	public List findByOperPwd(Object operPwd) {
		return findByProperty(OPER_PWD, operPwd);
	}

	public List findByQuestion(Object question) {
		return findByProperty(QUESTION, question);
	}

	public List findByAnswer(Object answer) {
		return findByProperty(ANSWER, answer);
	}

	public List findByGender(Object gender) {
		return findByProperty(GENDER, gender);
	}

	public List findByPositions(Object positions) {
		return findByProperty(POSITIONS, positions);
	}

	public List findByPhone(Object phone) {
		return findByProperty(PHONE, phone);
	}

	public List findByEmail(Object email) {
		return findByProperty(EMAIL, email);
	}

	public List findByMobileNo(Object mobileNo) {
		return findByProperty(MOBILE_NO, mobileNo);
	}

	public List findByNeedSms(Object needSms) {
		return findByProperty(NEED_SMS, needSms);
	}

	public List findByOperMessage(Object operMessage) {
		return findByProperty(OPER_MESSAGE, operMessage);
	}

	public List findByInitFlag(Object initFlag) {
		return findByProperty(INIT_FLAG, initFlag);
	}

	public List findByDealType(Object dealType) {
		return findByProperty(DEAL_TYPE, dealType);
	}

	public List findByAppType(Object appType) {
		return findByProperty(APP_TYPE, appType);
	}

	public List findByStatisticalDeptNo(Object statisticalDeptNo) {
		return findByProperty(STATISTICAL_DEPT_NO, statisticalDeptNo);
	}

	public List findByOperAlias(Object operAlias) {
		return findByProperty(OPER_ALIAS, operAlias);
	}

	public List findByLoginCount(Object loginCount) {
		return findByProperty(LOGIN_COUNT, loginCount);
	}

	public List findByResInit1(Object resInit1) {
		return findByProperty(RES_INIT1, resInit1);
	}

	public List findByResInit2(Object resInit2) {
		return findByProperty(RES_INIT2, resInit2);
	}

	public List findByResChar1(Object resChar1) {
		return findByProperty(RES_CHAR1, resChar1);
	}

	public List findByResChar2(Object resChar2) {
		return findByProperty(RES_CHAR2, resChar2);
	}

	public List findByPwdEncode(Object pwdEncode) {
		return findByProperty(PWD_ENCODE, pwdEncode);
	}

	public List findByOperStatus(Object operStatus) {
		return findByProperty(OPER_STATUS, operStatus);
	}

	public List findByOperKind(Object operKind) {
		return findByProperty(OPER_KIND, operKind);
	}

	public List findByFlag(Object flag) {
		return findByProperty(FLAG, flag);
	}

	public List findByAcctStatus(Object acctStatus) {
		return findByProperty(ACCT_STATUS, acctStatus);
	}

	public List findByBusiType(Object busiType) {
		return findByProperty(BUSI_TYPE, busiType);
	}

	public List findByDerateFlag(Object derateFlag) {
		return findByProperty(DERATE_FLAG, derateFlag);
	}

	public List findByIsOnline(Object isOnline) {
		return findByProperty(IS_ONLINE, isOnline);
	}

	public List findByLoginIp(Object loginIp) {
		return findByProperty(LOGIN_IP, loginIp);
	}

	public List findAll() {
		log.debug("finding all InfoOper instances");
		try {
			String queryString = "from InfoOper";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public InfoOper  findByUsernameAndPwd(String username,String password){
		List list=getHibernateTemplate().find("from InfoOper as oper where oper.operNo=?  " +
				"and oper.operPwd=?",new String[]{username,password});
		if(list.size()>0){
					return (InfoOper)list.get(0);
		}
		return null;
	}
	
	public boolean   updateInfoOper(InfoOper infoOper){
				
					getHibernateTemplate().update(infoOper);
					return true;
	}
	
	
	public InfoOper merge(InfoOper detachedInstance) {
		log.debug("merging InfoOper instance");
		try {
			InfoOper result = (InfoOper) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(InfoOper instance) {
		log.debug("attaching dirty InfoOper instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(InfoOper instance) {
		log.debug("attaching clean InfoOper instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static InfoOperDAO getFromApplicationContext(ApplicationContext ctx) {
		return (InfoOperDAO) ctx.getBean("InfoOperDAO");
	}
}