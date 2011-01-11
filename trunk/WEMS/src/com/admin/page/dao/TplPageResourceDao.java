package com.admin.page.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.admin.page.struct.PageResourceStruct;
import com.ems.dao.EmsDao;
@Component("TplPageResourceDao")
public class TplPageResourceDao extends EmsDao {
			public   List<PageResourceStruct>  findPageResource(String tplPageResource){
				  String  resourceQry="select new com.admin.page.struct.PageResourceStruct(tr.resourceId,tr.pageResource,cc.componentName," +
				  		"tr.xtypeCode,tr.resourceTop,tr.resourceLeft,tr.resourceWidth,tr.resourceHeight,tr.valueId,tr.config,tr.baseCls" +
				  		") from CodeComponent as  cc,TplPageResource as tr where cc.codeXtype=tr.xtypeCode and tr.pageResource=?";
				  
				  return  getHibernateTemplate().find(resourceQry, tplPageResource);
			}
}
