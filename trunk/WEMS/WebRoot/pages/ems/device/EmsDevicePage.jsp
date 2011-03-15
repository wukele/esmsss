<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.ems.entity.InfoDevicePage"%>
<%@page import="com.device.action.CommDevKey"%>
<%@page import="com.ems.entity.InfoPageResource"%>
<%
String path = request.getContextPath();

InfoDevicePage   page_info=(InfoDevicePage)session.getAttribute(CommDevKey.KEY_DEVICE_PAGE);
String  components=String.valueOf(session.getAttribute(CommDevKey.KEY_DEVICE_PAGE_RESOURCE));
String  engines=String.valueOf(session.getAttribute(CommDevKey.KEY_DEVICE_DATA_ENGINE));
List<String>   scripts=null;
if(session.getAttribute(CommDevKey.KEY_DEVICE_PAGE_SCRIPTS)!=null){
				scripts=(List<String>)session.getAttribute(CommDevKey.KEY_DEVICE_PAGE_SCRIPTS);
				for(int  i=0;i<scripts.size();i++){
							String  path_script=path+scripts.get(i);
%>
<script  type="text/javascript"   src="<%=path_script%>"></script>
<% 
				}
}
%>

<script type="text/javascript">
Ext.ns('Ems.device')


Ems.device.EmsDeviceApp=function(){
			return  {
						defaultViewWidth:800,
						defaultViewHeight:600,
						LoadDevPageComponent:function(){
										var   comps=Ext.decode('<%=components%>')	;
										if(!comps  ||  !comps.length){
													return   null;
										}else{
													var  items=new  Ext.util.MixedCollection();
													for(var  i=0;i<comps.length;i++){
																var item={};
																item.id=comps[i].valueId;
																item.x= comps[i].resourceLeft;
			  													item.y= comps[i].resourceTop;
			  													item.xtype=comps[i].xtypeCode;
			  													item.width=comps[i].resourceWidth;
			  													item.height=comps[i].resourceHeight;
			  													items.add(item);
													}
													return  items.items;
										}
						},
						GetDevPageInfo:function(){
											var  imagePath='<%= page_info.getPageImageUrl() %>';
											 var  imageWidth=<%= page_info.getPageImageWidth() %>;
			 								 var  imageHeight=<%= page_info.getPageImageHeight() %>;
			 								var  bdStyle='';
			  								if(imagePath){
			  		 								bdStyle+='background-image: url("<%= path+"/"+ page_info.getPageImageUrl() %>");background-repeat: no-repeat ;';	 
			  								}
			 								if(imageWidth){
			  		 								this.defaultViewWidth=imageWidth;	 
			 								 }
			  								if(imageHeight){
			  									this.defaultViewHeight=imageHeight;
			 								 }
			 								 bdStyle+='height:'+this.defaultViewHeight+ 'px;';
			  								bdStyle+='width:'+this.defaultViewWidth+'px;';
			 								 return bdStyle;
						},
						
						initPageDataEngines:function(){
											var  dataEngines=<%=engines%>;
											if(!dataEngines   ||   !dataEngines.length){
															return  1;
											}else{
													for(var  i=0;i<dataEngines.length;i++){
															dataEngines[i].baseParams=Ext.decode(dataEngines[i].baseParams);
															Ext.Direct.addProvider(dataEngines[i]);
															Ext_Direct_providers[i]=dataEngines[i].id;
													}
											}
						}
			}
}();


</script>

<div   id="DevAppMain"></div>
<script  type="text/javascript"  src="<%=path %>/pages/ems/device/EmsDeviceApp.js"></script>




