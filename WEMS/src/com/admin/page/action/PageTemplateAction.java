package com.admin.page.action;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.page.service.PageTemplateService;
import com.ems.entity.TlpPageImage;
import com.entries.ulp.InfoOper;
import com.opensymphony.xwork2.ActionSupport;
import com.ulp.comm.CommUlpKey;

@SuppressWarnings("serial")
@Component("PageTemplateAction")
@Scope("prototype")
public class PageTemplateAction extends ActionSupport  implements  ServletRequestAware,ServletResponseAware{
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
			// add by ffmmx
			private HttpServletResponse response;
			private int returnNo;
			private String returnMsg;
			private int image_id;
			private List<Integer> lst_image_id;
			
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
			
			public void setServletResponse(HttpServletResponse arg0) {
				// TODO Auto-generated method stub
				 		response=arg0;
			}
			
			public  String PageTemplateActionUpLoad(){
						boolean is_updated=false;
						String msg="";
				        HttpSession  session=request.getSession();
				        InfoOper   oper=(InfoOper)session.getAttribute(CommUlpKey.KEY_INFO_OPER);
				        String savePath   =request.getRealPath(remote_path);
				        TlpPageImage   tlp=new TlpPageImage();
				        tlp.setImageId(image_id);
				        tlp.setFlag("1");
				        tlp.setImageDisplayName(image_title);
				        tlp.setImagePath(remote_path);
				        tlp.setImageName(image_pathFileName);
				       // tplService.UpLoadFile(image_path, remote_path, image_title, oper.getOperNo());
				        is_updated = tplService.UpLoadFile(image_path, tlp, savePath, oper.getOperNo());
				        
				        if(is_updated)
				        	msg="{success:true,file:'test'}";
				        else
				        	msg="{success:false,file:'test'}";
				        response.setContentType("text/html; charset=GBK");
				        PrintWriter out=null;
				        try {
							out=response.getWriter();
							out.print(msg);
						} catch (IOException e) {
							e.printStackTrace();
							throw new RuntimeException(e);
						} finally{
							out.close();
						}
				        
						return  null;
			}

			//add by ffmmx
			/**
			 * µ¥¸öÉ¾³ýµ×Í¼
			 * @return
			 */
			@Deprecated
			public String remove_page_temlate(){
				
				try {
					tplService.remove_page_template(image_id);
				} catch (RuntimeException e) {
					returnNo=1;
					returnMsg="É¾³ýµ×Í¼Ê§°Ü:"+e.getMessage();
				}
				returnNo=0;
				returnMsg="É¾³ýµ×Í¼³É¹¦";
				return SUCCESS;
			}
			
			/**
			 * ÅúÁ¿É¾³ýµ×Í¼
			 * @return
			 */
			public String remove_multiple_page_template() {
				try {
					tplService.remove_muti_page_template(lst_image_id);
				} catch (RuntimeException e) {
					returnNo=1;
					returnMsg="É¾³ýµ×Í¼Ê§°Ü:"+e.getMessage();
				}
				
				returnNo=0;
				returnMsg="É¾³ýµ×Í¼³É¹¦";
				return SUCCESS;
			}
			public int getReturnNo() {
				return returnNo;
			}
			public String getReturnMsg() {
				return returnMsg;
			}
			public void setReturnNo(int returnNo) {
				this.returnNo = returnNo;
			}
			public void setReturnMsg(String returnMsg) {
				this.returnMsg = returnMsg;
			}
			public int getImage_id() {
				return image_id;
			}
			public void setImage_id(int image_id) {
				this.image_id = image_id;
			}
			public List<Integer> getLst_image_id() {
				return lst_image_id;
			}
			public void setLst_image_id(List<Integer> lst_image_id) {
				this.lst_image_id = lst_image_id;
			}
			
			
}
