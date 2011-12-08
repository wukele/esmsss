package com.aisino2.sysadmin.dao;
import java.util.List;

import com.aisino2.sysadmin.domain.User;
public interface IUserDao {
	/** @param 用户(t_user) 增加 */
	void insertUser(User user);

	/** @param 用户(t_user) 删除 */
	void deleteUser(User user);

	/** @param 用户(t_user) 修改 */
	void updateUser(User user);
	
	/** @param 用户(t_user) 修改 */
	void updateUkeyUser(User user);

	/** @param 用户(t_user) 查询单条 */
	User getUser(User user);
	
	/** @param 用户(t_user) 查询单条 */
	User getPasswordByUseraccount(User user);

	/** @param 用户(t_user) 分页查询 */
	List<User> getListForPage(User user, int pageNo,int pageSize,String sort,String desc);

	/** @param 用户(t_user) 多条查询 */
	List<User> getListUser(User user);
	
	/** 
	 * 根据account取得用户或查看用户
	 * userType可选
	 * 
	 * @param user */
	User checkUser(User user);
	/** 
	 * 根据CA取得用户或查看用户
	 * userType可选
	 * 
	 * @param user */
	User checkCAUser(User user);
	
	//	 修改密码
	void updatePwd(User user);
	  
	/** 获得下一个排序号 */
	User getNextNodeorder(User user);
	
	/**
	 * 通过从业人员编号(即员工用户账号)获得所属企业编码及所属企业名称
	 * 默认一个员工用户只能属于一个行业
	 * @param user（usertype）
	 * @return user
	 */
	User getQybmByCyrybh(String sqlStmt);
	/**
	   * 通过企业编码取的企业名称
	   * @param qybm
	   * @return qymc
		*/
	String getQymcByQybm(String qybm);

}
