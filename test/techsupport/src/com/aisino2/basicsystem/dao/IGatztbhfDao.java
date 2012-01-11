package com.aisino2.basicsystem.dao;
import java.util.List;
import java.util.Map;

import com.aisino2.basicsystem.domain.Gatztbhf;
import com.aisino2.core.dao.Page;
public interface IGatztbhfDao {
	/** @param 公安通知通报回复(t_gatztbhf) 增加 */
	Gatztbhf insertGatztbhf(Gatztbhf gatztbhf);

	/** @param 公安通知通报回复(t_gatztbhf) 删除 */
	int deleteGatztbhf(Gatztbhf gatztbhf);

	/** @param 公安通知通报回复(t_gatztbhf) 修改 */
	int updateGatztbhf(Gatztbhf gatztbhf);

	/** @param 公安通知通报回复(t_gatztbhf) 查询单条 */
	Gatztbhf getGatztbhf(Gatztbhf gatztbhf);

	/** @param 公安通知通报回复(t_gatztbhf) 分页查询 */
	Page getListForPage(Map map, int pageNo,int pageSize,String sort,String desc);

	/** @param 公安通知通报回复(t_gatztbhf) 多条查询 */
	List getListGatztbhf(Gatztbhf gatztbhf);
}
