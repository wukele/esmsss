package com.aisino2.icksystem.service;

import java.util.List;
import java.util.Map;

import com.aisino2.core.dao.Page;
import com.aisino2.icksystem.domain.Zktjrb;

public interface IZktjrbService {
	/** @param 制卡统计日报(t_zktjrb) 增加 */
	Zktjrb insertZktjrb(Zktjrb zktjrb);

	/** @param 制卡统计日报(t_zktjrb) 删除 */
	boolean deleteZktjrb(Zktjrb zktjrb);

	/** @param 制卡统计日报(t_zktjrb) 修改 */
	boolean updateZktjrb(Zktjrb zktjrb);

	/** @param 制卡统计日报(t_zktjrb) 查询单条 */
	Zktjrb getZktjrb(Zktjrb zktjrb);

	/** @param 制卡统计日报(t_zktjrb) 分页查询 */
	Page getListForPage(Map map, int pageNo,int pageSize,String sort,String desc);

	/** @param 制卡统计日报(t_zktjrb) 多条查询 */
	List getListZktjrb(Zktjrb zktjrb);
}
