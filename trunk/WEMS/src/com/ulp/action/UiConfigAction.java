package com.ulp.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.entries.ulp.InfoConfig;
import com.opensymphony.xwork2.ActionSupport;
import com.ulp.service.UiConfigService;
@Component("UiConfigAction")
@Scope("prototype")
public class UiConfigAction extends ActionSupport {
			
	private UiConfigService   ucs;
	@Resource(name="UiConfigService")
	public void setUcs(UiConfigService ucs) {
		this.ucs = ucs;
	}
	
	private String  config_name;
	private int totalProperty;
	private List<InfoConfig>   configs;
	public List<InfoConfig> getConfigs() {
		return configs;
	}

	public void setConfigs(List<InfoConfig> configs) {
		this.configs = configs;
	}

	public void setConfig_name(String configName) {
		config_name = configName;
	}

	public String UiConfigQry(){
				configs=ucs.QueryConfigByName(config_name);
				totalProperty=configs.size();
				return SUCCESS;
	}

	public int getTotalProperty() {
		return totalProperty;
	}
}
