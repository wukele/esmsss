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
					title:'添加用户',
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
					items:[{fieldLabel:'用户号',name:'operNo',allowBlank:false,blankText:'用户号不能为空',maxLength:10,maxLengthText:'至多10位'},
					       {fieldLabel:'用户名称',name:'operName',allowBlank:false,blankText:'用户名称不能为空',maxLength:60,maxLengthText:'至多60位'},
					       {fieldLabel:'登录名称',name:'loginName',allowBlank:false,blankText:'登录名才不能为空',maxLength:60,maxLengthText:'至多60位'},
					       {fieldLabel:'密码',name:'operPwd',allowBlank:false,blankText:'不能为空',maxLength:64,maxLengthText:'至多64位',inputType:'password'},
					       {fieldLabel:'性别',name:'gender',xtype:'combo',triggerAction: 'all', mode: 'local',editable:false, data:[[1,'男'],[0,'女']]},
					       {fieldLabel:'电话',name:'phone',maxLength:20,maxLengthText:'至多20位'},
					       {fieldLabel:'位置',name:'positions',maxLength:32,maxLengthText:'至多32位'},
					       {fieldLabel:'手机号码',name:'mobileNo',maxLength:20,maxLengthText:'至多20位'}
					       ],
					buttons:[{xtype:'button',name:'ok',text:'确认',handler:this.addUser},
					         {xtype:'button',name:'cancel',text:'取消',handler:function(){window.hide();}}]
				});
				//初始化渲染容器
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