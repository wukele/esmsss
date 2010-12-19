package com.ulp.session;


import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.entries.ulp.InfoOper;
import com.entries.ulp.InfoOperDAO;
import com.ulp.comm.CommUlpKey;



public class OperSessionListener  implements HttpSessionListener {
	
	public static long TOTAL_ONLINE_SESSIONS = 0;//session 总数
	public static long ONLINE_SESSIONS = 0;//session 在线总数
	private static final Log log = LogFactory.getLog(OperSessionListener.class);

	public void sessionCreated(HttpSessionEvent arg0) {
		// TODO Auto-generated method stub
		TOTAL_ONLINE_SESSIONS ++;
		ONLINE_SESSIONS++;
		log.info(" session +++++++++++> "+ OperSessionListener.ONLINE_SESSIONS+ "totail sessions------------------>"+OperSessionListener.TOTAL_ONLINE_SESSIONS);
	}
	

	public void sessionDestroyed(HttpSessionEvent arg0) {
		// TODO Auto-generated method stub
		ONLINE_SESSIONS --;
		HttpSession  session=arg0.getSession();
		Object  o= session.getAttribute(CommUlpKey.KEY_INFO_OPER);
		if(o!=null){
					InfoOper  oper=(InfoOper)o; 
					log.info(" session +++++++++++> "+ OperSessionListener.ONLINE_SESSIONS+ "totail sessions------------------>"+OperSessionListener.TOTAL_ONLINE_SESSIONS);
					WebApplicationContext  ac=WebApplicationContextUtils.getWebApplicationContext(arg0.getSession()
							.getServletContext());
					InfoOperDAO  operDao=(InfoOperDAO)ac.getBean("InfoOperDAO");
					oper.setIsOnline("0");
					oper.setLoginIp("");
					oper.setLoginName("");
					operDao.updateInfoOper(oper);
					session.removeAttribute(CommUlpKey.KEY_INFO_OPER);
		}
	}

}
