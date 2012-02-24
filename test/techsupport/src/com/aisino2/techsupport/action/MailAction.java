package com.aisino2.techsupport.action;

import java.io.InputStream;
import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.aisino2.core.web.BaseAction;
import com.aisino2.sysadmin.domain.Dict_item;
import com.aisino2.sysadmin.domain.User;
import com.aisino2.sysadmin.service.IDict_itemService;
import com.aisino2.techsupport.domain.Mail;
import com.aisino2.techsupport.domain.Recipient;
import com.aisino2.techsupport.domain.SupportTicket;
import com.aisino2.techsupport.service.MailService;
import com.aisino2.techsupport.service.SupportTicketService;

@Component
@Scope("prototype")
public class MailAction extends BaseAction {

	private List<SupportTicket> lSt;
	private String result;
	private SupportTicketService stService;
	private MailService mailService;
	private IDict_itemService dict_itemService;
	private String EmailAddress;
	private Mail mail;
	private List<Mail> lMailList=new ArrayList<Mail>();
	private List<Recipient> lRecipient=new ArrayList<Recipient>();
	public String sendMail(){
		return "success";
	}
	
	//更具名字查找邮件地址--设置发件人地址
	public String findEmailAdreesByName(){
		if(mail==null){
			this.result="没有选择技术支持单,不能发送邮件";
			throw new RuntimeException("没有选择技术支持单,不能发送邮件");
		}
		Dict_item dict_item=new Dict_item();
		dict_item.setDict_code("dm_userAndEmail_tech");
		List<Dict_item> lstDictItem = dict_itemService.getListDict_item(dict_item);
		for(Dict_item di: lstDictItem){
			//发件人地址
			if(mail.getUser()!=null&&!"".equals(mail.getUser()))
				if(di.getDisplay_name().equals(mail.getUser()))
					mail.setEmail(di.getFact_value());
		}
		this.result="success";
		return "success";
	}
	
	//根据名字获取邮件地址
	public String getAdressByName(String name){
		String address="";
		Dict_item dict_item=new Dict_item();
		dict_item.setDict_code("dm_userAndEmail_tech");
		List<Dict_item> lstDictItem = dict_itemService.getListDict_item(dict_item);
		for(Dict_item di: lstDictItem){
			if(name!=null&&!"".equals(name))
				if(di.getDisplay_name().equals(name))
					address=di.getFact_value();
		}
		return address;
	}
	
	public String send(){
		String email="";
		String content="";
		String subject="";
		InputStream in=this.getClass().getClassLoader().getResourceAsStream("mailContent.properties");
		Properties properties=new Properties();
		List<Recipient> recipients=new ArrayList<Recipient>();
		if (lSt == null || lSt.size() == 0){
			this.result="没有选择技术支持单,不能发送邮件";
			throw new RuntimeException("没有技术支持单被选中");
		}
		for(int i=0;i<lSt.size();i++){
			SupportTicket st=lSt.get(i);
			lSt.remove(i);
			st=stService.getSupportTicket(st);
			lSt.add(i,st);
		}
		if(mail==null){
			this.result="没有发件人不能发送邮件";
			throw new RuntimeException("没有发件人不能发送邮件");
		}
		email=getAdressByName(mail.getUser());
		try{
			//读取邮件配置信息
			Properties mailConfig=new Properties();
			InputStream config = this.getClass().getClassLoader().getResourceAsStream("mailConfig.properties");
			mailConfig.load(config);
			mail.setEmail(new String(properties.getProperty("company_Address").getBytes("ISO8859-1"),"UTF-8"));
			mail.setPassword(new String(properties.getProperty("compnay_password").getBytes("ISO8859-1"),"UTF-8"));
			mail.setProtocol(mailConfig.getProperty("protocol"));
			mail.setSmtphost(mailConfig.getProperty("smtphost"));
			mail.setHost(mailConfig.getProperty("host"));
			mailService.connect(mail, true, true, false);
			for(SupportTicket st: lSt){
				for(User user:st.getLstSupportLeaders()){
					Recipient recipient=new Recipient();
					recipient.setLastEditTime(st.getLastUpdateDate());
					recipient.setrAddress(getAdressByName(user.getUsername()));
					recipient.setrName(user.getUsername());
					recipient.setSt_NO(st.getStNo());
					recipients.add(recipient);
				}
			}
			mail.setRecipients(recipients);
			properties.load(in);
			//判断状态选择相应的邮件主题和内容
			//进行中
			if(mail.getStatus()!=null&&mail.getStatus().equals("going")){
				content=new String(properties.getProperty("Going_Content").getBytes("ISO8859-1"),"UTF-8");
				subject=new String(properties.getProperty("Going_Subject").getBytes("ISO8859-1"),"UTF-8");
			}
			//待反馈
			if(mail.getStatus()!=null&&mail.getStatus().equals("wait_feedback")){
				content=new String(properties.getProperty("Feedback_Content").getBytes("ISO8859-1"),"UTF-8");
				subject=new String(properties.getProperty("Feedback_Subject").getBytes("ISO8859-1"),"UTF-8");
			}
			//待审批
			if(mail.getStatus()!=null&&(mail.getStatus().equals("wait_company_appraval")||mail.getStatus().equals("wait_department_appraval"))){
				content=new String(properties.getProperty("Approval_Content").getBytes("ISO8859-1"),"UTF-8");
				subject=new String(properties.getProperty("Approval_Subject").getBytes("ISO8859-1"),"UTF-8");
			}
			for(Recipient recipient:mail.getRecipients()){
				if(recipient.getLastEditTime()!=null&&!"".equals(recipient.getLastEditTime())&&!content.equals("")&&!subject.equals("")){
					DateFormat format = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
					Date editTime=format.parse(format.format(recipient.getLastEditTime()));
					Date now=format.parse(format.format(new Date()));
					long diff=now.getTime()-editTime.getTime();
					long days=diff/(1000 * 60 * 60 * 24);
					Object template[]={recipient.getrName(),recipient.getSt_NO(),format.format(recipient.getLastEditTime()),days};
					content=MessageFormat.format(content, template);
					mailService.send(mail, subject, recipient.getrAddress(), null, content, false);
				}
			}
			this.result="发送邮件成功";
		}catch(Exception e){ 
			this.result=e.getMessage();
			e.printStackTrace();
		}finally{
			mailService.close();
		}
		return "success";
	}
	
	public String sendAndExport(){
		
		return "success";
	}
	
	

	public List<SupportTicket> getlSt() {
		return lSt;
	}

	public void setlSt(List<SupportTicket> lSt) {
		this.lSt = lSt;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	@Resource(name = "SupportTicketServiceImpl")
	public void setStService(SupportTicketService stService) {
		this.stService = stService;
	}

	public String getEmailAddress() {
		return EmailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		EmailAddress = emailAddress;
	}

	public Mail getMail() {
		return mail;
	}

	public void setMail(Mail mail) {
		this.mail = mail;
	}

	
	

	public List<Mail> getlMailList() {
		return lMailList;
	}

	public void setlMailList(List<Mail> lMailList) {
		this.lMailList = lMailList;
	}
	

	public List<Recipient> getlRecipient() {
		return lRecipient;
	}

	public void setlRecipient(List<Recipient> lRecipient) {
		this.lRecipient = lRecipient;
	}

	@Resource(name = "dict_itemService")
	public void setDict_itemService(IDict_itemService dict_itemService) {
		this.dict_itemService = dict_itemService;
	}
	@Resource(name="mailServiceImpl")
	public void setMailService(MailService mailService) {
		this.mailService = mailService;
	}
	
	
	
}
