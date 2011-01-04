package com.admin.page.action;

import java.io.File;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageTemplateService;
import com.ems.entity.TlpPageImage;
import com.entries.ulp.InfoOper;
import com.opensymphony.xwork2.ActionSupport;
import com.ulp.comm.CommUlpKey;

@Component("PageTemplateAction")
@Scope("prototype")
public class PageTemplateAction extends ActionSupport  implements  ServletRequestAware{
			private  File   image_path;
			private  String  image_pathFileName;
			private  String  image_pathContentType;
			private  String  remote_path;
			private  String image_title;
			public void setImage_pathFileName(String imagePathFileName) {
				image_pathFileName = imagePathFileName;
			}
			public void setImage_pathContentType(String imagePathContentType) {
				image_pathContentType = imagePathContentType;
			}

			private  HttpServletRequest  request;
			private  PageTemplateService   tplService;
			public void setImage_path(File imagePath) {
				image_path = imagePath;
			}
			public void setRemote_path(String remotePath) {
				remote_path = remotePath;
			}
			public void setImage_title(String imageTitle) {
				image_title = imageTitle;
			}
			@Resource(name="PageTemplateService")
			public void setTplService(PageTemplateService tplService) {
				this.tplService = tplService;
			}
			public void setServletRequest(HttpServletRequest arg0) {
				// TODO Auto-generated method stub
				 		request=arg0;
			}
			
			public  String PageTemplateActionUpLoad(){
				        HttpSession  session=request.getSession();
				        InfoOper   oper=(InfoOper)session.getAttribute(CommUlpKey.KEY_INFO_OPER);
				        String savePath   =request.getRealPath(remote_path);
				        TlpPageImage   tlp=new TlpPageImage();
				        tlp.setFlag("1");
				        tlp.setImageDisplayName(image_title);
				        tlp.setImagePath(remote_path);
				        tlp.setImageName(image_pathFileName);
				       // tplService.UpLoadFile(image_path, remote_path, image_title, oper.getOperNo());
				        tplService.UpLoadFile(image_path, tlp, savePath, oper.getOperNo());
						return  NONE;
			}
			
			
}
