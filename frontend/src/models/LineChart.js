var LineChart = function(container, title, data) {
  Highcharts.stockChart(container, {


    rangeSelector: {
      selected: 1
    },

    title: {
      text: title
    },

    series: [{
      name: 'Price (USD)',
      data: data,
      type: 'spline',
      tooltip: {
        valueDecimals: 2
      }
    }]
  });
}

module.exports = LineChart;