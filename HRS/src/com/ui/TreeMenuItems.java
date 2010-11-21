package com.ui;

import java.io.IOException;

import java.util.List;



import com.entries.ulp.InfoMenu;
import com.entries.ulp.InfoOper;
import com.ulp.dao.MenuItemDao;

public class TreeMenuItems {
		public  String iconUrl="";
		public  String menuTitle="";
		public  String menuUrl="";
		public   Integer menuCol;
		public  String moduleCode="";
		public  String menuRow="";
		public  String parentCode="";
		public 	String menuCode="";
		public boolean hasChild=false;
		private  TreeMenuItems[]  childMenuItems=null;
		private  MenuItemDao  MenuDao=null;
		public void setMenuDao(MenuItemDao menuDao) {
			MenuDao = menuDao;
		}
		public TreeMenuItems(InfoOper oper,InfoMenu  menu,MenuItemDao  MenuDao){
						this.iconUrl=menu.getIconUrl();
						this.menuCol=menu.getMenuCol();
						this.menuTitle=menu.getMenuTitle();
						this.moduleCode=menu.getModuleCode();
						this.parentCode=menu.getParentMenuCode();
						this.menuCode=menu.getMenuCode();
						this.menuUrl=menu.getMenuUrl();
						this.MenuDao=MenuDao;
						if(MenuDao.hasChidren(oper,this.menuCode)){
										hasChild=true;
										buildChildMenuItems(oper);
						}
		 }
		
		
		private  void  buildChildMenuItems(InfoOper oper){
					List<InfoMenu>  cmenu=MenuDao.QueryOperCMenuItem(oper, menuCode);
					if(cmenu!=null && cmenu.size()>0){
									int len=cmenu.size();
									childMenuItems=new TreeMenuItems[len];
									for(int i=0;i<len;i++){
												childMenuItems[i]=new TreeMenuItems(oper,cmenu.get(i),MenuDao);
									}
					}else{
									hasChild=false;
					}
		}
		
		public  String GetTreeItemScript() throws IOException{
						StringBuffer  buff=new StringBuffer();
						writeTreeMenuItems(buff);
						System.out.println(buff.toString());
						return buff.toString();
		}
		
		
		public  void  writeTreeMenuItems(StringBuffer   buff) throws IOException{
					buff.append("var  treeNode_"+this.menuCode+"=new  Ext.tree.TreeNode({\n" +
							"\t 	text:'"+menuTitle+"', \n"+
							"\t	url:'"+menuUrl+"?menu_code="+this.menuCode+"'\n\t\t });\n");
					if(hasChild){
							int c=childMenuItems.length;
							for(int i=0;i<c;i++){
								childMenuItems[i].writeTreeMenuItems(buff);
								buff.append(" treeNode_"+this.menuCode+".appendChild(treeNode_"
										+childMenuItems[i].menuCode+");\n");
							}
					}
		}
		
		
}
