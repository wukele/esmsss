package com.ems.data.dao.impl;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;

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
					List<DataEngine>  ens=new ArrayList<DataEngine>();
					for(int i=0;i<engines.size();i++){
									List<InfoEngine>  ie=getHibernateTemplate().find("from InfoEngine as engine " +
											"where engine.engineCode=?", engines.get(i));
									DataEngine  de=new DataEngine();
									InfoEngine e=ie.get(i);
									de.setUrl(e.getActionName());
									de.setInterval(e.getMaxInterval().intValue()*1000);
									de.setId(e.getEngineCode());
									List<String>  paras=getHibernateTemplate().find("select  valueId  from RuleEngineData where " +
											"engineCode=?",e.getEngineCode());
									String values="{values:'";
									/*for(int p=0;p<paras.size();p++){
													values+=paras.get(p)+",";
									}*/
									values+=e.getEngineCode()+"'}";
								
									de.setBaseParams(values);
									ens.add(de);
					}
					return ens;
		}
	}

}
