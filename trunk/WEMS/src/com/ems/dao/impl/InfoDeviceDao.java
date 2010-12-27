package com.ems.dao.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ems.dao.EmsDao;
import com.ems.entity.DeviceTable;
@Component("InfoDeviceDao")
public class InfoDeviceDao extends EmsDao {
		public  List<DeviceTable>  findAllInfoDevice(){
					return  getHibernateTemplate().find("from DeviceTable");
		}
}
