package com.alarm.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.stereotype.Component;

import com.alarm.service.AlarmLoaderService;
import com.entries.ulp.InfoOper;
import com.opensymphony.xwork2.ActionSupport;
import com.ulp.comm.CommUlpKey;


@Component("AlarmOperAction")
public class AlarmOperAction extends ActionSupport  implements  ServletRequestAware{
			
			private  Integer  alarm_operate_id;
			
			private  AlarmLoaderService  alarm_serv;
			
			private   boolean is_success;
			
			private   String  return_msg;
			
			private  HttpServletRequest  request;
			
			public  String  ComfirmAlarm(){
						HttpSession  session=request.getSession();
						if(session.getAttribute(CommUlpKey.KEY_INFO_OPER)!=null){
										StringBuffer   buff=new StringBuffer();
										InfoOper   oper=(InfoOper)session.getAttribute(CommUlpKey.KEY_INFO_OPER);
										is_success=alarm_serv.confirmAlarm(alarm_operate_id,oper.getOperNo(),buff);
										return_msg=buff.toString();
						}else{
										return_msg="操作员失效";
										is_success=false;
						}
						
						
						
						return  SUCCESS;
			}
			
			
			public  String  DeleteAlarmOperate(){
						HttpSession  session=request.getSession();
						if(session.getAttribute(CommUlpKey.KEY_INFO_OPER)!=null){
										StringBuffer   buff=new StringBuffer();
										InfoOper   oper=(InfoOper)session.getAttribute(CommUlpKey.KEY_INFO_OPER);
										is_success=alarm_serv.removeAlarmOperate(alarm_operate_id,oper.getOperNo(),buff);
						}else{
							return_msg="操作员失效";
							is_success=false;
						}
						return   SUCCESS;
			}
			

			public boolean isIs_success() {
				return is_success;
			}

			public String getReturn_msg() {
				return return_msg;
			}

			public void setAlarm_operate_id(Integer alarmOperateId) {
				alarm_operate_id = alarmOperateId;
			}
			@Resource(name="AlarmLoaderService")
			public void setAlarm_serv(AlarmLoaderService alarmServ) {
				alarm_serv = alarmServ;
			}

			public void setServletRequest(HttpServletRequest arg0) {
				// TODO Auto-generated method stub
						request=arg0;
			}
			
}
