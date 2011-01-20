Ext.ns('Ems.page')

Ems.page.TplPageQryPanel=Ext.extend(Ext.Panel,{
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
					'<div class="x-item-text"><p>模板页名称  : {tplPageName}</p>',
					'<p>资源ID ： {tplPageResource}</p>',
					'</div>',
					'</div></tpl>')
				});
				
							
				this.tbar=['搜索: ',' ',new Ems.page.SearchField({
					 store:this.store,
					 width:320,
					 paramName:'tpl_page_id'
				})];
				
				this.bbar=new Ext.PagingToolbar({
					store:this.store,
					displayInfo: true,
					pageSize:8,
					emptyMsg : '没有记录'
				});
				this.items=this.dataView;
				this.dataView.on('click',this.onViewClick);
				Ems.page.TplPageQryPanel.superclass.initComponent.call(this);
				this.addEvents({
					itemclick:true
				});				
		},
		onViewClick:function(DataView,idx){
				//Ext.Msg.alert('info','item'+idx);
				var record=DataView.store.getAt(idx);
				if(record==undefined){
						Ext.example.msg('error','null select item');
				}
				this.ownerCt.fireEvent('itemclick',DataView,idx);
		}
});


Ext.reg('TplPageQryPanel',Ems.page.TplPageQryPanel)