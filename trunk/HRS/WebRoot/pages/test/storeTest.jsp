<%-- 
    Document   : storeTest
    Created on : 2010-12-6, 15:38:39
    Author     : hooxin
--%>

<%@page contentType="text/html" pageEncoding="GBK"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%
            String cp = request.getContextPath();
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=GBK">
        <title>extjs store test</title>

        <script type="text/javascript"
        src="<%=cp%>/ext3/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="<%=cp%>/ext3/ext-all.js"></script>
        <link href="<%=cp%>/ext3/resources/css/ext-all.css" rel="stylesheet"
              type="text/css"/>
        <script type="text/javascript">
            Ext.onReady(function(){
                com.hrs.ext.test.storeRecord.init();
            });

            Ext.ns('com.hrs.ext.test');
            com.hrs.ext.test.storeRecord = function(){
                var viewport;
                var editorGird;
                var cm;
                var sm;
                var testStore;

                var data={result:[{userId:1,username:'ffmmx',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:2,username:'ffmmx2',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:3,username:'ffmmx3',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:4,username:'ffmmx4',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:5,username:'ffmmx5',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:6,username:'ffmmx6',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:7,username:'ffmmx7',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:8,username:'ffmmx8',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:9,username:'ffmmx9',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:10,username:'ffmmx10',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'},
                        {userId:11,username:'ffmmx11',password:'password',email:'firefoxmmx@gmail.com',address:'我晓得你住哪里',phone:'123123123123'}]};
                data['count']=data.result.length;
                data['msg']='loading...';

                testStore=new Ext.data.Store({
                    autoLoad:true,
                    proxy:new Ext.data.MemoryProxy(data),
                    reader:new Ext.data.JsonReader({
                        idProperty: 'userId',
                        root: 'result',
                        totalProperty: 'count',
                        'Ext.data.DataReader.messageProperty': 'msg',
                        fields:[{name:'userId',mapping:'userId'},
                            {name:'username',mapping:'username'},
                            {name:'email',mapping:'email'},
                            {name:'address',mapping:'address'},
                            {name:'phone',mapping:'phone'}]
                        
                    })
                });
                testStore.load({params:{start:0,end:6,limit:6}});
                
                return {
                    init:function(){
                        sm = new Ext.grid.CheckboxSelectionModel();
                        var fm=Ext.form;
                        cm = new Ext.grid.ColumnModel({
                            defaults: {
                                sortable: true // columns are not sortable by default
                            },
                            columns:[sm,
                                {
                                    id: 'userId',
                                    header: '用户ID',
                                    dataIndex: 'userId',
                                    width: 220,
                                    // use shorthand alias defined above
                                    editor: new fm.TextField({
                                        allowBlank: false
                                    })
                                },
                                {
                                    header: '用户名',
                                    dataIndex: 'username',
                                    width: 220,
                                    // use shorthand alias defined above
                                    editor: new fm.TextField({
                                        allowBlank: false
                                    })
                                },
                                {
                                    header: '密码',
                                    dataIndex: 'password',
                                    width: 220,
                                    // use shorthand alias defined above
                                    editor: new fm.TextField({
                                        allowBlank: true,
                                        inputType:'password'
                                    })
                                },
                                {
                                    header: '邮箱',
                                    dataIndex: 'email',
                                    width: 220,
                                    // use shorthand alias defined above
                                    editor: new fm.TextField({
                                        allowBlank: true
                                    })
                                },
                                {
                                    header: '地址',
                                    dataIndex: 'address',
                                    width: 220,
                                    // use shorthand alias defined above
                                    editor: new fm.TextField({
                                        allowBlank: true
                                    })
                                },
                                {
                                    header: '电话',
                                    dataIndex: 'phone',
                                    width: 220,
                                    // use shorthand alias defined above
                                    editor: new fm.TextField({
                                        allowBlank: true
                                    })
                                }
                            ]
                        });
                        editorGird=new Ext.grid.EditorGridPanel({
                            store:testStore,
                            sm:sm,
                            cm:cm,
                            enableScroll:true,
                            layout:'column',
                            autoHeight:true,
                            bbar:[{xtype:'button',name:'add',text:'添加',handler:function(){
                                        
                                        var rec=new Ext.data.Record({userId:testStore.getCount()+1,username:'',password:'',email:'',address:'',phone:''});
                                        testStore.insert(testStore.getCount(), rec);
                            }},{xtype:'button',name:'del',text:'删除',handler:function(){
                                var selectedDatas=this.ownerCt.ownerCt.getSelectionModel().getSelections();
                                testStore.remove(selectedDatas);
                            }}]
                        });

                        viewport=new Ext.Viewport({
                            layout:'auto',
                            enableScroll:true,
                            items:[
                                editorGird
                            ]
                        });
                    }
                };
            }();
        </script>
    </head>

    <body>

    </body>
</html>
