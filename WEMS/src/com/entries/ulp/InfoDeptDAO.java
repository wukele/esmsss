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

	public void insertInfoDept(InfoDept infoDept) {
		// TODO Auto-generated method stub
			getHibernateTemplate().save(infoDept);
			log.debug("save successful");
		
	}

	public void deleteInfoDept(InfoDept infoDept) {
		
			getHibernateTemplate().delete(infoDept);
			log.debug("delete successful");
		
	}

	public void updateInfoDept(InfoDept infoDept) {
		
			getHibernateTemplate().update(infoDept);
			log.debug("update successful");
		
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