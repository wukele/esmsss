package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.MenuPageService;
import com.admin.page.struct.MenuTreeNode;
import com.opensymphony.xwork2.ActionSupport;



@Component("MenuTreeAction")
@Scope("prototype")
public class MenuTreeAction extends ActionSupport {
			
	public void setMenu_code(String menuCode) {
		menu_code = menuCode;
	}


	public void setModule_code(String moduleCode) {
		module_code = moduleCode;
	}

			public List<MenuTreeNode> getNodes() {
		return nodes;
	}

			private  List<MenuTreeNode> nodes;
			private  String   menu_code;
			private  String   module_code;
			private  MenuPageService   mpServ;
			
			@Resource(name="MenuPageService")
			public void setMpServ(MenuPageService mpServ) {
				this.mpServ = mpServ;
			}


			public  String   GetSystemMenu(){
						nodes=mpServ.GenSystemMenu(menu_code,module_code);
						return SUCCESS;
			}
}
