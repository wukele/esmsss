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

		return {
			getAddWindow:function(){
				this.clearWindowFieldValues();
				return this.getWindow();
			},
			getModifyWindow:function(record){
				return this.getWindow();
			},
			clearWindowFieldValues : function() {
				fields = window.findByType('textfield');
				combos = window.findByType('combo');

				Ext.each(fields, function(item, index, allItems) {
					item.setValue('');
				});
				Ext.each(combos, function(item, index, allItems) {
					item.setValue(1);
				});
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
					id : 1
				});
				window = new Ext.Window({
					title : '����û�',
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
					items : [ {
						fieldLabel : '�û���',
						name : 'operNo',
						allowBlank : false,
						blankText : '�û��Ų���Ϊ��',
						maxLength : 10,
						maxLengthText : '����10λ'
					}, {
						fieldLabel : '�û�����',
						name : 'operName',
						allowBlank : false,
						blankText : '�û����Ʋ���Ϊ��',
						maxLength : 60,
						maxLengthText : '����60λ'
					}, {
						fieldLabel : '��¼����',
						name : 'loginName',
						allowBlank : false,
						blankText : '��¼���Ų���Ϊ��',
						maxLength : 60,
						maxLengthText : '����60λ'
					}, {
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
						displayField : 'genderName'
					}, {
						fieldLabel : '�绰',
						name : 'phone',
						maxLength : 20,
						maxLengthText : '����20λ'
					}, {
						fieldLabel : 'λ��',
						name : 'positions',
						maxLength : 32,
						maxLengthText : '����32λ'
					}, {
						fieldLabel : '�ֻ�����',
						name : 'mobileNo',
						maxLength : 20,
						maxLengthText : '����20λ'
					} ],
					buttons : [ {
						xtype : 'button',
						name : 'ok',
						text : 'ȷ��',
						handler : this.addUser
					}, {
						xtype : 'button',
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
				fields = window.findByType('textfield');
				combos = window.findByType('combo');
				data = {};

				Ext.each(fields, function(item, index, allItems) {
					var fieldName = '';
					if (submitprefix != null)
						fieldName = submitprefix + '.' + item.getName();
					data[fieldName] = item.getValue();
				});
				Ext.each(combos, function(item, index, allItems) {
					var fieldName = '';
					if (submitprefix != null)
						fieldName = submitprefix + '.' + item.getName();
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
							Ext.MessageBox.alert('���ʧ��',req.errorMsg);
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
						var rec=new Ext.data.Record(recData,recData['operNo']);
						store.add(rec);
					}
				});

				window.hide();
			}
		};
	}();
})();