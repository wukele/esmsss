package com.ems.data.dao;

import java.util.List;

import com.component.BaseComponent;
import com.ems.entity.InfoPage;

public interface IPageResourcesManager {
			List<String> GetPageScripts(String menuCode);
			InfoPage   GetCurrentPage(String menuCode);
			List<BaseComponent> GetPageComponent(String  pageResource);
}
