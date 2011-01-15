package com.ems.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
import com.ems.entity.TlpPageImage;

@Component("TlpPageImageDao")
public class TlpPageImageDao extends EmsDao {
			public  void  addTlpPageImage(TlpPageImage   tlpImage){
						getHibernateTemplate().save(tlpImage);
			}
			public List<TlpPageImage> findAllPageTemplate() {
				// TODO Auto-generated method stub
				return getHibernateTemplate().find("from TlpPageImage");
			}
			
			public  List<TlpPageImage>  findTlpPageImageByImageName(String  image_name){
				return getHibernateTemplate().find("from TlpPageImage  where imageName=?",image_name);
			}
			/**
			 * 保存模板页面底图（包括添加和修改）
			 * @param tlp_image 模板底图
			 */
			public void save_tlp_page_image(TlpPageImage tlp_image){
				getHibernateTemplate().saveOrUpdate(tlp_image);
			}
			
			/**
			 * 删除模板页面底图
			 * @param tlp_image_id 模板页面底图ID
			 */
			public void delete_tlp_page_image(Integer tlp_image_id){
				String hql="delete from TlpPageImage as tlpi where tlpi.imageId=?";
				getHibernateTemplate().bulkUpdate(hql, tlp_image_id);
			}
			
			/**
			 * 获取底图，通过ID
			 * @param tlpImageId 底图ID
			 * @return 底图
			 */
			public TlpPageImage findById(Integer tlpImageId){
				return (TlpPageImage) getHibernateTemplate().get(TlpPageImage.class, tlpImageId);
			}
}
