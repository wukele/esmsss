package com.aisino2.basicsystem.service;

import java.util.List;
import java.util.Map;

import com.aisino2.basicsystem.domain.Bkwpkbxx;
import com.aisino2.core.dao.Page;

public interface IBkwpkbxxService {
	/** @param 布控物品基本信息(t_bkwpkbxx) 增加 */
	Bkwpkbxx insertBkwpkbxx(Bkwpkbxx bkwpkbxx);

	/** @param 布控物品基本信息(t_bkwpkbxx) 删除 */
	boolean deleteBkwpkbxx(Bkwpkbxx bkwpkbxx);

	/** @param 布控物品基本信息(t_bkwpkbxx) 修改 */
	boolean updateBkwpkbxx(Bkwpkbxx bkwpkbxx);

	/** @param 布控物品基本信息(t_bkwpkbxx) 查询单条 */
	Bkwpkbxx getBkwpkbxx(Bkwpkbxx bkwpkbxx);

	/** @param 布控物品基本信息(t_bkwpkbxx) 分页查询 */
	Page getListForPage(Map map, int pageNo,int pageSize,String sort,String desc);

	/** @param 布控物品基本信息(t_bkwpkbxx) 多条查询 */
	List getListBkwpkbxx(Bkwpkbxx bkwpkbxx);
	
	/** @param 布控物品基本信息(t_bkwpkbxx) 修改(只修改单条数据) */
	boolean updateBkwpkbxxOne(Bkwpkbxx bkwpkbxx);
}
