package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageResourceService;
import com.admin.page.service.TemplatePageRemainService;
import com.admin.page.struct.PageResourceStruct;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.TplInfoPage;
@Component("TplPreviewerAction")
@Scope("prototype")
public class TplPreviewerAction extends ActionSupport implements  ServletRequestAware{
		
	   private  Integer  page_id;
	   private  HttpServletRequest  request;
	   private  TemplatePageRemainService  tplServ;
	   private  PageResourceService  resServ;
	   @Resource(name="PageResourceService")
		public void setResServ(PageResourceService resServ) {
		this.resServ = resServ;
	}

		public Integer getPage_id() {
		return page_id;
	}

	public void setPage_id(Integer pageId) {
		page_id = pageId;
	}

	public TemplatePageRemainService getTplServ() {
		return tplServ;
	}
	@Resource(name="TemplatePageRemainService")
	public void setTplServ(TemplatePageRemainService tplServ) {
		this.tplServ = tplServ;
	}

		public String  TplPreviewerDispatcher(){
					TplInfoPage   page=tplServ.GetTplPage(page_id);
					List<PageResourceStruct>  tplRes=resServ.QueryPageResource(page.getTplPageResource());
					JSONArray   resJson=new JSONArray();
					resJson.addAll(tplRes);
					HttpSession  session=request.getSession();
					session.setAttribute(CommPageKeys.KEY_TPL_PAGE_RESOURCE_JSON, resJson);
					session.setAttribute(CommPageKeys.KEY_TPL_INFO_PAGE, page);
					return SUCCESS;
		}

		public void setServletRequest(HttpServletRequest arg0) {
			// TODO Auto-generated method stub
				    request=arg0;
		}
}
