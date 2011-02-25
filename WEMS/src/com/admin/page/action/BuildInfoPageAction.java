package com.admin.page.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageBuilderService;
import com.opensymphony.xwork2.ActionSupport;

@Component("BuildInfoPageAction")
@Scope("prototype")
public class BuildInfoPageAction extends ActionSupport {
		 private  boolean  is_success=false;
		 private  String  message;
		 private  PageBuilderService  pbServ;
		 private  Integer  bspk_page_id;
		public boolean isIs_success() {
			return is_success;
		}
		public String getMessage() {
			return message;
		}
		@Resource(name="PageBuilderService")
		public void setPbServ(PageBuilderService pbServ) {
			this.pbServ = pbServ;
		}
		public void setBspk_page_id(Integer bspkPageId) {
			bspk_page_id = bspkPageId;
		}
		 
		 public  String  CreateNorPage(){
			 	is_success=pbServ.CreateNorPage(bspk_page_id,message);
			 	return   SUCCESS;
		 }
		 
		 public   String  CreateDevicePage(){
			    is_success=pbServ.CreateDevicePage(bspk_page_id,message);
			 	return  SUCCESS;
		 }
		 
}
