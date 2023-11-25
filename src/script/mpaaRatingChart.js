function mpaaRating(myData) {

  const dataSeries = Object.values(myData).map(item => ({
    name: item.MPAA_Rating,
    y: parseInt(item.cantidad_peliculas), // Convertir a entero el valor de cantidad_peliculas
  }));

  Highcharts.chart('mpaaRating', {
    chart: {
      type: 'pie',
      backgroundColor: 'rgba(0,0,0,0)', 
    },
    title: {
      text: 'Películas por MPAA',
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
      }
    },
    series: [
      {
        name: "Películas",
        colorByPoint: true,
        data: dataSeries,
      },
    ],
  });
}