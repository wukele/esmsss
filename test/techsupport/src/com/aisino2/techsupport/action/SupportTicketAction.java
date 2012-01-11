package com.aisino2.techsupport.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.sound.midi.Track;

import org.drools.lang.dsl.DSLMapParser.mapping_file_return;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.common.ItemChange;
import com.aisino2.common.PageUtil;
import com.aisino2.core.dao.Page;
import com.aisino2.core.web.PageAction;
import com.aisino2.sysadmin.domain.Department;
import com.aisino2.sysadmin.domain.User;
import com.aisino2.techsupport.common.Constants;
import com.aisino2.techsupport.domain.SupportTicket;
import com.aisino2.techsupport.domain.Tracking;
import com.aisino2.techsupport.domain.Worksheet;
import com.aisino2.techsupport.service.SupportTicketService;
import com.aisino2.techsupport.service.TrackingService;

@Component
@Scope("prototype")
public class SupportTicketAction extends PageAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3098731859151256393L;

	private SupportTicketService stService;
	private TrackingService trackingService;

	private SupportTicket supportTicket;
	private Department limitDeparement;
	private List<SupportTicket> lSupportTicket = new ArrayList<SupportTicket>();
	private Tracking tracking;
	private String tabledata;
	private String result;
	private int totalrows = 0;

	/**
	 * 支持单查询
	 * 
	 * @return
	 * @throws Exception
	 */
	public String querylist() throws Exception {
		SupportTicket setsupportTicket = new SupportTicket();
		supportTicket = (SupportTicket) this.setClass(setsupportTicket, null);
		Tracking settrack = new Tracking();
		tracking = (Tracking) this.setClass(settrack, null);
		Department setdept = new Department();
		limitDeparement = (Department)this.setClass(setdept, null);
		
		Map<String, Object> params = new HashMap<String, Object>();
		if(supportTicket.getApplicantId()!=null && supportTicket.getApplicantId() > 0){
			User user = new User();
			user.setUserid(supportTicket.getApplicantId());
			supportTicket.setApplicant(user);
			
		}
		if(supportTicket.getSupportLeaderId()!=null && supportTicket.getSupportLeaderId() > 0){
			User user = new User();
			user.setUserid(supportTicket.getSupportLeaderId());
			supportTicket.getLstSupportLeaders().add(user);
		}

		params.put("applicant", supportTicket.getApplicant());
		params.put("lstSupportLeaders", supportTicket.getLstSupportLeaders());
		params.put("stStatus", supportTicket.getStStatus());
		params.put("region", supportTicket.getRegion());
		params.put("id", supportTicket.getId());
		params.put("type", tracking.getType());
		params.put("trackDateFrom", tracking.getTrackingDateFrom());
		params.put("trackDateTo", tracking.getTrackingDateTo());
		params.put("limitDeparement", limitDeparement.getDepartid());
		
		Page page = stService.getListSupportTicketForPage(params,
				this.pagesize, this.pagerow, this.sort, this.dir);
		totalpage = page.getTotalPages();
		totalrows = page.getTotalRows();

		if (supportTicket.getTag().equals("dxts"))
			setTabledataDxts(page.getData());
		else
			setTabledata(page.getData());
		this.result = "success";
		return SUCCESS;
	}

	/**
	 * 支持单详情
	 * 
	 * @return
	 * @throws Exception
	 */
	public String query() throws Exception {
		try {
			if (supportTicket == null) {
				SupportTicket setSupportTicket = new SupportTicket();
				supportTicket = (SupportTicket) this.setClass(setSupportTicket,
						null);
			}

		} catch (Exception e) {

		}

		supportTicket = stService.getSupportTicket(supportTicket);
		if (supportTicket != null) {
			lSupportTicket.clear();
			lSupportTicket.add(supportTicket);
			Tracking tracking = new Tracking();
			tracking.setStId(supportTicket.getId());
			List<Tracking> lstTracking = trackingService
					.getTrackingListForPage(1, 999, tracking, "99", "desc")
					.getData();
			supportTicket.setTrackList(lstTracking);
		}
		this.result = "success";
		return SUCCESS;
	}

	/**
	 * 综合查询TABLEDATA设置
	 * 
	 * @param ldata
	 * @throws Exception
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void setTabledata(List ldata) throws Exception {
		List lPro = new ArrayList();
		lPro.add("id");
		lPro.add("stNo");
		lPro.add("regionName");
		lPro.add("applicantName");
		lPro.add("supportLeaderName");
		lPro.add("supportDeptName");
		lPro.add("stStatusName");

		List lCol = new ArrayList();
		List lDetail = new ArrayList();
		lDetail.add("setDetail");
		lDetail.add("详情");
		lCol.add(lDetail);

		for (SupportTicket st : (List<SupportTicket>) ldata) {
			st.setStStatusName(ItemChange.codeChange(
					Constants.ST_STATUS_DICT_CODE, st.getStStatus()));
//			@fixed 技术负责人变成多个指派
			String supportLeaderNames = "";
			for (User sl : st.getLstSupportLeaders())
				supportLeaderNames += "," + sl.getUsername();
			supportLeaderNames = supportLeaderNames.length() > 0 ? supportLeaderNames
					.substring(1) : supportLeaderNames;
			st.setSupportLeaderName(supportLeaderNames);
			
			String deptNames = "";
			for (Department dept : st.getSupportDeptList())
				deptNames += "," + dept.getDepartname();
			deptNames = deptNames.length() > 0 ? deptNames.substring(1) : deptNames;
			st.setSupportDeptName(deptNames);
			st.setRegionName(ItemChange.codeChange(
					Constants.ST_REGION_DICT_CODE, st.getRegion()));
//			set applicantName value
			String applicantNames = "";
			applicantNames=st.getApplicant()!=null ? st.getApplicant().getUsername() : applicantNames;
			st.setApplicantName(applicantNames);
		}
		SupportTicket supportTicket = new SupportTicket();
		this.setData(supportTicket, ldata, lPro, lCol);
		this.tabledata = this.getData();
		totalrows = this.getTotalrows();
	}

	/**
	 * 短信提示TABLEDATA设置
	 * 
	 * @param ldata
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void setTabledataDxts(List ldata) throws Exception {
		List lPro = new ArrayList();
		lPro.add("id");
		lPro.add("checkbox");
		lPro.add("stNo");
		lPro.add("regionName");
		lPro.add("applicantName");
		lPro.add("supportLeaderName");
		lPro.add("supportDeptName");
		lPro.add("supportContent");
		lPro.add("trackingProcess");

		// List lCol = new ArrayList();

		for (int i = 0; i < ldata.size(); i++) {
			SupportTicket st = (SupportTicket) ldata.get(i);
			Tracking t = new Tracking();
			t.setStId(st.getId());
			st.setTrackList(trackingService.getTrackingList(t));
			st.setTrackingProcess(st.getTrackList()
					.get(st.getTrackList().size() - 1).getNewProcess());
			st.setCheckbox("<input type=\"checkbox\" name=\"lSt[" + i
					+ "].id\" value=\"" + st.getId() + "\">");
			
//			@fixed 技术负责人变成多个指派
			String supportLeaderNames = "";
			for (User sl : st.getLstSupportLeaders())
				supportLeaderNames = "," + sl.getUsername();
			supportLeaderNames = supportLeaderNames.length() > 0 ? supportLeaderNames
					.substring(1) : supportLeaderNames;
			st.setSupportLeaderName(supportLeaderNames);
			
			String deptNames = "";
			for (Department dept : st.getSupportDeptList())
				deptNames += "," + dept.getDepartname();
			deptNames = deptNames.substring(1);
			st.setSupportDeptName(deptNames);
			st.setRegionName(ItemChange.codeChange(
					Constants.ST_REGION_DICT_CODE, st.getRegion()));
		}
		SupportTicket supportTicket = new SupportTicket();
		this.setData(supportTicket, ldata, lPro, null);
		this.tabledata = this.getData();
		totalrows = this.getTotalrows();
	}

	@Resource(name = "SupportTicketServiceImpl")
	public void setStService(SupportTicketService stService) {
		this.stService = stService;
	}

	public SupportTicket getSupportTicket() {
		return supportTicket;
	}

	public void setSupportTicket(SupportTicket supportTicket) {
		this.supportTicket = supportTicket;
	}

	public List<SupportTicket> getlSupportTicket() {
		return lSupportTicket;
	}

	public void setlSupportTicket(List<SupportTicket> lSupportTicket) {
		this.lSupportTicket = lSupportTicket;
	}

	public String getTabledata() {
		return tabledata;
	}

	public void setTabledata(String tabledata) {
		this.tabledata = tabledata;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public int getTotalrows() {
		return totalrows;
	}

	public void setTotalrows(int totalrows) {
		this.totalrows = totalrows;
	}

	@Resource(name = "TrackingServiceImpl")
	public void setTrackingService(TrackingService trackingService) {
		this.trackingService = trackingService;
	}

	public Tracking getTracking() {
		return tracking;
	}

	public void setTracking(Tracking tracking) {
		this.tracking = tracking;
	}

	public Department getLimitDeparement() {
		return limitDeparement;
	}

	public void setLimitDeparement(Department limitDeparement) {
		this.limitDeparement = limitDeparement;
	}

}
