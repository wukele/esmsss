package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.admin.page.dao.PageMenuDao;
import com.admin.page.struct.PageResourceDataRuleStruct;
import com.admin.page.struct.PageResourceView;
import com.ems.entity.InfoPage;


@Component("PageMenuManageService")
public class PageMenuManageService {
	
	@Resource(name="PageMenuDao")
	public void setPmDao(PageMenuDao pmDao) {
		this.pmDao = pmDao;
	}

	private  PageMenuDao    pmDao;

	public List<PageResourceView> QryCurrentRes(Integer pageId) {
		// TODO Auto-generated method stub
		return pmDao.findCurrenPageRes(pageId);
	}

	public List<PageResourceDataRuleStruct> qryCrtPageData(Integer pageId) {
		// TODO Auto-generated method stub
		return pmDao.findCurrentPageData(pageId);
	}

	public boolean buildNewRulePage(Integer pageId, String menuCode,
			String moduleCode, boolean isLeaf) {
		// TODO Auto-generated method stub
		
		
		return false;
	}
			
}
