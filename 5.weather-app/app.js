const express = require('express');
const app = express();
const port = 3000;

// using https native way to get api data because request module is deprecated in 2020
const https = require('https');

app.get("/", (req, res) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=hindaun&appid=b9c647dd0761394f79570c1e5a79be7e';

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const lon = weatherData.coord.lon;
            const lat = weatherData.coord.lat;
            const temp = weatherData.main.temp;
            const wind = weatherData.wind.speed;
            const name = weatherData.name;

            res.send(`<h6>The Temperature in ${name} with longitude ${lon} and latitude ${lat} is ${temp} and wind speed is ${wind}</h6>`);
        });
    });
});

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});