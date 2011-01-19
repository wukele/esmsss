package com.admin.user.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.entries.ulp.InfoDept;
import com.entries.ulp.InfoDeptDAO;

@Component("InfoDeptService")
public class InfoDeptService {
	private static final Log log = LogFactory.getLog(InfoDeptService.class);
	private InfoDeptDAO infoDeptDAO;

	private String msg;
	private int ret;

	public List<InfoDept> findAllInfoDept() {
		List<InfoDept> rs = getInfoDeptDAO().findAllInfoDept();

		return rs;
	}

	@Resource(name = "InfoDeptDAO")
	public void setInfoDeptDAO(InfoDeptDAO infoDeptDAO) {
		this.infoDeptDAO = infoDeptDAO;
	}

	public InfoDeptDAO getInfoDeptDAO() {
		return infoDeptDAO;
	}

	public List<InfoDept> selectInfoDept(InfoDept infoDept) {

		List<InfoDept> rs = infoDeptDAO.selectInfoDept(infoDept);
		return rs;
	}

	@Transactional
	public void insertInfoDept(InfoDept infoDept) {
		getInfoDeptDAO().insertInfoDept(infoDept);
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

	@Transactional
	public void deleteInfoDept(InfoDept infoDept) {

		infoDept.setFlag("0");
//		infoDept.setDeptName("≤‚ ‘≤ø√≈4");
		getInfoDeptDAO().deleteInfoDept(infoDept);

	}

	@Transactional
	public void updateInfoDept(InfoDept infoDept) {

		getInfoDeptDAO().updateInfoDept(infoDept);

	}

}
