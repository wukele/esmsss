package com.ulp.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Component;

import com.ems.entity.DeviceTable;
import com.ui.TreeDeviceNode;
import com.ulp.dao.impl.TreeDeviceDao;

@Component("TreeDeviceServce")
public class TreeDeviceServce {
		
	  private  TreeDeviceDao   tdDao;
	  @Resource(name="TreeDeviceDao")
       public void setTdDao(TreeDeviceDao tdDao) {
		this.tdDao = tdDao;
	}

	public  List<TreeDeviceNode>  CreateOperTreeDevice(String operNo){
    	   			List<String>  deviceTypes=tdDao.GetOperDeviceType(operNo);
    	   			if(deviceTypes==null)return null;
    	   			List<TreeDeviceNode> devices=new ArrayList<TreeDeviceNode>();
    	   			for(int  i=0;i<deviceTypes.size();i++){
    	   						TreeDeviceNode  node=new TreeDeviceNode();
    	   						String type=deviceTypes.get(i);
    	   						node.setText(type);
    	   						node.setId(String.valueOf(i));
    	   						List<DeviceTable>  cdevices=tdDao.GetTypeDeivce(type, operNo);
    	   						JSONArray   jsChilds=new JSONArray();
    	   						if(cdevices==null)continue;
    	   						for(int  j=0;j<cdevices.size();j++){
    	   							TreeDeviceNode  cn=new TreeDeviceNode();
    	   									cn.setIconCls("silk-cog");
    	   									DeviceTable   dev=cdevices.get(j);
    	   									cn.setText(dev.getDeviceName());
    	   									cn.setId(String.valueOf(dev.getDeviceId()));
    	   									cn.setUrl(String.valueOf(dev.getDeviceId()));
    	   									cn.setLeaf(true);
    	   									jsChilds.add(cn);
    	   						}
    	   						node.setChildren(jsChilds);
    	   						devices.add(node);
    	   			}
    	   
    	   			return  devices;
       }
}
