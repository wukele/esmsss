package com.aisino2.sysadmin.action.json;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.domain.System;

@Component
@Scope("prototype")
public class SystemManageAction extends PageAction {
	private System system;
	private List<System> systemList;
	/**
	 * 
	 */
	private static final long serialVersionUID = 6479289252324243277L;
	
	/**
	 * 详情查询
	 * @return
	 * @throws Exception
	 */
	public String query() throws Exception{
		return SUCCESS;
	}
	/**
	 * 列表查询
	 * @return
	 * @throws Exception
	 */
	public String querylist() throws Exception{
		return SUCCESS;
	}
	/**
	 * 添加
	 * @return
	 * @throws Exception
	 */
	public String add() throws Exception{
		return SUCCESS;
	}
	/**
	 * 删除
	 * @return
	 * @throws Exception
	 */
	public String remove() throws Exception{
		return SUCCESS;
	}
	/**
	 * 修改
	 * @return
	 * @throws Exception
	 */
	public String modify() throws Exception{
		return SUCCESS;
	}
	/**
	 * 上移
	 * @return
	 * @throws Exception
	 */
//	public String up() throws Exception{
//		return SUCCESS;
//	}
//	
//	public String down() throws Exception{
//		return SUCCESS;
//	}
	/**
	 * 置顶
	 */
	public String top() throws Exception{
		return SUCCESS;
	}
	/**
	 * 置底
	 * @return
	 * @throws Exception
	 */
	public String bottom() throws Exception{
		return SUCCESS;
	}
	public System getSystem() {
		return system;
	}

	public void setSystem(System system) {
		this.system = system;
	}

	public List<System> getSystemList() {
		return systemList;
	}

	public void setSystemList(List<System> systemList) {
		this.systemList = systemList;
	}
	
}
