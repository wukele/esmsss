package com.admin.page.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.ems.entity.CodeComponent;
import com.ems.entity.CodeComponentDAO;


@Component("ComponentsService")
public class ComponentsService {
			private  CodeComponentDAO  compDao;
			@Resource(name="CodeComponentDAO")
			public void setCompDao(CodeComponentDAO compDao) {
				this.compDao = compDao;
			}
			
			public List<CodeComponent>  GetAllComponent(){
					return  compDao.findAll();
			}
}
