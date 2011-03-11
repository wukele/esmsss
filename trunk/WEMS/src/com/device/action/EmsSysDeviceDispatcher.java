package com.device.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.device.service.DevPageMangerService;
import com.ems.entity.InfoDevicePage;
import com.opensymphony.xwork2.ActionSupport;


@Component("EmsSysDeviceDispatcher")
@Scope("prototype")
public class EmsSysDeviceDispatcher extends ActionSupport  implements  ServletRequestAware {
			
			private  HttpServletRequest  request;
			
			private  Integer  device_id;
			
			private  InfoDevicePage   device_page;
			
			private  DevPageMangerService   page_serv;
			
			@Resource(name="DevPageMangerService")
			public void setPage_serv(DevPageMangerService pageServ) {
				page_serv = pageServ;
			}

			public void setDevice_id(Integer deviceId) {
				device_id = deviceId;
			}

			public   String  EmsDevPageDispatch(){
						device_page=page_serv.QryDevPage(device_id);
						if(device_page == null){
									return  CommDevKey.DEV_PAGE_NOT_FOUND;
						}
						//  ≥ı ºªØ“≥√Ê
						
						HttpSession  session=request.getSession();
						session.removeAttribute(CommDevKey.KEY_DEVICE_PAGE);
						session.removeAttribute(CommDevKey.KEY_DEVICE_PAGE_RESOURCE);
						session.removeAttribute(CommDevKey.KEY_DEVICE_DATA_RULE);
						
						return  SUCCESS;
			}

			@Override
			public void setServletRequest(HttpServletRequest arg0) {
				// TODO Auto-generated method stub
						request=arg0;
			}
}
