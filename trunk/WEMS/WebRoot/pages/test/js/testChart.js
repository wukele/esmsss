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
    var store = new Ext.data.JsonStore({
        fields:['name', 'visits', 'views'],
        data: [
            {name:++idx, visits: 245000, views: 3000000},
            {name:++idx, visits: 240000, views: 3500000},
            {name:++idx, visits: 355000, views: 4000000},
            {name:++idx, visits: 375000, views: 4200000},
            {name:++idx, visits: 490000, views: 4500000},
            {name:++idx, visits: 495000, views: 5800000},
            {name:++idx, visits: 520000, views: 6000000},
            {name:++idx, visits: 620000, views: 7500000}
        ]
    });

    // extra extra simple
    new Ext.Panel({
        title: 'ExtJS.com Visits Trend, 2007/2008 (No styling)',
        renderTo: 'container',
        width:500,
        height:300,
        layout:'fit',

        items: {id:'t1',
            xtype: 'linechart',
            store: store,
            xField: 'name',
            yField: 'visits',
			listeners: {
				itemclick: function(o){
					var rec = store.getAt(o.index);
					Ext.example.msg('Item Selected', 'You chose {0}.', rec.get('name'));
				}
			}
        }
    });

    function changeStore(){
    	
    	if(store.getCount()>=storeCount)
    		store.removeAt(0);
    	store.add(new Ext.data.Record({name:++idx, visits: Math.random()*1000000, views: 3000000},idx));
    	
    }
  	window.setInterval(changeStore,2000);
});