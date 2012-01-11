package com.aisino2.publicsystem.service;

import java.util.List;
import java.util.Map;

import com.aisino2.core.dao.Page;
import com.aisino2.publicsystem.domain.Clxxry_zp;

public interface IClxxry_zpService {
	/** @param 车辆信息人员_照片(t_clxxry_zp) 增加 */
	Clxxry_zp insertClxxry_zp(Clxxry_zp clxxry_zp);

	/** @param 车辆信息人员_照片(t_clxxry_zp) 删除 */
	boolean deleteClxxry_zp(Clxxry_zp clxxry_zp);

	/** @param 车辆信息人员_照片(t_clxxry_zp) 修改 */
	boolean updateClxxry_zp(Clxxry_zp clxxry_zp);

	/** @param 车辆信息人员_照片(t_clxxry_zp) 查询单条 */
	Clxxry_zp getClxxry_zp(Clxxry_zp clxxry_zp);

	/** @param 车辆信息人员_照片(t_clxxry_zp) 分页查询 */
	Page getListForPage(Map map, int pageNo,int pageSize,String sort,String desc);

	/** @param 车辆信息人员_照片(t_clxxry_zp) 多条查询 */
	List getListClxxry_zp(Clxxry_zp clxxry_zp);
}
