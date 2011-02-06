Ext.ns('Ems.page')


Ems.page.TplPageResourceApp=function(){
	return {
		selectedPage:null,
		init:function(){
				this.TplPageQryPanel=new Ems.page.TplPageQryPanel({
					title:'模板',
					listeners:{
						itemclick:function(DataView,idx){
							    var record=DataView.store.getAt(idx);
								//Ext.example.msg('info',record.get('tplPageId'));
								Ems.page.TplPageResourceApp.tplPageCompTab.setActiveTab(1);
								Ext.getCmp('PageView').load({
										url:'TplPreviewer.action',
										params:{
											page_id:record.get('tplPageId')
										},
										scripts:true
								});
								Ems.page.TplPageResourceApp.selectedPage=record;
						}
					}
				 });
				this.Complist=new Ems.page.ComponentList({
					autoScroll:true,
				    title:'组件',
				     viewConfig: {
        				forceFit: true
				     },
					listeners:{
						componentadd:function(e){
								if(!Ems.page.TplPageResourceApp.selectedPage){
									Ext.example.msg('错误','并未选取模板');
									return false;
								}
								if(e.getSelectionModel().getSelected()){
								   var record=e.getSelectionModel().getSelected();
								   var rec=new Ext.data.Record();
								   rec.set('pageResource.xtypeCode',record.get('codeXtype'));
								   rec.set('typeName',record.get('componentName'));
								   rec.set('pageResource.pageResource',Ems.page.TplPageResourceApp.selectedPage.get('tplPageResource'));
								    
								   if(!Ems.page.TplPageResourceApp.addWindow){
								   		 Ems.page.TplPageResourceApp.addWindow=new Ext.Window({
								   		 		  width:300,
								   		 		  height:266,
								   		 		  resizable:false,
								   		 		  closeAction:'hide',
								   		 		  items:[
								   		 		  	 new Ext.FormPanel({
								   		 		  	 		buttonAlign:'center',
								   		 		  	 		labelWidth:70,
								   		 		  	 		defaultType:'textfield',
								   		 		  	 		frame:true,
								   		 		  	 		defaults:{
								   		 		  	 			allowBlank:false,
								   		 		  	 			width:150
								   		 		  	 		},
								   		 		  	 		items:[{
								   		 		  	 			fieldLabel:'XTYPE',
								   		 		  	 			readOnly:true,
								   		 		  	 			name:'pageResource.xtypeCode'
								   		 		  	 		},{
								   		 		  	 			fieldLabel:'组件名称',
								   		 		  	 			readOnly:true,
								   		 		  	 			name:'typeName'
								   		 		  	 		},{
								   		 		  	 			fieldLabel:'资源编码',
								   		 		  	 			readOnly:true,
								   		 		  	 			name:'pageResource.pageResource'
								   		 		  	 		},{
								   		 		  	 			fieldLabel:'组件高度',
								   		 		  	 			xtype:'numberfield',
								   		 		  	 			name:'pageResource.resourceHeight'
								   		 		  	 		},{
								   		 		  	 			fieldLabel:'组件宽度',
								   		 		  	 			xtype:'numberfield',
								   		 		  	 			name:'pageResource.resourceWidth'
								   		 		  	 		},{
								   		 		  	 			fieldLabel:'Axis X',
								   		 		  	 			xtype:'numberfield',
								   		 		  	 			name:'pageResource.resourceLeft'
								   		 		  	 		},{
								   		 		  	 			fieldLabel:'Axis Y',
								   		 		  	 			xtype:'numberfield',
								   		 		  	 			name:'pageResource.resourceTop'
								   		 		  	 		}],
								   		 		  	 		buttons:[{
								   		 		  	 			text:'提交',
								   		 		  	 			handler:function(){
								   		 		  	 				 var fp=this.ownerCt.ownerCt.getForm();
								   		 		  	 				 if(fp.isValid()){
								   		 		  	 				 		fp.submit({
								   		 		  	 				 				url:'tplCompResourceAdd.action',
								   		 		  	 				 				success:function(form,action){
								   		 		  	 				 						Ext.example.msg('OK',action.result.returnMsg);
								   		 		  	 				 						var w=Ext.WindowMgr.getActive();
								   		 		  	 				 						Ext.getCmp('PageView').load({
																								url:'TplPreviewer.action',
																								params:{
																									page_id:Ems.page.TplPageResourceApp.selectedPage.get('tplPageId')
																								},
																								scripts:true
																							});
																							w.hide();
								   		 		  	 				 				}
								   		 		  	 				 		});	
								   		 		  	 				 }
								   		 		  	 			}
								   		 		  	 			
								   		 		  	 		},{
								   		 		  	 			text:'取消',
								  								handler:function(){
								  									  this.ownerCt.ownerCt.ownerCt.hide();
								  								}
								   		 		  	 		}]
								   		 		  	 })
								   		 		  ]
								   		 });
								   }
								   Ems.page.TplPageResourceApp.addWindow.items.items[0].getForm().reset();
								   	Ems.page.TplPageResourceApp.addWindow.items.items[0].getForm().loadRecord(rec);
								    Ems.page.TplPageResourceApp.addWindow.show();
								   			   
								}else{
									 Ext.example.msg('错误','请选取组件');
								}
						}						
					}
						
				});
				
				  this.tplPageCompTab=new Ext.TabPanel({
			    		region:'west',
						width:360,
						activeTab:0,
						margins:'5 5 5 5',
						collapsible:true,
						animCollapse:true,
						animate: false,
        				collapseMode:'mini',
        				header: false,
        				collapseFirst:false,	
			    		items:[this.TplPageQryPanel,this.Complist]
			    })
				
				
				
				
			
				this.TplContainer=new Ems.page.TplContainer({
						container:'container',
						layout:'border',
						items:[
							this.tplPageCompTab,
							{
								xtype:'panel',
								region:'center',
								margins:'5 5 5 0',
								id:'PageView',
								autoScroll:true
							}
						]
				})
		}
	}
}();

Ext.onReady(Ems.page.TplPageResourceApp.init,Ems.page.TplPageResourceApp)