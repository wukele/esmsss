package com.ems.data.dao;

import java.util.List;

import com.component.DataEngine;

public interface  IEngineResources {
		   List<String> GetEngineScripts(String pageId);
		   List<DataEngine> BuildPageEngine(Integer pageId);
}
