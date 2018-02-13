var PieChart = function(container, title, data) {
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: {
      text: title
    },
    series: [{
      name: 'Value (USD)',
      data: data,
    }]
  })
}

module.exports = PieChart;