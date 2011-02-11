package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageUtilService;
import com.admin.page.struct.RealTimeDeviceDataStruct;
import com.opensymphony.xwork2.ActionSupport;

@Component("PageUtilAction")
@Scope("prototype")
public class PageUtilAction extends ActionSupport {
	
			private PageUtilService  pageService;
			
			private List<RealTimeDeviceDataStruct>    real_time_datas;
			
			public List<RealTimeDeviceDataStruct> getReal_time_datas() {
				return real_time_datas;
			}

			@Resource(name="PageUtilService")
			public void setPageService(PageUtilService pageService) {
				this.pageService = pageService;
			}

			public  String  GetRealTimeData(){
					real_time_datas=pageService.GetRealTimeDeviceData();
					return SUCCESS;
			}
}
