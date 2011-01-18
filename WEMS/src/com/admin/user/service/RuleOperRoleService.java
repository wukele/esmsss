package com.admin.user.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.entries.ulp.InfoDept;
import com.entries.ulp.InfoDeptDAO;
import com.entries.ulp.InfoRole;
import com.entries.ulp.IntermedialData;
import com.entries.ulp.RuleOperRole;
import com.entries.ulp.RuleOperRoleDAO;

@Component("RuleOperRoleService")
public class RuleOperRoleService {
	private static final Log log = LogFactory.getLog(RuleOperRoleService.class);
	private RuleOperRoleDAO ruleOperRoleDAO;

	private String msg;
	private int ret;
	
	


	@Resource(name = "RuleOperRoleDAO")
	public void setRuleOperRoleDAO(RuleOperRoleDAO ruleOperRoleDAO) {
		this.ruleOperRoleDAO = ruleOperRoleDAO;
	}

	public RuleOperRoleDAO getRuleOperRoleDAO() {
		return ruleOperRoleDAO;
	}
	public List<IntermedialData> selectRuleOperRole(IntermedialData ruleOperRole) {

		List<IntermedialData> rs = ruleOperRoleDAO.selectRuleOperRole(ruleOperRole);
		return rs;
	}
	@Transactional
	public int insertRuleOperRole(RuleOperRole ruleOperRole) {
		// TODO Auto-generated method stub
		ret=0;
		try {
//			getInfoDeptDAO().insertInfoDept(infoDept);
		} catch (Exception e) {
			log.error("insertInfoDept failed...");
			setRet(1);
			setMsg("insertInfoDept failed..."+e.getMessage());
		}

		return ret;

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

	public List<InfoRole> selectInfoRole(IntermedialData pageParam) {
		// TODO Auto-generated method stub
	
		List<InfoRole> rs = ruleOperRoleDAO.selectInfoRole(pageParam);
		return rs;
	}
	@Transactional
	public int insertRuleOperRole(IntermedialData pageParam) {
		// TODO Auto-generated method stub
		ret=0;
		try {
			ruleOperRoleDAO.deleteRuleOperRole(pageParam.getOperNo());
			ruleOperRoleDAO.insertRuleOperRole(pageParam);
		} catch (Exception e) {
			log.error("insert RuleOperRole failed...");
			setRet(1);
			setMsg("insert RuleOperRole failed..."+e.getMessage());
		}

		return ret;

	}
	@Transactional
	public int deleteRuleOperRole(IntermedialData pageParam) {
		// TODO Auto-generated method stub
		ret=0;
		
		try {
			
			ruleOperRoleDAO.deleteRuleOperRole(pageParam.getOperNo());
		} catch (Exception e) {
			log.error("delete RuleOperRole failed...");
			setRet(1);
			setMsg("delete  RuleOperRole failed..."+e.getMessage());
		}

		return ret;
	}

	
}
