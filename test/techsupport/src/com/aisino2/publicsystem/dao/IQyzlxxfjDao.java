package com.aisino2.publicsystem.dao;
import java.util.List;
import java.util.Map;

import com.aisino2.core.dao.Page;
import com.aisino2.publicsystem.domain.Qyzlxxfj;

public interface IQyzlxxfjDao {
	/** @param 企业质量信息附件(t_qyzlxxfj) 增加 */
	Qyzlxxfj insertQyzlxxfj(Qyzlxxfj qyzlxxfj);

	/** @param 企业质量信息附件(t_qyzlxxfj) 删除 */
	int deleteQyzlxxfj(Qyzlxxfj qyzlxxfj);

	/** @param 企业质量信息附件(t_qyzlxxfj) 修改 */
	int updateQyzlxxfj(Qyzlxxfj qyzlxxfj);

	/** @param 企业质量信息附件(t_qyzlxxfj) 查询单条 */
	Qyzlxxfj getQyzlxxfj(Qyzlxxfj qyzlxxfj);

	/** @param 企业质量信息附件(t_qyzlxxfj) 分页查询 */
	Page getListForPage(Map map, int pageNo,int pageSize,String sort,String desc);

	/** @param 企业质量信息附件(t_qyzlxxfj) 多条查询 */
	List getListQyzlxxfj(Qyzlxxfj qyzlxxfj);
}
