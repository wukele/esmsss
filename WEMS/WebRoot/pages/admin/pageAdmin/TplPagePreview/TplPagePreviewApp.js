Ext.ns('Ems.page');

Ems.page.ComponentPanel=Ext.extend(Ext.Panel,{
		layout:'absolute',
		constructor:function(config){
				config=config||{
					id:'ComponentPanel',
					bodyStyle:Ems.page.tplContianerData.getTplPagebdStyle(),
					width:Ems.page.tplContianerData.defaultViewWidth,
					height:Ems.page.tplContianerData.defaultViewHeight,
					renderTo:Ext.getDom('tplContainer'),
					items:Ems.page.tplContianerData.getTplResourceData()
				}
				Ems.page.ComponentPanel.superclass.constructor.call(this,config);
		},
		
		initComponent:function(){
			   Ems.page.ComponentPanel.superclass.initComponent.call(this);
			    if(!this.PanelMenu){
			   		this.PanelMenu=new Ext.menu.Menu({
			   				items:[
			   				{
			   					text:'生成临时数据页面',
			   					handler:function(){
			   							Ext.MessageBox.prompt(
			   									'临时页面名称',
			   									'请输入页面名称:',
			   									function(btn,text){
			   											if(!text || text.length>255){
			   													Ext.example.msg('警告','名称长度错误')
			   											}else if(btn=='ok'){
			   												var tplPageId=Ems.page.tplContianerData.getTplPageID();
			   												Ext.Ajax.request({
			   													url:'tplCreateBspkPage.action',
			   													params:{
			   															tpl_page_id:tplPageId,
			   															bspk_page_name:text
			   													},
			   													success:function(){
			   														 	Ext.example.msg('Success','临时数据页面生成成功');
			   													}
			   												})
			   											}
			   									}
			   							)
			   					}
			   				},'-',{
			   					text:'删除模板页',
			   					handler:function(){
			   						 	var tplPageId=Ems.page.tplContianerData.getTplPageID();
			   						 	Ext.Ajax.request({
			   						 		url:'TplPageDelete.action',
			   						 		params:{
			   						 				tpl_page_id:tplPageId
			   						 		},
			   						 		success:function(){
			   						 				Ext.example.msg('Success','模板页删除成功')
			   						 				//Ext.getCmp('PageView').getEl().update('');
			   						 				Ems.page.TplPageResourceApp.tplPageCompTab.setActiveTab(1);
			   						 				Ems.page.TplPageResourceApp.TplPageQryPanel.store.load({
			   						 					params:{
															start:0,
															limit:8
														}
			   						 				});
			   						 		}
			   						 	});
			   					}
			   				}
			   				]
			   		});
			    }
			   this.on({
			   		scope:this,
			   		afterrender:this.onAfterRender
			   });
			  
		},
		onAfterRender:function(){
			  
			   this.getEl().on({
			   		 scope: this,
            		 contextmenu: this.onContextMenu
			   });
			   
			   //add by ffmmx
			   // implement mouse drag
			   this.ddzone=new Ext.dd.DDTarget(this.el,'dd');
			   if(this.items)
				   for(i=0;i<this.items.length;i++){
						var resourceEle=this.items.items[i];
					   	var rec=new Ext.data.Record({},resourceEle.id);
					   	
						rec.set('comp.resourceId',resourceEle.id);
						rec.set('comp.xtypeCode',resourceEle.xtype);
					  	rec.set('comp.resourceTop',resourceEle.y);
					  	rec.set('comp.resourceLeft',resourceEle.x);
					  	rec.set('comp.resourceWidth',resourceEle.width);
					  	rec.set('comp.resourceHeight',resourceEle.height);
					  	rec.set('comp.pageResource',resourceEle.plugins.pageResource);
			  			
					   	resourceEle.data=rec;
					   
					   var src = new Ext.dd.DragSource(resourceEle.el,{group:'dd',data:resourceEle.data,src:resourceEle});
					   
					   src.startDrag=function(x,y){
					   		var el=Ext.get(this.el)
					   		var pel = this.proxy.getEl();
					   		
					   		var cc;
					   		
				   		
				   			cc=el.dom.cloneNode(true);
				   			cc.id='cc'+el.dom.id;
				   			cc.style.left="0";
				   			cc.style.top="0";
				   			this.proxy.ghost.dom.innerHTML=cc.outerHTML?cc.outerHTML: new XMLSerializer().serializeToString(cc);
				   			  
					   		var gwidth=this.proxy.ghost.getWidth();
					   		var gheight=this.proxy.ghost.getHeight();
					   		//除去拖动时多余的边框
					   		if(this.proxy.ghost.hasClass('x-dd-drag-ghost'));
					   			this.proxy.ghost.removeClass('x-dd-drag-ghost');
					   		this.proxy.ghost.setX(x);
					   		this.proxy.ghost.setY(y);
					   		
					   };

						src.afterDragDrop=function(target,e,id){
							var dele=Ext.get(id);
							var el = Ext.get(this.getEl());
							el.setX(e.xy[0]);
							el.setY(e.xy[1]);
							
							this.data.set('comp.resourceTop',el.getTop()-dele.getTop());
							this.data.set('comp.resourceLeft',el.getLeft()-dele.getLeft());
						  	
							Ext.Ajax.request({
								url:'ModifyTplComp.action',
								method:'post',
								params:this.data.data,
								success:function(result){
									            var  res=Ext.decode(result.responseText);
												//Ext.example.msg('ok',''+res.comp.resourceId);
									            var  cmp=Ext.getCmp(res.comp.resourceId);
									            cmp.x=res.comp.resourceLeft;
									            cmp.y=res.comp.resourceTop;
								}
							});
						};
				   }
		},
		onContextMenu:function(e,t,o){
			   e.stopEvent();
			   this.PanelMenu.showAt(e.getXY());
		}	
});

Ems.page.TplPagePreviewApp=function(){
		return {
			init:function(){
				 new Ems.page.ComponentPanel();
			}			
		}
}()


Ext.onReady(Ems.page.TplPagePreviewApp.init,Ems.page.TplPagePreviewApp);
