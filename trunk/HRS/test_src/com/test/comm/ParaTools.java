package com.test.comm;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class ParaTools {
		public static ApplicationContext  getApplicationContext(){
			String[] files=new String[]{"D:\\spring\\HRS\\src\\applicationContext.xml",
	    			"D:\\spring\\HRS\\src\\com\\config\\spring\\spring_busi_actions.xml",
	    			"D:\\spring\\HRS\\src\\com\\config\\spring\\spring_ulp_entries.xml"};
			return new FileSystemXmlApplicationContext(files);
		}
}
