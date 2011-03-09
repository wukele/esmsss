package com.alarm.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.alarm.dao.AlarmDao;
import com.alarm.entity.AlarmOperate;
import com.alarm.entity.InfoEvent;




@Component("AlarmLoaderService")
public class AlarmLoaderService {
	
	private  AlarmDao  alarm_dao;
	
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
				
	
}
