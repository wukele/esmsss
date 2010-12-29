package com.ulp.action;


import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;



import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.entries.ulp.InfoOper;
import com.opensymphony.xwork2.ActionSupport;
import com.ui.TreeDeviceNode;
import com.ulp.comm.CommUlpKey;
import com.ulp.service.TreeDeviceServce;


@Component("EmsSystemDeviceAction")
@Scope("prototype")
public class EmsSystemDeviceAction extends ActionSupport  implements ServletRequestAware{
		
	   private  List<TreeDeviceNode>  devices;
	   private  HttpServletRequest request;
	   private  TreeDeviceServce   treeService;
	   @Resource(name="TreeDeviceServce")
		public void setTreeService(TreeDeviceServce treeService) {
		   this.treeService = treeService;
	   }
		public List<TreeDeviceNode> getDevices() {
			return devices;
		}
		public  String  execute(){
			InfoOper   oper=(InfoOper)request.getSession().getAttribute(CommUlpKey.KEY_INFO_OPER);
			devices=treeService.CreateOperTreeDevice(oper.getOperNo());
			return SUCCESS;
		}

		public void setServletRequest(HttpServletRequest arg0) {
			// TODO Auto-generated method stub
			request=arg0;
		}
		
}
