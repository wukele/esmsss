package com.admin.page.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.TemplatePageRemainService;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.TplInfoPage;

@Component("TemplatePageModify")
@Scope("prototype")
public class TemplatePageModify extends ActionSupport {
	private Integer tplPageId;
	private String tplPageName;
	private String tplImagePath;
	private Integer tplImageWidth;
	private Integer tplImageHeight;
	private String tplPageResource;
	private String tplOperCode;
	private String tplPageType;
	private String  res_code;
	public String getRes_code() {
		return res_code;
	}

	private TemplatePageRemainService   tpl_service;
	
	@Resource(name="TemplatePageRemainService")
	public void setTpl_service(TemplatePageRemainService tplService) {
		tpl_service = tplService;
	}

	public  String  execute(){
		TplInfoPage  tpl=new TplInfoPage();
		tpl.setTplImageHeight(tplImageHeight);
		tpl.setTplImageWidth(tplImageWidth);
		tpl.setTplPageId(tplPageId);
		tpl.setTplPageType(tplPageType);
		tpl.setTplImagePath(tplImagePath);
		tpl.setTplPageResource(tplPageResource);
		tpl.setTplPageName(tplPageName);
		tpl.setTplOperCode(tplOperCode);
		tpl_service.ModifyTemplatePages(tpl);
		 res_code="0";
		  return SUCCESS;
	}

	public void setTplPageId(Integer tplPageId) {
		this.tplPageId = tplPageId;
	}

	public void setTplPageName(String tplPageName) {
		this.tplPageName = tplPageName;
	}

	public void setTplImagePath(String tplImagePath) {
		this.tplImagePath = tplImagePath;
	}

	public void setTplImageWidth(Integer tplImageWidth) {
		this.tplImageWidth = tplImageWidth;
	}

	public void setTplImageHeight(Integer tplImageHeight) {
		this.tplImageHeight = tplImageHeight;
	}

	public void setTplPageResource(String tplPageResource) {
		this.tplPageResource = tplPageResource;
	}

	public void setTplOperCode(String tplOperCode) {
		this.tplOperCode = tplOperCode;
	}

	public void setTplPageType(String tplPageType) {
		this.tplPageType = tplPageType;
	}
}
