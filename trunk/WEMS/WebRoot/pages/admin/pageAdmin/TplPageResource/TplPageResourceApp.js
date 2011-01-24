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
								   if(!this.addWindow){
								   		 var rec=new Ext.data.Record();
								   		 
								   }
								   
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