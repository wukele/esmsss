package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageResourceService;
import com.admin.page.struct.PageResourceStruct;
import com.opensymphony.xwork2.ActionSupport;

@Component("PageResourceAction")
@Scope("prototype")
public class PageResourceAction extends ActionSupport {
			private   String  tpl_page_resource;
			private   PageResourceService  prs;
			private   List<PageResourceStruct>  tplComps;
			public List<PageResourceStruct> getTplComps() {
				return tplComps;
			}
			public void setTpl_page_resource(String tplPageResource) {
				tpl_page_resource = tplPageResource;
			}
			@Resource(name="PageResourceService")
			public void setPrs(PageResourceService prs) {
				this.prs = prs;
			}
			
			public  String  PageResourceActionQry(){
				tplComps=prs.QueryPageResource(tpl_page_resource);
				return  SUCCESS;
			}
}
