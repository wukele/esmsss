package com.admin.page.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.page.dao.BskpPageDao;
import com.admin.page.dao.TplInfoPageDao;
import com.admin.page.dao.TplPageResourceDao;
import com.admin.page.struct.BindReletionStruct;
import com.page.entity.BspkInfoPage;
import com.page.entity.BspkPageResource;
import com.page.entity.TplInfoPage;
import com.page.entity.TplPageResource;

@Component("BspkPageService")
public class BspkPageService {
	private static final Logger log=Logger.getLogger(BspkPageService.class);
	private BskpPageDao bskpDao;
    private  TplInfoPageDao   tplPageDao;
    private  TplPageResourceDao  tplResourceDao;
    
    @Resource(name="TplPageResourceDao")
    public void setTplResourceDao(TplPageResourceDao tplResourceDao) {
		this.tplResourceDao = tplResourceDao;
	}

	@Resource(name="TplInfoPageDao")
    public void setTplPageDao(TplInfoPageDao tplPageDao) {
		this.tplPageDao = tplPageDao;
	}

	// add by ffmmx
	private TemplatePageRemainService tprs;// 页面模板服务
	private PageResourceService prs;
	
	
	
	
	

	@Resource(name = "BskpPageDao")
	public void setBskpDao(BskpPageDao bskpDao) {
		this.bskpDao = bskpDao;
	}

	public List<BspkInfoPage> GetALLBspkInfoPage() {
		return bskpDao.findAllBskpInfoPage();
	}

	public BspkInfoPage GetBspkInfoPageById(Integer pageId) {
		return bskpDao.findBspkPageByPageId(pageId);
	}

	public List<BspkPageResource> GetbspkPageResource(String pageResource) {
		return bskpDao.findBspkPageResource(pageResource);
	}

	/**
	 * add BspkPageInfo
	 * 
	 * @param pageResource
	 * 
	 */
	@Transactional
	public void addBspkPageInfo(String pageResource, Integer resourceId) {
		log.debug("addBspkPageInfo start..");
		BspkInfoPage bspkPage = null;
		try {
			if (pageResource == null || pageResource.trim().length() == 0)
				throw new RuntimeException("pageResource is null || 资源代码为空");
			if (resourceId == null || resourceId == 0)
				throw new RuntimeException(
						"resourceId is null or 0 || 资源ID为空或者0");
			bspkPage = findBspkPageByPageResource(pageResource);
			// insert BspkPageInfo
			if (bspkPage == null) {
				TplInfoPage tplPage = tprs
						.findTemplatePageByPageResource(pageResource);
				if (tplPage != null) {
					bspkPage = new BspkInfoPage();
					bspkPage.setBspkImageHeight(tplPage.getTplImageHeight());
					bspkPage.setBspkImagePath(tplPage.getTplImagePath());
					bspkPage.setBspkImageWidth(tplPage.getTplImageWidth());
					bspkPage.setBspkOperCode(tplPage.getTplOperCode());
					bspkPage.setBspkPageName(tplPage.getTplPageName());
					bspkPage.setBspkPageResource(tplPage.getTplPageResource());
					bspkPage.setBspkPageType(tplPage.getTplPageType());

					bskpDao.insertBskpInfoPage(bspkPage);
				}
			}
			// insert BspkPageResource
			TplPageResource resource = prs.findPageResourceById(resourceId);
			if (resource != null) {
				BspkPageResource bspkResource = new BspkPageResource();

				bspkResource.setBaseCls(resource.getBaseCls());
				bspkResource.setConfig(resource.getConfig());
				bspkResource.setPageResource(resource.getPageResource());
				bspkResource.setResourceHeight(resource.getResourceHeight());
				bspkResource.setResourceLeft(resource.getResourceLeft());
				bspkResource.setResourceTop(resource.getResourceTop());
				bspkResource.setResourceWidth(resource.getResourceWidth());
				bspkResource.setValueId(resource.getValueId());
				bspkResource.setXtypeCode(resource.getXtypeCode());

				bskpDao.insertBspkPageResource(bspkResource);
				
				if (resource.getConfig() != null
						&& resource.getConfig().trim().length() > 0) {
					bskpDao.importBspkPageResourceConfig(bspkResource.getResourceId(), resourceId);
				}
				
			}
			log.debug("addBspkPageInfo finished..");
		} catch (RuntimeException e) {
			log.error("addBspkPageInfo failed..");
			log.error(e);
			throw e;
		}
	}

	/**
	 * get BspkInfoPage by pageResource
	 * 
	 * @param pageResource
	 * @return BspkInfoPage
	 */
	public BspkInfoPage findBspkPageByPageResource(String pageResource) {
		log.debug("findBspkPageByPageResource start..");
		Map<String, Object> map = new HashMap<String, Object>();
		List<BspkInfoPage> lst = null;
		try {
			if (pageResource != null)
				map.put("tplPageResource", pageResource);
			lst = bskpDao.findBspkInfoPageByPropertiesMap(map);
			log.debug("findBspkPageByPageResource finished");
		} catch (RuntimeException e) {
			log.error("findBspkPageByPageResource faild");
			log.error(e);
			throw e;
		}

		if (lst == null || lst.size() == 0)
			return null;
		else
			return lst.get(0);
	}

	public TemplatePageRemainService getTprs() {
		return tprs;
	}

	@Resource(name = "TemplatePageRemainService")
	public void setTprs(TemplatePageRemainService tprs) {
		this.tprs = tprs;
	}

	public PageResourceService getPrs() {
		return prs;
	}

	@Resource(name = "PageResourceService")
	public void setPrs(PageResourceService prs) {
		this.prs = prs;
	}
	
	
	@Transactional
	public void AddBspkInfoPage(Integer tplPageId, String bspkPageName) {
		// TODO Auto-generated method stub
					BspkInfoPage  bpage=new BspkInfoPage();
					bpage.setBspkPageName(bspkPageName);
					TplInfoPage   tpage=tplPageDao.findTplPageById(tplPageId);
					bpage.setBspkImageHeight(tpage.getTplImageHeight());
					bpage.setBspkImagePath(tpage.getTplImagePath());
					bpage.setBspkImageWidth(tpage.getTplImageWidth());
					bpage.setBspkOperCode(tpage.getTplOperCode());
					bpage.setBspkPageName(bspkPageName);
					bpage.setBspkPageResource(tpage.getTplPageResource());
					bpage.setBspkPageType(tpage.getTplPageType());
					bskpDao.addBspkInfoPage(bpage);
					List<TplPageResource>   tplRes=tplPageDao.findPageResource(tpage.getTplPageResource());
					if(tplRes==null ||  tplRes.size()<1){
									return  ;
					}else{
						             bskpDao.insertBspkRes(tpage.getTplPageResource());             
					}
	}
    
	
	 @Transactional
	public void removeBspkPage(Integer bspkPageId) {
		// TODO Auto-generated method stub
				try{
					bskpDao.delBspkPageResById(bspkPageId);
		              bskpDao.delBspkInfo(bspkPageId);
		              
				}catch(Exception  e){
					  throw  new RuntimeException(e.getMessage());
				}
				log.info("临时数据页面删除成功");
	}

	public List<BindReletionStruct> QryBindReletion(String bspkPageResource) {
		// TODO Auto-generated method stub
		return   bskpDao.findBindReletion(bspkPageResource);
	}

}
