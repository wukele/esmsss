Ext.ns('Ems.page');


var selectTemp=null;

Ems.page.PageTempateMangerPan=Ext.extend(Ext.FormPanel,{
		title:'��ͼ�ϴ�',
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
					fieldLabel: '��ͼID',
					name:'image_id',
					allowBlank:true
				},
				{
					xtype:'textfield',
					fieldLabel: '��ͼ����',
					name:'image_title',
					blankText:'��ͼ���Ʋ���Ϊ��'
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
					fieldLabel: '�洢λ��',
					editable:false,
					blankText:'�洢λ�ò���Ϊ��'
				},
				{
					xtype: 'fileuploadfield',
            		id: 'form-file',
            		emptyText: 'ѡ���ϴ�ͼƬ',
            		fieldLabel: '��ͼ·��',
           			name: 'image_path',
            		buttonText: '',
            		buttonCfg: {
                		iconCls: 'upload-icon'
            		},
            		blankText:'��ͼ·������Ϊ��',
            		regex:function(){
            			var _file_type='gif,bmp,png,jpg,jpeg';
            			var rex_exp='^';
            			for(i=0;i<_file_type.split(',').length;i++){
            				rex_exp+=_file_type.split(',')[i];
            			}
            			rex_exp+='$';
            			
            			var exp=new RegExp(rex_exp);
            			
            			return exp;
            		}(),
            		regexText:'�ļ���ʽ���Ϸ�'
				}
				];
				this.buttons=[
				{
					text: '�ϴ�',
            		handler: function(){
            			var fp=this.ownerCt.ownerCt;
                		if(fp.getForm().isValid()){
	                			fp.getForm().submit({
	                    			url: 'PageTemplateActionUpLoad.action',
	                    			waitMsg: 'Uploading...',
	                    			success: function(fp, o){
	                        			Ext.example.msg('Success', '�ļ��ϴ��ɹ�');
	                        			page_template_panel.store.load();
	                    			},
	                    			failure: function(form, action){
	                    				fp.getForm().reset();
	                    			}
	                			});
                		}
            		}
				},
				{
					 text: '����',
            		 handler: function(){
                			this.ownerCt.ownerCt.getForm().reset();
            		  }
				}
				];
				Ems.page.PageTempateMangerPan.superclass.initComponent.call(this);
				
		}
});


//ҳ��ͼƬ

Ems.page.PageTempateView=Ext.extend(Ext.DataView,{
		overClass:'x-view-over',
		itemSelector:'div.thumb-wrap',
		autoHeight:true,
		emptyText: 'No images to display',
		multiSelect:true,
		initComponent:function(){
				this.tpl=new Ext.XTemplate('<tpl for=".">',
				'<div class="thumb-wrap" data="{image_id:{imageId},image_name:\'{imageName}\','+
				'image_path:null,remote_path:\'{remotePath}\',image_title:\'{imageDisplayName}\'}">'+
				'<div class="thumb"><img src="{imagePath}/{imageName}" title="{imageDisplayName}" width="220" height="200"/>',
				'</div><span>{imageDisplayName}</span></div></tpl><div class="x-clear"></div>');
				Ems.page.PageTempateView.superclass.initComponent.call(this);		
		}
});

Ems.page.PageTemplatePan=Ext.extend(Ext.Panel,{
		window:new Ext.Window({
			title:'ҳ������',
			frame : true,
			width : 300,
			height : 130,
			labelWidth : 60,
			autoHeight : true,
			plain : true,
			resizable : true,
			buttonAlign : "center",
			closeAction : "hide",
			items:[{xtype:'form',
				id:'form_page_tpl',
				defaults : {
					xtype : "textfield",
					width : 180
				},
			items:[{
				id:'tplPageName',
				fieldLabel : 'ҳ������',
				name : 'tplPageName',
				maxLength : 255,
				maxLengthText : '����255λ'
			},
			{
				id:'tplImagePath',
				fieldLabel : 'ҳ��·��',
				name : 'tplImagePath',
				maxLength : 255,
				maxLengthText : '����255λ'
			},
			{
				id:'tplImageWidth',
				fieldLabel : 'ҳ����',
				name : 'tplImageWidth',
				maxLength : 3,
				maxLengthText : '����3λ',
				vtype:'alphanum'
			},
			{
				id:'tplImageHeight',
				fieldLabel : 'ҳ��߶�',
				name : 'tplImageHeight',
				maxLength : 3,
				maxLengthText : '����3λ',
				vtype:'alphanum'
			},
			{
				id:'tplPageResource',
				fieldLabel : 'ҳ����Դ����',
				name : 'tplPageResource',
				maxLength : 20,
				maxLengthText : '����20λ'
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
				fieldLabel: 'ҳ������',
				editable:false,
				allowBlank:false,
				blankText:'ҳ�����Ͳ���Ϊ��',
				maxLength : 2,
				maxLengthText : 'ҳ����������2λ'
			}]}
			],
			buttons:[{xtype:'button',text:'����',handler:function(){
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
				  				Ext.example.msg('����','ҳ������ʧ��');
				  				return;
				  			}
				  			
				  			var ret = Ext.util.JSON.decode(xhr.responseText);
				  			
				  			if(ret.returnNo>0){
				  				Ext.example.msg('����',ret.returnMsg);
				  				return;
				  			}
				  			Ext.example.msg('OK',ret.returnMsg);
				  			this.ownerCt.ownerCt.hide();
					}});
				}
			}},{xtype:'button',text:'�ر�',handler:function(){
				this.ownerCt.ownerCt.hide();
			}}]
		}),
	   title:'ģ��ҳ����',
	   border:false,
	   height:700,
	   tbar:new Ext.Toolbar([
	   {
	   		text:'ҳ������',
	   		handler:function(){
	   			this.ownerCt.ownerCt.window.findById('form_page_tpl').getForm().reset();
	   			this.ownerCt.ownerCt.window.show();
	   		}
	   },'-',
	   {
	   		text:'�����հ�ҳ',
	   		handler:function(){
	   			
	   		}
	   },'-',
	   {
		   text:'ɾ����ͼ',
		   handler:function(){
				if(arr_selected_page_template && arr_selected_page_template.length>0){
					var paras={};
					for(i=0;i< arr_selected_page_template.length;i++ ){
						var data=eval("("+arr_selected_page_template[i].getAttribute('data')+")");
						paras['lst_image_id['+i+']']=data['image_id'];
						
					}
					var page_template_panel = this.ownerCt.ownerCt;
					
					Ext.Ajax.request({
						url:'remove_multiple_page_template.action',
						params:paras,
				  		method:'POST',
				  		success:function(xhr,status){
				  			if(xhr==null||xhr.responseText==null){
				  				Ext.example.msg('����','ɾ��ʧ��');
				  				return;
				  			}
				  			
				  			var ret = Ext.util.JSON.decode(xhr.responseText);
				  			
				  			if(ret.returnNo>0){
				  				Ext.example.msg('����',ret.returnMsg);
				  				return;
				  			}
				  			arr_selected_page_template=null;
				  			Ext.example.msg('OK',ret.returnMsg);
				  			for(i in paras){
				  				page_template_panel.store.remove(page_template_panel.store.getById(paras[i]));
				  			}
				  			delete page_template_panel;
				  		}
					});
				}
				else{
					Ext.example.msg('����','��ѡ����Ҫɾ���ĵ�ͼ');
				}
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
						totalProperty:'totalProperty'
			});
			this.items=[new Ems.page.PageTempateView({
						store:this.store,
						listeners:{
							//ѡ�г�ʼ����ͼ�ϴ�
							selectionchange:function(e,nodes){
								if(nodes && nodes.length==1){
									var page_panel=page_template_mrg_panel;
									
									var data=eval("("+nodes[0].getAttribute('data')+")");
									var arr_form_field = page_panel.items.items;
									if(arr_form_field && arr_form_field.length > 0){
										for(i=0;i<arr_form_field.length;i++){
												arr_form_field[i].setValue(data[arr_form_field[i].getName()]);
										}
									}
									delete arr_form_field;
									delete data;
									delete page_panel;
								}
								
								arr_selected_page_template = nodes;
							}
						}
			})];
			this.bbar=new Ext.PagingToolbar({
					store:this.store,
					displayInfo: true,
					pageSize:6,
					displayMsg : '��ʾ�� {0} ���� {1} ����¼��һ�� {2} ��',
					emptyMsg : 'û�м�¼'
			});
			Ems.page.PageTemplatePan.superclass.initComponent.call(this);
	   }
});

var page_template_mrg_panel;
var page_template_panel;
var arr_selected_page_template;

Ext.onReady(function(){
	page_template_mrg_panel = new Ems.page.PageTempateMangerPan({
		renderTo:Ext.getDom('bgfileMgr')
	});
	page_template_panel = new Ems.page.PageTemplatePan({
		renderTo:Ext.getDom('templatePage')
	});
});