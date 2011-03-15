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


Ext.Ajax.on('requestexception',function(c,e){
	var doc = e.responseText;
	
	if(!doc){
		Ext.example.msg('系统错误','后台传输错误{0}',e.status);
	}else{
		var start = doc.indexOf('<pre>')+5;
		var end = doc.indexOf('</pre>');
		if(end){
			Ext.example.msg('系统错误','后台传输错误{0}-{1}',e.status,e.statusText);
			if(e.status!=500){
					return ;
			}
		}
		var errs=doc.substr(start,end);
		var errs=errs.substr(0,100);
		Ext.example.msg('系统错误','后台传输错误{0}',errs);
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
		   var doc=  Ext.getCmp('content-panel').getEl().dom.firstChild.firstChild;
		   clearAllNode(doc);
		 /*  while(Ext.DomQuery.selectNode('.x-window')){
		   		el=Ext.DomQuery.selectNode('.x-window')
		   		  el.parentNode.removeChild(el);
		   }
		   while(Ext.DomQuery.selectNode('.x-shadow')){
		   		el=Ext.DomQuery.selectNode('.x-shadow')
		   		  el.parentNode.removeChild(el);
		   }*/
		   
		   Ext.WindowMgr.each(function(win){
		   			win.close();
		   });
		 
}

function clearAllNode(parentNode){
    while (parentNode.firstChild) {
      var oldNode = parentNode.removeChild(parentNode.firstChild);
       oldNode = null;
    }
}



		Ext.Direct.on('message', function(e){
     			var datas=e.realTimeData;
     			if(datas && Ext.isArray(datas)){
     					for(var i=0;i<datas.length;i++){
     						 var item=datas[i];
     						 Ext.getCmp(item.valueId).setValue(item.varLogicValue);
     					}
     			}
    	});
				


