package com.ui;

import java.io.IOException;
import java.util.List;



import com.entries.ulp.InfoSysModule;

public class UIContainer {
		private List<InfoSysModule>  Modules;
		private TreeMenuItems[]  trees;
		
		public  void initContainer(List<InfoSysModule> m,TreeMenuItems[] tr){
				Modules=m;
				trees=tr;
		}
	
		public  String  CreateAccordion(StringBuffer buff) throws IOException{
					String AccordionItems="";
					buff.append("var cp=Ext.getCmp('content-panel'); \n");
					for(int  i=0;i<Modules.size();i++){
									InfoSysModule  module=Modules.get(i);
									buff.append("\t		var  root_"+module.getModuleCode()+"=new  Ext.tree.TreeNode();\n");
									for(int j=0;j<trees.length;j++){
													if(trees[j].moduleCode.equalsIgnoreCase(module.getModuleCode())){
																	trees[j].writeTreeMenuItems(buff);
																	buff.append("\t\t 	root_"+module.getModuleCode()+".appendChild(treeNode_"+
																			trees[j].menuCode+");\n");
													}
									}
									buff.append("var  tree_"+module.getModuleCode()+"=new Ext.tree.TreePanel({\n");
									buff.append("\t			animate: true,\n");
									buff.append("\t			containerScroll: true,\n");
									buff.append("\t			border: false,\n");
									buff.append("\t			title:'"+module.getModuleName()+"', \n");
									buff.append("\t			root:root_"+module.getModuleCode()+", \n");
									buff.append("\t			rootVisible: false,\n");
									buff.append("\t			listeners: {\n click: function(node,e){\n");
									buff.append("\t           	clearAllTask();\n");
									buff.append("\t				cp.load({\n" +
														  "\t						url:node.attributes.url,\n" +
														  "\t						scripts:true});     \n}\n}\n}\n);\n");
									if(i==Modules.size()-1){
										AccordionItems+="tree_"+module.getModuleCode();
									}else{
										AccordionItems+="tree_"+module.getModuleCode()+",";
									}
					}
					
					
					
					
					return AccordionItems;
		}
}
