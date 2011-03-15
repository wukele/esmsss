<%@ page  pageEncoding="utf-8"%>
<%@page import="java.util.List"%>
<%@page import="com.component.CommEmsKey"%>
<%@page import="com.ems.entity.InfoPage"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%
String path =request.getContextPath();
%>
<!-- javascript ref area -->
<%
	Object script=session.getAttribute(CommEmsKey.KEY_EMS_PAGE_SCRIPTS);
	InfoPage pageIf=(InfoPage)session.getAttribute(CommEmsKey.KEY_EMS_INFO_PAGE);
	String items=(String)session.getAttribute(CommEmsKey.KEY_EMS_PAGE_COMPONENT);
	if(script!=null){
			List<String>  scripts=(List<String>)script;
			for(int idx=0;idx<scripts.size();idx++){
						String sp=path+scripts.get(idx);
%>
<script type="text/javascript" src="<%=sp %>"></script>
<% 
			}
	}
	
	Object  de=session.getAttribute(CommEmsKey.KEY_EMS_PAGE_ENGINES);
	
	
%>
<!--end javascript area -->

<script type="text/javascript">
   var EmsDispatcherPage=function(){

		//Ext.Msg.alert('info','pageRead');
		var BasePanel= new Ext.Panel({
			border:false,
			layout:'absolute',
			width:<%=pageIf.getPageImageWidth() %>,
			height:<%=pageIf.getPageImageHeight() %>,
			bodyStyle:'background-image: url("<%= path+"/"+pageIf.getPageImageUrl()%>");background-repeat: no-repeat'
		}); 
		var data=<%=items%>
		BasePanel.add(data);
		
		BasePanel.render(Ext.get('page_container'));
		/* DataEngines */
		<%  
				Object  engine=session.getAttribute(CommEmsKey.KEY_EMS_PAGE_ENGINES);
				if(engine!=null){%>
					var configEngines=<%= (String)engine %>;
		
					if(configEngines){
						if(configEngines.length){
									for(var ei=0;ei<configEngines.length;ei++){
											configEngines[ei].baseParams=Ext.util.JSON.decode(configEngines[ei].baseParams);
											Ext.Direct.addProvider(configEngines[ei]);
											Ext_Direct_providers[ei]=configEngines[ei].id;
									}
						}
					}

				
				
				
		<%
				}
		%>
	
		
		
		
		
		
		
	}
</script>
<script type="text/javascript" src="<%=path %>/pages/ems/comm/EmsDispatcherPage.js"></script>
<div id='page_container'></div>



