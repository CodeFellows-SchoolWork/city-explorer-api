'use strict';


const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

require('dotenv').config();

const PORT = process.envPORT;

const weather = require('./modules/weather.js');

const getMovie = require('./modules/getMovie');

const cache = require('./modules/cache.js');

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.get('/movie', getMovie);

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
