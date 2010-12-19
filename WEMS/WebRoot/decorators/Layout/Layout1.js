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
		height:100
	});
    
    
    var MenuBar=CreateMenuBar();
    
    
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