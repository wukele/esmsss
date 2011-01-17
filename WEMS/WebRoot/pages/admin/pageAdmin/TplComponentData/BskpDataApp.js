Ext.ns('Ems.page')


Ems.page.bskpPagePanel=Ext.extend(Ext.Panel,{

		getSelectorTpl:function(){
			var tpl=['<tpl for=".">','<div class="x-seach-item">','<div class="x-list-image"><img height="40" width="50" src="{bspkImagePath}" />',
			'</div><div class="x-item-text"><p>页面ID : {bspkPageId}</p>',
			'<p>页面名称 : {bspkPageName}</p></div><div class="x-item-text"><p>宽度(px)：{bspkImageWidth}</p><p>',
			'高度(px) : {bspkImageHeight}</p>',
			'</div></tpl>'].join('');
			return tpl;
		},
		initComponent:function(){
				this.store=new Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({url:'BskpInfoPage.action'}),
						fields:Ems.page.BskpDataApp.BskpInfoPageField,
						root:'bspkPages'
				});
				this.PageView=new Ext.DataView({
					tpl:new Ext.XTemplate(this.getSelectorTpl()),
					itemSelector:'div.x-seach-item',
					multiSelect:true,
					store:this.store,
					overClass:'x-seach-item-over'
				})
				this.store.load();
				this.PageView.on('dblclick',this.bspkPageSelected)
				this.items=this.PageView;
				Ems.page.bskpPagePanel.superclass.initComponent.call(this);
		},
		bspkPageSelected:function(dataView,idx){
				var record=dataView.store.getAt(idx);
				if(record==undefined){
					 Ext.example.msg('警告','还未选定页面');
				}
				Ems.page.BskpDataApp.BspkPageViewer.load({
					url:'BspkPreview.action',
					scripts:true,
					params:{
						 page_id:record.get('bspkPageId')
					}
				});		
		}	
});

Ext.reg('bskpPagePanel',Ems.page.bskpPagePanel);




Ems.page.DataPanel=Ext.extend(Ext.TabPanel,{
		activeTab:0,
		width:350,
		region:'west',
		initComponent:function(){
				this.items=[{
						xtype:'bskpPagePanel',
						title:'临时页面'
				}]; 
				Ems.page.DataPanel.superclass.initComponent.call(this);
		}
});




Ems.page.bskpPageViewer=Ext.extend(Ext.Panel,{
		region:'center',
		initComponent:function(){
				this.tbar=['选项',{
					text:'实时数据',
					handler:function(){
						
					}
				}];
				Ems.page.bskpPageViewer.superclass.initComponent.call(this);
		}
}),




Ems.page.BskpDataApp=function(){
		return {
			BskpInfoPageField:[
						{name:'bspkPageId',mapping:'bspkPageId',type:'int'},
						{name:'bspkPageName',mapping:'bspkPageName'},
						{name:'bspkImagePath',mapping:'bspkImagePath'},
						{name:'bspkImageWidth',mapping:'bspkImageWidth'},
						{name:'bspkImageHeight',mapping:'bspkImageHeight'},
						{name:'bspkPageResource',mapping:'bspkPageResource'},
						{name:'bspkOperCode',mapping:'bspkOperCode'}
						],
			
			
			
			init:function(){
					 this.BspkPageViewer=new Ems.page.bskpPageViewer({
							title:'Preview',
							bodyCssClass:'x-content-panel',
							margins:'5 5 5 0',
							autoScroll:true
						});
				
					 this.MainView=new Ems.page.TplContainer({
						layout:'border',
						items:[this.BspkPageViewer,
					    new Ems.page.DataPanel({
					    	collapsible:true,
							animCollapse:true,
							autoScroll:true,
							animate: false,
        					collapseMode:'mini',
        					header: false,
        					collapseFirst:false,
					    	margins:'5 5 5 5'
					    })],
						container:'container'
					});
			}
		}
}();

Ext.onReady(Ems.page.BskpDataApp.init,Ems.page.BskpDataApp);