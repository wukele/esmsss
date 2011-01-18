

Ext.onReady(function(){
	
	
	var cm=new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer({header:"",width:30,align:"center"}),//添加一个编号
        new Ext.grid.CheckboxSelectionModel(),//增加 CheckBox多选框列
		{header:'工号ID',dataIndex:'operNo',sortable:true},
		{header:'工号名称',dataIndex:'operName',sortable:true},
		{header:'角色代码',dataIndex:'roleCodes',sortable:true},
		{header:'角色名称',dataIndex:'roleNames',sortable:true}
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
		displayMsg:'显示第{0}条到{1}条记录，一共{2}条',
		emptyMsg:'没有记录'
	});
	
	var tbar=new Ext.Toolbar(
    [
            '-',
            {
                    text:'修改权限',
                    handler:function(){
                    	var length=grid.getSelectionModel().getSelections().length;
                    	if(length!=1){
                    		Ext.Msg.alert("提示","需要选择其中一行数据!");
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
											                //从json中获得json数组，这里的key与Struts2返回的json对象中的key对应
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
												text:'全选',
												nodeType: 'async',
												deptNo:'0',
												deptName:'全选'
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
													text:'确定',
													handler:function(){
														//addForm.form.findField("parentDeptNo").setValue(tree.getSelectionModel().getSelectedNode().attributes.deptNo);
														//var roleCode=tree.getSelectionModel().getSelectedNode().attributes.roleCode;
														//alert(roleCode);
														var roleCodes="";
														/*Ext.each(tree.root.childNodes, function(child) {// 如果子节点全部checked
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
                    text:'清除权限',
                    handler:function(){
                    	var length=grid.getSelectionModel().getSelections().length;
                    	if(length!=1){
                    		Ext.Msg.alert("提示","需要选择其中一行数据!");
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
		title:'查询条件',
		frame:true,
	
		layout:'column',
		items:[{
				columnWidth:.33,
				layout:'form',
				defaultType:'textfield', 
				items:[{fieldLabel:'工号',name:'operNo'}]
		},{
			columnWidth:.33,
			layout:'form',
			defaultType:'textfield', 
			items:[{fieldLabel:'姓名',name:'operName'}]
		},{
			
			items:[
				new Ext.Panel({
						layout: 'table',
						buttonAlign: 'center',
						buttons:[{
							text: '查  询',
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
								text: '重  置',
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
	    	['0','生效'],
	    	['1','失效']
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
		title:"工号权限查询列表",
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
				resp.msg="处理成功!";
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