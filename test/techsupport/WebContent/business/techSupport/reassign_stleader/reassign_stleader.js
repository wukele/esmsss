/**
 * tracking.js
 * 追踪批复
 * 
 * */

var processUrl2;
var ingridUrl;
var ingridWidth=750;
var trackingWindowWidth=850;
//督办
var supervision_div_id="supervision_list_div";
var supervision_table_id="supervision_list_table";
var supervision_tables;
//督办查询路径
var supervision_query_url = BUSNEISS_PATH +"/querylist_supervision.action";
/**保存验证*/
function saveVerify() {
	if (!checkControlValue("p_newProcess","String",1,4000,null,1,"变更原因"))
		return false;
	if (!checkControlValue("p_trackingDate","Date",null,null,null,1,"变更日期"))
		return false;
	if (!checkControlValue("p_processor","String",1,100,null,1,"新支持单负责人"))
		return false;
	return true;
}
function load_page_supervision_query(divpageid){
	supervision_tables=$("#"+divpageid).html();
	supervision_query(1,'#');
}

function set_supervision_list(pageno,url){	
	$("#"+supervision_div_id).html(supervision_tables);
	createXML("sv_");
	if (url==null || url=="undefined"){
		url=supervision_query_url;
	}
	return url;
}

/**
 * 查询函数
 * */
function supervision_query(pageno,url){
	
	if (true){
		url=set_supervision_list(pageno,url);
		// create the grid
		// returns a jQ object with a 'g' property - that's ingrid
		var mygrid2 = $("#"+supervision_table_id).ingrid({ 
										url: url,	
										height:70,
										ingridPageWidth:ingridWidth,
										isPlayResultNull: false,
										havaWaiDivGunDong: true,
                                      	ingridPageParams:sXML,
                                      	onRowSelect:null,
										pageNumber: pageno,
										colWidths: ["14%","70%","16%"]				
									});
		}
}
/** onload */
$(function(){

	//保存连接
	var saveURL = getContextPath()+"/techsupport/change_support_leader_supportchange.action";
	
	//只读化控件
	$('.ro').attr('readOnly',true);
	//设置时间控件
	$('.date').each(function(){
		$(this).datepicker();
		$(this).attr('readOnly',true);
	});
	
	
	//初始化该页面值
	$('#p_taskId').val(dataid);
	
	
	
	processUrl2=getContextPath()+ "/techsupport/init_tracking.action";
	//追踪批复查询URL
	ingridUrl=getContextPath() + "/techsupport/querylist_tracking.action";
	
	divnid="trackingTableDiv";//查询内容容器ID
	tableid="trackingTable";//查询内容格式表格ID
	
	
	loadPageTrackingQuery(divnid);
	
	
	loadData();
	
	//重新指派支持单负责人
	$('#p_processor').click(function(){
	
		getUserofDept('p_processor','p_processorId',gxdwbm,ST_ROLE_NAME_STLEADER,true);
	});
	
	//设置保存按钮
	$('#saveBtn').click(function(){
		if(!saveVerify()){
			return;
		}
		if(!confirm("您确认变更支持单负责人吗？"))
			return;
		var params = {};
		
		params = getSubmitParams("[name^=track.]");
		params = $.extend(params,getSubmitParams("[name^=change_st.]"));
		
		//设置当前的track.stId
		params['track.stId']=$('input:hidden[name=st.id]').val();
		params['change_st.id']=$('input:hidden[name=st.id]').val();
		params['taskId']=$('#p_taskId').val();
		
		$.post(saveURL,params,function(data){
			if(!data){
				alert("传输错误，管理人员");
			}
			data = eval("("+data+")");
			
			if(data.returnNo == 0){
				$(detailWindow).hideAndRemove("show");
				
				worksheetQuery(1);
			}
			else
				jAlert(data.returnMsg,"提示")
		});
		
	});
});


function loadPageTrackingQuery(divpageid){
	tables=$("#"+divpageid).html();
	trackingQuery(1,'#');
}	

/**
 * 查询函数
 * */
function trackingQuery(pageno,url){
	
	if (true){
		url=setList(pageno,url);
		// create the grid
		// returns a jQ object with a 'g' property - that's ingrid
		var mygrid2 = $("#"+tableid).ingrid({ 
										url: url,	
										height:70,
										ingridPageWidth:ingridWidth,
										isPlayResultNull: false,
										havaWaiDivGunDong: true,
                                      	ingridPageParams:sXML,
                                      	onRowSelect:null,
										pageNumber: pageno,
										colWidths: ["14%","70%","16%"]				
									});				
		}
}

/**
 * 初始化页面数据
 */
function loadData(){
	var paramsss = {'taskId':$('#p_taskId').val()};
	
	$.post(processUrl2,paramsss,function(data){
		
		data = eval("("+data+")");
		$('input[name^=st.]').each(function(){
			try{
				$(this).val(setNull(eval("("+"data."+$(this).attr('name')+")")));
			}catch(e){
				
			}
			
		});
		$('textarea[name^=st.]').each(function(){
			try{
				$(this).val(setNull(eval("("+"data."+$(this).attr('name')+")")));
			}catch(e){
				
			}
		});
		
		//非阶段性隐藏
		relateHide('devstage');
		relateHide('psgstage');
				
		//非阶段性隐藏
		relateHide('devcpstage');
		relateHide('psgcpstage');
		
//		初始化单位信息
		var deptNameStr="";
		var deptList = data.st.supportDeptList;
		for(i=0;i<deptList.length;i++){
			deptNameStr += ","+deptList[i].departname;
		}
		deptNameStr = deptNameStr.substring(1,deptNameStr.length);
		$('#p_deptName').val(deptNameStr);

//		初始化技术负责人
		var sSlNames="";
		for(i=0;i<data.st.lstSupportLeaders.length;i++)
			sSlNames+=","+data.st.lstSupportLeaders[i].username;
		sSlNames=sSlNames.length > 0? sSlNames.substring(1) : sSlNames;
		$('#p_slName').val(sSlNames);
		
		//	初始化提请反馈必填项颜色信息
		if($('#p_deptName').val().indexOf('方案部') > -1){
			$('#p_psgCompDate').prev('label').addClass('blue');
			// 修正bug 添加必要的颜色信息
			$("#psgcpstage").blur(function() {
				if ($(this).attr('checked')) {
					$('.' + this.id).addClass('blue');
				} else {
					$('.' + this.id).removeClass("blue");
				}
			});
		}
		if($('#p_deptName').val().indexOf('开发部') > -1){
			$('#p_devCompDate').prev('label').addClass('blue');
			// 修正bug 添加必要的颜色信息
			$("#devcpstage").blur(function() {
				if ($(this).attr('checked')) {
					$('.' + this.id).addClass('blue');
				} else {
					$('.' + this.id).removeClass("blue");
				}
			});
		}
		
		$('#p_region').val(getDictitem({dictcode:ST_REGION_DICT_CODE,value:$('#p_region').val()})[0].display_name);
		
		trackingQuery(1,ingridUrl);
		//督办
		$('#sv_st_id').val(data.st.id);
		load_page_supervision_query(supervision_div_id);
		supervision_query(1);
	});
	
	
}
