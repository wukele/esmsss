package com.busi.action;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.stereotype.Component;


import com.entries.ulp.InfoConfigDAO;
import com.entries.ulp.InfoOper;
import com.entries.ulp.InfoOperDAO;
import com.opensymphony.xwork2.ActionSupport;
import com.ulp.comm.CommTools;
import com.ulp.comm.CommUlpKey;


@Component("LoginAction")
public class LoginAction extends ActionSupport implements ServletRequestAware {
				/**
	 * 
	 */
	private static final long serialVersionUID = 7593107936657413452L;
				public InfoOper getOper() {
					return oper;
				}
				private String username="";
				private String password="";
				private InfoOperDAO  operDao;
				private InfoOper oper;
				private InfoConfigDAO  configDao;
				public InfoConfigDAO getConfigDao() {
					return configDao;
				}
				
				
				@Resource(name="InfoConfigDAO")
				public void setConfigDao(InfoConfigDAO configDao) {
					this.configDao = configDao;
				}
				HttpServletRequest  request;
				public InfoOperDAO getOperDao() {
					return operDao;
				}
				
				@Resource(name="InfoOperDAO")
				public void setOperDao(InfoOperDAO operDao) {
					this.operDao = operDao;
				}
				public String getUsername() {
					return username;
				}
				public void setUsername(String username) {
					this.username = username;
				}
				public String getPassword() {
					return password;
				}
				public void setPassword(String password) {
					this.password = password;
				}
				public String execute(){
						oper=operDao.findByUsernameAndPwd(username, password);
					if(oper!=null){
						double  cnt=0.0;
						if(oper.getLoginCount()!=null){
										cnt=oper.getLoginCount();
						}
						cnt++;
						oper.setLoginCount(cnt);
						oper.setLoginIp(CommTools.ClientIpAddr(request));
						oper.setIsOnline("1");
						oper.setLoginName(request.getRemoteAddr());
						operDao.updateInfoOper(oper);
					}else{
						 return ERROR;
					}
					HttpSession  session=request.getSession();
					/*if(session==null){
							session=request.getSession(true);
					}else{
							 session.invalidate();
							 session=request.getSession(true);
					}*/
					session.setAttribute(CommUlpKey.KEY_INFO_OPER, oper);
					//session.setMaxInactiveInterval(CommTools.getSysMaxInactiveInterval(configDao));
					return SUCCESS;
				}
				public void setServletRequest(HttpServletRequest arg0) {
					// TODO Auto-generated method stub
					request=arg0;
				}
}
