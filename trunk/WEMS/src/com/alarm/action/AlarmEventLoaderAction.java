package com.alarm.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.alarm.entity.AlarmOperate;
import com.alarm.entity.InfoEvent;
import com.alarm.service.AlarmLoaderService;
import com.opensymphony.xwork2.ActionSupport;


@Component("AlarmEventLoaderAction")
@Scope("prototype")
public class AlarmEventLoaderAction extends ActionSupport {
			
			private  List<AlarmOperate>   alarms;
			
			private  List<InfoEvent>     events;
			
			private  AlarmLoaderService   alarmServ;
			
			public List<AlarmOperate> getAlarms() {
				return alarms;
			}

			public List<InfoEvent> getEvents() {
				return events;
			}
			
			@Resource(name="AlarmLoaderService")
			public void setAlarmServ(AlarmLoaderService alarmServ) {
				this.alarmServ = alarmServ;
			}

			public  String  LoadAlarmOperate(){
					alarms=alarmServ.LoadCurrentAlarm();
					return  SUCCESS;
			}
			
			public  String  LoadEventInfo(){
					events=alarmServ.LoadCurrentEvent();
					return   SUCCESS;
			}
			
}
