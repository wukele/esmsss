<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.admin.page.action.CommPageKeys"%>
<%@page import="com.page.entity.TplInfoPage"%>
<%
String path = request.getContextPath();
TplInfoPage  tpage = (TplInfoPage)session.getAttribute(CommPageKeys.KEY_TPL_INFO_PAGE);
JSONArray  resJson=null;
if(session.getAttribute(CommPageKeys.KEY_TPL_PAGE_RESOURCE_JSON)!=null){
	resJson=(JSONArray)session.getAttribute(CommPageKeys.KEY_TPL_PAGE_RESOURCE_JSON);
}
String tplResString=resJson.toString();
%>
<div  id='tplContainer'></div>
<script type="text/javascript" src="<%=path %>/pages/ems/plugins/EditCmenu.js"></script>
<script type="text/javascript">
Ext.ns('Ems.page')
Ems.page.tplContianerData=function(){
		return {
			
			defaultViewWidth:800,
		    defaultViewHeight:600,
		    
		    getTplPagebdStyle:function(){
			  var  imagePath='<%= tpage.getTplImagePath()%>';
			  var  imageWidth=<%= tpage.getTplImageWidth() %>;
			  var  imageHeight=<%= tpage.getTplImageHeight() %>;
			  var  bdStyle='';
			  if(imagePath){
			  		 bdStyle+='background-image: url("<%= path+"/"+ tpage.getTplImagePath() %>");background-repeat: no-repeat ;';	 
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
		
		
			getTplResourceData:function(){
					var TplResources=Ext.decode('<%=tplResString%>');
					if(TplResources == undefined || !TplResources.length){
							Ext.example.msg('警告','页面中组件为空');
							return [];
					}
					var  items=new Ext.util.MixedCollection();
			  		for(var i=0;i<TplResources.length; i++){
			  			var  item={};
			  			item.x= TplResources[i].resourceLeft;
			  			item.y= TplResources[i].resourceTop;
			  			item.xtype=TplResources[i].xtypeCode;
			  			item.width=TplResources[i].resourceWidth;
			  			item.height=TplResources[i].resourceHeight;
			  			item.id=TplResources[i].resourceId;
			  			item.plugins=new Ems.plugins.EditCmenu();
			  			items.add(item);
			  		}
			  		return  items.items;
			}
		}	
}();
</script>

<script type="text/javascript" src="<%=path %>/pages/admin/pageAdmin/TplPagePreview/TplPagePreviewApp.js"></script>

