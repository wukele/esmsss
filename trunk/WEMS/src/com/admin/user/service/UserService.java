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
 * @author hooxin
 *
 */
@Component("UserService")
public class UserService {
	private static final Log log = LogFactory.getLog(UserService.class);
	private String errorMsg;
	private int errorCode;
	private InfoOperDAO userDao;
	
	/**
	 * ���һ���û�
	 * @param user �û�/����Աʵ��
	 */
	@Transactional 
	public int appendUser(InfoOper user){
		errorCode=0;
		try{
			user.setRegionId("0");
			user.setDealType("0");
			user.setStatisticalDeptNo("999999");
			userDao.save(user);
		}catch (RuntimeException e) {
			// TODO: handle exception
			log.error("appdenUser failed...");
			errorCode=1;
			errorMsg="appdenUser failed...";
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
	 * @param user �û�/����Աʵ��
	 */
	@Transactional
	public int modifyUser(InfoOper user){
		errorCode=0;
		try {
			user.setRegionId("0");
			user.setDealType("0");
			user.setStatisticalDeptNo("999999");
			userDao.merge(user);
		} catch (RuntimeException e) {
			log.error("modifyUser failed...");
			errorCode=1;
			errorMsg="modifyUser failed...";
		}
		
		return errorCode;
	}

	/**
	 * ��ѯ�û���Ϣ
	 * @param operNo �û���
	 * @param operName �û�����
	 * @return
	 */
	public List<InfoOper> findUsers(String operNo,String operName){
		List<InfoOper> lst=null;
		Map<String, Object> map	= new HashMap<String, Object>();
		
		if(operNo!=null && operNo.trim().length() > 0)
			map.put("operNo", operNo);
		if(operName!=null && operName.trim().length() > 0)
			map.put("operName", operName);
		
		lst=userDao.findByPropertiesMap(map);
		return lst;
	}
	public void removeUser(InfoOper user){
		
	}
	
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	
	@Resource(name="InfoOperDAO")
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
