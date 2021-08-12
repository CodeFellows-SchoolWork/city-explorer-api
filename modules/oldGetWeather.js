'use strict';

module.exports = getWeather;

const axios = require('axios');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

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

  function Forecast(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.lowTemp = day.low_temp;
    this.highTemp = day.high_temp;
  };
  
};
