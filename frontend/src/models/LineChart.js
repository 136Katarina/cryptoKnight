var LineChart = function(container, title, data) {
  Highcharts.stockChart(container, {


    rangeSelector: {
      selected: 2
    },

    title: {
      text: title
    },

    series: [{
      name: 'Price (USD)',
      data: data,
      tooltip: {
        valueDecimals: 4
      }
    }]
  });
}

module.exports = LineChart;