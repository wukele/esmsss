/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.chart.Chart.CHART_URL = '../../ext3/resources/charts.swf';

Ext.onReady(function(){

	var idx=0;
	var storeCount=8;
	var series;
	 series=[{

      type: 'line',

      displayName: 'views',

      yField: 'views',

      style: {

          color: 0xCCCCCC,

//          image: 'img/star_red.png',

          mode: 'stretch'

      }

  }, {

      type: 'line',

      displayName: 'visits',

      yField: 'visits',

      style: {

          color: 0xCCCCCC,

//          image: 'img/star_green.png',

          mode: 'stretch'

      }

  }];

    var store = new Ext.data.JsonStore({
        fields:['name', 'visits', 'views'],
        data: [
            {name:++idx, visits: '245000', views: 3000000}
        ]
    });

    // extra extra simple
    new Ext.Panel({
        title: 'ExtJS.com Visits Trend, 2007/2008 (No styling)',
        renderTo: 'container',
        width:500,
        height:300,
        layout:'fit',

        items: {
            xtype: 'linechart',
            store: store,
            xField: 'name',
            listeners: {
				itemclick: function(o){
					var rec = store.getAt(o.index);
					Ext.example.msg('Item Selected', 'You chose {0}.', rec.get('name'));
				}
			},
			series:series
        }
    });

    function changeStore(){
    	
    	if(store.getCount()>=storeCount)
    		store.removeAt(0);
    	store.add(new Ext.data.Record({name:++idx, visits: Math.random()*1000000+'', views: ''+Math.random()*1000000},idx));
    	
    }
  	window.setInterval(changeStore,2000);
});