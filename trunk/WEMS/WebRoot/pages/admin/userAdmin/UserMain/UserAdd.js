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
				//��֤
				isFieldsValidated=true;
				for(i=0;i<allFields.length;i++){
					isFieldsValidated=isFieldsValidated && allFields[i].validate();
				}
				if(isFieldsValidated){
					//�޸�
					Ext.Ajax.request({
						url:'modifyUser.action',
						method:'post',
						params:paras,
						success:function(xhq,status){
							if(xhq.responseText==null)
								return;
							
							//�޸�ʧ��
							if(xhq.errorCode>0){
								Ext.example.msg('�޸�ʧ��','ʧ��ԭ��:'+xhq.errorMsg);
								return;
							}
							//�޸ĳɹ�
							rec.data=data;
							rec.commit();
							
							Ext.example.msg('�ɹ�','�û��޸ĳɹ�');
						}
					});
					window.hide();
				}
			},
			getAddWindow:function(){
				this.clearWindowFieldValues();
				window.setTitle('����û�');
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
				window.setTitle('�޸��û�');
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
					data : [ [ 1, '��' ], [ 0, 'Ů' ] ],
					id : 'genderStore'
				});
				window = new Ext.Window({
					title : '����û�',
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
						fieldLabel : '�û���',
						name : 'operNo',
						allowBlank : false,
						blankText : '�û��Ų���Ϊ��',
						maxLength : 10,
						maxLengthText : '����10λ'
					}, {
						id:'operName',
						fieldLabel : '�û�����',
						name : 'operName',
						allowBlank : false,
						blankText : '�û����Ʋ���Ϊ��',
						maxLength : 60,
						maxLengthText : '����60λ'
					}, {
						id:'loginName',
						fieldLabel : '��¼����',
						name : 'loginName',
						allowBlank : false,
						blankText : '��¼���Ų���Ϊ��',
						maxLength : 60,
						maxLengthText : '����60λ'
					}, {
						id:'operPwd',
						fieldLabel : '����',
						name : 'operPwd',
						allowBlank : false,
						blankText : '����Ϊ��',
						maxLength : 64,
						maxLengthText : '����64λ',
						inputType : 'password'
					}, {
						fieldLabel : '�Ա�',
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
						displayField : 'genderName',
						allowBlank:false,
						blankText:'�Ա���Ϊ��'
					}, {
						id:'phone',
						fieldLabel : '�绰',
						name : 'phone',
						maxLength : 20,
						maxLengthText : '����20λ',
						regex:/^(\d{3}-)?\d{8}$/,
						regexText:'��Ч�ĵ绰����'
					}, {
						id:'positions',
						fieldLabel : 'λ��',
						name : 'positions',
						maxLength : 32,
						maxLengthText : '����32λ'
					}, {
						id:'mobileNo',
						fieldLabel : '�ֻ�����',
						name : 'mobileNo',
						maxLength : 20,
						maxLengthText : '����20λ',
						regex:/^\d{11}$/,
						regexText:'��Ч���ֻ�����'
					},{
						xtype : 'combo',
						fieldLabel : '����',
						name : 'deptNo',
						store : new Ext.data.JsonStore({
							proxy : new Ext.data.HttpProxy(
												{
													url : 'selectInfoDept.action'
												}),
										baseParams : {
											flag : '1'
										},
										root : 'infoDepts',
										totalProperty : 'totalProperty',
										fields:['deptNo','deptName']
									}),
							displayField:'deptName',
							valueField:'deptNo',
							editable:false,
							triggerAction : 'all',
							selectOnFocus:true
						},
						{
						xtype : 'combo',
						fieldLabel : '��ɫ',
						name : 'roleCode',
						store : new Ext.data.JsonStore({
							proxy : new Ext.data.HttpProxy(
												{
													url : 'qryRole.action'
												}),
										baseParams : {
											flag : '1'
										},
										root : 'lstRole',
										totalProperty : 'roleCount',
										fields:['roleCode','roleName']
									}),
							displayField:'roleName',
							valueField:'roleCode',
							editable:false,
							triggerAction : 'all',
							selectOnFocus:true
						}]})],
					buttons : [ {
						xtype : 'button',
						id:'ok',
						name : 'ok',
						text : 'ȷ��'
					}, {
						xtype : 'button',
						id:'cancel',
						name : 'cancel',
						text : 'ȡ��',
						handler : function() {
							window.hide();
						}
					} ]
				});

				// ��ʼ����Ⱦ����
				if (containerId)
					window.render(containerId);
			},
			addUser : function() {
				var fields = window.findByType('textfield');
				var combos = window.findByType('combo');
				var allFields=[];
				
				var data = {};
				
				if(window.items.items[0].getForm().isValid()){
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
							//ʧ��
							if(ret.errorCode!=0){
								Ext.example.msg('ע��',req.errorMsg);
								return;
							}
							//��ӳɹ�
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
							Ext.example.msg('�ɹ�','�û���ӳɹ�');
						}
					});

					window.hide();
				}
			}
		};
	}();
})();