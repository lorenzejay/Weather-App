const request = require("request");
require("dotenv").config();

const api_key = process.env.API_KEY;

const callWeather = (location, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=imperial`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to to connect to weather services", undefined);
    } else {
      const weather = response.body.main;
      const temperature = weather.temp;
      const weatherDescriptions = response.body.weather;
      const clouds = response.body.clouds.all;
      console.log(response.body);
      callback(undefined, {
        data: weatherDescriptions,
        isCloudy: clouds,
        temperature: temperature,
        feelsLike: weather.feels_like,
        high: weather.temp_max,
        low: weather.temp_min,
      });
    }
  });
};

module.exports = callWeather;
