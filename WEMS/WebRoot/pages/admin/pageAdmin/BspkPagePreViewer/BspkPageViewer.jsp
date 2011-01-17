<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.admin.page.action.CommPageKeys"%>
<%@page import="com.page.entity.BspkInfoPage"%>
<%@page import="net.sf.json.JSONArray"%>
<%
String path = request.getContextPath();
BspkInfoPage  bspage=null;
if(session.getAttribute(CommPageKeys.KEY_BSPK_INFO_PAGE)!=null){
    bspage=(BspkInfoPage)session.getAttribute(CommPageKeys.KEY_BSPK_INFO_PAGE);
}
JSONArray  resJson=null;
if(session.getAttribute(CommPageKeys.KEY_BSPK_PAGE_RESOURCE_JSON)!=null){
	resJson=(JSONArray)session.getAttribute(CommPageKeys.KEY_BSPK_PAGE_RESOURCE_JSON);
}
String  resStr=resJson.toString();
%>
<script type="text/javascript">
Ext.ns('Ems.page')

Ems.page.BspkPageData=function(){
	return {
		defaultViewWidth:800,
		defaultViewHeight:600,
		getBspkPagebdStyle:function(){
			  var  imagePath='<%= bspage.getBspkImagePath() %>';
			  var  imageWidth=<%= bspage.getBspkImageWidth() %>;
			  var  imageHeight=<%= bspage.getBspkImageHeight() %>;
			  var  bdStyle='';
			  if(imagePath){
			  		 bdStyle+='background-image: url("<%= path+"/"+bspage.getBspkImagePath()%>");background-repeat: no-repeat ;';	 
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
		getBspkPageResource:function(){
			  var PageResource=Ext.decode('<%=resStr %>');
			  if(!PageResource ||  !PageResource.length){
			  		 Ext.example.msg('INFO','resource is null');
			  		 return null;
			  }
			  var  items=new Ext.util.MixedCollection();
			  for(var i=0;i<PageResource.length; i++){
			  		var  item={};
			  		item.x= PageResource[i].resourceLeft;
			  		item.y= PageResource[i].resourceTop;
			  		item.xtype=PageResource[i].xtypeCode;
			  		item.width=PageResource[i].resourceWidth;
			  		item.height=PageResource[i].resourceHeight;
			  		items.add(item);
			  }
			  return  items.items;
		}
	}
}();

</script>

<div id='PreviewContainer'></div>

<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/BspkPagePreViewer/BspkPagePreViewApp.js"></script>
