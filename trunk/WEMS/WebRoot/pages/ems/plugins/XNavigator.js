Ext.ns('Ems.plugin');

Ems.plugin.NavigatorItem = Ext.extend(Ext.Component, {
			constructor : function(cfg) {
				cfg = cfg || {};

				this.width = cfg.width || 30;
				this.height = cfg.height || 15;
				this.img = cfg.img;
				this.title = cfg.title || '&nbsp;';
				this.imgActive = cfg.imgActive || cfg.imgAtv;
				this.imgVisited = cfg.imgVisited || cfg.imgVsd;
				this.pageId = cfg.pageId;
				this.pageType = cfg.pageType;

				Ems.plugin.NavigatorItem.superclass.constructor.call(this, cfg);

			},
			initComponent : function(cfg) {
				Ems.plugin.NavigatorItem.superclass.initComponent.call(this,
						cfg);

				this.html = {
					tag : 'a',
					href:'#',
					cn : [{
								tag : 'div',
								style : {
									width : this.width+'px',
									height : this.height+'px'
								},
								html : this.title
							}]
				};

				if (this.html) {
					if (this.img) {
						this.html.cn[0].style['background']='url(\''+this.img+'\') no-repeat center center';
						this.html.cn[0].style['line-height']=this.height+'px';
					}
				}
				
				this.addClass('x-navigator-item');
				
				this.on('afterrender',this.afterRender,this);
			},
			afterRender : function(ct, pot) {
				Ems.plugin.NavigatorItem.superclass.afterRender.call(this);
				var dh = Ext.DomHelper;
				if(ct instanceof Ems.plugin.NavigatorItem){

					if (this.img) {
						ct.el.on('mouseout', this.imgOut, this);
					}
					if (this.imgActive)
						ct.el.on('mouseover', this.imgOver, this);

					if (this.imgVisited)
						ct.el.on('mousedown', this.imgVisited, this);
					ct.el.on('click', this.visit, this);
				}
			},

			imgOver : function(e, t) {
				Ext.get(t).applyStyles({background: 'url(\''+this.imgActive+'\') no-repeat center center'});
				
			},
			imgVisited : function(e, t) {
				Ext.get(t).applyStyles({background: 'url(\''+this.imgVisited+'\') no-repeat  center center'}) ;
			},
			imgOut : function(e, t) {
				Ext.get(t).applyStyles({background: 'url(\''+this.img+'\') no-repeat  center center'});
			},
			visit : function(e, t) {
				//###需修改。完善url和page信息
				 Ext.getCmp('content-panel').load({
				 url:'',
				 params:{
				 page_id:'',
				 page_type:''
				 },
				 scripts:true
				 });
			}
		});
Ext.reg('xnavitem', Ems.plugin.NavigatorItem);

Ems.plugin.Navigator = Ext.extend(Ext.Component, {
	constructor : function(cfg) {

		cfg = cfg || {};
		this.img = cfg.img;
		this.width = cfg.width || 100;
		this.height = cfg.width || 54;
		this.items = cfg.items;

		Ems.plugin.Navigator.superclass.constructor.call(this, cfg);
	},
	initComponent : function() {
		var dh = Ext.DomHelper;
		this.layout = 'column';

		this.html = [{
					tag : 'div',
					cls : 'x-navigator-img',
					style : {
						width : this.width + 'px',
						height : this.height + 'px'
					},
					cn : {
						tag : 'img',
						cls : 'x-navigator-img',
						src : this.img
					}
				}, {
					tag : 'div',
					cls : 'x-navigator-side',
					html : '&nbsp;'
				}, {
					tag : 'div',
					cls : 'x-navigator-items'
				}, {
					tag : 'div',
					cls : 'x-navigator-side',
					html : '&nbsp;'
				}];

		this.on({
					'afterrender' : this.afterRender,
					scope : this
				});
		Ems.plugin.Navigator.superclass.initComponent.call(this);
	},
	afterRender : function(c) {
		Ems.plugin.Navigator.superclass.afterRender.call(this);

		if (c instanceof Ems.plugin.Navigator) {
			if (this.items && this.items.length > 0) {
				Ext.each(this.items, function(it, idx, all) {
							if (it instanceof Ems.plugin.NavigatorItem) {
								it
										.render(c.getEl()
												.query('.x-navigator-items')[0]);
							} else
								throw new TypeError('类型错误需要Ems.plugin.NavigatorItem');
						});
			}
			var navItemCt = c.getEl().query('.x-navigator-items')[0];
			var navImg = c.getEl().query('.x-navigator-img')[0];
			var navItems = Ext.get(navItemCt).query('.x-navigator-item');
			var navItemHeight = (navItems && navItems.length > 0) ? Ext
					.get(navItems[0]).getHeight() : 0;
			var marginTop = 0;
			marginTop = (Ext.get(navImg).getHeight() - navItemHeight) / 2;

			if (marginTop > 0)
				Ext.get(navItemCt).applyStyles({
							marginTop : marginTop + 'px'
						});
		}
	}
});

Ext.reg('xnav', Ems.plugin.Navigator);
