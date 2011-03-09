package com.alarm.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.alarm.entity.AlarmOperate;
import com.alarm.entity.InfoEvent;
import com.ems.dao.EmsDao;


@Component("AlarmDao")
public class AlarmDao extends EmsDao {

	public List<AlarmOperate> findCurrentAlarm() {
		// TODO Auto-generated method stub
		return    getHibernateTemplate().find("from AlarmOperate  order by  alarmTime  desc");
	}

	public List<InfoEvent> findCurrentEvent() {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("from  InfoEvent  order by fireTime desc");
	}

}
