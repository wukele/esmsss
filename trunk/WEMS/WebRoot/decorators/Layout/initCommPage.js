var Ext_Direct_providers=[];

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