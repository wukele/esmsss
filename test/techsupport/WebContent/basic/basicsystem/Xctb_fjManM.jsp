<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%> 
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<script type="text/javascript">
$(document).ready(function() {
    
    xctb_fj_tables = "";////重写定义tables变量 tables 为公共变量需要重新定义 避免和主页面的变量的冲突
    
	xctb_fj_pageUrl="basicsystem/querylist_xctb_fj.action";
	xctb_fj_divnid="Xctb_fjData";
	xctb_fj_tableid="Xctb_fjTable";
	xctb_fj_addUrl="basicsystem/insert_xctb_fj.action";
	xctb_fj_addHtml="basic/basicsystem/Xctb_fjAdd.jsp";
	xctb_fj_addWidth="500";
	xctb_fj_delUrl="basicsystem/delete_xctb_fj.action";
	xctb_fj_delid="del_fjid";
	xctb_fj_modHtml="basic/basicsystem/Xctb_fjModify.jsp";
	xctb_fj_modUrl="basicsystem/modify_xctb_fj.action";
	xctb_fj_modWidth="500";
	xctb_fj_detailHtml="basic/basicsystem/Xctb_fjDetail.jsp";
	xctb_fj_detailid="xctb_fj_detail";
	xctb_fj_detailUrl="basicsystem/query_xctb_fj.action";
	xctb_fj_detailWidth="300";
	xctb_fj_loadPage(xctb_fj_divnid);
	
	$("#p_tbid").attr("value",dataid); //把主键id 赋值给隐藏值
	$("#p_oprflag").attr("value","del");  ///显示操作的标志变量
	
	xctb_fj_setPageList(1);
}); 
	
	function xctb_fj_setPageList(pageno,url){	
		//if (xctb_fj_manVerify()){
			url=xctb_fj_setList(pageno,url);
			// create the grid
			// returns a jQ object with a 'g' property - that's ingrid
			var mygrid1 = $("#"+xctb_fj_tableid).ingrid({ 
											url: url,
											barTopOffset:-(xctb_detailidTopOffset+1),
										    barLeftOffset:-(xctb_detailidLeftOffset+1),	
											pageNumber: pageno,
											height:80,
											ingridPageWidth: 691,
											ingridPageParams: sXML,	
											paging: false,
											sorting: false,
											onRowSelect: function(tr){
											},
											changeHref:function(table){
												//alert(table.find("tr").length);
												fjnum = table.find("tr").length;
											},
											
											isPlayResultNull: false,
											colWidths: ["33%","33%","34%"]									
										});				
			//}
			
	}	
	///重写setList方法
	function xctb_fj_setList(pageno,url){
	$("#"+xctb_fj_divnid).html(xctb_fj_tables);	
		//createXML("p_");
		setParams("p_"); ///传输查询条件
		if (url==null || url=="undefined"){
			url=xctb_fj_pageUrl;
		}
		return url;
	}
	
	///重写loadPage方法
	function xctb_fj_loadPage(xctb_fj_divnid){
	   xctb_fj_tables = $("#"+xctb_fj_divnid).html();
	   $("#"+xctb_fj_detailid).hide(); 	
	   xctb_fj_setPageList(1,'#');
	}
	
	////下载函数覆盖了查询页面的getObject的函数，这里没有下载只有删除功能
	/*function getObject(obj){
	  sFlag="false";
	  var id=$(obj).attr("id");
	  id=id.split("_")[1];
	  $("#x_fjid").attr("value",id);
	  //alert($(obj).attr("id")+"="+$(obj).text());
	  //alert($("#x_fjid").attr("value")); 
	  setParams("x_");
	  downUrl = "basicsystem/downfile_xctb_fj.action";
	  var surl=downUrl+"?xml="+sXML;
	  $(obj).attr("href",surl);
	}*/
	function downback(para){
	}
	
	/////重写删除函数
	function xctb_fj_setDelete(id){
	  sFlag="false";
	  jConfirm('确定删除吗？', '删除提示', function(r) {
    	if(r==true){
			$("#"+xctb_fj_delid).attr("value",id);
			setParams("del_");
	        jQuery.post(xctb_fj_delUrl,params,xctb_fj_deleteback,"json");
		}else{
		   return false;
		}
	  });
	}
	//////删除函数的回调函数‘
    function xctb_fj_deleteback(json){
		if  (json.result=="success"){
		jAlert(delMessage,'提示信息');
		var pageno=$("#pageNo").attr("value");
		if ($("#startno").html()==$("#endno").html()){
			if ($("#pageNo").attr("value")>1){
				pageno=""+(parseInt(pageno)-1);
			}
		}
		xctb_fj_setPageList(pageno); ////重写刷页面 pageno 是页数 在核心包中已经封装好
		
		  fjnum = fjnum - 1;  ///修改界面的附近个数减1
		}else{
			jAlert(json.result,'错误信息');
		}
			
    }
	
</script>
<body>
     <input type="hidden" id="x_fjid"><!-- 下载用的 附件id -->
    <input type="hidden" id="p_oprflag"><!-- 显示操作的flag -->
	<input type="hidden" id="p_tbid" value="">
	<input type="hidden" id="del_fjid" value="">
	<div id="xctb_fj_detail"  class="page-layout" src="#"
		style="top:180px;">
    </div>	
<div id="Xctb_fjData" style="width:100%;">
	<table id="Xctb_fjTable" width="100%">
	  <thead>
	    <tr>       
	     	<th name="l_fjmc">附件名称</th>
	     	<th name="l_fjlx">附件类型</th>
			<th name="">操作</th>
	    </tr>
	  </thead>	  
	</table>	
</div>
</body>
