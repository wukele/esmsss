package com.component;

import java.util.ArrayList;
import java.util.List;

public class DataEngine {
			public int getInterval() {
		return interval;
	}
	public void setInterval(int interval) {
		this.interval = interval;
	}
			private String id;
			private String	type="polling";
			private String url;
			private int interval;
			private List<String>  baseParas;
			public List<String> getBaseParas() {
				if(baseParas==null){
							baseParas=new ArrayList<String>();
				}
				return baseParas;
			}
			public void setBaseParas(List<String> baseParas) {
				this.baseParas = baseParas;
			}
			public String getId() {
				return id;
			}
			public void setId(String id) {
				this.id = id;
			}
			public String getType() {
				return type;
			}
			public void setType(String type) {
				this.type = type;
			}
			public String getUrl() {
				return url;
			}
			public void setUrl(String url) {
				this.url = url;
			}
		
}
