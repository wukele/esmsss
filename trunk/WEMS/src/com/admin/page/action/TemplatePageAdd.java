package com.admin.page.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.TemplatePageRemainService;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.TplInfoPage;

@SuppressWarnings("serial")
@Component("TemplatePageAdd")
@Scope("prototype")
public class TemplatePageAdd extends ActionSupport {
	private TemplatePageRemainService temp_page_serv; //模板页面服务
	private TplInfoPage tpl_info_page; //模板页面
	private int returnNo;
	private String returnMsg;
	
	public TemplatePageAdd() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String execute() throws Exception {
		try{
			temp_page_serv.add_template_page(tpl_info_page);
		}catch (RuntimeException e) {
			returnNo=1;
			returnMsg=e.getMessage();
		}
		
		returnNo=0;
		returnMsg="模板页面添加成功";
		
		return SUCCESS;
	}

	public TemplatePageRemainService getTemp_page_serv() {
		return temp_page_serv;
	}
	
	@Resource(name="TemplatePageRemainService")
	public void setTemp_page_serv(TemplatePageRemainService temp_page_serv) {
		this.temp_page_serv = temp_page_serv;
	}

	public TplInfoPage getTpl_info_page() {
		return tpl_info_page;
	}

	public void setTpl_info_page(TplInfoPage tpl_info_page) {
		this.tpl_info_page = tpl_info_page;
	}

	public int getReturnNo() {
		return returnNo;
	}

	public String getReturnMsg() {
		return returnMsg;
	}

	public void setReturnNo(int returnNo) {
		this.returnNo = returnNo;
	}

	public void setReturnMsg(String returnMsg) {
		this.returnMsg = returnMsg;
	}
	
}
