var Ext_Direct_providers=[];
/*var LoadMaskDataChg=new Ext.LoadMask(Ext.getBody(),{
		msg:"���ݽ�����...",
		removeMask:true
});

Ext.Ajax.on('beforerequest',function(){
	LoadMaskDataChg.show();
});

Ext.Ajax.on('requestcomplete',function(){
	LoadMaskDataChg.hide();
});*/


Ext.Ajax.on('requestexception',function(e){
	Ext.example.msg('ϵͳ����','��̨�������');
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