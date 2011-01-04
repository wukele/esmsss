package com.admin.page.service;

import java.io.File;
import java.io.IOException;
import java.util.List;


import javax.annotation.Resource;

import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.io.FileUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.velocity.texen.util.FileUtil;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ems.dao.impl.TlpPageImageDao;
import com.ems.entity.TlpPageImage;



@Component("PageTemplateService")
public class PageTemplateService {
			private static final Log log = LogFactory.getLog(PageTemplateService.class);
			
			private TlpPageImageDao  tlpImageDao;
			
			
			public TlpPageImageDao getTlpImageDao() {
				return tlpImageDao;
			}

			@Resource(name="TlpPageImageDao")
			public void setTlpImageDao(TlpPageImageDao tlpImageDao) {
				this.tlpImageDao = tlpImageDao;
			}


			public boolean  UpLoadFile(File  upload,String  path,String name,String operNo){
						boolean  res=false;
						TlpPageImage   tp=new TlpPageImage();
						tp.setOperNo(operNo);
						tp.setImageDisplayName(name);
						tp.setFlag("1");
						tp.setImagePath(path+upload.getName());
						tlpImageDao.addTlpPageImage(tp);
						try {
							FileUtils.copyFile(upload, new File(path, upload.getName()));
							res=true;
						} catch (IOException e) {
							log.error("文件上传失败"+e.getMessage());
						}
						return res;
			}
			@Transactional
			public boolean UpLoadFile(File imagePath, TlpPageImage tlp,
					String savePath, String operNo) {
				// TODO Auto-generated method stub
						boolean res=false;
						tlpImageDao.addTlpPageImage(tlp);
						try {
							FileUtils.copyFile(imagePath, new File(savePath+"\\"+tlp.getImageName()));
							res=true;
						} catch (IOException e) {
							// TODO Auto-generated catch block
							log.error("文件上传失败"+e.getMessage());
							throw new RuntimeException("文件上传失败"+e.getMessage());
						
						}
						return res;
			}

			public List<TlpPageImage> QryPageTemplate(String imageName) {
				// TODO Auto-generated method stub
				if(imageName==null || imageName=="" ){
						return  tlpImageDao.findAllPageTemplate();
				}else{
						return tlpImageDao.findTlpPageImageByImageName(imageName);
				}
			}
			
}
