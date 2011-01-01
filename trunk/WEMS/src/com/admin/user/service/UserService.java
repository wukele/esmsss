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

/**
 * �û�����
 * 
 * @author hooxin
 * 
 */
@Component("UserService")
public class UserService {
	private static final Log log = LogFactory.getLog(UserService.class);

	private static final int STATUS_ACTIVE = 0;// ״̬��Ч
	private static final int STATUS_NOT_ACTIVE = 1;// ״̬��Ч

	private String errorMsg;
	private int errorCode;
	private InfoOperDAO userDao;

	/**
	 * ���һ���û�
	 * 
	 * @param user
	 *            �û�/����Աʵ��
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
	 * �޸��û���Ϣ
	 * 
	 * @param user
	 *            �û�/����Աʵ��
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
	 * ��ѯ�û���Ϣ
	 * 
	 * @param operNo
	 *            �û���
	 * @param operName
	 *            �û�����
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
	 * ɾ���û�
	 * 
	 * @param user
	 * @author yunlong.yuan
	 */
	@Transactional
	public void removeUser(InfoOper user) {
		userDao.delete(user);
	}

	/**
	 * ����ɾ��
	 * 
	 * @param lstOperNo
	 *            �û����б�
	 */
	@Transactional
	public void removeUser(List<String> lstOperNo) {
		log.debug("removeUser list start..");
		errorCode = 0;
		try {
			if (lstOperNo == null || lstOperNo.size() == 0)
				throw new RuntimeException("�û����б�����Ϊ��");
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
	 * ɾ���û�
	 * 
	 * @param operNo
	 *            �û���
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
	 * ʹ�û���Ч
	 * 
	 * @param operNo
	 *            �û���
	 */
	public void validateUser(String operNo) {
		log.debug("validateUser start..");
		errorCode = 0;
		try {
			if (operNo == null || operNo.trim().length() == 0)
				throw new RuntimeException("�û���Ϊ��");
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
	 * ������Ч�û�
	 * @param operNo �û���
	 */
	public void validateUser(List<String> lstOperNo) {
		log.debug("validateUser start..");
		errorCode = 0;
		try {
			if (lstOperNo == null || lstOperNo.size() == 0)
				throw new RuntimeException("�û����б�����Ϊ��");
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
	 * ʹ�û���Ч
	 * 
	 * @param operNo
	 *            �û���
	 */
	public void invalidateUser(String operNo) {
		log.debug("invalidateUser start..");
		errorCode = 0;
		try {
			if (operNo == null || operNo.trim().length() == 0)
				throw new RuntimeException("�û���Ϊ��");
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
	 * ������Ч�û�
	 * @param operNo �û���
	 */
	public void invalidateUser(List<String> lstOperNo) {
		log.debug("invalidateUser start..");
		errorCode = 0;
		try {
			if (lstOperNo == null || lstOperNo.size() == 0)
				throw new RuntimeException("�û����б�����Ϊ��");
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
	 * �ܾ����û��������ݿ�
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
}
