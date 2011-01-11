Ext.ns('Ems.page')

Ems.page.ComponentApp=function(config){
				Ext.apply(this, config);
				this.addEvents({
        			'ready' : true,
        			'beforeunload' : true
    			});
    			Ext.onReady(this.initApp, this);
}


Ext.extend(Ems.page.ComponentApp,Ext.util.Observable,{
		isReady: false,
		init : Ext.emptyFn,
		layout:function(){
		
		},
		
		initApp:function(){
			this.init();
        	Ext.EventManager.on(window, 'beforeunload', this.onUnload, this);
			this.fireEvent('ready', this);
        	this.isReady = true;
			var  QryCt=Ext.get('tplPageTemp');
			var  ComponentCt=Ext.get('tplComp');
			this.QryCt=QryCt;
			this.ComponentCt=ComponentCt;
			
			this.QryPanel=new Ems.page.TemplatePageQryPanel(this,{
				 renderTo:this.QryCt.dom,
				 height:400
			});
			
			
			//Ext.EventManager.onWindowResize(this.layout);
		},
		onUnload : function(e){
        	if(this.fireEvent('beforeunload', this) === false){
            	e.stopEvent();
       		 }
    	},
    	onReady : function(fn, scope){
        		if(!this.isReady){
            		this.on('ready', fn, scope);
        		}else{
            		fn.call(scope, this);
        		}
    	}

});

EmsCompApp=new Ems.page.ComponentApp({
	init:function(){
		
	}
})
