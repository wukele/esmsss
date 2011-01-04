Ext.ns('Ems.page')


var selectTemp=null;

Ems.page.PageTempateMangerPan=Ext.extend(Ext.FormPanel,{
		title:'底图上传',
		fileUpload: true,
        frame: true,
        autoHeight: true,
        bodyStyle: 'padding: 10px 10px 0 10px;',
        labelWidth: 100,
        iconCls:'silk-add',
        method:'POST',
        defaults: {
            anchor: '90%',
            allowBlank: false
        },
		collapsible:true,
		animCollapse:true,
		initComponent:function(){
				this.items=[
				{
					xtype:'textfield',
					fieldLabel: '底图名称',
					name:'image_title'
				},
				{
					xtype:'combo',
					store:new  Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({
							url:'UiConfigQry.action'
						}),
						baseParams:{
							config_name:'BackgroundImagePath'
						},
						root:'configs',
						totalProperty:'totalProperty',
						fields:[{name:'configValue',mapping:'configValue'}]
						
					}),
					triggerAction : 'all',
					selectOnFocus:true,
					valueField:'configValue',
					displayField:'configValue',
					name:'remote_path',
					fieldLabel: '存储位置',
					editable:false
				},
				{
					xtype: 'fileuploadfield',
            		id: 'form-file',
            		emptyText: '选择上传图片',
            		fieldLabel: '底图路径',
           			name: 'image_path',
            		buttonText: '',
            		buttonCfg: {
                		iconCls: 'upload-icon'
            		}
				}
				];
				this.buttons=[
				{
					text: '上传',
            		handler: function(){
            			var fp=this.ownerCt.ownerCt;
                		if(fp.getForm().isValid()){
	                			fp.getForm().submit({
	                    			url: 'PageTemplateActionUpLoad.action',
	                    			waitMsg: 'Uploading...',
	                    			success: function(fp, o){
	                        			Ext.example.msg('Success', '文件上传成功');
	                    			},
	                    			failure: function(form, action){
	                    				fp.getForm().reset();
	                    			}
	                			});
                		}
            		}
				},
				{
					 text: '重置',
            		 handler: function(){
                			this.ownerCt.ownerCt.getForm().reset();
            		  }
				}
				];
				Ems.page.PageTempateMangerPan.superclass.initComponent.call(this);
				
		}
});


//页面图片

Ems.page.PageTempateView=Ext.extend(Ext.DataView,{
		overClass:'x-view-over',
		itemSelector:'div.thumb-wrap',
		autoHeight:true,
		emptyText: 'No images to display',
		multiSelect:true,
		initComponent:function(){
				this.tpl=new Ext.XTemplate('<tpl for=".">',
				'<div class="thumb-wrap"><div class="thumb"><img src="{imagePath}/{imageName}" title="{imageDisplayName}" width="220" height="200"/>',
				'</div><span>{imageDisplayName}</span></div></tpl><div class="x-clear"></div>');
				Ems.page.PageTempateView.superclass.initComponent.call(this);		
		}
});

Ems.page.PageTemplatePan=Ext.extend(Ext.Panel,{
	   title:'模板页管理',
	   border:false,
	   height:700,
	   tbar:new Ext.Toolbar([
	   {
	   		text:'页面新增',
	   		handler:function(){
	   				
	   		}
	   },
	   {
	   		text:'新增空白页',
	   		handler:function(){
	   			
	   		}
	   }
	   ]),
	   initComponent:function(){
	   		this.store=new Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({url:'PageTemplateMgrQry.action'}),
						root:'tlp_images',
						fields:[{name:'imageId',mapping:'imageId'},
						{name:'imageName',mapping:'imageName'},
						{name:'imagePath',mapping:'imagePath'},
						{name:'imageDisplayName',mapping:'imageDisplayName'}],
						autoLoad:true,
						totalProperty:'totalProperty'
			});
			this.items=[new Ems.page.PageTempateView({
						store:this.store,
						listeners:{
							selectionchange:function(e,nodes){
									 	Ext.Msg.alert('info',nodes[0].innerHTML);
							}
						}
			})];
			this.bbar=new Ext.PagingToolbar({
					store:this.store,
					displayInfo: true,
					pageSize:6,
					displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
					emptyMsg : '没有记录'
			});
			Ems.page.PageTemplatePan.superclass.initComponent.call(this);
	   }
});


Ext.onReady(function(){
	new Ems.page.PageTempateMangerPan({
		renderTo:Ext.getDom('bgfileMgr')
	});
	new Ems.page.PageTemplatePan({
		renderTo:Ext.getDom('templatePage')
	});
});