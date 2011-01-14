package com.admin.page.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageResourceService;
import com.admin.page.struct.PageResourceStruct;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.TplPageResource;

@Component("PageResourceAction")
@Scope("prototype")
public class PageResourceAction extends ActionSupport {
			private   String  tplPageResource;
			private   PageResourceService  prs;
			private   List<PageResourceStruct>  tplComps;
			//add by ffmmx
			private TplPageResource pageResource;
			
			public List<PageResourceStruct> getTplComps() {
				return tplComps;
			}
		
			@Resource(name="PageResourceService")
			public void setPrs(PageResourceService prs) {
				this.prs = prs;
			}
			
			public  String  PageResourceActionQry(){
				if(tplPageResource==null ||  "".equals(tplPageResource)){
					tplComps=new ArrayList<PageResourceStruct>();
					return  SUCCESS;
				}
				tplComps=prs.QueryPageResource(tplPageResource);
				return  SUCCESS;
			}
			
			public String addPageResource() {
				return SUCCESS;
			}
			

			public void setTplPageResource(String tplPageResource) {
				this.tplPageResource = tplPageResource;
			}

			public TplPageResource getPageResource() {
				return pageResource;
			}

			public void setPageResource(TplPageResource pageResource) {
				this.pageResource = pageResource;
			}
}
