var Ext_Direct_providers=[];
/*var LoadMaskDataChg=new Ext.LoadMask(Ext.getBody(),{
		msg:"数据交换中...",
		removeMask:true
});

Ext.Ajax.on('beforerequest',function(){
	LoadMaskDataChg.show();
});

Ext.Ajax.on('requestcomplete',function(){
	LoadMaskDataChg.hide();
});*/


Ext.Ajax.on('requestexception',function(){
	LoadMaskDataChg.hide();
});

function clearAllTask(){
	       var  engines=Ext_Direct_providers;
		   if(engines && engines.length>0){
			   		for(var idx=0;idx<engines.length;idx++){
			   				if(engines[idx]){
			   						Ext.Direct.getProvider(engines[idx]).disconnect();
			   				};	
			   		}
		   }
}