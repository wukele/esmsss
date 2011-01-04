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
}
