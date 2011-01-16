package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.BspkPageService;
import com.opensymphony.xwork2.ActionSupport;
import com.page.entity.BspkInfoPage;


@Component("BspkPageMangerAction")
@Scope("prototype")
public class BspkPageMangerAction extends ActionSupport {
		private  BspkPageService   bskpServ;
		private  List<BspkInfoPage>  bspkPages;
	
		private Integer returnNo;//status num
		private String returnMsg;//return msg
		
		private String pageResource;
		private Integer resourceId;
		
		@Resource(name="BspkPageService")
		public void setBskpServ(BspkPageService bskpServ) {
			this.bskpServ = bskpServ;
		}
		
		public  String  BspkPageQry(){
			bspkPages=bskpServ.GetALLBspkInfoPage();
			return SUCCESS;
		}

		public List<BspkInfoPage> getBspkPages() {
			return bspkPages;
		}
		
		/**
		 * add a temp page resource[contain BspkPageResource and BspkInfoPage]
		 * @return
		 */
		public String addTmpPageResource(){
			try {
				bskpServ.addBspkPageInfo(pageResource,resourceId);
			} catch (RuntimeException e) {
				returnNo=1;
				returnMsg=e.getMessage();
			}
			returnNo=0;
			returnMsg="临时页面组件添加成功";
			return SUCCESS;
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

		public String getPageResource() {
			return pageResource;
		}

		public Integer getResourceId() {
			return resourceId;
		}

		public void setPageResource(String pageResource) {
			this.pageResource = pageResource;
		}

		public void setResourceId(Integer resourceId) {
			this.resourceId = resourceId;
		}
}
