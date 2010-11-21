function  LoginPageInit(){
	Ext.QuickTips.init();

    // turn on validation errors beside the field globally
    Ext.form.Field.prototype.msgTarget = 'qtip';

    var bd = Ext.getBody();


    var LoginForm = new Ext.FormPanel({
        labelWidth: 75, // label settings here cascade unless overridden
        frame:true,
        method:'POST',
        title: 'Login to huawei system',
        onSubmit: Ext.emptyFn,
       	submit: function() 
       	{
           this.getEl().dom.action= 'login.action'; //���ӵ���������url��ַ
           this.getEl().dom.submit();
       	},
        bodyStyle:'padding:5px 5px 0',
        width: 350,
        defaults: {width: 230},
        defaultType: 'textfield',
        items: [{
                fieldLabel: 'username',
                name: 'username',
                allowBlank:false
            },{
                fieldLabel: 'password',
                name: 'password'
            }
        ],
        buttons: [{
            text: 'Login',
            handler:function(){
            	LoginForm.form.submit();
            }
        },{
            text: 'Reset'
        }]
    });
    
    
	var LoginWindow=new Ext.Window({
			closable:false,
			resizable:false,
			draggable:false,
			width:350,
			height:170,
			items:[LoginForm]
	});
	LoginWindow.show();
}


Ext.onReady(LoginPageInit);