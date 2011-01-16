package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.BspkPageService;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.BspkInfoPage;
import com.page.entity.BspkPageResource;
@Component("BspkPreviewAction")
@Scope("prototype")
public class BspkPreviewAction extends ActionSupport {
			
			private Integer page_id;
			private BspkPageService  bspkService;
			private BspkInfoPage  page;
			private List<BspkPageResource>  resources;
	
			public Integer getPage_id() {
				return page_id;
			}

			public void setPage_id(Integer pageId) {
				page_id = pageId;
			}

			public BspkInfoPage getPage() {
				return page;
			}

			public void setPage(BspkInfoPage page) {
				this.page = page;
			}

			public List<BspkPageResource> getResources() {
				return resources;
			}

			public void setResources(List<BspkPageResource> resources) {
				this.resources = resources;
			}
			@Resource(name="BspkPageService")
			public void setBspkService(BspkPageService bspkService) {
				this.bspkService = bspkService;
			}

			public   String   execute(){
				 page=bspkService.GetBspkInfoPageById(page_id);
				 resources=bspkService.GetbspkPageResource(page.getBspkPageResource());
				 JSONArray  resJson=new JSONArray();
				 resJson.addAll(resources);
				 
				 
				 return SUCCESS;
			}
}
