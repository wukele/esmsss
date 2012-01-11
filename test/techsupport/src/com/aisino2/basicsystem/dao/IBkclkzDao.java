package com.aisino2.basicsystem.dao;
import java.util.List;
import java.util.Map;

import com.aisino2.basicsystem.domain.Bkclkz;
import com.aisino2.core.dao.Page;
public interface IBkclkzDao {
	/** @param 布控车辆快照(t_bkclkz) 增加 */
	Bkclkz insertBkclkz(Bkclkz bkclkz);

	/** @param 布控车辆快照(t_bkclkz) 删除 */
	int deleteBkclkz(Bkclkz bkclkz);

	/** @param 布控车辆快照(t_bkclkz) 修改 */
	int updateBkclkz(Bkclkz bkclkz);

	/** @param 布控车辆快照(t_bkclkz) 查询单条 */
	Bkclkz getBkclkz(Bkclkz bkclkz);

	/** @param 布控车辆快照(t_bkclkz) 分页查询 */
	Page getListForPage(Map map, int pageNo,int pageSize,String sort,String desc);

	/** @param 布控车辆快照(t_bkclkz) 多条查询 */
	List getListBkclkz(Bkclkz bkclkz);
}
