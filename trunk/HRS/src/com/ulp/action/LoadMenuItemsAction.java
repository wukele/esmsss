/**
 * 
 */
package com.ulp.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;


import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoOper;
import com.entries.ulp.InfoSysModule;
import com.opensymphony.xwork2.ActionSupport;
import com.ui.TreeMenuItems;
import com.ui.UIContainer;
import com.ulp.comm.CommUlpKey;
import com.ulp.dao.MenuItemDao;


/**
 * @author zhangchangfeng
 *
 */
public class LoadMenuItemsAction extends ActionSupport implements
		ServletRequestAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = -458665628353909135L;
	/* (non-Javadoc)
	 * @see org.apache.struts2.interceptor.ServletRequestAware#setServletRequest(javax.servlet.http.HttpServletRequest)
	 */
	private  HttpServletRequest request;
	private  MenuItemDao  menuDao;
	public MenuItemDao getMenuDao() {
		return menuDao;
	}
	public void setMenuDao(MenuItemDao menuDao) {
		this.menuDao = menuDao;
	}
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
			request=arg0;
	}
	public String execute(){
		HttpSession  session = request.getSession();
		InfoOper  oper=(InfoOper)session.getAttribute(CommUlpKey.KEY_INFO_OPER);
		List<InfoSysModule> modules=menuDao.QueryOperModule(oper);
		session.setAttribute(CommUlpKey.KEY_SYS_MODULE, modules);
		List<InfoMenu>  parentMenus=menuDao.QueryOperCMenuItem(oper, null);
		if(parentMenus!=null  &&  parentMenus.size()>0){
					int len=parentMenus.size();
					TreeMenuItems[] trees=new TreeMenuItems[len];
					for(int i=0;i<len;i++){
									trees[i]=new TreeMenuItems(oper,parentMenus.get(i),menuDao);
					}
					UIContainer  ui=new UIContainer();
					ui.initContainer(modules, trees);
					session.setAttribute(CommUlpKey.KEY_UI_CONTIANER, ui);
		 }
		return SUCCESS;
	}
	

}
