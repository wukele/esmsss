Ext.onReady(function(){
			var  temparateView=new Ext.TabPanel({
						renderTo:Ext.get('contant'),
						border:false
			});
			temparateView.add({
						title:'�����¶�',
						html:'�����¶���ͼ1'
			});
			temparateView.add({
						title:'������ͼ',
						html:'������ͼ1'
			});
			temparateView.activate(0);
	
});