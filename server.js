'use strict';

const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const getHome = require('./modules/getHome');

const getWeather = require('./modules/getWeather');

const getMovie = require('./modules/getMovie');

app.get('/', getHome);
  
app.get('/weather', getWeather);

app.get('/movie', getMovie);

app.get('/*',getCatchAll);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

