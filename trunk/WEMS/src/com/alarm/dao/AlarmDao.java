package com.alarm.dao;

import java.util.Date;
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

	public void confirmAlarm(Integer alarmOperateId, String operNo) {
		// TODO Auto-generated method stub
				AlarmOperate  ao=(AlarmOperate)getHibernateTemplate().find("from AlarmOperate  where  alarmOperateId=?",alarmOperateId).get(0);
				ao.setAlarmAffirmPersonnel(operNo);
				ao.setAlarmAffirmTime(new Date());
				getHibernateTemplate().saveOrUpdate(ao);
	}

	public void deleteAlarmOperate(Integer alarmOperateId) {
		// TODO Auto-generated method stub
				getHibernateTemplate().bulkUpdate("delete  AlarmOperate  where  alarmOperateId=?",alarmOperateId);
	}

}
