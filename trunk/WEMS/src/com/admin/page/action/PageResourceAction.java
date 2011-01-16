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
			private Integer returnNo;
			private String returnMsg;
			
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
			
			/**
			 * 页面组件新增
			 * @return
			 */
			public String addPageResource() {
				
				try {
					prs.addPageResource(pageResource);
				} catch (RuntimeException e) {
					returnNo=1;
					returnMsg=e.getMessage();
				}
				returnNo=0;
				returnMsg="页面组件["+pageResource.getResourceId()+"]添加成功";
				return SUCCESS;
			}
			
			/**
			 * 页面组件临时新增
			 * @return
			 */
			public String addTmpPageResource(){
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

			public Integer getReturnNo() {
				return returnNo;
			}

			public String getReturnMsg() {
				return returnMsg;
			}

			public void setReturnNo(Integer returnNo) {
				this.returnNo = returnNo;
			}

			public void setReturnMsg(String returnMsg) {
				this.returnMsg = returnMsg;
			}
}
