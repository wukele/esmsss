package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.page.dao.PageMenuDao;
import com.admin.page.struct.MenuTreeNode;


@Component("MenuPageService")
public class MenuPageService {
	
	private  PageMenuDao    pDao;
	
	
	@Resource(name="PageMenuDao")
	public void setpDao(PageMenuDao pDao) {
		this.pDao = pDao;
	}



	public List<MenuTreeNode> GenSystemMenu(String menuCode, String moduleCode) {
		// TODO Auto-generated method stub
		List<MenuTreeNode>    node=null;
		if((menuCode==null  &&  moduleCode==null) || (menuCode.equalsIgnoreCase("") &&  moduleCode.equalsIgnoreCase("")) ){
						node=pDao.getSysModuleNodes();
		}else if(menuCode.equalsIgnoreCase("")  &&  !moduleCode.equalsIgnoreCase("")){
						node=pDao.getFristMenus(moduleCode);
		}else{
						node=pDao.getNodeMenus(menuCode,moduleCode);
		}
		
		
		return node;
	}



			
}
