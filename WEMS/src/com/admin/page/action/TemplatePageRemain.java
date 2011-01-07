package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.TemplatePageRemainService;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.TplInfoPage;

@Component("TemplatePageRemain")
@Scope("prototype")
public class TemplatePageRemain extends ActionSupport {
			private  int start;
			private  int limit;
			private  String  tpl_page_id;
			private  String  tpl_page_name;
			private  List<TplInfoPage>  tpls;
			private  int  totalProperty;
			public int getTotalProperty() {
				return totalProperty;
			}

			public List<TplInfoPage> getTpls() {
				return tpls;
			}

			private  TemplatePageRemainService   tpl_service;
			
			public void setStart(int start) {
				this.start = start;
			}

			public void setLimit(int limit) {
				this.limit = limit;
			}

			public void setTpl_page_id(String tplPageId) {
				tpl_page_id = tplPageId;
			}

			public void setTpl_page_name(String tplPageName) {
				tpl_page_name = tplPageName;
			}
			@Resource(name="TemplatePageRemainService")
			public void setTpl_service(TemplatePageRemainService tplService) {
				tpl_service = tplService;
			}

			public  String TemplatePageRemainQry(){
				List<TplInfoPage>  res=tpl_service.QryTemplatePages(tpl_page_id, tpl_page_name);
				totalProperty=res.size();
				int  end=start+limit;
				if(end>totalProperty){
						end=totalProperty;
				}
				tpls=res.subList(start, end);
				return SUCCESS;
			}
			
			public  String  TemplatePageRemainDel(){
				tpl_service.DelTemplatePages(tpl_page_id);
				return SUCCESS;
			}
			
			
}
