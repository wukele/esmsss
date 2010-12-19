package com.res.chart;


import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.axis.ValueAxis;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.xy.StandardXYItemRenderer;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;
import org.springframework.stereotype.Component;

import com.opensymphony.xwork2.ActionSupport;


@Component("AppChart")
public class AppChart extends ActionSupport {
	private JFreeChart chart;

	public String execute() throws Exception {
		// chart creation logic...
		/*XYSeries dataSeries = new XYSeries(new Integer(1)); //pass a key for this serie
		for (int i = 0; i <= 100; i++) {
			dataSeries.add(i, RandomUtils.nextInt());
		}
		XYSeriesCollection xyDataset = new XYSeriesCollection(dataSeries);

		ValueAxis xAxis = new NumberAxis("Raw Marks");
		ValueAxis yAxis = new NumberAxis("Moderated Marks");

		// set my chart variable
		chart =
			new JFreeChart(
				"Moderation Function",
				JFreeChart.DEFAULT_TITLE_FONT,
				new XYPlot(
					xyDataset,
					xAxis,
					yAxis,
					new StandardXYItemRenderer(StandardXYItemRenderer.LINES)),
				false);
		chart.setBackgroundPaint(java.awt.Color.white);*/

		return super.SUCCESS;
	}

	public JFreeChart getChart() {
		return chart;
	}
}
