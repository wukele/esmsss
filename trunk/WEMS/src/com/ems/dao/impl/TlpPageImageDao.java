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
			 * ����ģ��ҳ���ͼ��������Ӻ��޸ģ�
			 * @param tlp_image ģ���ͼ
			 */
			public void save_tlp_page_image(TlpPageImage tlp_image){
				getHibernateTemplate().saveOrUpdate(tlp_image);
			}
			
			/**
			 * ɾ��ģ��ҳ���ͼ
			 * @param tlp_image_id ģ��ҳ���ͼID
			 */
			public void delete_tlp_page_image(Integer tlp_image_id){
				String hql="delete from TlpPageImage as tlpi where tlpi.imageId=?";
				getHibernateTemplate().bulkUpdate(hql, tlp_image_id);
			}
			
			/**
			 * ��ȡ��ͼ��ͨ��ID
			 * @param tlpImageId ��ͼID
			 * @return ��ͼ
			 */
			public TlpPageImage findById(Integer tlpImageId){
				return (TlpPageImage) getHibernateTemplate().get(TlpPageImage.class, tlpImageId);
			}
}
