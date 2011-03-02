

Ext.onReady(function(){
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true})
	var cm=new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),//���һ�����
        sm,//���� CheckBox��ѡ����
		{header:'����ID',dataIndex:'operNo',sortable:true},
		{header:'��������',dataIndex:'operName',sortable:true},
		{header:'��ɫ����',dataIndex:'roleCodes',sortable:true},
		{header:'��ɫ����',dataIndex:'roleNames',sortable:true}
	]);
	var ruleOperRoles=ajaxSyncCall("selectRuleOperRole.action").ruleOperRoles;
	
	var store=new  Ext.data.Store({
		proxy:new Ext.data.PagingMemoryProxy(ruleOperRoles),
		reader:new Ext.data.JsonReader({},[
			{name:'operNo'},
			{name:'operName'},
			{name:'roleCodes'},
			{name:'roleNames'}
		]),
		idProperty : 'operNo',
		sortInfo:{field:"operNo",direction:"asc"}
	});
	
	
	store.load({params:{start:0,limit:10}});
	var bbar=new Ext.PagingToolbar({
		pageSize:10,
		store:store,
		displayInfo:true,
		displayMsg:'��ʾ��{0}����{1}����¼��һ��{2}��',
		emptyMsg:'û�м�¼'
	});
	
	var tbar=new Ext.Toolbar(
    [
            '-',
            {
                    text:'�޸�Ȩ��',
                    handler:function(){
                    	var length=grid.getSelectionModel().getSelections().length;
                    	if(length!=1){
                    		Ext.Msg.alert("��ʾ","��Ҫѡ������һ������!");
                    		return;
                    	}
                    	var operNo=grid.getSelectionModel().getSelections()[0].data.operNo;
                    	
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
														paras={};
														paras=getFormParams(qryForm);
														paras["start"]=0;
														paras["limit"]=10;
														var ruleOperRoles=ajaxSyncCall("selectRuleOperRole.action","pageParam.operNo="+paras["operNo"]+"&"+"pageParam.operName="+paras["operName"]).ruleOperRoles;
														store.proxy=new Ext.data.PagingMemoryProxy(ruleOperRoles);
														store.reload({params:paras});				
													}
												}]
											});
											win.show();
                    }
            },
            '-',
            {
                    text:'���Ȩ��',
                    handler:function(){
                    	var length=grid.getSelectionModel().getSelections().length;
                    	if(length!=1){
                    		Ext.Msg.alert("��ʾ","��Ҫѡ������һ������!");
                    		return;
                    	}
                    	var operNo=grid.getSelectionModel().getSelections()[0].data.operNo;
											var paras={};
                    	paras["pageParam.operNo"]=operNo;
                    	ajaxSyncCall('deleteRuleOperRole.action',"pageParam.operNo="+operNo);
                    	paras=getFormParams(qryForm)
                    	paras.limit=10;
                    	paras.start=0;
                    	var ruleOperRoles=ajaxSyncCall("selectInfoDept.action","pageParam.operNo="+paras["operNo"]+"&"+"pageParam.operName="+paras["operName"]).infoDepts;
											store.proxy=new Ext.data.PagingMemoryProxy(ruleOperRoles);
											store.reload({params:paras});
                    }
                    
            },
            '-'
    ]);
	var grid=new Ext.grid.GridPanel({
		stripeRows:true,
		loadMask:true,
		autoHeight:true,
		selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
		store:store,
		cm:cm,
		bbar:bbar,
		tbar:tbar,
		viewConfig:{
			forceFit:true
		},
		listeners: {
			rowclick:function(e) {
				//Ext.Msg.alert('click','click');
			},
			rowdblclick:function(g, rIdx, e) {
				//alert('double click');
			}
		}
	});
	
	var qryForm=new Ext.form.FormPanel({
		id:'qryForm',
		title:'��ѯ����',
		frame:true,
	
		layout:'column',
		items:[{
				columnWidth:.33,
				layout:'form',
				defaultType:'textfield', 
				items:[{fieldLabel:'����',name:'operNo'}]
		},{
			columnWidth:.33,
			layout:'form',
			defaultType:'textfield', 
			items:[{fieldLabel:'����',name:'operName'}]
		},{
			
			items:[
				new Ext.Panel({
						layout: 'table',
						buttonAlign: 'center',
						buttons:[{
							text: '��  ѯ',
							handler: function() {
										var paras=getFormParams(qryForm);
										paras["start"]=0;
										paras["limit"]=10;
										var ruleOperRoles=ajaxSyncCall("selectRuleOperRole.action","pageParam.operNo="+paras["operNo"]+"&"+"pageParam.operName="+paras["operName"]).ruleOperRoles;
										store.proxy=new Ext.data.PagingMemoryProxy(ruleOperRoles);
										store.reload({params:paras});
						  		}
							},
							{
								text: '��  ��',
								handler: function() {
									Ext.getCmp('qryForm').form.reset();
								}
							}
						]
				})
			]
		}]
	});
	var isStore = new Ext.data.SimpleStore({
	    fields: ['value', 'text'],
	    data : [
	    	['0','��Ч'],
	    	['1','ʧЧ']
	    ]
	});
	

	
	var viewpoint=new  Ext.Panel({
		layout:'auto',
		items:[qryForm,grid]
	});
	
	
	var tabs=new Ext.TabPanel({
		autoDestroy: false,
		renderTo:Ext.get('container'),
		listeners:{
			activate:function(tab){
				tab.getUpdater().refresh();
			}
	    }
		
	});
	var tab1=tabs.add({
		id:Ext.id(),
		title:"����Ȩ�޲�ѯ�б�",
		items:[viewpoint],
		closable:false
	});
	
	

	tabs.activate(0);
	
});

function invokeJava(url,paras){
	Ext.Ajax.request({
		url:url,
		method:'post',
		params:paras,
		success: function(response) {
			var resp=Ext.decode(response.responseText);
			var ret=resp.ret;
			if(resp.msg==null||resp.msg==""){
				resp.msg="����ɹ�!";
			}
			if(ret==0){
				Ext.Msg.alert('Success', resp.msg);
			}
			else{
				Ext.Msg.alert('Failure', ""+resp.msg);
			}
			
	    },
	    
	    failure: function(response, action) {
	    	Ext.Msg.alert('Failure', 'Ajax communication failed');
	    	return "1";
	    }
	});


}

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