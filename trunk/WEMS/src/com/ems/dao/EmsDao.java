package com.ems.dao;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Component;

@Component
public class EmsDao extends HibernateDaoSupport {
	@Resource(name="sessionFactory")			
	public void  setEmsSessionFactory(SessionFactory   sessionFactory){
					super.setSessionFactory(sessionFactory);
	}
}
