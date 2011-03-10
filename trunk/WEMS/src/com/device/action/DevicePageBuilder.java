package com.device.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.device.service.DevPageBuilderService;
import com.opensymphony.xwork2.ActionSupport;


@Component("DevicePageBuilder")
@Scope("prototype")
public class DevicePageBuilder extends ActionSupport {
	
			private   Integer   bspk_page_id;
			
			private   DevPageBuilderService  builder_serv;
			
			private   boolean  is_success;
			
			private   String  return_message;
				
			public boolean isIs_success() {
				return is_success;
			}

			public String getReturn_message() {
				return return_message;
			}

			public void setBspk_page_id(Integer bspkPageId) {
				bspk_page_id = bspkPageId;
			}
				
			@Resource(name="DevPageBuilderService")
			public void setBuilder_serv(DevPageBuilderService builderServ) {
				builder_serv = builderServ;
			}

			public  String  BuildDevicePageByBspk(){
							StringBuffer   sb=new StringBuffer();
							is_success=builder_serv.BuildDevicePage(bspk_page_id,sb);
							return_message=sb.toString();
							return  SUCCESS;
			}
}
