package com.alarm.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alarm.dao.AlarmDao;
import com.alarm.entity.AlarmOperate;
import com.alarm.entity.InfoEvent;




@Component("AlarmLoaderService")
public class AlarmLoaderService {
	
	private  AlarmDao  alarm_dao;
	
	private static final Log log = LogFactory.getLog(AlarmLoaderService.class);
	
	@Resource(name="AlarmDao")
	public void setAlarm_dao(AlarmDao alarmDao) {
		alarm_dao = alarmDao;
	}

	public List<AlarmOperate> LoadCurrentAlarm() {
		// TODO Auto-generated method stub
		
		return   alarm_dao.findCurrentAlarm();
	}

	public List<InfoEvent> LoadCurrentEvent() {
		// TODO Auto-generated method stub
		return  alarm_dao.findCurrentEvent();
	}
	
	@Transactional
	public boolean confirmAlarm(Integer alarmOperateId, String operNo,
			StringBuffer buff) {
		// TODO Auto-generated method stub
		boolean  res=false;
		try {
					alarm_dao.confirmAlarm(alarmOperateId, operNo);
					res=true;
		} catch (Exception e) {
			// TODO: handle exception
					buff.append(e.getMessage());
					log.error("确认异常："+ e.getMessage());
		}
		return res;
	}
	
	@Transactional
	public boolean removeAlarmOperate(Integer alarmOperateId, String operNo,
			StringBuffer buff) {
		// TODO Auto-generated method stub
		boolean   res=false;
		try {
			   	  alarm_dao.deleteAlarmOperate(alarmOperateId);
			   	  res=true;
		} catch (Exception e) {
			// TODO: handle exception
					buff.append(e.getMessage());
					log.error("删除异常"+e.getMessage());
		}
		return true;
	}
				
	
}
