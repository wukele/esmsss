(function(){
	Ext.namespace('com.wems.admin.userAdmin')
	com.wems.admin.userAdmin.RuleOperRoleManager=function(){
		var queryPanel;
		var gridPanel;
		var addForm;
		var addWindow;
		var updateWindow;
		var updateForm;
		var store;
		var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		var fields=['operNo','operName','roleCodes','roleNames'];
		var cm=new Ext.grid.ColumnModel({
			columns:[
				new Ext.grid.RowNumberer(),
				sm,
				{header:'����ID',dataIndex:'operNo',sortable:true},
				{header:'��������',dataIndex:'operName',sortable:true},
				{header:'��ɫ����',dataIndex:'roleCodes',sortable:true},
				{header:'��ɫ����',dataIndex:'roleNames',sortable:true}
			]
		});
		function ajaxSyncCall(urlStr, paramsStr) {
		var obj;
		var value;
		if (window.ActiveXObject) {
			obj = new ActiveXObject('Microsoft.XMLHTTP');
		} else if (window.XMLHttpRequest) {
			obj = new XMLHttpRequest();
		}
		obj.open('POST', urlStr, false);
		obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		obj.send(paramsStr);
		var result = Ext.decode(obj.responseText);
		return result;
	}
	function getFormParams(form,submitprefix){
		var paras={};
		var fields=form.findByType('textfield');
		Ext.each(fields,function(item,index,allItems){
			var paraName=submitprefix?submitprefix+'.'+item.getName():item.getName();
			paras[paraName]=item.getValue();
		});
		return paras;
	}
		
		var me={
			queryUser:function(){
				var params={};
				var perfix='pageParam';
				var queryFields=queryPanel.findByType('textfield');
				Ext.each(queryFields,function(item,index,allItem){
					var paramName=perfix+item?perfix+'.'+item.getName:item.getName();
					params[paramName]=item.getValue();
				});
				store.reload({
						proxy : new Ext.data.HttpProxy({
										url : 'selectRuleOperRole.action'
									}),
							baseParams : {
								start : 0,
								limit : 10
							},
							params:params,
							fields : fields,
							root : 'ruleOperRoles',
							idProperty : 'operNo',
							totalProperty : 'totalProperty'
				});
			
			},
			init:function(contianerId){
				store = new Ext.data.JsonStore({
							proxy : new Ext.data.HttpProxy({
										url : 'selectRuleOperRole.action'
									}),
							baseParams : {
								start : 0,
								limit : 10
							},
							fields : fields,
							root : 'ruleOperRoles',
							idProperty : 'operNo',
							totalProperty : 'totalProperty'
						});
				store.load();
				
				queryPanel=new Ext.FormPanel({
					id:'queryPanel',
					anchor:'100%',
					layout:"column",
					frame:true,
					defaults:{
						labelAlign:'right',
						labelWidth:60,
						buttonAlign:'center'
					},
					items:[{
							xtype:'panel',
							columnWidth:.3,
							layout:'form',
							items:[{
								xtype:'textfield',
								fieldLabel:'����',
								name:'operNo'
							}]
						},{
							xtype:'panel',
							columnWidth:.3,
							layout:'form',
							items:[{
								xtype:'textfield',
								fieldLabel:'����',
								name:'operName'
							}]
						},{
							xtype:'button',
							width:80,
							text:'��ѯ',
							handler:function(){
								me.queryUser();
							}
						},{
							xtype:'button',
							width:80,
							text:'����',
							handler:function(){
								Ext.getCmp('queryPanel').form.reset();
							}
						}]
				});
				
				gridPanel=new Ext.grid.GridPanel({
					height : 100,
					store:store,
					sm:sm,
					cm:cm,
					tbar:[{
						xtype:'button',
						text:'�޸�Ȩ��',
						handler:function(){
							var selectedRecords=sm.getSelections();
							var length=selectedRecords.length;
							if(length>1){
								Ext.example.msg('��ʾ��Ϣ','ֻ��ѡ�����е�һ��');
							}else if(length !=1){
								Ext.example.msg('��ʾ��Ϣ','��Ҫѡ�����е�һ��');
							}else{
								var operNo=selectedRecords[0].data.operNo;
								var loader = new Ext.tree.TreeLoader({
                    			baseAttrs:{ uiProvider: Ext.ux.TreeCheckNodeUI } ,
                    			dataUrl: 'selectInfoRole.action'
                    	});
											loader.processResponse = function(response, node, callback) {
											        var json = response.responseText;
											        try {
											        		var json=Ext.decode(response.responseText);
											                //var json = eval("("+json+")");
											                node.beginUpdate();
											                //��json�л��json���飬�����key��Struts2���ص�json�����е�key��Ӧ
											                var o = json["infoRoles"];
											
											                for(var i = 0,len = o.length; i< len; i++) {
											                		var _node={id:o[i].roleCode,text:o[i].roleName,roleCode:o[i].roleCode,roleName:o[i].roleName};
											                        var n = this.createNode(_node);
											                        n.leaf=true;
											                        n.checked=true;
											                        if(n) {
											                                node.appendChild(n);
											                        }
											                }
											                node.endUpdate();
											                if(typeof callback == "function") {
											                        callback(this, node);
											                }
											        } catch(e) {
											                this.handleFailure(response);
											        }
											}
											loader.on("beforeload", function(treeLoader, node) {
											        //loader.baseParams["pageParam.parentDeptNo"] = node.attributes.deptNo;
											    });
											var tree=new Ext.tree.TreePanel({
												loader:loader,
												useArrows: true,
    										autoScroll: true,
    										animate: true,
										    enableDD: true,
										    //selModel: new Ext.tree.MultiSelectionModel(),
    										containerScroll: true
    										
											});
											
											var root=new Ext.tree.AsyncTreeNode({
												id:'0',
												text:'ȫѡ',
												nodeType: 'async',
												deptNo:'0',
												deptName:'ȫѡ'
											});
											
											tree.setRootNode(root);
											root.expand(false,false);
					            //tree.root.reload();
 

                    				var win=new Ext.Window({
												layout:'fit',
												width:500,
												height:300,
												closeAction:'hide',
												items:[tree],
												buttons:[{
													text:'ȷ��',
													handler:function(){
														//addForm.form.findField("parentDeptNo").setValue(tree.getSelectionModel().getSelectedNode().attributes.deptNo);
														//var roleCode=tree.getSelectionModel().getSelectedNode().attributes.roleCode;
														//alert(roleCode);
														var roleCodes="";
														/*Ext.each(tree.root.childNodes, function(child) {// ����ӽڵ�ȫ��checked
															if(child.attributes.checked!=null&&child.attributes.checked==true){
																roleCodes+=child.attributes.roleCode;
															}
														});
														*/
														for(var i=0;i<tree.root.childNodes.length;i++){
															var child=tree.root.childNodes[i];
															if(child.attributes.checked!=null&&child.attributes.checked==true){
																roleCodes+=child.attributes.roleCode;
																if(i<tree.root.childNodes.length-1){
																	roleCodes+=",";
																}
															}
														}
														//alert(roleCodes)
														var paras={};
								                        paras["pageParam.roleCodes"]=roleCodes;
								                        paras["pageParam.operNo"]=operNo;
								                        Ext.Ajax.request({
								                            url:"insertRuleOperRole.action",
								                            method:'post',
								                            params:paras,
								                            success: function(response) {
								                                var resp=Ext.decode(response.responseText);
								                                var ret=resp.ret;
								                            },
		                            
							                            failure: function(response, action) {
							                                    Ext.Msg.alert('Failure', 'Ajax communication failed');
							                                    return "1";
							                            }
		                        						});
														win.close();
														me.queryUser();			
													}
												}]
											});
										win.show();
							}
						}
					},'-',{
						xtype:'button',
						text:'���Ȩ��',
						handler:function(){
							var selectedRecords=sm.getSelections();
							var length=selectedRecords.length;
							if(length>1){
								Ext.example.msg('��ʾ��Ϣ','ֻ��ѡ�����е�һ��');
							}else if(length !=1){
								Ext.example.msg('��ʾ��Ϣ','��Ҫѡ�����е�һ��');
							}else{
								var operNo=selectedRecords[0].data.operNo;
								var paras={};
		                    	paras["pageParam.operNo"]=operNo;
		                    	ajaxSyncCall('deleteRuleOperRole.action',"pageParam.operNo="+operNo);
		                    	paras=getFormParams(queryPanel);
		                    	me.queryUser();
							}
	                    	
						}
						
					}],
					bbar:new Ext.PagingToolbar({
						store:store,
						displayInfo:true,
						displayMsg:'��ʾ�� {0} ���� {1} ����¼��һ�� {2} ��',
						emptyMsg:'û������'
					})
					
				});
				
				// ������
				frame = new Ext.Panel({
							iconCls : 'silk-user',
							layout : 'form',
							width : '100%',
							height : '100%',
							title : '�û���ɫ����',
							border : false,
							items : [queryPanel,gridPanel]
						});

				if (contianerId) {
					frame.render(contianerId);
					// init grid height to frame height
					gridPanel.setHeight(Ext.get(contianerId).getHeight() - queryPanel.getHeight() - frame.header.getHeight());
				}
			}
		};
		return me;
	}();
})();
Ext.onReady(function(){
	var oper=com.wems.admin.userAdmin.RuleOperRoleManager;
	oper.init('container');
})