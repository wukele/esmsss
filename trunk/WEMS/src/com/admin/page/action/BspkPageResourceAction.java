package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.BspkPageService;
import com.admin.page.struct.BindReletionStruct;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.BspkPageResource;


@Component("BspkPageResourceAction")
@Scope("prototype")
public class BspkPageResourceAction extends ActionSupport {
	
			private  String  bspk_page_resource;
			
			private  BspkPageService  bspkServ;
			
			private  List<BspkPageResource>  page_res;
			
			private  List<BindReletionStruct>  reletions;
			
			public List<BspkPageResource> getPage_res() {
				return page_res;
			}

			public void setBspk_page_resource(String bspkPageResource) {
				bspk_page_resource = bspkPageResource;
			}
			@Resource(name="BspkPageService")
			public void setBspkServ(BspkPageService bspkServ) {
				this.bspkServ = bspkServ;
			}

			public  String  QryBspkPageResource(){
					page_res=bspkServ.GetbspkPageResource(bspk_page_resource);
				    return  SUCCESS;
			}
			
			public   String  QryBindReletion(){
					 reletions=bspkServ.QryBindReletion(bspk_page_resource);
				     return  SUCCESS;
			}

			public List<BindReletionStruct> getReletions() {
				return reletions;
			}
}
