package com.entries.ulp;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;

/**
 * InfoOper entity. @author MyEclipse Persistence Tools
 */
@Component("RuleOperRoleDAO")
public class RuleOperRoleDAO extends EmsDao {
	private static final Log log = LogFactory.getLog(InfoDeptDAO.class);
	private String msg;
	private int ret;
	
	public List<RuleOperRole> findAllRuleOperRole() {
		// TODO Auto-generated method stub
		return  getHibernateTemplate().find("from RuleOperRole");
	}
	public void insertRuleOperRole(RuleOperRole ruleOperRole) throws Exception {
		// TODO Auto-generated method stub
		log.debug("saving RuleOperRole instance");
		try {
			getHibernateTemplate().save(ruleOperRole);
			log.debug("save successful");
		} catch (Exception re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void deleteInfoDept(String operNo) throws Exception {
		// TODO Auto-generated method stub
		log.debug("delete RuleOperRole instance");
		try {
			List<RuleOperRole> ruleOperRoles=getHibernateTemplate().find(" from RuleOperRole as a where a.operNo='"+operNo+"'");
			for(int i=0;i<ruleOperRoles.size();i++){
				getHibernateTemplate().delete(ruleOperRoles.get(i));
			}
			log.debug("delete successful");
		} catch (Exception re) {
			log.error("delete failed", re);
			throw re;
		}
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
	public List<IntermedialData> selectRuleOperRole(IntermedialData ruleOperRole) {
		// TODO Auto-generated method stub
//		String whereStr="select b.operNo,b.operName,c.roleCode,c.roleName from RuleOperRole as a,InfoOper as b ,InfoRole as  c where a.operNo=b.operNo and a.roleCode=c.roleCode ";
//		if(ruleOperRole!=null){
//			if(ruleOperRole.getOperNo()!=null&&ruleOperRole.getOperNo().trim().length()>0){
//				whereStr+=" and a.operNo='"+ruleOperRole.getOperNo()+"'";
//			}
//			if(ruleOperRole.getOperName()!=null&&ruleOperRole.getOperName().trim().length()>0){
//				whereStr+=" and a.operName='"+ruleOperRole.getOperName()+"'";
//			}
//		}
//		
//		List<Object[]> listData=getHibernateTemplate().find(whereStr);
//		List<IntermedialData> listRet=new LinkedList<IntermedialData>();
//		for(int i=0;i<listData.size();i++){
//			String operNo=(String) ((Object[]) listData.get(i))[0];
//			String operName=(String) ((Object[]) listData.get(i))[1];
//			String roleCode=(String) ((Object[]) listData.get(i))[2];
//			String roleName=(String) ((Object[]) listData.get(i))[3];
//			IntermedialData data=new IntermedialData();
//			data.setOperNo(operNo);
//			data.setOperName(operName);
//			data.setRoleCode(roleCode);
//			data.setRoleName(roleName);
//			listRet.add(data);
//		}
//		
//		return listRet;
//		
		List<IntermedialData> listRet=new LinkedList<IntermedialData>();
		String whereStr = "select distinct a.operNo from RuleOperRole as a,InfoOper as b ,InfoRole as  c where a.operNo=b.operNo and a.roleCode=c.roleCode ";
		if (ruleOperRole != null) {
			if (ruleOperRole.getOperNo() != null&& ruleOperRole.getOperNo().trim().length() > 0) {
				whereStr += " and a.operNo='" + ruleOperRole.getOperNo() + "'";
			}
			if (ruleOperRole.getOperName() != null&& ruleOperRole.getOperName().trim().length() > 0) {
				whereStr += " and a.operName like '%" + ruleOperRole.getOperName()+ "%'";
			}
		}
		List<String> listOperNo=getHibernateTemplate().find(whereStr);
		for(int i=0;i<listOperNo.size();i++){
			String operNo=listOperNo.get(i);
			String operName=getOperNameByOperNo(operNo);
			List<RuleOperRole> listRuleOperRole=getRuleOperRolesByOperNo(operNo);
			String roleCodes=combinRoleCodes(listRuleOperRole);
			String roleNames=combinRoleNames(listRuleOperRole);
			
			IntermedialData data=new IntermedialData();
			data.setOperNo(operNo);
			data.setOperName(operName);
			data.setRoleCodes(roleCodes);
			data.setRoleNames(roleNames);
			listRet.add(data);
		}
		return listRet;
	}
	private String combinRoleNames(List<RuleOperRole> listRuleOperRole) {
		String roleNames="";
		for(int i=0;i<listRuleOperRole.size();i++){
			RuleOperRole ruleOperRole=listRuleOperRole.get(i);
			String roleCode=ruleOperRole.getRoleCode();
			roleNames+=getRoleNamesByRoleCode(roleCode);
			if(i<listRuleOperRole.size()-1){
				roleNames+=",";
			}
		}
		return roleNames;
	}
	private String getRoleNamesByRoleCode(String roleCode) {
		// TODO Auto-generated method stub
		List<InfoRole> listRole= getHibernateTemplate().find("from InfoRole as a where a.roleCode='"+roleCode+"'");
		String roleName=listRole.get(0).getRoleName();
		return roleName;
	}
	private String combinRoleCodes(List<RuleOperRole> listRuleOperRole) {
		// TODO Auto-generated method stub
		
		String roleCodes="";
		for(int i=0;i<listRuleOperRole.size();i++){
			RuleOperRole ruleOperRole=listRuleOperRole.get(i);
			String roleCode=ruleOperRole.getRoleCode();
			roleCodes+=roleCode;
			if(i<listRuleOperRole.size()-1){
				roleCodes+=",";
			}
		}
		return roleCodes;
	}
	private List<RuleOperRole> getRuleOperRolesByOperNo(String operNo) {
		// TODO Auto-generated method stub
		List<RuleOperRole> listRuleOperRole=getHibernateTemplate().find("from RuleOperRole as a where a.operNo='"+operNo+"'");
		return listRuleOperRole;
	}
	private String getOperNameByOperNo(String operNo) {
		// TODO Auto-generated method stub
		List<InfoOper> listOper=getHibernateTemplate().find("from InfoOper as a where a.operNo='"+operNo+"'");
		return listOper.get(0).getOperName();
		
	}
	public List<InfoRole> selectInfoRole(IntermedialData pageParam) {
		// TODO Auto-generated method stub
		String whereStr="from InfoRole as a where 1=1";
		if(pageParam!=null){
			if(pageParam.getRoleCode()!=null&&pageParam.getRoleCode().trim().length()>0){
				whereStr+=" and a.roleCode='"+pageParam.getRoleCode()+"'";
			}
			if(pageParam.getRoleName()!=null&&pageParam.getRoleName().trim().length()>0){
				whereStr+=" and a.roleName='"+pageParam.getRoleName()+"'";
			}
		}
		return getHibernateTemplate().find(whereStr);
	}
	public void insertRuleOperRole(IntermedialData pageParam) throws Exception {
		// TODO Auto-generated method stub
		RuleOperRole ruleOperRole=new RuleOperRole();
		ruleOperRole.setOperNo(pageParam.getOperNo());
		ruleOperRole.setRoleCode(pageParam.getRoleCode());
		log.debug("saving RuleOperRole instance");
		try {
			getHibernateTemplate().save(ruleOperRole);
			log.debug("save successful");
		} catch (Exception re) {
			log.error("save failed", re);
			throw re;
		}
	}
	public void deleteRuleOperRole(IntermedialData pageParam) throws Exception {
		// TODO Auto-generated method stub
		log.debug("delete RuleOperRole instance");
		try {
			RuleOperRole ruleOperRole=new RuleOperRole();
			ruleOperRole.setOperNo(pageParam.getOperNo());
			getHibernateTemplate().delete(ruleOperRole);
			log.debug("delete successful");
		} catch (Exception re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	

}