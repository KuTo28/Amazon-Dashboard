function movieCountYear(myData) {

    const chartData = myData.map(item => ({
        x: parseInt(item.Release),
        y: parseInt(item.Counter)  
    }));

    Highcharts.chart('moviesCountYear', {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)', 
          },
        title: {
            text: 'Películas por año'
        },
        xAxis: {
            title: {
                text: 'Año'
            }
        },
        yAxis: {
            title: {
                text: 'Número de Películas'
            }
        },
        series: [{
            name: 'Número de Películas por Año',
            data: chartData,
            type: 'line',
            color: 'rgba(75, 192, 192, 1)', // Color de la línea
            lineWidth: 2, // Ancho de la línea
            marker: {
                enabled: true,
                symbol: 'circle',
                radius: 4
            }
        }]
    });
}