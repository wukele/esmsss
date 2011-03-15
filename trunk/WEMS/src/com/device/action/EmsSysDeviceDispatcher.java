package com.device.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.alarm.entity.InfoEvent;
import com.component.DataEngine;
import com.data.entity.InfoEngine;
import com.device.service.DevPageMangerService;
import com.ems.entity.InfoDevicePage;
import com.ems.entity.InfoPageResource;
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
						//  初始化页面
						
						HttpSession  session=request.getSession();
						session.removeAttribute(CommDevKey.KEY_DEVICE_PAGE);
						session.removeAttribute(CommDevKey.KEY_DEVICE_PAGE_RESOURCE);
						session.removeAttribute(CommDevKey.KEY_DEVICE_DATA_RULE);
						session.removeAttribute(CommDevKey.KEY_DEVICE_DATA_ENGINE);
						session.removeAttribute(CommDevKey.KEY_DEVICE_PAGE_SCRIPTS);
						
						session.setAttribute(CommDevKey.KEY_DEVICE_PAGE, device_page);
						// 查询页面组件所需的脚本
						
						List<String>  tag_scripts=page_serv.qryScripts(device_page.getPageResourceId());
						session.setAttribute(CommDevKey.KEY_DEVICE_PAGE_SCRIPTS, tag_scripts);
						
						//   获取页面组件
						
						List<InfoPageResource>  page_comps=page_serv.qryDevPageRes(device_page.getPageResourceId());
						JSONArray    json_page_comps=new JSONArray();
						json_page_comps.addAll(page_comps);
						
						
						
						session.setAttribute(CommDevKey.KEY_DEVICE_PAGE_RESOURCE, json_page_comps.toString());
						
						
						//   获取页面数据引擎
						List<DataEngine>  engines=page_serv.QryDevPageEngine(device_page.getPageResourceId());
						
						JSONArray  json_engines=new JSONArray();
						json_engines.addAll(engines);
						session.setAttribute(CommDevKey.KEY_DEVICE_DATA_ENGINE	 , json_engines.toString());
						
						
						return  SUCCESS;
			}

			@Override
			public void setServletRequest(HttpServletRequest arg0) {
				// TODO Auto-generated method stub
						request=arg0;
			}
}
