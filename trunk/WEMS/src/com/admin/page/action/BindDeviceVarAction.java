package com.admin.page.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.DataBindService;
import com.opensymphony.xwork2.ActionSupport;

@Component("BindDeviceVarAction")
@Scope("prototype")
public class BindDeviceVarAction extends ActionSupport {
			private  String value_id;
			private  boolean  is_create_new;
			private  String  device_value_id;
			private  Integer  resource_id;
			public void setResource_id(Integer resourceId) {
				resource_id = resourceId;
			}
			private  DataBindService   dataServ;
			public void setValue_id(String valueId) {
				value_id = valueId;
			}
			public void setIs_create_new(boolean isCreateNew) {
				is_create_new = isCreateNew;
			}
			public void setDevice_value_id(String deviceValueId) {
				device_value_id = deviceValueId;
			}
			@Resource(name="DataBindService")
			public void setDataServ(DataBindService dataServ) {
				this.dataServ = dataServ;
			}
			public  String execute(){
				dataServ.BindDeviceVar(is_create_new,device_value_id,value_id,resource_id);
				return  SUCCESS;
			}
}
