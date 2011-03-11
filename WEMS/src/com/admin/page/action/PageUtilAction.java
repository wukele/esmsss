package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageUtilService;
import com.admin.page.struct.RealTimeDeviceDataStruct;
import com.ems.entity.DeviceTable;
import com.ems.entity.InfoDevicePage;
import com.ems.entity.InfoPage;
import com.entries.ulp.InfoMenu;
import com.opensymphony.xwork2.ActionSupport;

@Component("PageUtilAction")
@Scope("prototype")
public class PageUtilAction extends ActionSupport {
	
			private PageUtilService  pageService;
			
			private List<RealTimeDeviceDataStruct>    real_time_datas;
			
			private Integer   device_id;
			
			private List<InfoPage>    pages;
			
			private  List<InfoDevicePage>    info_dev_pages;
			
			public List<InfoDevicePage> getInfo_dev_pages() {
				return info_dev_pages;
			}

			public void setDevice_id(Integer deviceId) {
				device_id = deviceId;
			}

			public List<DeviceTable> getDeviceInfos() {
				return deviceInfos;
			}


			private  List<DeviceTable>  deviceInfos;
			
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
			
			public  String  QryRtdBydeviceId(){
					real_time_datas=pageService.GetRealTimeDeviceDataBYDev(device_id);
					return  SUCCESS;
			}
			
			public String LoadDevPages(){
					info_dev_pages=pageService.GetDevPages();
					return  SUCCESS;
			}
			
			
		     public String   GetDeviceTable(){
		    	 	deviceInfos=pageService.GetDeviceInfo();
		    	    return SUCCESS;
		     }
		     
		     
		     public  String   GetInfoPageA(){
		    	   	 pages=pageService.QryInfoPageA();
		    	     return  SUCCESS;
		     }

			public List<InfoPage> getPages() {
				return pages;
			}
}
