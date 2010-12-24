package com.entries.ulp;

import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;

/**
 * InfoOper entity. @author MyEclipse Persistence Tools
 */
@Component("InfoDeptDAO")
public class InfoDeptDAO extends EmsDao {
	private static final Log log = LogFactory.getLog(InfoOperDAO.class);

	public List<InfoDept> findAllInfoDept() {
		// TODO Auto-generated method stub
		return  getHibernateTemplate().find("from InfoDept");
	}
	
	

}