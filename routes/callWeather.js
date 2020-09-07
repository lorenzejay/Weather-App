const request = require("request");

const callWeather = (location, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a0402304552640f488fb09a34f262bd5&units=imperial`;

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
