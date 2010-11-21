package com.component;

public class DataEngine {
			private String id;
			private String	type="polling";
			private String url;
			private String baseParams;
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
			public String getBaseParams() {
				return baseParams;
			}
			public void setBaseParams(String baseParams) {
				this.baseParams = baseParams;
			}
}
