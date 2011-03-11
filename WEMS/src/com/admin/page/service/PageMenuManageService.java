package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.admin.page.dao.PageMenuDao;
import com.admin.page.struct.PageResourceDataRuleStruct;
import com.admin.page.struct.PageResourceView;
import com.ems.entity.InfoPage;
import com.ems.entity.InfoPageDAO;
import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoMenuDAO;
import com.entries.ulp.RuleRoleFunc;



@Component("PageMenuManageService")
public class PageMenuManageService {
	
	private static final Log log = LogFactory.getLog(PageMenuManageService.class);
	
	
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
			String moduleCode, boolean isLeaf, StringBuffer buff) {
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
		InfoMenu    im=null;
		if(isLeaf){
					im=imDao.findById(menuCode);
					nm.setParentMenuCode(im.getParentMenuCode());
		}else{
					im=imDao.findById(menuCode);
					nm.setParentMenuCode(menuCode);
		}
		
		String tempCode=GetMenuCode(moduleCode);
		nm.setMenuCode(tempCode);
		nm.setMenuCol(0);
		nm.setMenuRow(0);
		ip.setMenuCode(tempCode);
		imDao.save(nm);
		ipDao.merge(ip);
		res=true;
		menuCode=tempCode;
		log.info("�˵����سɹ�:MenuCode=="+menuCode);
		buff.append(menuCode);
		RuleRoleFunc    rrf=new RuleRoleFunc();
		rrf.setEntityCode(menuCode);
		rrf.setEntityType("M");
		rrf.setRoleCode("AD");
		pmDao.addRuleRoleFunc(rrf);
		return res;
	}
	@Resource(name="InfoMenuDAO")
	public void setImDao(InfoMenuDAO imDao) {
		this.imDao = imDao;
	}
	
	@Resource(name="InfoPageDAO")
	public void setIpDao(InfoPageDAO ipDao) {
		this.ipDao = ipDao;
	}

	private String GetMenuCode(String moduleCode) {
		// TODO Auto-generated method stub
		
		return imDao.GetMaxMenuCode(moduleCode);
	}
	
	
	@Transactional
	public boolean RenameMenu(String menuCode, String moduleCode, String nText,String returnMessage) {
		// TODO Auto-generated method stub
		boolean   res=false;
		InfoMenu   m= imDao.findById(menuCode);
		m.setMenuTitle(nText);
		m.setComments(nText);
		try{
				imDao.merge(m);
				res=true;
		}catch (Exception e) {
			// TODO: handle exception
			log.error("������ʧ��:"+ e.getMessage());
			returnMessage=e.getMessage();
		}
		return res;
	}
	
	 @Transactional
	public boolean deletePageMenu(String menuCode, String moduleCode,
			String returnMessage) {
		// TODO Auto-generated method stub
		boolean  res=false;
		InfoMenu  m = imDao.findById(menuCode);
		if(m==null){
				returnMessage="��ϵͳ�˵�����ɾ��";
		}else{
				if(m.getMenuUrl()==null  ||  m.getMenuUrl().equalsIgnoreCase("ems_dispatcher_page_action.action")){
									imDao.delete(m);
									List<InfoPage> ps=ipDao.findByMenuCode(m.getMenuCode());
									for(int  i=0;i<ps.size();i++){
												InfoPage  p=ps.get(i);
												p.setMenuCode(null);
												ipDao.merge(p);
									}
									imDao.deletleRoleRuleFunc(menuCode);
									res=true;
				}else{
							returnMessage="ϵͳ�˵�����ɾ��";
				}
		}
		return res;
	}
	 
	@Transactional
	public boolean RemoveInfoPage(Integer pageId) {
		// TODO Auto-generated method stub
		boolean  res=false;
		InfoPage   ip=ipDao.findById(pageId);
		if(ip==null){
					log.error("ҳ���Ѿ�������");
		}else{
					ipDao.deletePageDataRule(ip.getPageResourceId());
					log.info("ҳ�����ݹ�ϵɾ���ɹ�");
					ipDao.deletePageResource(ip.getPageResourceId());
					log.info("ҳ�����ɾ���ɹ�");
					ipDao.delete(ip);
					if(ip.getMenuCode()!=null){
								imDao.deleteMenu(ip.getMenuCode());
								imDao.deletleRoleRuleFunc(ip.getMenuCode());
					}
					res=true;
					log.info("ҳ��ɾ���ɹ�");
		}
		
		return res;
	}

	@Transactional
	public boolean addDirMenu(String menuCode, String moduleCode,
			String dirName, StringBuffer buff) {
		// TODO Auto-generated method stub
		boolean  res=false;
		InfoMenu  nm=new InfoMenu();
		nm.setComments(dirName);
		nm.setMenuTitle(dirName);
		String   tempCode=GetMenuCode(moduleCode);
		nm.setDeploySysCode("1");
		nm.setIsshow(1);
		nm.setIsactive(1);
		buff.append(tempCode);
		nm.setMenuCode(tempCode);
		nm.setMenuCol(0);
		nm.setMenuRow(0);	
		nm.setParentMenuCode(menuCode);
		nm.setModuleCode(moduleCode);
		try{
				imDao.save(nm);
				//����û�Ȩ��
				RuleRoleFunc    rrf=new RuleRoleFunc();
				rrf.setEntityCode(tempCode);
				rrf.setEntityType("M");
				rrf.setRoleCode("AD");
				pmDao.addRuleRoleFunc(rrf);
				log.info("Ŀ¼��ӳɹ�:"+tempCode);
				res=true;
		}catch (Exception e) {
			// TODO: handle exception
				 log.error("Ŀ¼���ʧ�ܣ�"+ e.getMessage());
				 throw  new RuntimeException(e.getMessage());
		}
		
		return res;
	}
			
	
	
}
