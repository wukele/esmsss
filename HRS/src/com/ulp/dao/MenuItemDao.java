package com.ulp.dao;

import java.util.List;

import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoOper;
import com.entries.ulp.InfoSysModule;


public interface MenuItemDao {
			List<InfoMenu>  QueryOperCMenuItem(InfoOper oper, String  parentCode);
			List<InfoSysModule>  QueryOperModule(InfoOper oper);
			boolean  hasChidren(InfoOper oper, String  parentCode);
}
