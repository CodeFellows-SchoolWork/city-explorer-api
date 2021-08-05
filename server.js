'use strict';

const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

const WEATHER = process.env.WEATHER;

// let weatherData = require('./data/weather.json');

const { default: axios } = require('axios');



app.get('/', (request, response) => {
  response.send('Hello, Welcome to my server!')
});

app.get('/weather', getWeather)

function getWeather(request, response) {

  const cityName = request.query.searchQuery;
  const lat = request.query.lat;
  const lon = request.query.lon;
  // const city = (weatherData.find(city => city.city_name.toLowerCase() === cityName.toLowerCase()));


  if (lat && lon) {

    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER}`)
      .then(result => {
        let mappedData = [];
        result.data.data.map(day => {
          mappedData.push( new Forecast(day.valid_date, day.weather.description))});
          response.send(mappedData);
      });



  } else {
    response.status(500).send('Sorry this city was not found <br /> Please check the spelling of the city and try again.');
  }
};

function Forecast(date, description) {
  this.date = date;
  this.description = description;
}



app.get('/*', (request, response) => {
  response.status(404).send('Sorry the page is not found, <br> Please refresh the page <br> OR <br> return to http://localhost:3001/weather.')
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

