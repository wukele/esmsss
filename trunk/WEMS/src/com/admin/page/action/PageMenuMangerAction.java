package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageMenuManageService;
import com.admin.page.struct.PageResourceDataRuleStruct;
import com.admin.page.struct.PageResourceView;
import com.opensymphony.xwork2.ActionSupport;


@Component("PageMenuMangerAction")
@Scope("prototype")
public class PageMenuMangerAction extends ActionSupport {
			
				private   Integer   page_id;
				private   List<PageResourceView>    page_resource;
				private   List<PageResourceDataRuleStruct>    page_data;
				private   PageMenuManageService  manServ;
				
				
				public List<PageResourceView> getPage_resource() {
					return page_resource;
				}


				public List<PageResourceDataRuleStruct> getPage_data() {
					return page_data;
				}


				public void setPage_id(Integer pageId) {
					page_id = pageId;
				}

				@Resource(name="PageMenuManageService")
				public void setManServ(PageMenuManageService manServ) {
					this.manServ = manServ;
				}
				
				
				public   String  qryCurrentPageData(){
						page_data=manServ.qryCrtPageData(page_id);
						return SUCCESS;
				}

				public   String  QryCurrentPageResource(){
						 page_resource=manServ.QryCurrentRes(page_id);
						 return    SUCCESS;
				}
}
