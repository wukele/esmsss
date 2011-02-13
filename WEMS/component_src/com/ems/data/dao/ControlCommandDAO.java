package com.ems.data.dao;

import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.SQLQuery;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ems.dao.EmsDao;
import com.entries.ulp.ControlCommand;

/**
 * InfoOper entity. @author MyEclipse Persistence Tools
 */
@Component("ControlCommandDAO")
public class ControlCommandDAO extends EmsDao {
	private static final Log log = LogFactory.getLog(ControlCommandDAO.class);
	private String msg;
	private int ret;


	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	public void setRet(int ret) {
		this.ret = ret;
	}

	public int getRet() {
		return ret;
	}

	@Transactional
	public void insertControlCommand(ControlCommand controlCommand) {
		// TODO Auto-generated method stub
		String sql="insert into control_command(control_log_id,device_variable_id,setup_value,setup_time,lose_efficacy_time,setup_personnel,status,status_time)  values (?,?,?,?,?,?,?,?)";
		
		SQLQuery qry=getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(sql);
		qry.setInteger(0, Integer.parseInt(controlCommand.getControlLogId()));
		qry.setInteger(1, Integer.parseInt(controlCommand.getDeviceVariableId()));
		qry.setString(2, controlCommand.getSetupValue());
		qry.setDate(3, new java.util.Date(controlCommand.getSetupTime()));
		qry.setDate(4, new java.util.Date(controlCommand.getLoseEfficacyTime()));
		qry.setString(5, controlCommand.getSetupPersonnel());
		qry.setString(6, controlCommand.getStatus());
		qry.setDate(7, new java.util.Date(controlCommand.getStatusTime()));
		qry.executeUpdate();
	}

}