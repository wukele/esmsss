package com.admin.page.action;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.BspkPageService;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.BspkInfoPage;

@Component("TplCreateBspkPageAction")
@Scope("prototype")
public class TplCreateBspkPageAction extends ActionSupport {
		private Integer tpl_page_id;
		private String bspk_page_name;
		private BspkPageService   bspkServ;
		 private static final Log log = LogFactory.getLog(TplCreateBspkPageAction.class);
		public  boolean  success=false;
		
		public  String  BuildBspkPage(){
				try{
						bspkServ.AddBspkInfoPage(tpl_page_id,bspk_page_name);
						success=true;
				}catch (Exception e) {
					// TODO: handle exception
					    log.error(e.getMessage());
				}
				return   SUCCESS;
		}

		public Integer getTpl_page_id() {
			return tpl_page_id;
		}

		public void setTpl_page_id(Integer tplPageId) {
			tpl_page_id = tplPageId;
		}

		public String getBspk_page_name() {
			return bspk_page_name;
		}

		public void setBspk_page_name(String bspkPageName) {
			bspk_page_name = bspkPageName;
		}
		@Resource(name="BspkPageService")
		public void setBspkServ(BspkPageService bspkServ) {
			this.bspkServ = bspkServ;
		}

		public boolean isSuccess() {
			return success;
		}

		public void setSuccess(boolean success) {
			this.success = success;
		}

	

}
