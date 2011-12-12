package com.aisino2.sysadmin.action.json;

import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.sysadmin.action.PageAction;
import com.aisino2.sysadmin.domain.Department;
import com.aisino2.sysadmin.service.IDepartmentService;
import com.aisino2.sysadmin.tree.TreeNodeTool;

@Component
@Scope("prototype")
public class DepartmentManageAction extends PageAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8963651412037411136L;
	private IDepartmentService department_service;
	private Department department;
	private List<Department> department_list;
	private String department_treenode_list;
	private TreeNodeTool tree_node_tool;

	@Resource(name = "treeNodeTool")
	public void setTree_node_tool(TreeNodeTool tree_node_tool) {
		this.tree_node_tool = tree_node_tool;
	}

	/**
	 * 机构查询
	 * 
	 * @return
	 * @throws Exception
	 */
	public String querylist() throws Exception {
		try {
			List page_list = department_service.getListForPage(department,
					this.pageNo, this.pageSize, this.dir, this.sort);
			this.total = (Integer) page_list.get(0);
			department_list = (List<Department>) page_list.get(1);

		} catch (Exception e) {
			this.returnNo = 1;
			this.returnMessage = "获取列表发送错误";
		}

		return SUCCESS;
	}

	/**
	 * 查询机构树形节点
	 * 
	 * @return
	 * @throws Exception
	 */
	public String query_department_node() throws Exception {
		if (department == null)
			department = new Department();
		Integer departlevel = department.getDepartlevel();
		if(department.getDepartid()!=null && department.getDepartid() ==0)
			department.setDepartid(null);
		List<Department> child_depart_list = this.department_service
				.getChildDepart(department,departlevel);
		try{
			department = this.department_service.getDepartment(department);
		}catch (Exception e) {
			department = null;
		}
		StringBuffer buff = new StringBuffer();
		department_treenode_list = "["+tree_node_tool.make_ext_tree_node(tree_node_tool
				.parse_to_tree_node_from_department(child_depart_list,
						department, false,departlevel),buff).toString()+"]";
		this.response.setContentType("text/html; charset=utf-8");
		PrintWriter out = this.response.getWriter();
		out.print(department_treenode_list);
		out.close();
		return null;
	}

	/**
	 * 查询单个机构
	 * 
	 * @return
	 * @throws Exception
	 */
	public String query() throws Exception {

		department = department_service.getDepartment(department);
		return SUCCESS;
	}

	public String getDepartment_treenode_list() {
		return department_treenode_list;
	}

	public void setDepartment_treenode_list(String department_treenode_list) {
		this.department_treenode_list = department_treenode_list;
	}

	public String add() throws Exception {
		return SUCCESS;
	}

	public String remove() throws Exception {
		return SUCCESS;
	}

	public String modify() throws Exception {
		return SUCCESS;
	}

	@Resource(name = "departmentServiceImpl")
	public void setDepartment_service(IDepartmentService department_service) {
		this.department_service = department_service;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public List<Department> getDepartment_list() {
		return department_list;
	}

	public void setDepartment_list(List<Department> department_list) {
		this.department_list = department_list;
	}

}
