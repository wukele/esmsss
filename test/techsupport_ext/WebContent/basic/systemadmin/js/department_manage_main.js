/**
 * filename:department_manage_main.js 机构管理页面
 */

(function(){
	
	Ext.ns("techsupport.deparmentmanage");

	/**
	 * 机构动作，例如增删改详情
	 * @param config 构造参数
	 * @author hooxin
	 *
	 */
	techsupport.deparmentmanage.DepartmentAction = Ext.extend(Ext.Window,{
		constructor: function(config){
			this.action_name = config.action_name || '浏览';
			this.width = config.width || 500;
			this.height = config.height || 300;
			this.layout = config.layout;
			this.title = config.title || '机构';
			this.id = config.id;
			this.defaults = config.defaults || { bodyStyle : 'padding: 4px;',xtype:'textfield'};
			this.renderTo = config.renderTo || 'body';
			
			this.viewConfig = {
					forceFit:true
			};
			
			techsupport.deparmentmanage.DepartmentActionFrame.superclass.constructor.apply(this,arguments);
		},
		initComponent:function(ct,position){
			techsupport.deparmentmanage.DepartmentAction.superclass.initComponent.apply(this,arguments);
		}
	});
	
	
	techsupport.deparmentmanage.DepartmentMain = Ext.extend(Ext.Panel, {
		constructor:function(config) {
			// 父类
			this.title = config.title || '机构管理';
			this.title_base = config.title_base || '机构';
			this.layout = config.layout ||'border';
			this.id =  config.id ||'manage_panal';
			this.defaults = config.defaults || {
				bodyStyle : 'padding:4px;',
				split : true
			};
			this.renderTo = config.renderTo || 'body';
			
			this.items = config.items || [];
			
			this.width = config.width || '100%;';
			this.height = config.height || '100%;';

			this.style = 'height:100%;';
			this.enableDD = config.enableDD ||false;
			this.body_height;
			this.viewConfig = {
					forceFit:true
			};
			techsupport.deparmentmanage.DepartmentMain.superclass.constructor
					.apply(this, arguments);
			
			/** 左边树*/
			this.treepanel;
			/** 后边表格*/
			this.gridpanel;
			/** 详情动作*/
			this.action;
			/** 当前的ID*/
			this.current_treenode_id;
			/** 数据集*/
			this.store;
			this.tree_level = 99;
			this.treeloader;
			
			this.right_panel;
			this.detail_panel;
//			每页显示数
			this.pagesize = 25;
//			默认排序列
			this.dir = 'noorder';
//			默认排序方式
			this.sort = 'asc';
		},
		/** 初始化组件内容 */
		initComponent : function(ct,position) {
			this.store =  new Ext.data.JsonStore({
					proxy:new Ext.data.HttpProxy({
						url:context_path+'/sysadminDefault/querylist_departmentmanage.action',
						baseParams:{
							'department.departid':this.current_treenode_id,
							start:0,
							limit:this.pagesize,
						    sort : this.sort,    
						    dir : this.dir
						}
					}),
					reader:new Ext.data.JsonReader({
						idProperty:'department_reader_id',
						root:'department_list',
						totalProperty:'total',
						fields:['departid','departcode','departname',{name:"parentname",mapping:'parent.departanme'}]
					}),
					
					api:{
						
					}
				});
		
			this.treeloader = new Ext.tree.TreeLoader({
				url:context_path+'/sysadminDefault/query_department_node_departmentmanage.action',
				method:'post',
				listeners:{
					beforeload:function(loader,node){
						loader.baseParams['department.departid'] = node.attributes.attributes.departid;
						loader.baseParams['department.departlevel'] = techsupport.deparmentmanage.DepartmentMain.tree_level;
					}
				}});
			this.treepanel = new Ext.tree.TreePanel({
				region : 'west',
				id : this.id+'_tree',
				title : this.title_base +'树',// 以后去掉
				useArrows : true,
				autoScroll : true,
				animate : true,
				enableDD : false,
				containerScroll : true,
				border : false,
				width: '25%',
				rootVisable : false,
				viewConfig:{
					forceFit:true
				},
				loader:this.treeloader,
				root:{id:'tree_root',text:'顶端',nodeType: 'async',attributes:{'departid':0,departlevel:this.tree_level}},
				listeners:{
					click:function(node,evt){
						//点击动作
//						子类可以按照自己的需求重载
						var attr = node.attributes.attributes;
						var record = new Ext.data.Record({
							'department.departid':attr.departid,
							'department.departcode':attr.departcode,
							'department.departname':attr.departname,
							'department.departfullcode':attr.departfullcode,
							'department.parentdepartid':attr.parentdepartid,
							'department.parent.departname':attr.parentdepartname
							},
							attr.departid
						);
						
						this.ownerCt.current_treenode_id = record.id;
						this.ownerCt.detail_panel.getForm().loadRecord(record);
						this.ownerCt.store.load();
					}
				}
			});

//			子机构面板
			this.gridpanel = new Ext.grid.GridPanel({
				id : this.id+'_grid',
				store : this.store,
				border:false,
				viewConfig:{
					forceFit:true
				},
				columns:[
					{id: 'departid', header: '机构ID', dataIndex: 'departid', sortable: false,width:100},
					{header: this.title_base+'代码',dataIndex:'departcode',width:300},
					{header: this.title_base+'名称',dataIndex:'departname',width:300},
					{header:'上级'+this.title_base,dataIndex:'parentname',width:300}
				],
				tbar:[
						{xtype:'button',text:'添加',handler:function(){}},
						'-',
						{xtype:'button',text:'修改',handler:function(){}},
						'-',
						{xtype:'button',text:'删除',handler:function(){}},
						'-',
						{xtype:'button',text:'置顶',handler:function(){}},
						'-',
						{xtype:'button',text:'上移',handler:function(){}},
						'-',
						{xtype:'button',text:'下移',handler:function(){}},
						'-',
						{xtype:'button',text:'置底',handler:function(){}},
						'-','-',
						{xtype:'button',text:'保存',handler:function(){ /* 保存当前机构 */ }}
					],
					bbar:new Ext.PagingToolbar({
						store:this.store,
						displayInfo:true,
						pageSize:this.pagesize,
						prependButton:true,
						emptyMsg : '没有数据显示',
						displayMsg : '{0}-{1}条,总条数{2}'
					})
			});
//			-------------------------------子机构面板------------------------------------
			
			//右边详情显示面板
			var detail_panel_items_defaults = {
				   xtype:'textfield',
				   columnWidth: .25
			};
			
			this.detail_panel = Ext.create({
				xtype:'form',
				layout:'column',
				viewConfig:{forceFit:true},
				frame:false,
				defaults:{
					border:false,
					bodyStyle:'padding:2',
					labelAlign:'right'
				},
				items:[
				       {
				    	   layout:'form',
				    	   defaults:detail_panel_items_defaults,
				    	   items:[
				    	          {name:'department.departid',fieldLabel:this.title_base+'ID',readOnly:true}
				    	          
				    	   ]
				       },
				       {
				    	   layout:'form',
				    	   defaults:detail_panel_items_defaults,
				    	   items:[
				    	          {name:'department.departcode',fieldLabel:this.title_base+'代码',readOnly:true}
				    	          
				    	   ]
				       },
				       {
				    	   layout:'form',
				    	   defaults:detail_panel_items_defaults,
				    	   items:[
				    	          {name:'department.departname',fieldLabel:this.title_base+'名称'},
				    	   ]
				       },
				       {
				    	   layout:'form',
				    	   defaults:detail_panel_items_defaults,
				    	   items:[
				    	          {name:'department.deoartfullcode',fieldLabel:this.title_base+'全码',readOnly:true},
				    	   ]
				       },
				       {
				    	   layout:'form',
				    	   defaults:detail_panel_items_defaults,
				    	   items:[
				    	          {name:'department.parentdepartid',fieldLabel:'上级'+this.title_base+'ID',readOnly:true}
				    	   ]
				       },
				       {
				    	   layout:'form',
				    	   defaults:detail_panel_items_defaults,
				    	   items:[
				    	          {name:'department.parent.departname',fieldLabel:'上级机构名称',readOnly:true}
				    	   ]
				       }
				]
			});
			//-----------------------------------------------详情面板------------------------
			//右边面板
			this.right_panel = Ext.create({
				xtype:'panel',
				title : this.title_base +'信息',
				region : 'center',
				layout : 'vbox',
				viewConfig : { forceFit:true},
				items: [this.detail_panel , this.gridpanel]
			});
//			----------------------------右边面板-------------------------------------------
			this.items = [this.right_panel, this.treepanel ];
			//父类
			techsupport.deparmentmanage.DepartmentMain.superclass.initComponent.apply(this,arguments);
		},
		onRender:function(ct,position){
			techsupport.deparmentmanage.DepartmentMain.superclass.onRender.apply(this,arguments);
		},
		afterRender:function(ct,position){
			this.body_height = this.getHeight()-this.getFrameHeight() - 15;
			this.body.setHeight(this.body_height);
			techsupport.deparmentmanage.DepartmentMain.superclass.afterRender.apply(this,arguments );
			this.treepanel.getRootNode().expand();
		}
		//-----------------------------------附加内容结束-------------------------------------
	});
	Ext.reg('department_main', techsupport.deparmentmanage.DepartmentMain);
})();



