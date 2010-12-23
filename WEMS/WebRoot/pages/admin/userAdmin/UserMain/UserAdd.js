/**
 * user manager add face
 * @author ffmmx
 */
(function(){
	Ext.ns('com.wems.admin.userAdmin');
	
	com.wems.admin.userAdmin.UserAdd=function(){
		var window;
		var cm;
		var submitprefix='user';
		var store;
		
		return {
			getWindowCt:function(){
				return window;		
			},
			setDataStore:function(dataStore){
				store = dataStore;
			},
			init:function(containerId){
				window=new Ext.Window({
					title:'����û�',
					frame : true,
					width : 300,
					height : 130,
					layout : "form",
					labelWidth : 60,
					autoHeight : true,
					plain : true,
					resizable : true,
					buttonAlign : "center",
					closeAction : "hide",
					defaults : {
						xtype : "textfield",
						width : 180
					},
					items:[{fieldLabel:'�û���',name:'operNo',allowBlank:false,blankText:'�û��Ų���Ϊ��',maxLength:10,maxLengthText:'����10λ'},
					       {fieldLabel:'�û�����',name:'operName',allowBlank:false,blankText:'�û����Ʋ���Ϊ��',maxLength:60,maxLengthText:'����60λ'},
					       {fieldLabel:'��¼����',name:'loginName',allowBlank:false,blankText:'��¼���Ų���Ϊ��',maxLength:60,maxLengthText:'����60λ'},
					       {fieldLabel:'����',name:'operPwd',allowBlank:false,blankText:'����Ϊ��',maxLength:64,maxLengthText:'����64λ',inputType:'password'},
					       {fieldLabel:'�Ա�',name:'gender',xtype:'combo',triggerAction: 'all', mode: 'local',editable:false, data:[[1,'��'],[0,'Ů']]},
					       {fieldLabel:'�绰',name:'phone',maxLength:20,maxLengthText:'����20λ'},
					       {fieldLabel:'λ��',name:'positions',maxLength:32,maxLengthText:'����32λ'},
					       {fieldLabel:'�ֻ�����',name:'mobileNo',maxLength:20,maxLengthText:'����20λ'}
					       ],
					buttons:[{xtype:'button',name:'ok',text:'ȷ��',handler:this.addUser},
					         {xtype:'button',name:'cancel',text:'ȡ��',handler:function(){window.hide();}}]
				});
				//��ʼ����Ⱦ����
				if(containerId)
					window.render(containerId);
				window.show();
			},
			addUser:function(){
				fields = window.findByType('textfield');
				combos = window.findByType('combo');
				data={};
				
				Ext.each(fields,function(item,index,allItems){
					var fieldName='';
					if(submitprefix!=null)
						fieldName=submitprefix+'.'+item.getName();
					data[fieldName]=item.getValue();
				});
				Ext.each(combos,function(item,index,allItems){
					var fieldName='';
					if(submitprefix!=null)
						fieldName=submitprefix+'.'+item.getName();
					data[fieldName]=item.getValue();
				});
				
				Ext.Ajax.request({
					url:''
				});
				
				window.hide();
			}
		};
	}();
})();