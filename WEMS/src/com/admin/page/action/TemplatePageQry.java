package com.admin.page.action;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.dao.TplInfoPageDao;
import com.admin.page.service.TemplatePageRemainService;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.TplInfoPage;

@SuppressWarnings("serial")
@Component("TemplatePageQry")
@Scope("prototype")
public class TemplatePageQry extends ActionSupport {
	private TemplatePageRemainService tps;
	private TplInfoPage templatePageInfo;
	private List<TplInfoPage> lstTemplatePages;
	private Integer iTemplatePagesCount;

	/*
	 * ²éÑ¯Ò³ÃæÄ£°å
	 * 
	 * @see com.opensymphony.xwork2.ActionSupport#execute()
	 */
	@Override
	public String execute() throws Exception {
		if(templatePageInfo==null)
			templatePageInfo=new TplInfoPage();
		
		lstTemplatePages=tps.findTemplatePages(templatePageInfo.getTplPageId(), templatePageInfo.getTplPageName());
		iTemplatePagesCount=lstTemplatePages.size();
		
		return SUCCESS;
	}

	public TemplatePageRemainService getTps() {
		return tps;
	}

	public void setTps(TemplatePageRemainService tps) {
		this.tps = tps;
	}

	public TplInfoPage getTemplatePageInfo() {
		return templatePageInfo;
	}

	public void setTemplatePageInfo(TplInfoPage templatePageInfo) {
		this.templatePageInfo = templatePageInfo;
	}

	public List<TplInfoPage> getLstTemplatePages() {
		return lstTemplatePages;
	}

	public Integer getiTemplatePagesCount() {
		return iTemplatePagesCount;
	}

	public void setLstTemplatePages(List<TplInfoPage> lstTemplatePages) {
		this.lstTemplatePages = lstTemplatePages;
	}

	public void setiTemplatePagesCount(Integer iTemplatePagesCount) {
		this.iTemplatePagesCount = iTemplatePagesCount;
	}

}
