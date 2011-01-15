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
}
