package com.component;

public class BaseComponent {
			private String   xtype;
			private Integer  x;
			private Integer  y;
			private Integer width;
			private Integer height;
			private String id;
			private String tpl;
			private String text;
			public String getXtype() {
				return xtype;
			}
			public void setXtype(String xtype) {
				this.xtype = xtype;
			}
			public Integer getX() {
				return x;
			}
			public void setX(Integer x) {
				this.x = x;
			}
			public Integer getY() {
				return y;
			}
			public void setY(Integer y) {
				this.y = y;
			}
			public Integer getWidth() {
				return width;
			}
			public void setWidth(Integer width) {
				this.width = width;
			}
			public Integer getHeight() {
				return height;
			}
			public void setHeight(Integer height) {
				this.height = height;
			}
			public String getId() {
				return id;
			}
			public void setId(String id) {
				this.id = id;
			}
			public String getTpl() {
				return tpl;
			}
			public void setTpl(String tpl) {
				this.tpl = tpl;
			}
			public String getText() {
				return text;
			}
			public void setText(String text) {
				this.text = text;
			}
}
