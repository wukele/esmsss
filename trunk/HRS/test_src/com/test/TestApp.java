package com.test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.entries.ulp.InfoOper;
import com.entries.ulp.InfoOperDAO;
import com.test.comm.ParaTools;

import junit.framework.TestCase;

public class TestApp extends TestCase {
	protected double fValue1;
	protected double fValue2;

	protected void setUp() {
		fValue1 = 2.0;
		fValue2 = 3.0;
	}

	public void testAdd() {
		double result = fValue1 + fValue2;
		assertTrue(result == 5.0);
	}

	public void testHql(){
    	String[] files=new String[]{"D:\\spring\\HRS\\src\\applicationContext.xml",
    			"D:\\spring\\HRS\\src\\com\\config\\spring\\spring_busi_actions.xml",
    			"D:\\spring\\HRS\\src\\com\\config\\spring\\spring_HB_entries.xml"};
    	ApplicationContext ac=new FileSystemXmlApplicationContext(files);
    	InfoOperDAO  doa=(InfoOperDAO)ac.getBean("InfoOperDAO");
    	InfoOper oper=doa.findByUsernameAndPwd("TEST01", "123456");
    	System.out.println("operno=="+oper.getOperNo());
    	assertNotNull(oper);
    }
	
	public void testOperUpdate(){
		ApplicationContext ac=ParaTools.getApplicationContext();
		InfoOperDAO  doa=(InfoOperDAO)ac.getBean("InfoOperDAO");
		InfoOper oper=doa.findByUsernameAndPwd("TEST01", "123456");
	}

}
