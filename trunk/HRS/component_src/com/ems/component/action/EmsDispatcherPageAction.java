package com.ems.component.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.component.BaseComponent;
import com.component.CommEmsKey;
import com.ems.data.dao.IPageResourcesManager;
import com.ems.entity.InfoPage;

import com.opensymphony.xwork2.ActionSupport;

public class EmsDispatcherPageAction extends ActionSupport implements ServletRequestAware {
		 /**
	 * 
	 */
	
	private static final long serialVersionUID = 9131944069282583041L;
	
	private String menu_code;
	
	private HttpServletRequest request;
	
	public String getMenu_code() {
		return menu_code;
	}



	public void setMenu_code(String menuCode) {
		menu_code = menuCode;
	}



	public List<String> getTagScript() {
		return tagScript;
	}



	public void setTagScript(List<String> tagScript) {
		this.tagScript = tagScript;
	}


	
	private List<String> tagScript;
	
	
	private IPageResourcesManager  pageManager;
	

		public IPageResourcesManager getPageManager() {
		return pageManager;
	}



	public void setPageManager(IPageResourcesManager pageManager) {
		this.pageManager = pageManager;
	}



		public  String  execute(){
			 tagScript=pageManager.GetPageScripts(menu_code);
			 HttpSession  session =  request.getSession();
			 session.removeAttribute(CommEmsKey.KEY_EMS_PAGE_SCRIPTS);
			 session.setAttribute(CommEmsKey.KEY_EMS_PAGE_SCRIPTS, tagScript);
			 InfoPage  infopage=pageManager.GetCurrentPage(menu_code);
			 session.removeAttribute(CommEmsKey.KEY_EMS_INFO_PAGE);
			 session.setAttribute(CommEmsKey.KEY_EMS_INFO_PAGE, infopage);
			 List<BaseComponent> comps=pageManager.GetPageComponent(infopage.getPageResourceId());
			 JSONArray   ja=new JSONArray();
			 ja.addAll(comps);
			 session.removeAttribute(CommEmsKey.KEY_EMS_PAGE_COMPONENT);
			 session.setAttribute(CommEmsKey.KEY_EMS_PAGE_COMPONENT, ja.toString());
			 
			 return SUCCESS;
		 }



		public void setServletRequest(HttpServletRequest arg0) {
			// TODO Auto-generated method stub
			 request=arg0;
		}
}
