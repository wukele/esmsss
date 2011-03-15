package com.device.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.admin.page.struct.PageResourceDataRuleStruct;
import com.admin.page.struct.PageResourceView;
import com.component.DataEngine;
import com.data.entity.InfoEngine;
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

	public InfoDevicePage findDevPage(Integer deviceId) {
		// TODO Auto-generated method stub
		List   p=getHibernateTemplate().find("from  InfoDevicePage  where  deviceId=?",deviceId);
		if(p!=null  && p.size()>0){
				return   (InfoDevicePage)p.get(0);
		}else
		return null;
	}

	public List<String> findDevPageScript(String pageResourceId) {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("select  distinct  crc.scriptUrl from  InfoPageResource as  ipr," +
				"CodeComponent as code,ComponentResourceCode as crc where  ipr.xtypeCode =  code.codeXtype " +
				"and   code.componentResourceId =  crc.componentResourceId and crc.needScript='1'  and   ipr.pageResource=?",pageResourceId);
	}

	public List<InfoPageResource> findDevPageComp(String pageResourceId) {
		// TODO Auto-generated method stub
		return  getHibernateTemplate().find("from  InfoPageResource  where  pageResource=? ",pageResourceId);
	}
	
	public List<DataEngine> FindDevPageDE(String pageResource){
		String   queryPageEngine="select distinct eng.engineCode"+
				" from InfoPageResource as res,RuleEngineData as eng"+
				" where res.pageResource=? and res.valueId=eng.valueId";
		List<String>  engines=getHibernateTemplate().find(queryPageEngine, pageResource);
		if(engines==null ||  engines.size()<0){
					return null;
		}else{
					List<DataEngine>  ens=new ArrayList<DataEngine>();
					for(int i=0;i<engines.size();i++){
									List<InfoEngine>  ie=getHibernateTemplate().find("from InfoEngine as engine " +
											"where engine.engineCode=?", engines.get(i));
									DataEngine  de=new DataEngine();
									InfoEngine e=ie.get(i);
									de.setUrl(e.getActionName());
									de.setInterval(e.getMaxInterval().intValue()*1000);
									de.setId(e.getEngineCode());
									List<String>  paras=getHibernateTemplate().find("select  valueId  from RuleEngineData where " +
											"engineCode=?",e.getEngineCode());
									String values="{values:'";
									/*for(int p=0;p<paras.size();p++){
													values+=paras.get(p)+",";
									}*/
									values+=e.getEngineCode()+"'}";
								
									de.setBaseParams(values);
									ens.add(de);
					}
					return ens;
		}
	}

}
