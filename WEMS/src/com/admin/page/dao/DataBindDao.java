package com.admin.page.dao;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
import com.page.entity.BspkDataDevice;


@Component("DataBindDao")
public class DataBindDao extends EmsDao {

	public void addDataBindRule(String valueId, String deviceValueId) {
		// TODO Auto-generated method stub
		BspkDataDevice    bspkData=new BspkDataDevice();
		bspkData.setDeviceValueId(deviceValueId);
		bspkData.setValueId(valueId);
		getHibernateTemplate().save(bspkData);
	}

	public void ModifyBindRule(String valueId, String deviceValueId) {
		// TODO Auto-generated method stub
		getHibernateTemplate().bulkUpdate("update  BspkDataDevice  as bd set" +
				" bd.deviceValueId = ?  where bd.valueId=?", new String[]{
				deviceValueId,valueId});
	}

	public void upDatePageResource(String valueId, Integer resourceId) {
		// TODO Auto-generated method stub
		getHibernateTemplate().bulkUpdate("update  BspkPageResource  as  bpr  set  " +
				"bpr.valueId=?  where  bpr.resourceId=?",new Object[]{valueId,resourceId});
	}
				
}
