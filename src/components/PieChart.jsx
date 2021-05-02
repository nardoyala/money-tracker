import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import 'Styles/components/PieChart.scss';

am4core.useTheme(am4themes_animated);

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { category: 'Food', value: 150, icon: 'restaurant' },
        { category: 'Subscriptions', value: 17.22, icon: 'language' },
        { category: 'Liquor', value: 15, icon: 'liquor' },
        { category: 'Tech', value: 80, icon: 'devices' },
        { category: 'Pets', value: 25, icon: 'pets' },
        { category: 'Books', value: 12, icon: 'book' },
      ],
    };
  }

  componentDidMount() {
    this.generateChart();
  }

  generateChart() {
    const { data } = this.state;

    const container = am4core.create('chartdiv', am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = 'horizontal';

    // Create chart instance
    const chart = container.createChild(am4charts.PieChart);

    // Add data
    chart.data = data;
    chart.radius = am4core.percent(65);
    chart.numberFormatter.numberFormat = '#.';

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'category';
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.tooltipText = '{category} : {value.percent}%';

    // Labels
    pieSeries.labels.template.html = '<span class="material-icons">{icon}</span>';
    pieSeries.labels.template.maxWidth = 130;
    pieSeries.labels.template.wrap = true;
    pieSeries.alignLabels = false;
    pieSeries.ticks.template.stroke = '#111';
    pieSeries.ticks.template.strokeOpacity = 0.7;
    pieSeries.ticks.template.strokeWidth = 2;

    pieSeries.colors.list = [
      am4core.color('rgba(255, 99, 132, 1)'),
      am4core.color('rgba(54, 162, 235, 1)'),
      am4core.color('rgba(255, 206, 86, 1)'),
      am4core.color('rgba(75, 192, 192, 1)'),
      am4core.color('rgba(153, 102, 255, 1)'),
      am4core.color('rgba(255, 159, 64, 1)'),
    ];

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  render() {
    this.generateChart();
    return <div id="chartdiv" className="pie-chart" />;
  }
}

export default PieChart;
