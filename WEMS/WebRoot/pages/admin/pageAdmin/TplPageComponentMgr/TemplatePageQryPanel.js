Ext.ns('Ems.page')

Ems.page.TemplatePageQryPanel=function(app,config){
		this.app=app;
		Ems.page.TemplatePageQryPanel.superclass.constructor.call(this,config);
}

Ext.extend(Ems.page.TemplatePageQryPanel,Ext.Panel,{
	    initComponent:function(){
				this.store=new Ext.data.JsonStore({
					proxy:new Ext.data.HttpProxy({url:'TplPageQry.action'}),
					root:'tpls',
					totalProperty:'totalProperty',
					fields:[
					{name:'tplPageType',mapping:'tplPageType'},
					{name:'tplPageId',mapping:'tplPageId'},
					{name:'tplPageResource',mapping:'tplPageResource'},
					{name:'tplPageName',mapping:'tplPageName'},
					{name:'tplImagePath',mapping:'tplImagePath'},
					{name:'tplImageWidth',mapping:'tplImageWidth'},
					{name:'tplImageHeight',mapping:'tplImageHeight'}
					],
					baseParams:{limit:8}
				});
				this.store.load({
					params:{
							start:0,
							limit:8
					}
				});
				
				this.dataView=new Ext.DataView({
					store:this.store,
					itemSelector:'div.x-seach-item',
					multiSelect:true,
					overClass:'x-seach-item-over',
					tpl:new Ext.XTemplate('<tpl for=".">',
					'<div class="x-seach-item"><div class="x-item-image"><img src="{tplImagePath}" width="40px" height="40px"/></div>',
					'<div class="x-item-text"><p>ģ��ҳ����  : {tplPageName}</p>',
					'<p>��ԴID �� {tplPageResource}</p>',
					'</div>',
					'</div></tpl>')
				});
				
							
				this.tbar=['����: ',' ',new Ems.page.SearchField({
					 store:this.store,
					 width:320,
					 paramName:'tpl_page_id'
				})];
				
				this.bbar=new Ext.PagingToolbar({
					store:this.store,
					displayInfo: true,
					pageSize:8,
					emptyMsg : 'û�м�¼'
				});
				this.items=this.dataView;
				this.dataView.on('click',this.onViewClick);
				Ems.page.TemplatePageQryPanel.superclass.initComponent.call(this);
		},
		onViewClick:function(DataView,idx){
				//Ext.Msg.alert('info','item'+idx);
				var record=DataView.store.getAt(idx);
				this.ownerCt.app.CompPanel.setheader(record.get('tplPageName'));
				this.ownerCt.app.CompPanel.qryPageResource(record.get('tplPageResource'));
				
		}
})