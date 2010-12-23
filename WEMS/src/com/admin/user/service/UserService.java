package com.admin.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

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
	private InfoOperDAO userDao;
	
	/**
	 * ���һ���û�
	 * @param user �û�/����Աʵ��
	 */
	public void appendUser(InfoOper user){
		InfoOper oldUser=null;
		
		if(user.getOperNo()==null || user.getOperNo().trim().length() == 0){
			errorMsg="user [InfoOper] operno is null";
			log.error(errorMsg);
			throw new RuntimeException(errorMsg);
		}
		
		oldUser=userDao.findById(user.getOperNo());
		
		if(oldUser!=null){
			errorMsg="user [InfoOper] of that OperNo is "+user.getOperNo()+" is exist.";
			log.error(errorMsg);
			throw new RuntimeException(errorMsg);
		}
		
		userDao.save(user);
		
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
	public void modifyUser(InfoOper user){
		
		if(user.getOperNo()==null || user.getOperNo().trim().length() == 0){
			errorMsg="user [InfoOper] operno is null";
			log.error(errorMsg);
			throw new RuntimeException(errorMsg);
		}
		
		if(user.getOperPwd()==null || user.getOperPwd().trim().length()==0){
			errorMsg="user [InfoOper] operpwd is null";
			log.error(errorMsg);
			throw new RuntimeException(errorMsg);
		}
		
		userDao.merge(user);
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
}
