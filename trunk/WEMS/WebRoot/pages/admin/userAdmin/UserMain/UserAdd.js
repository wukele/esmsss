/**
 * user manager add face
 * 
 * @author ffmmx
 */
(function() {
	Ext.ns('com.wems.admin.userAdmin');

	com.wems.admin.userAdmin.UserAdd = function() {
		var window;
		var cm;
		var submitprefix = 'user';
		var store;
		var genderStore;
		var isFieldsValidated=false;

		var STATUS_ACTIVE=0;
		var STATUS_NOT_ACTIVE=1;
		
		return {
			modifyUser:function(){
				var data={};
				var paras={};
				var allFields=[];
				var fields=window.findByType('textfield');
				var combos=window.findByType('combo');
				allFields=fields.concat(combos);
				
				var rec=store.getById(window.findById('operNo').getValue());
				data=rec.data;
				for(i=0;i<allFields.length;i++){
					var fieldName='';
						fieldName=allFields[i].getName();
					data[fieldName]=allFields[i].getValue();
				}
				
				for(i in data){
					var fieldName='';
					fieldName=submitprefix?submitprefix+'.'+i:i;
					paras[fieldName]=data[i];
				}
				//验证
				isFieldsValidated=true;
				for(i=0;i<allFields.length;i++){
					isFieldsValidated=isFieldsValidated && allFields[i].validate();
				}
				if(isFieldsValidated){
					//修改
					Ext.Ajax.request({
						url:'modifyUser.action',
						method:'post',
						params:paras,
						success:function(xhq,status){
							if(xhq.responseText==null)
								return;
							
							//修改失败
							if(xhq.errorCode>0){
								Ext.example.msg('修改失败','失败原因:'+xhq.errorMsg);
								return;
							}
							//修改成功
							rec.data=data;
							rec.commit();
							
							Ext.example.msg('成功','用户修改成功');
						}
					});
					window.hide();
				}
			},
			getAddWindow:function(){
				this.clearWindowFieldValues();
				window.setTitle('添加用户');
				var btnOk = window.getFooterToolbar().findById('ok');
				btnOk.handler=this.addUser;
				return this.getWindow();
			},
			getModifyWindow:function(record){
				var allFields=[];
				var fields=window.findByType('textfield');
				var combos=window.findByType('combo');
				allFields=fields.concat(combos);
				
				if(record){
					for(i=0;i<allFields.length;i++){
						allFields[i].setValue(record.data[allFields[i].getName()]);
					}
				}
				window.setTitle('修改用户');
				window.findById('operNo').readOnly=true;
				var btnOk = window.getFooterToolbar().findById('ok');
				btnOk.handler=this.modifyUser;
				return this.getWindow();
			},
			clearWindowFieldValues : function() {
//				fields = window.findByType('textfield');
//				combos = window.findByType('combo');
//
//				Ext.each(fields, function(item, index, allItems) {
//					item.setValue('');
//				});
				window.get(0).getForm().reset();
//				Ext.each(combos, function(item, index, allItems) {
//					item.setValue(1);
//				});
			},
			getWindow : function() {
				return window;
			},
			setDataStore : function(dataStore) {
				store = dataStore;
			},

			init : function(containerId) {
				genderStore = new Ext.data.SimpleStore({
					fields : [ 'genderKey', 'genderName' ],
					data : [ [ 1, '男' ], [ 0, '女' ] ],
					id : 1
				});
				window = new Ext.Window({
					title : '添加用户',
					frame : true,
					width : 350,
					height : 130,
					autoHeight : true,
					resizable : true,
					buttonAlign : "center",
					closeAction : "hide",
					items:[new Ext.form.FormPanel({
						plain : true,
						defaults : {
							xtype : "textfield",
							width : 180
						},
						labelWidth : 60,
						layout:'form',items : [ {
						id:'operNo',
						fieldLabel : '用户号',
						name : 'operNo',
						allowBlank : false,
						blankText : '用户号不能为空',
						maxLength : 10,
						maxLengthText : '至多10位'
					}, {
						id:'operName',
						fieldLabel : '用户名称',
						name : 'operName',
						allowBlank : false,
						blankText : '用户名称不能为空',
						maxLength : 60,
						maxLengthText : '至多60位'
					}, {
						id:'loginName',
						fieldLabel : '登录名称',
						name : 'loginName',
						allowBlank : false,
						blankText : '登录名才不能为空',
						maxLength : 60,
						maxLengthText : '至多60位'
					}, {
						id:'operPwd',
						fieldLabel : '密码',
						name : 'operPwd',
						allowBlank : false,
						blankText : '不能为空',
						maxLength : 64,
						maxLengthText : '至多64位',
						inputType : 'password'
					}, {
						fieldLabel : '性别',
						id : 'gender',
						name : 'gender',
						xtype : 'combo',
						typeAhead : true,
						selectOnFocus : true,
						triggerAction : 'all',
						mode : 'local',
						editable : false,
						store : genderStore,
						valueField : 'genderKey',
						displayField : 'genderName'
					}, {
						id:'phone',
						fieldLabel : '电话',
						name : 'phone',
						maxLength : 20,
						maxLengthText : '至多20位'
					}, {
						id:'positions',
						fieldLabel : '位置',
						name : 'positions',
						maxLength : 32,
						maxLengthText : '至多32位'
					}, {
						id:'mobileNo',
						fieldLabel : '手机号码',
						name : 'mobileNo',
						maxLength : 20,
						maxLengthText : '至多20位'
					} ]})],
					buttons : [ {
						xtype : 'button',
						id:'ok',
						name : 'ok',
						text : '确认'
					}, {
						xtype : 'button',
						id:'cancel',
						name : 'cancel',
						text : '取消',
						handler : function() {
							window.hide();
						}
					} ]
				});

				// 初始化渲染容器
				if (containerId)
					window.render(containerId);
			},
			addUser : function() {
				var fields = window.findByType('textfield');
				var combos = window.findByType('combo');
				var allFields=[];
				
				var data = {};
				allFields=fields.concat(combos);
				
				Ext.each(allFields, function(item, index, allItems) {
					var fieldName = '';
						fieldName =submitprefix?submitprefix+'.'+item.getName():item.getName();
					data[fieldName] = item.getValue();
				});

				Ext.Ajax.request({
					url : 'addUser.action',
					method:'post',
					params:data,
					success:function(req,status){
						ret=Ext.util.JSON.decode(req.responseText);
						if(ret==null)
							return;
						//失败
						if(ret.errorCode!=0){
							Ext.example.msg('注意',req.errorMsg);
							return;
						}
						//添加成功
						recData={};
						for(i=0;i<fields.length;i++){
							recData[fields[i].getName()]=fields[i].getValue();
						}
						for(i=0;i<combos.length;i++){
							recData[combos[i].getName()]=combos[i].getValue();
						}
						recData['flag']=STATUS_ACTIVE;
						var rec=new Ext.data.Record(recData,recData['operNo']);
						store.add(rec);
						Ext.example.msg('成功','用户添加成功');
					}
				});

				window.hide();
			}
		};
	}();
})();