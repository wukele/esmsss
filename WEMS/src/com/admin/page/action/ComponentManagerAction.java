package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.ComponentsService;
import com.ems.entity.CodeComponent;
import com.opensymphony.xwork2.ActionSupport;

@Component("ComponentManagerAction")
@Scope("prototype")
public class ComponentManagerAction extends ActionSupport {
		
	    private  ComponentsService  compServ;
	    private  List<CodeComponent>  ccomponents;
		
		public  String  ComponentListQry(){
					ccomponents=compServ.GetAllComponent();
					return  SUCCESS;
		}

		public List<CodeComponent> getCcomponents() {
			return ccomponents;
		}
		@Resource(name="ComponentsService")
		public void setCompServ(ComponentsService compServ) {
			this.compServ = compServ;
		}
}
