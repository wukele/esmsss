/**
 * @author zhangchangfeng
 */

Ext.namespace('Ems.component');


Ems.component.TemperatureBox=Ext.extend(Ext.BoxComponent,{
	
	ImageON:'image/TemperatureBoxOn.jpg',
	ImageOff:'image/TemperatureBoxOff.jpg',
	
	constructor:function(config){
		config=config||{};	
		this.Height=config.height||100;
		this.Width=config.width||100;
		config.autoEl={  
			tag:'div',
			html:'<div style=" background-image:url(image/TemperatureBoxOn.jpg);background-repeat:no-repeat;"><table height=169 width=186><tr><td><div style="position:relative;top:43;left:50;" onclick="parentElement.parentElement.parentElement.parentElement.parentElement.style.backgroundImage=\'url(image/TemperatureBoxOff.jpg)\';__sendCommand(1);">&nbsp;</div><div style="cursor:hand;position:relative;top:50;left:50;" onclick="parentElement.parentElement.parentElement.parentElement.parentElement.style.backgroundImage=\'url(image/TemperatureBoxOn.jpg)\';__sendCommand(2);">&nbsp;</div></td></tr></table></div>' 
		}  

		
		Ems.component.TemperatureBox.superclass.constructor.call(this, config);
		this.on({
		'render':this.OnRender,
		 scope:this
		});
	},
	OnRender:function(e){
		//alert(e.getEl());
		//alert(e.autoEl);
		/*e.getEl().on({
			'click':this.sendCommand,
			scope:this
		})*/
	},
	setValues:function(val){
		if(val){
			//this.getEl().dom.src=this.ImageON;
			alert("setValues:function on");
		}else{
			//this.getEl().dom.src=this.ImageOff;
			alert("setValues:function off");
		}
	},
	sendCommand:function(e){
		//alert(e.getEl())
		alert(e.target);
		alert("onclik->sendCommand");
	}

});

function __sendCommand(val){
	var paras={};
	paras["controlCommand.setupValue"]=val;
	invokeJava("insertControlCommand.action",paras);
		//alert(val);		
}

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
Ext.reg('TemperatureBox',Ems.component.TemperatureBox);