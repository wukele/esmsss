package com.aisino2.basicsystem.service;

import java.util.List;
import java.util.Map;

import com.aisino2.basicsystem.domain.Yjgz;
import com.aisino2.core.dao.Page;

public interface IYjgzService {
	/** @param 预警规则(t_yjgz) 增加 */
	Yjgz insertYjgz(Yjgz yjgz);

	/** @param 预警规则(t_yjgz) 删除 */
	boolean deleteYjgz(Yjgz yjgz);

	/** @param 预警规则(t_yjgz) 修改 */
	boolean updateYjgz(Yjgz yjgz);

	/** @param 预警规则(t_yjgz) 查询单条 */
	Yjgz getYjgz(Yjgz yjgz);

	/** @param 预警规则(t_yjgz) 分页查询 */
	Page getListForPage(Map map, int pageNo,int pageSize,String sort,String desc);

	/** @param 预警规则(t_yjgz) 多条查询 */
	List getListYjgz(Yjgz yjgz);
}
