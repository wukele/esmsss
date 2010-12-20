package com.ems.component.action;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


import org.springframework.stereotype.Component;

import com.ems.dao.IRealDataCollector;
import com.ems.entity.RealTimeData;
import com.opensymphony.xwork2.ActionSupport;
@Component("DirectDataEngine")
public class DirectDataEngine extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7207204941229237867L;
	
	public IRealDataCollector getCollect() {
		return collect;
	}
	
	@Resource(name="RealDataCollector")
	public void setCollect(IRealDataCollector collect) {
		this.collect = collect;
	}

	private String type;
	public List<RealTimeData> getRealTimeData() {
		return real_time_data;
	}

	public void setRealTimeData(List<RealTimeData> realTimeData) {
		real_time_data = realTimeData;
	}

	private String name;
	private String values;
	private IRealDataCollector  collect;
	private List<RealTimeData> real_time_data;
	public String getValues() {
		return values;
	}

	public void setValues(String values) {
		this.values = values;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public  String  execute(){
		type="event";
		name="message";
		real_time_data=collect.findRealtimedataByDE(values);
		return SUCCESS;
	}

	
}
