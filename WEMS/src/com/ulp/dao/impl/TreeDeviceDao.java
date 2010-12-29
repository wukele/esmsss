package com.ulp.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
import com.ems.entity.DeviceTable;

@Component("TreeDeviceDao")
public class TreeDeviceDao extends EmsDao {
		public   List<String>   GetOperDeviceType(String operNo){
					String QueryStr="select distinct d.deviceType from DeviceTable as d,RuleRoleFunc as rrf," +
							"RuleOperRole as ror where d.deviceId=rrf.entityCode  and rrf.entityType='E' and rrf.roleCode=ror.roleCode  and  ror.operNo=?";
					return  getHibernateTemplate().find(QueryStr,operNo);
		}
		
		public   List<DeviceTable>  GetTypeDeivce(String type,String operNo){
			String QueryStr="select distinct d from DeviceTable as d,RuleRoleFunc as rrf," +
			"RuleOperRole as ror where d.deviceId=rrf.entityCode  and rrf.entityType='E' and rrf.roleCode=ror.roleCode  and  ror.operNo=?" +
			" and d.deviceType=?";
					return  getHibernateTemplate().find(QueryStr,new String[]{operNo,type});
		}
}
