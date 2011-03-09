Ext.ns('Ems.page');


var selectTemp=null;

Ems.page.PageTempateMangerPan=Ext.extend(Ext.FormPanel,{
		id:'pageTplMgrPan',
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
					xtype:'hidden',
					fieldLabel: '底图ID',
					name:'image_id',
					allowBlank:true
				},
				{
					xtype:'textfield',
					fieldLabel: '底图名称',
					name:'image_displayName',
					blankText:'底图名称不能为空',
					id:'image_title'
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
					editable:false,
					blankText:'存储位置不能为空'
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
            		},
            		blankText:'底图路径不能为空',
            		regex:function(){
            			var _file_type='gif,bmp,png,jpg,jpeg';
            			var rex_exp='^';
            			for(i=0;i<_file_type.split(',').length;i++){
            				rex_exp+='.*\.'+_file_type.split(',')[i]+'|';
            			}
            			rex_exp=rex_exp.substr(0, rex_exp.length-1);
            			rex_exp+='$';
            			
            			var exp=new RegExp(rex_exp);
            			
            			return exp;
            		}(),
            		regexText:'文件格式不合法'
				}
				];
				this.buttons=[
				{
					text: '上传',
            		handler: function(){
            			var fp=this.ownerCt.ownerCt;
                		if(fp.getForm().isValid()){
                				var displayName=fp.getForm().findField('image_title').getValue();
                				if(displayName){
                						displayName=encodeURIComponent(displayName);
                				}
  	
	                			fp.getForm().submit({
	                    			url: 'PageTemplateActionUpLoad.action',
	                    			waitMsg: '正在上传...',
	                    			 params: {
        									image_title:displayName 
   									 },	                    			
	                    			success: function(fp, o){
	                        			Ext.example.msg('成功', '文件上传成功');
	                        			page_template_panel.store.load();
	                    			},
	                    			failure: function(form, action){
	                    				form.reset();
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
		emptyText: '没有可用的底图',
		multiSelect:true,
		initComponent:function(){
				this.tpl=new Ext.XTemplate('<tpl for=".">',
				'<div style="height:auto;" class="thumb-wrap" data="{image_id:{imageId},image_name:\'{imageName}\','+
				'image_path:null,remote_path:\'{remotePath}\',image_title:\'{imageDisplayName}\'}">'+
				'<div class="thumb"><img src="{imagePath}/{imageName}" title="{imageDisplayName}" width="220" height="200"/>',
				'</div><span>{imageDisplayName}</span></div></tpl><div class="x-clear"></div>');
				Ems.page.PageTempateView.superclass.initComponent.call(this);		
		}
});

Ems.page.PageTemplatePan=Ext.extend(Ext.Panel,{
		window:new Ext.Window({
			title:'页面新增',
			id:'PageWindow',
			width : 500,
			height : 130,
			labelWidth : 60,
			autoHeight : true,
			plain : true,
			resizable : true,
			buttonAlign : "center",
			closeAction : "hide",
			items:[{xtype:'form',
				id:'form_page_tpl',
				frame : true,
				defaults : {
					xtype : "textfield",
					width : 180
				},
			items:[{
				id:'tplPageName',
				fieldLabel : '页面名称',
				name : 'tplPageName',
				maxLength : 255,
				maxLengthText : '至多255位'
			},
			{
				id:'tplImagePath',
				fieldLabel : '页面路径',
				name : 'tplImagePath',
				maxLength : 255,
				maxLengthText : '至多255位'
			},
			{
				id:'tplImageWidth',
				fieldLabel : '页面宽度',
				name : 'tplImageWidth',
				maxLength : 3,
				maxLengthText : '至多3位',
				regex:/^[0-9]+$/,
				regexText:'必须为整数'
			},
			{
				id:'tplImageHeight',
				fieldLabel : '页面高度',
				name : 'tplImageHeight',
				maxLength : 3,
				maxLengthText : '至多3位',
				regex:/^[0-9]+$/,
				regexText:'必须为整数'
			},
			{
				id:'tplPageResource',
				fieldLabel : '页面资源代码',
				name : 'tplPageResource',
				maxLength : 20,
				maxLengthText : '至多20位'
			},
			{
				xtype:'combo',
				store:new  Ext.data.JsonStore({
					proxy:new Ext.data.HttpProxy({
						url:'UiConfigQry.action'
					}),
					baseParams:{
						config_name:'tpl_page_type'
					},
					root:'configs',
					totalProperty:'totalProperty',
					fields:[{name:'configValue',mapping:'configValue'},{name:'configDesc',mapping:'configDesc'}]
					
				}),
				triggerAction : 'all',
				selectOnFocus:true,
				valueField:'configValue',
				displayField:'configDesc',
				name:'tplPageType',
				fieldLabel: '页面类型',
				editable:false,
				allowBlank:false,
				blankText:'页面类型不能为空',
				maxLength : 2,
				maxLengthText : '页面类型至多2位'
			}]}
			],
			buttons:[{xtype:'button',text:'新增',handler:function(){
				var paras={};
				var submit_prefix='tpl_info_page';
				var fp;
				
				fp=this.ownerCt.ownerCt.findById('form_page_tpl');
				if(fp.getForm().isValid()){
					var all_fields=[];
					all_fields=fp.find();
					
					for(i=0;i<all_fields.length;i++){
						var para_name='';
						para_name=submit_prefix && submit_prefix!=''?submit_prefix+"."+all_fields[i].getName():all_fields[i].getName();
						paras[para_name]=all_fields[i].getValue();
					}
					
					Ext.Ajax.request({url:'tpl_page_qry.action',
						params:paras,
						method:'post',
						success:function(xhr,status){
							if(xhr==null||xhr.responseText==null){
				  				Ext.example.msg('错误','页面新增失败');
				  				return;
				  			}
				  			
				  			var ret = Ext.util.JSON.decode(xhr.responseText);
				  			
				  			if(ret.returnNo>0){
				  				Ext.example.msg('错误',ret.returnMsg);
				  				return;
				  			}
				  			Ext.example.msg('OK',ret.returnMsg);
				  			Ext.getCmp('PageWindow').hide();
					}});
				}
			}},{xtype:'button',text:'关闭',handler:function(){
				this.ownerCt.ownerCt.hide();
			}}]
		}),
	   title:'模板页管理',
	   border:false,
	   height:700,
	   tbar:new Ext.Toolbar([
	   {
	   		text:'页面新增',
	   		handler:function(){
	   			var formPan=this.ownerCt.ownerCt.window.findById('form_page_tpl').getForm();
	   			formPan.reset();
	   			var view=Ext.getCmp('PageTempateView');
	   			var idx=view.getSelectedIndexes()[0];
	   			if(idx==undefined){
	   				 Ext.example.msg('警告','未选取底图');
	   				 return false;
	   			}
	   			var tmp=view.store.getAt(idx);
	   			var record=new Ext.data.Record();
	   			record.set('tplPageName',tmp.get('imageDisplayName'));
	   			record.set('tplImagePath',tmp.get('remotePath')+'/'+tmp.get('imageName'));
	   			formPan.loadRecord(record);
	   			this.ownerCt.ownerCt.window.show();
	   		}
	   },'-',
	   {
	   		text:'新增空白页',
	   		handler:function(){
	   			
	   		}
	   },'-',
	   {
		   text:'删除底图',
		   handler:function(){
			   	var view=Ext.getCmp('PageTempateView');
	   			var idx=view.getSelectedIndexes();
	   			if(idx==undefined||idx==null||idx.length==0){
	   				 Ext.example.msg('警告','未选取底图');
	   				 return false;
	   			}
	   			
				var paras={};
				for(i=0;i< idx.length;i++ ){
					var tmp=view.store.getAt(idx[i]);
					paras['lst_image_id['+i+']']=tmp.get('imageId');
				}
				var page_template_panel = this.ownerCt.ownerCt;
				
				Ext.Ajax.request({
					url:'remove_multiple_page_template_img.action',
					params:paras,
			  		method:'POST',
			  		success:function(xhr,status){
			  			if(xhr==null||xhr.responseText==null){
			  				Ext.example.msg('错误','删除失败');
			  				return;
			  			}
			  			
			  			var ret = Ext.util.JSON.decode(xhr.responseText);
			  			
			  			if(ret.returnNo>0){
			  				Ext.example.msg('错误',ret.returnMsg);
			  				return;
			  			}
			  			Ext.example.msg('成功',ret.returnMsg);
			  			for(i in paras){
			  				page_template_panel.store.remove(page_template_panel.store.getById(paras[i]));
			  			}
			  			delete page_template_panel;
			  		}
				});
			}
		   }
	   ]),
	   initComponent:function(){
	   		this.store=new Ext.data.JsonStore({
						proxy:new Ext.data.HttpProxy({url:'PageTemplateMgrQry.action'}),
						root:'tlp_images',
						idProperty: 'imageId',
						fields:[{name:'imageId',mapping:'imageId'},
						{name:'imageName',mapping:'imageName'},
						{name:'imagePath',mapping:'imagePath'},
						{name:'remotePath',mapping:'remotePath'},
						{name:'imageDisplayName',mapping:'imageDisplayName'}],
						autoLoad:true,
						totalProperty:'totalProperty',
						baseParams:{
									start:0,
									limit:10
						}
			});
			this.items=[new Ems.page.PageTempateView({
						store:this.store,
						id:'PageTempateView',
						listeners:{
							//选中初始化底图上传
							selectionchange:function(dataView,nodes){
								
							}
						}
			})];
			this.bbar=new Ext.PagingToolbar({
					store:this.store,
					displayInfo: true,
					pageSize:10,
					displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
					emptyMsg : '没有记录'
			});
			Ems.page.PageTemplatePan.superclass.initComponent.call(this);
	   }
});

var page_template_mrg_panel;
var page_template_panel;

Ext.onReady(function(){
	page_template_mrg_panel = new Ems.page.PageTempateMangerPan({
		renderTo:Ext.getDom('bgfileMgr')
	});
	page_template_panel = new Ems.page.PageTemplatePan({
		renderTo:Ext.getDom('templatePage')
	});
});