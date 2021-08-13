'use strict';

let cache = require('./cache.js');

require('dotenv').config();

module.exports = getMovie;

const axios = require('axios');

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

async function getMovie(request, response) {
  const cityName = request.query.searchQuery.split(' ')[0];
  const key = 'movie-' + cityName;
  const url = `http://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    return cache[key].data;

  } if (!cache[key]) {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();

    let pasCache = await axios.get(url);
    console.log(pasCache);
    let mappedData = [];
    const movieToShow = pasCache.data.results.filter(movie => movie.poster_path)

    movieToShow.map(movie => {
      mappedData.push(new MovieList(movie))
    });

    cache[key].data = mappedData;
    response.send(mappedData);
    
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
