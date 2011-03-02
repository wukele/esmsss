package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.page.dao.PageMenuDao;
import com.admin.page.struct.PageResourceDataRuleStruct;
import com.admin.page.struct.PageResourceView;
import com.ems.entity.InfoPage;
import com.ems.entity.InfoPageDAO;
import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoMenuDAO;



@Component("PageMenuManageService")
public class PageMenuManageService {
	
	@Resource(name="PageMenuDao")
	public void setPmDao(PageMenuDao pmDao) {
		this.pmDao = pmDao;
	}

	private  PageMenuDao    pmDao;
	private  InfoMenuDAO   imDao;
	private  InfoPageDAO  ipDao;

	public List<PageResourceView> QryCurrentRes(Integer pageId) {
		// TODO Auto-generated method stub
		return pmDao.findCurrenPageRes(pageId);
	}

	public List<PageResourceDataRuleStruct> qryCrtPageData(Integer pageId) {
		// TODO Auto-generated method stub
		return pmDao.findCurrentPageData(pageId);
	}
	
	@Transactional
	public boolean buildNewRulePage(Integer pageId, String menuCode,
			String moduleCode, boolean isLeaf) {
		// TODO Auto-generated method stub
		boolean  res=false;
		InfoMenu  nm=new InfoMenu();
		InfoPage  ip=ipDao.findById(pageId);
		
		nm.setComments(ip.getPageName());
		nm.setDeploySysCode("1");
		nm.setIsshow(1);
		nm.setIsactive(1);
		nm.setMenuUrl("ems_dispatcher_page_action.action");
		nm.setMenuTitle(ip.getPageName());
		nm.setModuleCode(moduleCode);
		InfoMenu    im=imDao.findById(menuCode);
		if(isLeaf){
					
					nm.setParentMenuCode(im.getParentMenuCode());
		}else{
				     nm.setParentMenuCode(im.getMenuCode());
		}
		
		String tempCode=GetMenuCode(moduleCode);
		nm.setMenuCode(tempCode);
		
		ip.setMenuCode(tempCode);
		imDao.save(nm);
		ipDao.merge(ip);
		res=true;
		
		
		return res;
	}

	private String GetMenuCode(String moduleCode) {
		// TODO Auto-generated method stub
		
		return imDao.GetMaxMenuCode(moduleCode);
	}
			
	
	
}
