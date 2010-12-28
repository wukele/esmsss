Ext.ns('Ems.App')

/*Ems.App.DeviceTree=Ext.extend(Ext.tree.TreePanel,{
	title:'�豸',
	root:new Ext.tree.TreeNode({
		  text:'ϵͳ�豸',
		  expanded:true
	})
});*/



Ems.App.MainTab=Ext.extend(Ext.TabPanel,{
	  	margins:'2 0 2 2',
        region:'west',
        split: true,
        height: 400,
        width: 200,
	    minSize: 100,
	    maxSize: 500,
        autoScroll: true,
        activeTab: 0,
	  initComponent:function(){
	  		this.funcTree=CreateMenuBar();
	  		this.devT=new Ext.tree.TreePanel({
	  			title:'�豸',
	  			root:new Ext.tree.AsyncTreeNode({
	  				text:'ϵͳ�豸'
	  			}),
	  			dataUrl:'EmsSystemDeviceAction.action'
	  		});
	  		this.items=[this.funcTree,this.devT];
	  		Ems.App.MainTab.superclass.initComponent.call(this);
	  }
});

function appLoad(){
			
	Ext.QuickTips.init();
	
	// This is an inner body element within the Details panel created to provide a "slide in" effect
	// on the panel body without affecting the body's box itself.  This element is created on
	// initial use and cached in this var for subsequent access.
	
	
	// This is the main content center region that will contain each example layout panel.
	// It will be implemented as a CardLayout since it will contain multiple panels with
	// only one being visible at any given time.
	var contentPanel =new Ext.Panel({
		id: 'content-panel',
		region: 'center', // this is what makes this panel into a region within the containing layout
		margins: '2 2 2 0',
		activeItem: 0,
		border: 1,
		autoScroll: true,
		autoLoad:{
			url:'home.action',
			scripts:true
		}
	});
	
	
	var footPanel =new Ext.Panel({
		id:'footPanel',
		region:'south',
		split:true,
		border: 1,
		height:100,
		collapsible:true,
		animCollapse:true,
		collapsed:true,
		title:'�¼�'
	});
    
    
    var MenuBar=new Ems.App.MainTab();
    
    
	// Assign the changeLayout function to be called on tree node click.
   
    

    
    new Ext.Viewport({
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [{
			xtype: 'container',
			region: 'north',
			applyTo: 'header',
			height: 30
		},MenuBar,
			contentPanel,
			footPanel
		],
        renderTo: Ext.getBody()
    });	
    
   
}

Ext.onReady(appLoad);