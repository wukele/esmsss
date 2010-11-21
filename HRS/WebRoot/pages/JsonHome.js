Ext.onReady(function(){
	   
	
	
		var  mstore=new  Ext.data.JsonStore({
				proxy:new  Ext.data.HttpProxy({
					url:'getmenu.action'
					
				}),
				root:'infoMens',
				totalProperty:'totalProperty',
				fields:[
				{name:'menuTitle',mapping:'menuTitle'},
				{name:'menuUrl',mapping:'menuUrl'},
				{name:'comments',mapping:'comments'},
				{name:'menuCode',mapping:'menuCode'}
				
				]
		});
		
		
		mstore.load();
	    var rowNumber=new Ext.grid.RowNumberer();
		var sm=new  Ext.grid.CheckboxSelectionModel();
        var cm=new Ext.grid.ColumnModel([
		        			
		        		 {dataIndex:'menuTitle',header:'title',sortable: true},
		        		 {dataIndex:'menuUrl',header:'utl',sortable: true,renderer:function(value){
		        		 		return "<span style='color:red;font-size:14'>"+value+"</span>";	
		        		 	
		        		 	}
		        		  },
		        		 
		        		
		        		 {dateIndex:'comments',header:'comments',renderer:renderCommets},
		        		  {dateIndex:'menuCode',header:'menuCode',renderer:function(value){
		        		 		return "<span style='color:orange;font-size:14'>"+value+"</span>";	
		        		 	
		        		 	}},
		        		 	 sm,
		        		 rowNumber
		        		
		        		 ]
				);
				
				
				
				function renderCommets(value,cellmate,record,rowIndex,commIndex,store){
						 var info='';
						 var msg="";
						 msg+="value=="+value+",<br/>";
						 msg+="cellid:"+cellmate.cellid+"  id:"+cellmate.id+";<br/>";
						 msg+="record:["+record+"];<br/>"
						 info+="<input type='button' value='info' onclick='Ext.Msg.alert(\"info\",\""+msg+"\")' />";
						 return info;
				}
				
				
				var pageBar=new  Ext.PagingToolbar({
						 store:mstore,
						 displayInfo: true,
						 pageSize:2
				});
				
				
				
				
				var gridView=new Ext.grid.GridPanel({
						 enableColumnResize:true,
						 store: mstore,
						 cm: cm,
						 border:false,
						 height:400,
						 sm:sm,
						 tbar:pageBar,
						 viewConfig:{
						 		 forceFit: true
						 }
				});
				
				
				var viewpoint=new  Ext.Panel({
						layout:'auto',
						applyTo:Ext.get('container'),
						border:false,
						items:[
						{
							title:'panel',
							html:'panel',
							border:false,
							autoHeight:true
						}
						,gridView
						
						
						]
				});
				
				
});
