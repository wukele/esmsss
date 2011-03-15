package com.component;

import java.io.Serializable;


public class DataEngine  implements  Serializable {
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
			private String baseParams;
			public String getBaseParams() {
			
				return baseParams;
			}
			public void setBaseParams(String baseParams) {
				this.baseParams = baseParams;
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
