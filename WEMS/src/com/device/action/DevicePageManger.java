package com.device.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.struct.PageResourceDataRuleStruct;
import com.admin.page.struct.PageResourceView;
import com.device.service.DevPageMangerService;
import com.opensymphony.xwork2.ActionSupport;


@Component("DevicePageManger")
@Scope("prototype")
public class DevicePageManger extends ActionSupport {
		
			private  Integer   page_id;
			private  Integer   device_id;		
			private  boolean  is_success;
			
			public void setDevice_id(Integer deviceId) {
				device_id = deviceId;
			}
			private   List<PageResourceView>    page_resource;
			private   List<PageResourceDataRuleStruct>    page_data;
			private   DevPageMangerService     dev_serv;
			
			public  String LoadDevPageComponents(){
						 page_resource=  dev_serv.QryPageCompById(page_id);
						return  SUCCESS;
			}
			
			public  String LoadDevPageDataRule(){
						page_data=dev_serv.QryPageDataRule(page_id);
						return  SUCCESS;
			}
			
			public boolean isIs_success() {
				return is_success;
			}

			public   String  LinkDevPage(){
						is_success=dev_serv.LinkPageDevice(page_id,device_id);
						return SUCCESS;
			}
			
			public   String  DeLinkDevPage(){
						is_success=dev_serv.delinkPage(page_id);
						return  SUCCESS;
			}
			

			public List<PageResourceView> getPage_resource() {
				return page_resource;
			}

			public List<PageResourceDataRuleStruct> getPage_data() {
				return page_data;
			}

			public void setPage_id(Integer pageId) {
				page_id = pageId;
			}
			@Resource(name="DevPageMangerService")
			public void setDev_serv(DevPageMangerService devServ) {
				dev_serv = devServ;
			}
			
}
