package com.aisino2.techsupport.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.aisino2.core.dao.Page;
import com.aisino2.techsupport.dao.IAttachmentDao;
import com.aisino2.techsupport.domain.Attachment;
import com.aisino2.techsupport.service.IAttachmentService;

/**
 * 附件服务 
 *
 */
@Component
public class AttachmentServiceImpl implements IAttachmentService {

	private IAttachmentDao attachment_dao;
	
	public void insertAttachment(Attachment attachment) {
		attachment_dao.insert(attachment);
	}

	public void updateAttachment(Attachment attachment) {
		attachment_dao.update(attachment);
	}

	public void removeAttachment(Attachment attachment) {
		attachment_dao.delete(attachment);
	}

	public List<Attachment> queryAttachment(Attachment attachment) {
		if(attachment==null)
			attachment=new Attachment();
		return attachment_dao.query(attachment);
	}

	public Page queryAttachmentForPage(Map<String, Object> map, int pageno,
			int pagesize, String sort, String desc) {
		return attachment_dao.queryForPage(map, pageno, pagesize, sort, desc);
	}

	public Attachment getAttachment(Attachment attachment) {
		if(attachment == null || attachment.getAttachmentId() == null )
			throw new RuntimeException("附件的ID为空");
		
		return attachment_dao.get(attachment);
	}

	@Resource(name="attachmentDaoImpl")
	public void setAttachment_dao(IAttachmentDao attachment_dao) {
		this.attachment_dao = attachment_dao;
	}

	public List<Attachment> queryTempAttachment(Attachment attachment) {
		// TODO Auto-generated method stub
		return null;
	}

	public void removeTempAttachment(Attachment attachment) {
		// TODO Auto-generated method stub
		
	}

	public void insertTempAttachment(Attachment attachment) {
		// TODO Auto-generated method stub
		
	}

}
