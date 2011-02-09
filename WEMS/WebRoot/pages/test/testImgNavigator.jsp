<%@ page language="java" contentType="text/html; charset=GBK"
    pageEncoding="GBK"%>
<% 
	String cp=request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<title>test for image navigator</title>
<link rel="stylesheet" type="text/css" href="<%=cp %>/ext3/resources/css/ext-all-notheme.css" /> 
    <link rel="stylesheet" type="text/css" href="<%=cp %>/ext3/resources/css/xtheme-gray.css" />
    <script type="text/javascript" src="<%=cp %>/ext3/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=cp %>/ext3/ext-all-debug.js"></script>
<script type="text/javascript" src="testImgNavigator.js"></script>

<style type="text/css">
	.x-navigator {
		
	}
	.x-navigator-img{
		position: absolute;
		z-index: -2;
	}
	.x-navigator-items{
		float: left;
		
	}
	.x-navigator-item{
		float: left;
		margin-left:5px;
		margin-right:5px;
		text-align: center;
	}
	.x-navigator-side{
		float: left;
		width: 5px;
	}
	
	.fl {
		float: left;
	}
	.cl {
		clear: left;
	}
	.cb {
		clear: both;
	}
	
</style>
<script type="text/javascript">
	Ext.onReady(function(){
		//new Ems.plugin.NavigatorItem({renderTo:Ext.getBody(),img:'testmenu1.png',imgAtv:'testmenu1_act.png'});
		new Ems.plugin.Navigator({renderTo:'navigator',img:'nativator.jpg',width:604,height:54,
			items:[new Ems.plugin.NavigatorItem({img:'testmenu1.png',imgAtv:'testmenu1_act.png'}),
			       new Ems.plugin.NavigatorItem({img:'testmenu2.png',imgAtv:'testmenu2_act.png'})]});
		/*
		var eles=Ext.query('.x-navigator-item');
		var navItem=Ext.get(eles[0]);
		var nav=Ext.query('.x-navigator');
		if(!nav)
			return;
		nav=Ext.get(nav[0]);
		var marginTop=(Ext.get(Ext.query('.x-navigator-img')[0]).getHeight()-navItem.getHeight() )/ 2;
		Ext.each(eles,function(el,idx,allEl){
			Ext.get(el).applyStyles({'marginTop':marginTop+'px'});
			
		});
		
		*/
	});
	
</script>
</head>
<body>
	<div id="navigator"></div>
	<center>
	<!--<div id="navigatortest">
		<div class="x-navigator">
			<div class="x-navigator-img"><img alt="navigator" src="nativator.jpg"></div>
			<div class="x-navigator-item">
				<div>菜单一</div>
			</div>
			<div class="x-navigator-item">
				<div>菜单2</div>
			</div>
		</div>
		
	</div>-->
	</center>
</body>
</html>