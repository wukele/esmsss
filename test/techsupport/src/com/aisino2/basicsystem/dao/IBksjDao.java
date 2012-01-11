package com.aisino2.basicsystem.dao;
import java.util.List;
import java.util.Map;

import com.aisino2.basicsystem.domain.Bksj;
import com.aisino2.core.dao.Page;
public interface IBksjDao {
	/** @param 布控手机(t_bksj) 增加 */
	Bksj insertBksj(Bksj bksj);

	/** @param 布控手机(t_bksj) 删除 */
	int deleteBksj(Bksj bksj);

	/** @param 布控手机(t_bksj) 修改 */
	int updateBksj(Bksj bksj);

	/** @param 布控手机(t_bksj) 查询单条 */
	Bksj getBksj(Bksj bksj);

	/** @param 布控手机(t_bksj) 分页查询 */
	Page getListForPage(Map map, int pageNo,int pageSize,String sort,String desc);

	/** @param 布控手机(t_bksj) 多条查询 */
	List getListBksj(Bksj bksj);
}
