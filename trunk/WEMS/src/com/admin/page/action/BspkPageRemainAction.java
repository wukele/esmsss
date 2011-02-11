package com.admin.page.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.BspkPageService;
import com.opensymphony.xwork2.ActionSupport;


@Component("BspkPageRemainAction")
@Scope("prototype")
public class BspkPageRemainAction extends ActionSupport {
		
		private Integer  bspk_page_id;
		private  BspkPageService   bpServ;
		
		public void setBspk_page_id(Integer bspkPageId) {
			bspk_page_id = bspkPageId;
		}
		
	
		@Resource(name="BspkPageService")
		public void setBpServ(BspkPageService bpServ) {
			this.bpServ = bpServ;
		}



		public String  RemoveBspkPage(){
			  bpServ.removeBspkPage(bspk_page_id);
			  return SUCCESS;
		}
}
