package com.ems.data.dao.impl;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.component.DataEngine;
import com.data.entity.EngineParameter;
import com.data.entity.InfoEngine;
import com.ems.data.dao.IEngineResources;

public class EngineResourceManager extends HibernateDaoSupport implements
		IEngineResources {

	public List<String> GetEngineScripts(String pageId) {
		// TODO Auto-generated method stub 
		return null;
	}

	public List<DataEngine> BuildPageEngine(String pageId) {
		// TODO Auto-generated method stub
		String   queryDataEngine="select distinct eng.engineCode " +
				"from InfoPage as page,InfoPageResource as res,RuleEngineData as eng" +
				" where page.pageResourceId=res.pageResource and res.valueId=eng.valueId	and page.pageId=?";
		List<String>  engines=getHibernateTemplate().find(queryDataEngine, pageId);
		if(engines==null ||  engines.size()<0){
					return null;
		}else{
					for(int i=0;i<engines.size();i++){
									List<InfoEngine>  ie=getHibernateTemplate().find("from InfoEngine as engine " +
											"where engine.engineCode=?", engines.get(i));
									
					}
		}
		
		
		return null;
	}

}
