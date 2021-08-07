'use strict';

module.exports = getMovie;

const axios = require('axios');

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
