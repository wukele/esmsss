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


Ext.Ajax.on('requestexception',function(c,e){
	var doc = e.responseText;
	
	if(!doc){
		Ext.example.msg('ϵͳ����','��̨�������{0}',e.status);
	}else{
		var start = doc.indexOf('<pre>')+5;
		var end = doc.indexOf('</pre>');
		if(end){
			Ext.example.msg('ϵͳ����','��̨�������{0}-{1}',e.status,e.statusText);
			if(e.status!=500){
					return ;
			}
		}
		var errs=doc.substr(start,end);
		var errs=errs.substr(0,100);
		Ext.example.msg('ϵͳ����','��̨�������{0}',errs);
	}
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