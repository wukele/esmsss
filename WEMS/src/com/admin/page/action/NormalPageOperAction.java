package com.admin.page.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageMenuManageService;
import com.ems.entity.InfoPage;
import com.opensymphony.xwork2.ActionSupport;


@Component("NormalPageOperAction")
@Scope("prototype")
public class NormalPageOperAction extends ActionSupport {
			private  Integer  page_id;
			private  String menu_code ;
			private  boolean  is_leaf;
			private  boolean  is_success;
			private  String   module_code;
			private  String   return_message;
			public String getReturn_message() {
				return return_message;
			}

			private  String   n_text;
			
			
			public String getModule_code() {
				return module_code;
			}

			private  PageMenuManageService  pmServ; 
			
			public   String   AddNormalPageMenu(){
						
						is_success=pmServ.buildNewRulePage(page_id,menu_code,module_code,is_leaf);
						return   SUCCESS;
			}
			
			public   String  RenamePageMenu(){
						is_success=pmServ.RenameMenu(menu_code,module_code,n_text,return_message);
						return  SUCCESS;
			}
			
			
			public  String   RemovePageMenu(){
						is_success=pmServ.deletePageMenu(menu_code,module_code,return_message);
						return  SUCCESS;
			}
			
			public  String  deleteInfoPage(){
					  is_success=pmServ.RemoveInfoPage(page_id);
					  return  SUCCESS;
			}
			
			

			public void setN_text(String nText) {
				n_text = nText;
			}

			public void setPage_id(Integer pageId) {
				page_id = pageId;
			}

			public boolean isIs_success() {
				return is_success;
			}

		

			public void setMenu_code(String menuCode) {
				menu_code = menuCode;
			}

			public void setIs_leaf(boolean isLeaf) {
				is_leaf = isLeaf;
			}

			public void setModule_code(String moduleCode) {
				module_code = moduleCode;
			}
			
			@Resource(name="PageMenuManageService")
			public void setPmServ(PageMenuManageService pmServ) {
				this.pmServ = pmServ;
			}
			
}
