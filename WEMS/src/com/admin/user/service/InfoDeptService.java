package com.admin.user.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.entries.ulp.InfoDept;
import com.entries.ulp.InfoDeptDAO;

@Component("InfoDeptService")
public class InfoDeptService {

	private InfoDeptDAO infoDeptDAO;

	
	

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
}
