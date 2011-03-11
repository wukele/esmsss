package com.admin.page.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.admin.page.struct.RealTimeDeviceDataStruct;
import com.ems.dao.EmsDao;
import com.ems.entity.DeviceTable;
import com.ems.entity.InfoDevicePage;
import com.ems.entity.InfoPage;

@Component("PageUtilDao")
public class PageUtilDao extends EmsDao {
		public  List<RealTimeDeviceDataStruct>   findAllRealTimeData(){
					return   getHibernateTemplate().find("select new com.admin.page.struct.RealTimeDeviceDataStruct(" +
							"dt.deviceId,dt.deviceName,dt.deviceType,dt.deviceIp,dt.collectTaskId," +
							"dv.variableName,rtd.deviceVarId,rtd.varPhyValue,rtd.varLogicValue,rtd.collectTime" +
							")  from DeviceTable as dt,DeviceVariable as dv,RealTimeData as rtd " +
							" where dt.deviceId=dv.deviceId  and  dv.deviceVariableId=rtd.deviceVarId");
		}

		public List<DeviceTable> findDeviceTable() {
			// TODO Auto-generated method stub
			return getHibernateTemplate().find("from DeviceTable");
		}

		public List<RealTimeDeviceDataStruct> findRealTimeDeviceDataBYDev(
				Integer deviceId) {
			// TODO Auto-generated method stub
			return getHibernateTemplate().find("select new com.admin.page.struct.RealTimeDeviceDataStruct(" +
					"dt.deviceId,dt.deviceName,dt.deviceType,dt.deviceIp,dt.collectTaskId," +
					"dv.variableName,rtd.deviceVarId,rtd.varPhyValue,rtd.varLogicValue,rtd.collectTime" +
					")  from DeviceTable as dt,DeviceVariable as dv,RealTimeData as rtd " +
					" where dt.deviceId=dv.deviceId  and  dv.deviceVariableId=rtd.deviceVarId" +
					" and  dt.deviceId=?",deviceId);
		}

		public List<InfoPage> findInfoPageA() {
			// TODO Auto-generated method stub
			return  getHibernateTemplate().find("from InfoPage");
		}

		public List<InfoDevicePage> findDevicePages() {
			// TODO Auto-generated method stub
			return  getHibernateTemplate().find("from InfoDevicePage");
		}
}
