package com.admin.user.action;


import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.admin.user.service.InfoDeptService;
import com.admin.user.service.RoleService;
import com.entries.ulp.InfoDept;
import com.entries.ulp.InfoDeptDAO;
import com.entries.ulp.InfoRole;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Component("InfoDeptManagerAction")
@Scope("prototype")
public class InfoDeptManagerAction extends ActionSupport implements ServletRequestAware {
	private static final Log log = LogFactory.getLog(InfoDeptManagerAction.class);
	private HttpServletRequest  request;
	/**
	 * 
	 */
	private static final long serialVersionUID = 2917992252063549075L;
	/*��ҳ�õ�3������*/
	private int totalProperty=0;
	private int start=0;
	private int limit=10;
	private int ret=0;
	private String msg="";
	
	private List<InfoDept>  infoDepts;
	private InfoDeptService   infoDeptService;
	private InfoDeptDAO infoDeptDao;
	private InfoDept infoDept;
	
	
	@Resource(name="InfoDeptService")
	public void setInfoDeptService(InfoDeptService infoDeptService) {
		this.infoDeptService = infoDeptService;
	}
	
	public String insertInfoDept(){
		try {
			infoDeptService.insertInfoDept(infoDept);
		} catch (Throwable e) {
			setRet(1);
			setMsg("insertInfoDept failed..."+e.getMessage());
			log.error(getMsg());
		}
		
		return  SUCCESS;
	}
	public String updateInfoDept(){
		try {
			infoDeptService.updateInfoDept(infoDept);
		} catch (Throwable e) {
			setRet(1);
			setMsg("updateInfoDept failed..."+e.getMessage());
			log.error(getMsg());
		}	
		return  SUCCESS;
	}
	public String deleteInfoDept(){
		try {
			infoDeptService.deleteInfoDept(infoDept);
		} catch (Throwable e) {
			setRet(1);
			setMsg("deleteInfoDept failed..."+e.getMessage());
			log.error(getMsg());
		}
		
		return  SUCCESS;
	}
	/**
	 * action�ⲿ��¶����
	 * @return
	 */
	public  String selectInfoDept(){

		if(infoDept==null){
			infoDept=new InfoDept();
		}
		infoDepts=infoDeptService.selectInfoDept(infoDept);
		
//		List<InfoDept> listRet=infoDeptService.selectInfoDept(infoDept);
//		totalProperty=listRet.size();
//		infoDepts=selectSubDatas(listRet,start,limit);
		infoDepts=infoDeptService.selectInfoDept(infoDept);
//		totalProperty=infoDepts.size();
		return  SUCCESS;
	}
	private List selectSubDatas(List listParam, int _start,int _limit) {
		List listRet=new LinkedList();
		for(int i=0;i<listParam.size();i++){
			if(i>=_start&&i<(_start+_limit)){
				listRet.add(listParam.get(i));
			}
		}
		return listRet;
	}


	public String queryInfoDept(String deptNo,String deptName){
		return  SUCCESS;
	}
	public void setInfoDepts(List<InfoDept> infoDepts) {
		this.infoDepts = infoDepts;
	}
	public List<InfoDept> getInfoDepts() {
		return infoDepts;
	}
	public void setServletRequest(HttpServletRequest request) {
		// TODO Auto-generated method stub
		setRequest(request);
	}
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	
	@Resource(name="InfoDeptDAO")
	public void setInfoDeptDao(InfoDeptDAO infoDeptDao) {
		this.infoDeptDao = infoDeptDao;
	}



	public void setTotalProperty(int totalProperty) {
		this.totalProperty = totalProperty;
	}



	public int getTotalProperty() {
		return totalProperty;
	}



	public static long getSerialversionuid() {
		return serialVersionUID;
	}



	public void setStart(int start) {
		this.start = start;
	}
	public int getStart() {
		return start;
	}


	



	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getLimit(){
		return limit;
	}





	public void setInfoDept(InfoDept infoDept) {
		this.infoDept = infoDept;
	}


	public InfoDept getInfoDept() {
		return infoDept;
	}

	public void setRet(int ret) {
		this.ret = ret;
	}

	public int getRet() {
		return ret;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}


}
