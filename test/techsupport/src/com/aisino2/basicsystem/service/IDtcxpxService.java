package com.aisino2.basicsystem.service;

import java.util.List;
import java.util.Map;

import com.aisino2.basicsystem.domain.Dtcxpx;
import com.aisino2.core.dao.Page;

public interface IDtcxpxService {
	/** @param 动态查询排序(t_dtcxpx) 增加 */
	Dtcxpx insertDtcxpx(Dtcxpx dtcxpx);

	/** @param 动态查询排序(t_dtcxpx) 删除 */
	boolean deleteDtcxpx(Dtcxpx dtcxpx);

	/** @param 动态查询排序(t_dtcxpx) 修改 */
	boolean updateDtcxpx(Dtcxpx dtcxpx);

	/** @param 动态查询排序(t_dtcxpx) 查询单条 */
	Dtcxpx getDtcxpx(Dtcxpx dtcxpx);

	/** @param 动态查询排序(t_dtcxpx) 分页查询 */
	Page getListForPage(Map map, int pageNo,int pageSize,String sort,String desc);

	/** @param 动态查询排序(t_dtcxpx) 多条查询 */
	List getListDtcxpx(Dtcxpx dtcxpx);
}
