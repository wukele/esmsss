Ext.onReady(function(){
			var  temparateView=new Ext.TabPanel({
						renderTo:Ext.get('contant'),
						border:false
			});
			temparateView.add({
						title:'房间温度',
						html:'房间温度试图1'
			});
			temparateView.add({
						title:'报表视图',
						html:'报表视图1'
			});
			temparateView.activate(0);
	
});