package com.entries.ulp;

import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;

/**
 * InfoOper entity. @author MyEclipse Persistence Tools
 */
@Component("InfoDeptDAO")
public class InfoDeptDAO extends EmsDao {
	private static final Log log = LogFactory.getLog(InfoDeptDAO.class);
	private String msg;
	private int ret;
	
	public List<InfoDept> findAllInfoDept() {
		// TODO Auto-generated method stub
		return  getHibernateTemplate().find("from InfoDept");
	}

	public List<InfoDept> selectInfoDept(InfoDept infoDept) {
		String whereStr=" from InfoDept as a where 1=1 ";
		if(infoDept!=null){
			if(infoDept.getDeptNo()!=null&&infoDept.getDeptNo().trim().length()>0){
				whereStr+="  and a.deptNo=" +infoDept.getDeptNo();
			}
			if(infoDept.getDeptName()!=null&&infoDept.getDeptName().trim().length()>0){
				whereStr+="  and a.deptName like '%"+infoDept.getDeptName().trim()+"%'";
			}
			if(infoDept.getParentDeptNo()!=null&&infoDept.getParentDeptNo().trim().length()>0){
				whereStr+="  and a.parentDeptNo = '"+infoDept.getParentDeptNo()+"'";
			}
		}
		
		return getHibernateTemplate().find(whereStr);
		

	}

	public void insertInfoDept(InfoDept infoDept) throws Exception {
		// TODO Auto-generated method stub
		log.debug("saving InfoDept instance");
		try {
			getHibernateTemplate().save(infoDept);
			log.debug("save successful");
		} catch (Exception re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void deleteInfoDept(InfoDept infoDept) throws Exception {
		// TODO Auto-generated method stub
		log.debug("delete InfoDept instance");
		try {
			getHibernateTemplate().delete(infoDept);
			log.debug("delete successful");
		} catch (Exception re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public void updateInfoDept(InfoDept infoDept) throws Exception {
		// TODO Auto-generated method stub
		log.debug("update InfoDept instance");
		try {
			getHibernateTemplate().update(infoDept);
			log.debug("update successful");
		} catch (Exception re) {
			log.error("update failed", re);
			throw re;
		}
	}


	public int selectInfoDept(InfoDept infoDept, List<InfoDept> infoDepts,
			int start, int limit) {
		// TODO Auto-generated method stub
		int totalProperty=getHibernateTemplate().findByExample(infoDept).size();
		infoDepts=getHibernateTemplate().findByExample(infoDept,start,limit);
		return totalProperty;

	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	public void setRet(int ret) {
		this.ret = ret;
	}

	public int getRet() {
		return ret;
	}

	

}