package com.admin.user.service;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.entries.ulp.InfoOper;
import com.entries.ulp.InfoOperDAO;

/**
 * 用户服务
 * @author hooxin
 *
 */
@Component("UserService")
public class UserService {
	private static final Log log = LogFactory.getLog(UserService.class);
	private String errorMsg;
	private InfoOperDAO userDao;
	
	/**
	 * 添加一个用户
	 * @param user 用户/操作员实体
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
	 * 修改用户信息 
	 * @param user 用户/操作员实体
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
