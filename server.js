'use strict';

const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const { default: axios } = require('axios');

const PORT = process.env.PORT;

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.get('/', (request, response) => {
  response.send('Hello, Welcome to my server!')
});

app.get('/weather', getWeather)

function getWeather(request, response) {

  const lat = request.query.lat;
  const lon = request.query.lon;

  if (lat && lon) {

    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`)
      .then(result => {
        let mappedData = [];
        result.data.data.map(day => {
          mappedData.push(new Forecast(day))
        });
        response.send(mappedData);
      });

  } else {
    response.status(500).send('Sorry this city was not found <br /> Please check the spelling of the city and try again.');
  };
};

function Forecast(day) {
  this.date = day.valid_date;
  this.description = day.weather.description;
  this.lowTemp = day.low_temp;
  this.highTemp = day.high_temp;
};

app.get('/movie', getMovie)

function getMovie(request, response) {
  const cityName = request.query.searchQuery.split(' ')[0];

  if (cityName) {
    axios.get(`http://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`)
      .then(result => {
        let mappedData = [];

        const movieToShow = result.data.results.filter(movie => movie.poster_path)

        movieToShow.map(movie => {
          mappedData.push(new MovieList(movie))
        });
        response.send(mappedData);
      });
  } else {
    response.status(500).send('Sorry this city was not found <br /> Please check the spelling of the city and try again.');
  };
};

function MovieList(movie) {
  this.title = movie.original_title;
  this.overview = movie.overview;
  this.release_date = movie.release_date;
  this.poster_path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
};

app.get('/*', (request, response) => {
  response.status(404).send('Sorry the page is not found, <br> Please refresh the page <br> OR <br> return to http://localhost:3001/weather.')
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

