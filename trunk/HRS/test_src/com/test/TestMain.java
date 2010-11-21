package com.test;

import java.util.List;

import net.sf.json.JSONArray;

import org.springframework.context.ApplicationContext;

import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoOper;
import com.test.comm.ParaTools;
import com.ulp.dao.MenuItemDao;

public class TestMain {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
				ApplicationContext  ac=ParaTools.getApplicationContext();
				MenuItemDao  dao=(MenuItemDao)ac.getBean("MenuItemDao");
				InfoOper  oper=new InfoOper();
				oper.setOperNo("TEST01");
				List<InfoMenu>  tree=dao.QueryOperCMenuItem(oper, null);
				//boolean   hc=dao.hasChidren(oper, null);
				JSONArray  jt=new JSONArray();
				jt.addAll(tree);
				System.out.println(jt.toString())	;
				
				//System.out.println( hc+":::"+ tree.get(0).getMenuCode());
	}

}
