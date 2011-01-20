Ext.ns('Ems.page')

Ems.page.ComponentList=Ext.extend(Ext.grid.GridPanel,{
    	cm:new Ext.grid.ColumnModel({
			columns:[
			{header:'���ID',dataIndex:'componentId'},
			{header:'XTYPE',dataIndex:'codeXtype'},
			{header:'�������',dataIndex:'componentName'}
			],
			defaults:{
				width:100,
				sortable: true,
        		menuDisabled: true
			}
		}),
		
		sm:new Ext.grid.RowSelectionModel({
			singleSelect:true
		}),
	
		constructor:function(cfg){
			cfg=cfg||{
				autoScroll:true,
				title:'���'
			}
			Ems.page.ComponentList.superclass.constructor.call(this,cfg);
		},
		initComponent:function(){
			
			this.tbar=[{
	    	iconCls:'silk-add',
	    	text:'����',
	    	handler:function(){
	    		 this.ownerCt.ownerCt.fireEvent('componentadd',this.ownerCt.ownerCt);
	    	}
	    	},'-'];
			
			
			
			this.store=new Ext.data.JsonStore({
					proxy:new Ext.data.HttpProxy({url:'CompList.action'}),
					fields:[
					{name:'componentId',mapping:'componentId',type:'int'},
					{name:'codeXtype',mapping:'codeXtype'},
					{name:'componentName',mapping:'componentName'},
					{name:'componentResourceId',mapping:'componentResourceId'},
					{name:'fullType',mapping:'fullType'}
					],
					root:'ccomponents',
					autoLoad:true
			});
			Ems.page.ComponentList.superclass.initComponent.call(this);
			this.addEvents({
				componentadd:true
			})
		}
});