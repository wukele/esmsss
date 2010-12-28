package com.ulp.action;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.opensymphony.xwork2.ActionSupport;
import com.ui.TreeDeviceNode;


@Component("EmsSystemDeviceAction")
public class EmsSystemDeviceAction extends ActionSupport {
		
	   private  List<TreeDeviceNode>  devices;
	    
		public List<TreeDeviceNode> getDevices() {
		return devices;
	}

	public void setDevices(List<TreeDeviceNode> devices) {
		this.devices = devices;
	}

		public  String  execute(){
			devices=new ArrayList<TreeDeviceNode>();
			for(int  i=0;i<5;i++){
					TreeDeviceNode  node=new TreeDeviceNode();
					node.setIconCls("silk_user");
					node.setId("id"+i);
					node.setLeaf(true);
					node.setText("text_"+i);
					devices.add(node);
			}
			return SUCCESS;
		}
		
}
