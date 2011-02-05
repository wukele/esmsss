package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageResourceService;
import com.ems.entity.CodeComponent;
import com.opensymphony.xwork2.ActionSupport;


@Component("TplPageInitAction")
@Scope("prototype")
public class TplPageInitAction extends ActionSupport  implements ServletRequestAware{
			
			private  HttpServletRequest   request;
			
			private  PageResourceService  resServ;
			@Resource(name="PageResourceService")
			public void setResServ(PageResourceService resServ) {
				this.resServ = resServ;
			}

			public  String  execute(){
				HttpSession    session=request.getSession();
				List<String>   scripts=resServ.getAllCodeScripts();
				session.setAttribute(CommPageKeys.KEY_CODE_SCRIPTS, scripts);
				return  SUCCESS;
			}

			public void setServletRequest(HttpServletRequest arg0) {
				// TODO Auto-generated method stub
					request=arg0;
			}
}
