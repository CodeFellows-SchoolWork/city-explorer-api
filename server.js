'use strict';

const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

const getHome = require('./modules/getHome');

const getWeather = require('./modules/getWeather');

const getMovie = require('./modules/getMovie');

const getCatchAll = require('./modules/getCatchAll');

app.get('/', getHome);
  
app.get('/weather', getWeather);

app.get('/movie', getMovie);

app.get('/*',getCatchAll);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

