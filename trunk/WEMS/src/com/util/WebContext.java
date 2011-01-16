/**
 * 
 */
package com.util;

import java.io.File;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.StrutsStatics;

import com.opensymphony.xwork2.ActionContext;

/**
 * Web Context
 * @author Ken Liu Kunyun,hooxin
 * Created on Feb 26, 2010
 */
public class WebContext {
	public static HashMap<String, Boolean> fileExitsCache = new HashMap<String, Boolean>();
	
	/**
	 * get session attribute
	 * call only in struts2 action stack 
	 * @param key
	 * @return
	 */
	public static Object session(String key){
		return ((HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST)).
				getSession().getAttribute(key);
	}
	
	/**
	 * get session attribute
	 * @param session
	 * @param key
	 * @return
	 */
	public static Object session(HttpSession session, String key){
		return session.getAttribute(key);
	}
	
	public static HttpServletRequest getRequest(){
		return ((HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST));
	}
	
	/**
	 * make full url from suburl
	 * @param subUrl
	 * @return
	 */
	public static String fullUrl(String subUrl){
		return subUrl.replaceAll("^~/", fullContextPath(getRequest())+"/");
	}
	
	/**
	 * make full url from suburl
	 * @param req
	 * @param subUrl
	 * @return
	 */
	public static String fullUrl(HttpServletRequest req, String subUrl){
		return subUrl.replaceAll("^~/", fullContextPath(req)+"/");
	}
	
	/**
	 * get full context path
	 * @param req
	 * @return
	 */
	public static String fullContextPath(HttpServletRequest req){
		int port=req.getServerPort();
		return req.isSecure()?"https://":"http://"+req.getServerName()+
				((port==80)?"":":"+port)+req.getContextPath();
	}
	
	public static ServletContext getContext(){
		return getRequest().getSession().getServletContext();
	}
	
	/**
	 * get response
	 * @return
	 */
	public static HttpServletResponse getResponse() {
		return (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
	}
	
	/**
	 * response set header
	 * @param header
	 * @param value
	 */
	public static void response(String header,String value){
		HttpServletResponse res=getResponse();
		res.setHeader(header, value);
	}
	
	/**
	 * get real path
	 * @param virtualPath
	 * @return
	 */
	public static String getRealPath(String virtualPath){
		return getContext().getRealPath(virtualPath);
	}
	
	/**
	 * get real path
	 * @param context
	 * @param virtualPath
	 * @return
	 */
	public static String getRealPath(ServletContext context, String virtualPath){
		return context.getRealPath(virtualPath);
	}
	
	/**
	 * check if a file exits with cache, if not cached, find it in i/o system
	 * @param filePath
	 * @return
	 */
	public static boolean fileExits(HttpServletRequest req, String filePath){
		Boolean ret=fileExitsCache.get(filePath);
		if(ret==null) {
			String fn=req.getSession().getServletContext().getRealPath(filePath);
			ret=new File(fn).exists();
			fileExitsCache.put(filePath, ret);
		}
		return ret;
	}

}
