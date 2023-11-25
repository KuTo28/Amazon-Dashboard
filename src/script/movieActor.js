// Inicializa el gráfico sin datos
const initialChartData = {
    chart: {
        type: 'column',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
        text: 'Películas protagonizadas por un actor'
    },
    xAxis: {
        categories: [],
        title: {
            text: 'Película'
        }
    },
    yAxis: {
        title: {
            text: 'Calificación'
        }
    },
    series: [{
        name: 'Calificación',
        data: [],
        color: 'rgba(54, 162, 235, 0.5)'
    }]
};

// Crea el gráfico con datos iniciales
const movieActorChart = Highcharts.chart('movieActor', initialChartData);

// Manejar el evento de envío del formulario
const searchForm = document.getElementById('searchForm');
const actorNameInput = document.getElementById('actorName');

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue

    const actorName = actorNameInput.value;

    // Llama a la función getMoviesActor con el nombre del actor ingresado
    const moviesData = await getMoviesActor(actorName);

    // Verifica si hay datos antes de actualizar el gráfico
    if (moviesData.length > 0) {
        const names = moviesData.map(item => item.Title);
        const movieRatings = moviesData.map(item => parseFloat(item.Movie_Rating));

        // Actualiza el gráfico con los nuevos datos
        movieActorChart.update({
            title: {
                text: `Calificaciones de películas protagonizadas por ${actorName}`
            },
            xAxis: {
                categories: names,
                title: {
                    text: 'Película'
                }
            },
            series: [{
                data: movieRatings.map((rating, index) => ({
                    y: rating,
                    name: names[index],
                })),
            }]
        });
    }else{
        movieActorChart.series[0].setData([], true);
        movieActorChart.setTitle({ text: `No hay datos para ${actorName}` });
    }
});
