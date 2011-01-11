package com.admin.page.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.TemplatePageRemainService;
import com.entries.ulp.InfoOper;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.TplInfoPage;
import com.ulp.comm.CommUlpKey;

@SuppressWarnings("serial")
@Component("TemplatePageAdd")
@Scope("prototype")
public class TemplatePageAdd extends ActionSupport implements ServletRequestAware {
	private TemplatePageRemainService temp_page_serv; //ģ��ҳ�����
	private TplInfoPage tpl_info_page; //ģ��ҳ��
	private int returnNo;
	private String returnMsg;
	private HttpServletRequest request;
	
	public TemplatePageAdd() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String execute() throws Exception {
		try{
			 HttpSession  session=request.getSession();
		     InfoOper   oper=(InfoOper)session.getAttribute(CommUlpKey.KEY_INFO_OPER);
		     tpl_info_page.setTplOperCode(oper.getOperNo());
			temp_page_serv.add_template_page(tpl_info_page);
		}catch (RuntimeException e) {
			returnNo=1;
			returnMsg=e.getMessage();
		}
		
		returnNo=0;
		returnMsg="ģ��ҳ����ӳɹ�";
		
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

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		request=arg0;
	}
	
}
