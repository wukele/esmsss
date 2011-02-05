package com.admin.page.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageResourceService;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.TplPageResource;


@Component("TplPageResourceAction")
@Scope("prototype")
public class TplPageResourceAction extends ActionSupport {
			private  boolean  success=false;
			private  TplPageResource  comp;
			private  PageResourceService   res_serv;
			
			public boolean isSuccess() {
				return success;
			}

			public void setSuccess(boolean success) {
				this.success = success;
			}

			public TplPageResource getComp() {
				return comp;
			}
	
			public void setComp(TplPageResource comp) {
				this.comp = comp;
			}
			@Resource(name="PageResourceService")
			public void setRes_serv(PageResourceService resServ) {
				res_serv = resServ;
			}

			public   String  ModifyTplComponent(){
				res_serv.ModTplComponent(comp);
				success=true;
				return  SUCCESS;
			}
			
			public String removeTplComponent(){
				res_serv.delTplRemove(comp);
				success=true;
				return SUCCESS;
			}
			
}
