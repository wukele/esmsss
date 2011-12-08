package com.aisino2.sysadmin.dao;
import java.util.List;
import java.util.Map;

import com.aisino2.sysadmin.domain.Department;
public interface IDepartmentDao {
	/** @param 机构(t_department) 增加 */
	void insertDepartment(Department department);
	
	/** @param 机构(t_department) 增加 */
	void insertCacheDepartment(Department department);

	/** @param 机构(t_department) 删除 */
	void deleteDepartment(Department department);
	
	/** @param 机构(t_department) 删除 */
	void deleteCacheDepartment(Department department);

	/** @param 机构(t_department) 修改 */
	void updateDepartment(Department department);
	
	/** @param 机构(t_department) 修改 */
	void updateCacheDepartment(Department department);

	/** @param 机构(t_department) 查询单条 */
	Department getDepartment(Department department);

	/** @param 机构(t_department) 分页查询 */
	List getListForPage(Department department, int pageNo,int pageSize,String sort,String desc);
	
	/** @param 机构(t_department) 分页查询 平板字典下拉框*/
	List getDicListForPage(Map map, int pageNo,int pageSize,String sort,String desc);
	
	/** @param 机构(t_department) 多条查询 平板字典下拉框 放到内存*/
	List getListDepartmentForCache(Department department);
	
	/** @param 机构(t_department) 多条查询 平板字典下拉框 放到内存 onlyGa-只查询公安机关*/
	List getListDepartment(Department department,String onlyGa);

	/** @param 机构(t_department) 多条查询 */
	List getListDepartment(Department department);
	
	/** @param depart
	   *
	   *  根据id取得所有子部门
	   * 
	   *  */
	  List getChildDepart(Department depart);
	  
	  /** @param depart 
	   * 根据parentdepartid取得父部门
	   * 
	   * */
	  Department getParentDepart(Department depart);
	  
	  /**
	   * 取得所有部门信息

	   * @param condition
	   * condition中参数有falg，departCode，departId
	   *  
	   *   falg可以为cjd或fxj或ksd或ds或sonfxj这几个值用在江苏取得江苏部门
	   *   
	   *   
	   *   falg也可以为hnfxj或hnksd或hnds或hnsonfxj 这几个值用在河南取得河南部门
	   * 
	   *   falg值也可以为空或null，
	   * 
	   *  此方法主要用在娱乐业项目中
	   * 
	   * @return
	   */
	  List getDepartInfo(Department depart);
	  
	  /**
	   * 根据fullCode和id取得所有子部门
	   * 
	   * 
	   * @param depart
	   * @return
	   */
	  
	  
	  List getAllChildDepart(Department depart);
	  /**
	   * 根据fullCode取得从顶层开始的所有子部门
	   * 
	   * 
	   * @param depart
	   * @return
	   */
	  
	  
	  List getAllChildDepartByFullCode(Department depart);
	  
	  /**
	   * 得到为场所管辖单位的部门

	   * 参数有departid，flag
	   * 
	   * 此方法用于娱乐业项目
	   * @param condition
	   * 
	   * 
	   * @return
	   */
	  List getChildDepartCs(Department depart);
	  
	  
	  /**
	   * 检查是否还有子类；
	   * @param condition
	   * @return
	   */
	  boolean checkChild(Department depart);
	  
	  /** 获得下一个排序号 */
	Department getNextNodeorder(Department department);
	
	/** @param 机构(t_department) 多条查询 */
	List getListAllDepartment(Department department);
	
}
