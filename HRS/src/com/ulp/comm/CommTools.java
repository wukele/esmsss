package com.ulp.comm;

import javax.servlet.http.HttpServletRequest;

import com.entries.ulp.InfoConfig;
import com.entries.ulp.InfoConfigDAO;

public class CommTools {
	public static String ClientIpAddr(HttpServletRequest request){
		String ip = request.getHeader("x-forwarded-for");
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	           ip = request.getHeader("Proxy-Client-IP");
	       }
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	           ip = request.getHeader("WL-Proxy-Client-IP");
	       }
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	           ip = request.getRemoteAddr();
	       }
	       return ip;
	}
	
	public static int getSysMaxInactiveInterval(InfoConfigDAO  config){
				InfoConfig   cf=config.findById("1000001");
				int  interval=Integer.parseInt(cf.getConfigValue(), 10);
				return interval;
	}
	
	
}
