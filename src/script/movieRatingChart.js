function movieRating(myData) {

  const decades = myData.map(item => item.Decade);
  const bestRatings = myData.map(item => parseFloat(item.Best_Rating)); 
  const worstRatings = myData.map(item => parseFloat(item.Worst_Rating)); 
  const bestMovieNames = myData.map(item => item.Best_Movie);
  const worstMovieNames = myData.map(item => item.Worst_Movie);

  Highcharts.chart('movieRating', {
    chart: {
      type: 'column',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
      text: 'Mejor-Peor película por década'
    },
    xAxis: {
      categories: decades,
      title: {
        text: 'Década'
      }
    },
    yAxis: {
      title: {
        text: 'Calificación'
      }
    },
    series: [{
      name: 'Mejor calificación',
      data: bestRatings.map((rating, index) => ({
        y: rating,
        name: bestMovieNames[index],
      })),
      color: 'rgba(54, 162, 235, 0.5)'
    }, {
      name: 'Peor calificación',
      data: worstRatings.map((rating, index) => ({
        y: rating,
        name: worstMovieNames[index],
      })),
      color: 'rgba(255, 99, 132, 0.5)'
    }]
  });
}