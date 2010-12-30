package com.entries.ulp;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;

@Component("InfoRoleDao")
public class InfoRoleDao extends EmsDao {
	private static final Logger log = Logger.getLogger(InfoRoleDao.class);

	public List<InfoRole> findAllinfoRole() {
		return getHibernateTemplate().find("from InfoRole");
	}

	public List<InfoMenu> findRoleMenuByRoleCode(String roleCode) {
		String queryStr = "select m from RuleRoleFunc as rrf,"
				+ "InfoMenu as m where rrf.roleCode=? and "
				+ "rrf.entityType='M' and m.menuCode=rrf.entityCode";
		return getHibernateTemplate().find(queryStr, roleCode);
	}

	public List<InfoMenu> findRoleMenuWithOper(String operNo) {
		String queryStr = "select distinct m from RuleRoleFunc as rrf,"
				+ "InfoMenu as m,RuleOperRole as rr where rrf.roleCode="
				+ "rr.roleCode and rrf.entityType='M' and m.menuCode=rrf.entityCode and "
				+ "rr.operNo=?";
		return getHibernateTemplate().find(queryStr, operNo);
	}

	@SuppressWarnings("unchecked")
	public List<InfoRole> findInfoRolebyRoleCodeOrName(String roleCode,
			String roleName) {
		String queryStr = "from  InfoRole  as r where "
				+ "r.roleCode=? or  r.roleName=?";
		return getHibernateTemplate().find(queryStr,
				new String[] { roleCode, roleName });
	}

	public void saveRuleRoleFunc(RuleRoleFunc rrf) {
		// TODO Auto-generated method stub
		// getHibernateTemplate().
		getHibernateTemplate().save(rrf);

	}

	public void delRuleRoleFunc(String roleCode, String menuCode) {
		// TODO Auto-generated method stub
		List<RuleRoleFunc> rrfs = getHibernateTemplate().find(
				"from RuleRoleFunc as rrf"
						+ " where rrf.roleCode=?  and  rrf.entityCode=?",
				new String[] { roleCode, menuCode });
		if (rrfs != null && rrfs.size() > 0) {
			getHibernateTemplate().delete(rrfs.get(0));
		}
	}

	/**
	 * ��ӽ�ɫ
	 * @param role ��ɫ
	 */
	public void insertRole(InfoRole role) {
		log.debug("insertRole starting");
		try{
			getHibernateTemplate().save(role);
			log.debug("insertRole finish.");
		}catch (RuntimeException e) {
			log.error(e);
			throw e;
		}
		
	}
	
	/**
	 * ɾ����ɫ��Ϣ
	 * @param roleCode ��ɫ����
	 */
	public void deleteRole(String roleCode){
		log.debug("deleteRole starting.");
		String hql="delete from InfoRole where roleCode=?";
		try {
			getHibernateTemplate().bulkUpdate(hql, roleCode);
			log.debug("deleteRole finishi.");
		} catch (RuntimeException e) {
			log.error(e);
			throw e;
		}
	}
	
	/**
	 * ���½�ɫ��Ϣ
	 * @param role ��ɫ��Ϣ
	 */
	public void updateRole(InfoRole role){
		log.debug("updateRole starting.");
		try {
			getHibernateTemplate().merge(role);
			log.debug("updateRole finish.");
		} catch (RuntimeException e) {
			log.error(e);	
			throw e;
		}
	}
	
	/**
	 * �޸Ľ�ɫ״̬
	 * @param roleCode ��ɫ����
	 * @param status ״̬
	 */
	public void changeRoleStatus(String roleCode,int status){
		log.debug("changeRoleStatus starting.");
		String sql="update InfoRole set isactive = ? where roleCode=?";
		
		try {
			getHibernateTemplate().bulkUpdate(sql,new Object[]{status,roleCode});
			log.debug("changeRoleStatus finish.");
		} catch (RuntimeException e) {
			log.error(e);
			throw e;
		}
	}
	
	/**
	 * ��ȡ��ɫ��Ϣ��ͨ������ӳ��
	 * @param map ����ӳ��
	 * @return ��ɫ��Ϣ�б�
	 */
	@SuppressWarnings("unchecked")
	public List<InfoRole> findRoleByMap(Map<String, Object> map){
		log.debug("findRoleByMap starting.");
		List<InfoRole> lst=null;
		List<Object> lstProperties=new ArrayList<Object>();
		String hql="from InfoRole as r where 1=1";
		
		if(map.containsKey("roleCode")){
			hql+=" and r.roleCode=?";
			lstProperties.add(map.get("roleCode"));
		}
		if(map.containsKey("isactive")){
			hql+=" and r.isactive=?";
			lstProperties.add(map.get("isactive"));
		}
		if(map.containsKey("roleName")){
			hql+=" and r.roleName like '%?%'";
			lstProperties.add(map.get("roleName"));
		}
		if(map.containsKey("comments")){
			hql+=" and r.comments like '%?%'";
			lstProperties.add(map.get("comments"));
		}
		if(map.containsKey("roleType")){
			hql+=" and r.roleType=?";
			lstProperties.add(map.get("roleType"));
		}
		if(map.containsKey("roleLevel")){
			hql+=" and r.roleLevel=?";
			lstProperties.add(map.get("roleLevel"));
		}
		
		try {
			lst = getHibernateTemplate().find(hql, lstProperties.toArray());
			log.debug("findRoleByMap finish.");
		} catch (RuntimeException e) {
			log.error(e);
			throw e;
		}
		return lst;
	}
	
	/**
	 * ��ȡ��ɫͨ����ɫ����
	 * @param roleCode ��ɫ����
	 * @return ��ɫ��Ϣ
	 */
	public InfoRole findRoleByCode(String roleCode) {
		log.debug("findRoleByCode starting.");
		InfoRole role=null;
		try {
			role = (InfoRole) getHibernateTemplate().get(InfoRole.class, roleCode);
			log.debug("findRoleByCode finish.");
		} catch (RuntimeException e) {
			log.error(e);
			throw e;
		}
		return role;
	}
}
