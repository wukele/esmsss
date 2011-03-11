package com.device.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.admin.page.struct.PageResourceDataRuleStruct;
import com.admin.page.struct.PageResourceView;
import com.data.entity.RuleDataDevice;
import com.ems.dao.EmsDao;

import com.ems.entity.DeviceTable;
import com.ems.entity.InfoDevicePage;
import com.ems.entity.InfoPageResource;

@Component("DevicePageDao")
public class DevicePageDao extends EmsDao {

	public boolean checkUniPageResource(String temp) {
		// TODO Auto-generated method stub
		List l = getHibernateTemplate().find(
				"from InfoPageResource where pageResource=?", temp);
		if (l != null && l.size() > 0) {
			return false;
		} else {
			return true;
		}
	}

	public void addRuleDataDevice(RuleDataDevice rdd) {
		// TODO Auto-generated method stub
		try{
				getHibernateTemplate().save(rdd);
		}catch(Exception e){
				throw  new   RuntimeException(e.getMessage());
		}
	}

	public void addInfoPageResource(InfoPageResource ipr) {
		// TODO Auto-generated method stub
		try {
			getHibernateTemplate().save(ipr);
		} catch (Exception e) {
			// TODO: handle exception
			throw  new   RuntimeException(e.getMessage());
		}

	}

	public void SavaDevicePage(InfoDevicePage dp) {
		// TODO Auto-generated method stub
		try {
			getHibernateTemplate().save(dp);
		} catch (Exception e) {
			// TODO: handle exception
			throw  new   RuntimeException(e.getMessage());
		}
	}

	public List<PageResourceView> FindPageCompById(Integer pageId) {
		return  getHibernateTemplate().find("select   new com.admin.page.struct.PageResourceView(pr.pageResource, pr.xtypeCode , cc.componentName , pr.valueId , pr.resourceLeft , pr.resourceTop) " +
				"from InfoPageResource  as  pr,InfoDevicePage as  ip,CodeComponent  cc where  pr.pageResource= ip.pageResourceId  and  pr.xtypeCode = cc.codeXtype " +
				" and   ip.pageId=?",pageId);
	}

	public List<PageResourceDataRuleStruct> FindPageDataRule(Integer pageId) {
		// TODO Auto-generated method stub
		    return getHibernateTemplate().find("select  new  com.admin.page.struct.PageResourceDataRuleStruct(" +
				"pr.resourceId,pr.pageResource,cc.componentName,rdd.valueId,dv.variableName,dt.deviceId,dt.deviceName,dt.deviceType) " +
				"from InfoPageResource  as  pr,InfoDevicePage as  ip,CodeComponent  as  cc,RuleDataDevice  as rdd,DeviceVariable  as  dv,DeviceTable  as  dt " +
				"where  pr.pageResource= ip.pageResourceId  and  pr.xtypeCode = cc.codeXtype " +
				"and   pr.valueId = rdd.valueId  and   rdd.deviceValueId =  dv.deviceVariableId " +
				"and   dv.deviceId = dt.deviceId and  ip.pageId=?",pageId);
	}

	public InfoDevicePage FindDevPageByPid(Integer pageId) {
		// TODO Auto-generated method stub
		return  (InfoDevicePage)getHibernateTemplate().find("from InfoDevicePage  where pageId=?",pageId).get(0);
	}

	public DeviceTable FindDevById(Integer deviceId) {
		// TODO Auto-generated method stub
		return  (DeviceTable)getHibernateTemplate().find("from DeviceTable  where  deviceId=?",deviceId).get(0);
	}

	public void margeDevpage(InfoDevicePage idp) {
		// TODO Auto-generated method stub
	         getHibernateTemplate().update(idp);
	}
	
	

}
