package com.ui;

import net.sf.json.JSONArray;

public class TreeDeviceNode implements java.io.Serializable{
		  private  String id;
		  private  String text;
		  private  boolean  leaf;
		  private  String  iconCls;
		  private  String  url;
		  public String getUrl() {
			return url;
		}
		public void setUrl(String url) {
			this.url = url;
		}
		private  JSONArray   children;
		public JSONArray getChildren() {
			return children;
		}
		public void setChildren(JSONArray children) {
			this.children = children;
		}
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getText() {
			return text;
		}
		public void setText(String text) {
			this.text = text;
		}
		public boolean isLeaf() {
			if(this.getChildren()==null){
				return  true;
			}else{
				return false;
			}
		}
		public void setLeaf(boolean leaf) {
			this.leaf = leaf;
		}
		public String getIconCls() {
			return iconCls;
		}
		public void setIconCls(String iconCls) {
			this.iconCls = iconCls;
		}
}
