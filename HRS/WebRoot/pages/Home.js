var HomePage=function(){
		 var store = new Ext.data.JsonStore({
        		fields:['name', 'visits', 'views'],
        		data: [
            		{name:'Jul 07', visits: 245000, views: 3000000},
            		{name:'Aug 07', visits: 240000, views: 3500000},
            		{name:'Sep 07', visits: 355000, views: 4000000},
            		{name:'Oct 07', visits: 375000, views: 4200000},
            		{name:'Nov 07', visits: 490000, views: 4500000},
            		{name:'Dec 07', visits: 495000, views: 5800000},
            		{name:'Jan 08', visits: 520000, views: 6000000},
            		{name:'Feb 08', visits: 620000, views: 7500000}
        		]
    	  });
    	  new  Ext.Panel({
    	  		   renderTo: 'container',
        		   width:500,
        		   height:300,
        		   layout:'fit',
        		   items:[
        		   {
        		   		xtype:'linechart',
        		   		store: store,
            			xField: 'name',
            			yField: 'visits',
            			border:false
					
					}
      
        		   ]
    	  });	
    	  var  DataPanel=new Ext.Panel({
    	  		   layout:'absolute',
    	  		   width:1024,
    	  		   height:300,
    	  		   renderTo: 'container',
    	  		   border:true,
    	  		   defaultType:'textfield',
    	  		   items:[
    	  		   {x:75,y:100,height:20,text:'Ua:',xtype:'label'},
    	  		   {x:100,y:100,width:70,height:20,value:'220'},
    	  		   {x:200,y:200,xtype:'box',
    	  		   		autoEl:{
    	  		   			tag:'img',
    	  		   			src:basePath+'/image/ups_s.png'
    	  		   		}
    	  		   },
    	  		   {x:300,y:50,xtype:'box',
    	  		   		autoEl:{
    	  		   			tag:'img',
    	  		   			src:'appchart.action'
    	  		   		},
    	  		   		listeners:{
    	  		   			render:function(e){
    	  		   					var task=new Ext.util.DelayedTask()
    	  		   					
    	  		   			}
    	  		   		}
    	  		   }
    	  		   ]
    	  });
    	  
}


Ext.onReady(HomePage);