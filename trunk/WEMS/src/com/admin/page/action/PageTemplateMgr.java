package com.admin.page.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageTemplateService;
import com.ems.entity.TlpPageImage;
import com.opensymphony.xwork2.ActionSupport;


@SuppressWarnings("serial")
@Component("PageTemplateMgr")
@Scope("prototype")
public class PageTemplateMgr extends ActionSupport  implements  ServletRequestAware{
		 	
	   private  String image_name; 
	   private  HttpServletRequest  request;
	   private  List<TlpPageImage>  tlp_images;
	   private  int  totalProperty;
	   public int getTotalProperty() {
		return totalProperty;
	}

	public void setTotalProperty(int totalProperty) {
		this.totalProperty = totalProperty;
	}

	public List<TlpPageImage> getTlp_images() {
		return tlp_images;
	}

	private  PageTemplateService  pts;
	
	   @Resource(name="PageTemplateService")
		public void setPts(PageTemplateService pts) {
		this.pts = pts;
	}

		public  String  PageTemplateQry(){
					tlp_images=pts.QryPageTemplate(image_name);
					String path=request.getContextPath();
					String content=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
					if(tlp_images!=null){
							totalProperty=tlp_images.size();
							for(int i=0;i<totalProperty;i++){
										TlpPageImage  tpl=tlp_images.get(i);
										tpl.setRemotePath(tpl.getImagePath());
										tpl.setImagePath( content + tpl.getImagePath()  );
							}
					}
					return  SUCCESS;
		}

		public void setImage_name(String imageName) {
			image_name = imageName;
		}

		public void setServletRequest(HttpServletRequest arg0) {
			// TODO Auto-generated method stub
					request=arg0;
		}
}
