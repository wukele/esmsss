package com.admin.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.entries.ulp.InfoOper;
import com.entries.ulp.InfoOperDAO;
import com.entries.ulp.IntermedialData;
import com.entries.ulp.RuleOperRoleDAO;

/**
 * 用户服务
 * 
 * @author hooxin
 * 
 */
@Component("UserService")
public class UserService {
	private static final Log log = LogFactory.getLog(UserService.class);

	private static final int STATUS_ACTIVE = 0;// 状态有效
	private static final int STATUS_NOT_ACTIVE = 1;// 状态无效

	private String errorMsg;
	private int errorCode;
	private InfoOperDAO userDao;
	private RuleOperRoleDAO ruleOperDao;

	/**
	 * 添加一个用户
	 * 
	 * @param user
	 *            用户/操作员实体
	 */
	@Transactional
	public int appendUser(InfoOper user) {
		errorCode = 0;
		try {
			user.setRegionId("0");
			user.setDealType("0");
			user.setStatisticalDeptNo("999999");
			user.setFlag(0);
			userDao.save(user);
		/**
		 * 这下面是我加的，看看是这个意思吧，呵呵
		 */
			IntermedialData data=new IntermedialData();
			data.setOperNo(user.getOperNo());
			data.setRoleCode(user.getRoleCode());
			ruleOperDao.Save(data);
		} catch (RuntimeException e) {
			// TODO: handle exception
			log.error("appdenUser failed...");
			errorCode = 1;
			errorMsg = "appdenUser failed...";
		}

		return errorCode;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public InfoOperDAO getUserDao() {
		return userDao;
	}

	/**
	 * 修改用户信息
	 * 
	 * @param user
	 *            用户/操作员实体
	 */
	@Transactional
	public int modifyUser(InfoOper user) {
		errorCode = 0;
		try {
			userDao.merge(user);
		} catch (RuntimeException e) {
			log.error("modifyUser failed...");
			errorCode = 1;
			errorMsg = "modifyUser failed...";
		}

		return errorCode;
	}

	/**
	 * 查询用户信息
	 * 
	 * @param operNo
	 *            用户号
	 * @param operName
	 *            用户名称
	 * @return
	 */
	public List<InfoOper> findUsers(String operNo, String operName) {
		List<InfoOper> lst = null;
		Map<String, Object> map = new HashMap<String, Object>();

		if (operNo != null && operNo.trim().length() > 0)
			map.put("operNo", operNo);
		if (operName != null && operName.trim().length() > 0)
			map.put("operName", operName);
		lst = userDao.findByPropertiesMap(map);
		return lst;
	}

	/**
	 * 删除用户
	 * 
	 * @param user
	 * @author yunlong.yuan
	 */
	@Transactional
	public void removeUser(InfoOper user) {
		userDao.delete(user);
	}

	/**
	 * 批量删除
	 * 
	 * @param lstOperNo
	 *            用户号列表
	 */
	@Transactional
	public void removeUser(List<String> lstOperNo) {
		log.debug("removeUser list start..");
		errorCode = 0;
		try {
			if (lstOperNo == null || lstOperNo.size() == 0)
				throw new RuntimeException("用户号列表内容为空");
			for (String operNo : lstOperNo)
				userDao.deleteUser(operNo);
			log.debug("removeUser list finish..");
		} catch (RuntimeException e) {
			log.error("removeUser list failed...");
			log.error(e);
			errorCode = 1;
			errorMsg = e.getMessage();
			throw e;
		}
	}

	/**
	 * 删除用户
	 * 
	 * @param operNo
	 *            用户号
	 */
	public void removeUser(String operNo) {
		log.debug("removeUser start..");
		errorCode = 0;
		try {
			userDao.deleteUser(operNo);
			log.debug("removeUser finish..");
		} catch (RuntimeException e) {
			log.error("removeUser failed...");
			errorCode = 1;
			errorMsg = e.getMessage();
			throw e;
		}
	}

	/**
	 * 使用户有效
	 * 
	 * @param operNo
	 *            用户号
	 */
	public void validateUser(String operNo) {
		log.debug("validateUser start..");
		errorCode = 0;
		try {
			if (operNo == null || operNo.trim().length() == 0)
				throw new RuntimeException("用户号为空");
			userDao.changeUserStatus(operNo, STATUS_ACTIVE);
			log.debug("validateUser finish..");
		} catch (RuntimeException e) {
			log.error("validateUser failed...");
			log.error(e);
			errorCode = 1;
			errorMsg = e.getMessage();
			throw e;
		}
	}
	
	/**
	 * 批量有效用户
	 * @param operNo 用户号
	 */
	public void validateUser(List<String> lstOperNo) {
		log.debug("validateUser start..");
		errorCode = 0;
		try {
			if (lstOperNo == null || lstOperNo.size() == 0)
				throw new RuntimeException("用户号列表内容为空");
			for (String operNo : lstOperNo)
				userDao.changeUserStatus(operNo, STATUS_ACTIVE);
			log.debug("validateUser finish..");
		} catch (RuntimeException e) {
			log.error("validateUser failed...");
			log.error(e);
			errorCode = 1;
			errorMsg = e.getMessage();
			throw e;
		}
	}

	/**
	 * 使用户无效
	 * 
	 * @param operNo
	 *            用户号
	 */
	public void invalidateUser(String operNo) {
		log.debug("invalidateUser start..");
		errorCode = 0;
		try {
			if (operNo == null || operNo.trim().length() == 0)
				throw new RuntimeException("用户号为空");
			userDao.changeUserStatus(operNo, STATUS_NOT_ACTIVE);
			log.debug("invalidateUser finish..");
		} catch (RuntimeException e) {
			log.error("invalidateUser failed...");
			log.error(e);
			errorCode = 1;
			errorMsg = e.getMessage();
			throw e;
		}
	}
	
	/**
	 * 批量无效用户
	 * @param operNo 用户号
	 */
	public void invalidateUser(List<String> lstOperNo) {
		log.debug("invalidateUser start..");
		errorCode = 0;
		try {
			if (lstOperNo == null || lstOperNo.size() == 0)
				throw new RuntimeException("用户号列表内容为空");
			for (String operNo : lstOperNo)
				userDao.changeUserStatus(operNo, STATUS_NOT_ACTIVE);
			log.debug("invalidateUser finish..");
		} catch (RuntimeException e) {
			log.error("invalidateUser failed...");
			log.error(e);
			errorCode = 1;
			errorMsg = e.getMessage();
			throw e;
		}
	}

	/**
	 * 拒绝此用户访问数据库
	 * 
	 * @param user
	 * @author yunlong.yuan
	 */
	@Transactional
	public void accessDenial(InfoOper user) {
		userDao.denial(user);
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	@Resource(name = "InfoOperDAO")
	public void setUserDao(InfoOperDAO userDao) {
		this.userDao = userDao;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public RuleOperRoleDAO getRuleOperDao() {
		return ruleOperDao;
	}

	@Resource(name="RuleOperRoleDAO")
	public void setRuleOperDao(RuleOperRoleDAO ruleOperDao) {
		this.ruleOperDao = ruleOperDao;
	}
	
	
}
