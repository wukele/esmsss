package com.ems.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
import com.ems.entity.DeviceTable;
import com.entries.ulp.RuleRoleFunc;
@Component("InfoDeviceDao")
public class InfoDeviceDao extends EmsDao {
		public  List<DeviceTable>  findAllInfoDevice(){
					return  getHibernateTemplate().find("from DeviceTable");
		}
		
		public  List<DeviceTable>  findRoleDevice(String roleCode){
				   String  queryString="select distinct d " +
				   		"from DeviceTable as d,RuleRoleFunc as rrf " +
				   		"where d.deviceId=rrf.entityCode  and rrf.entityType='E' and  rrf.roleCode=?";
				   return getHibernateTemplate().find(queryString,roleCode);
		}

		public void SaveRoleDevice(RuleRoleFunc rrf) {
			// TODO Auto-generated method stub
				  this.getHibernateTemplate().save(rrf);
		}

		public void removeRoleDevice(RuleRoleFunc rrf) {
			// TODO Auto-generated method stub
				 
				 getHibernateTemplate().delete(getHibernateTemplate().findByExample(rrf).get(0));
		}
}
