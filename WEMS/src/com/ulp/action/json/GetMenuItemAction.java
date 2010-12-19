package com.ulp.action.json;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoMenuDAO;
import com.opensymphony.xwork2.ActionSupport;


@Component("GetMenuItem")
public class GetMenuItemAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1364981043390912898L;
	
	private int totalProperty=0;
	private List<InfoMenu>  infoMens;
	private InfoMenuDAO  menuDao;
	
	public int getTotalProperty() {
		return totalProperty;
	}

	public void setTotalProperty(int totalProperty) {
		this.totalProperty = totalProperty;
	}

	public List<InfoMenu> getInfoMens() {
		return infoMens;
	}

	public void setInfoMens(List<InfoMenu> infoMens) {
		this.infoMens = infoMens;
	}

	public InfoMenuDAO getMenuDao() {
		return menuDao;
	}
	
	@Resource(name="InfoMenuDAO")
	public void setMenuDao(InfoMenuDAO menuDao) {
		this.menuDao = menuDao;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public  String execute(){
			infoMens=menuDao.findAll();
			totalProperty=infoMens.size();
			return SUCCESS;
	}
}
