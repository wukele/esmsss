<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String cp = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript"
	src="<%=cp%>/ext3/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=cp%>/ext3/ext-all.js"></script>
<link href="<%=cp%>/ext3/resources/css/ext-all.css" rel="stylesheet"
	type="text/css"/>
<script type="text/javascript">
	Ext.onReady(function(){
		com.hrs.ext.test.treepanel.init();
	});
	
	Ext.ns('com.hrs.ext.test.treepanel');
	
	com.hrs.ext.test.treepanel = function(){
		var viewport;
		var treepanel;
		//node1 root ,node2 one lvl,node3 and node4 two lvl,node3 node4 is brother.
		var node1,node2,node3,node4;
		var jsontreepanel;
		var loader;
		var loaderNode;
		
		return {
			init:function(){
				node3 = new Ext.tree.TreeNode({id:'node3',text:'node3',leaf:true});
				node4 = new Ext.tree.TreeNode({id:'node4',text:'node4',leaf:true});
				
				node2 = new Ext.tree.TreeNode({id:'node2',text:'node2'});
				node2.appendChild(node3);
				node2.appendChild(node4);
				node3.on('click',function(node,event){
					alert(node);
				});
				node1 = new Ext.tree.TreeNode({
					id:'node1',
					text:'node1'
				});
				node1.appendChild(node2);
				node1.on('click',function(node,event){alert(node);});
				treepanel = new Ext.tree.TreePanel({
					width:200,
					root:node1
				});
				
				//tree2
				loader=new Ext.tree.TreeLoader({
					url:'../getnodes.action'
				});
				loaderNode=new Ext.tree.AsyncTreeNode({
					id:'nodes',
					text:'root',
					loader:loader
				});
				
				jsontreepanel=new Ext.tree.TreePanel({
					width:200,
					root:loaderNode
				});
				//viewport
				viewport = new Ext.Viewport({
					layout:'auto',
					title:'treepanel test',
					enableScrooll:true,
					items:[treepanel,jsontreepanel]
				});	
			}
		};
	}();
</script>
<title>test for tree panel</title>
</head>
<body>

</body>
</html>