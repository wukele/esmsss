package com.ui;

public class TreeDeviceNode implements java.io.Serializable{
		  private  String id;
		  private  String text;
		  private  boolean  leaf;
		  private  String  iconCls;
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
			return leaf;
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
