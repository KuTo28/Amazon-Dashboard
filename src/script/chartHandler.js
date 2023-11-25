async function call(query) {
    let url = "./php/conexion.php?q=" + query;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error in database response: ${response.status}");
    }

    return response.json();
}

async function getMpaaCount() {
    //Call
    let data = await call(
        "SELECT MPAA_Rating, COUNT(*) AS cantidad_peliculas FROM dataset_amazon_movies WHERE MPAA_Rating IS NOT NULL AND MPAA_Rating <> '' GROUP BY MPAA_Rating");

    return {
        G: data[0],
        PG: data[1],
        PG13: data[2],
        R: data[3]
    };
}

async function getMovieRating() {
    //Call
    let data = await call(
        "SELECT Decade, MAX(title) AS Best_Movie, MAX(Movie_Rating) AS Best_Rating, MIN(title) AS Worst_Movie, MIN(Movie_Rating) AS Worst_Rating FROM ( SELECT title, Movie_Rating, ReleaseYear, CONCAT(LEFT(ReleaseYear, 3), '0s') AS Decade FROM dataset_amazon_movies WHERE CAST(LEFT(ReleaseYear, 4) AS UNSIGNED) > 1929) AS Movies GROUP BY Decade");

    const formattedData = data.map((item, index) => ({
        Decade: item.Decade,
        Best_Movie: item.Best_Movie,
        Best_Rating: item.Best_Rating,
        Worst_Movie: item.Worst_Movie,
        Worst_Rating: item.Worst_Rating
    }));
    return formattedData;
}

async function getCountMovieYear() {
    //Call
    let data = await call(
        "SELECT ReleaseYear, COUNT(*) AS NumeroPeliculas FROM dataset_amazon_movies WHERE ReleaseYear >= 1929 GROUP BY ReleaseYear ORDER BY ReleaseYear;");

    const formattedData = data.map((item, index) => ({
        Release: item.ReleaseYear,
        Counter: item.NumeroPeliculas
    }));
    return formattedData;
}

async function getMoviesActor(actorName) {
    //Call
    let data = await call(
        `SELECT title, Movie_Rating FROM dataset_amazon_movies WHERE FIND_IN_SET('${actorName}', Starring) > 0 ORDER BY Movie_Rating ASC;`);
    
    const formattedData = data.map((item, index) => ({
        Title: item.title,
        Movie_Rating: item.Movie_Rating
    }));
    console.log(formattedData);
    return formattedData;
}

getMpaaCount().then((data) => mpaaRating(data));
getMovieRating().then((data) => movieRating(data));
getCountMovieYear().then((data) => movieCountYear(data));