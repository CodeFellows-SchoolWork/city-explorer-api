'use strict';

const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

let weatherData = require('./data/weather.json');



app.get('/', (request, response) => {
  response.send('Hello, Welcome to my server!')
});

app.get('/weather', getWeather)

function getWeather(request, response) {

  const cityName = request.query.searchQuery;
  const lat = request.query.lat;
  const lon = request.query.lon;
  const city = (weatherData.find(city => city.city_name.toLowerCase() === cityName.toLowerCase()));


  if (city) {
    const weatherArr = city.data.map(day => new Forecast(day));
    response.status(200).send(weatherArr);

  } else {
    response.status(500).send('Sorry this city was not found <br /> Please check the spelling of the city and try again.')
  }

};

function Forecast(day) {
  this.date = day.valid_date
  this.description = day.weather.description
}



app.get('/*', (request, response) => {
  response.status(404).send('Sorry the page is not found, <br> Please refresh the page <br> OR <br> return to http://localhost:3001/weather.')
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

