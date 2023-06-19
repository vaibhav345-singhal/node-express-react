const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// using https native way to get api data because request module is deprecated in 2020
const https = require('https');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.city;
    const key = "b9c647dd0761394f79570c1e5a79be7e";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const lon = weatherData.coord.lon;
            const lat = weatherData.coord.lat;
            const temp = weatherData.main.temp;
            const wind = weatherData.wind.speed;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const visibility = weatherData.visibility;


            res.write("<p>The weather is currently " + description + "<p>");

            res.write("<img src = http://openweathermap.org/img/wn/" + icon + "@2x.png>");


            res.write("<h4>Wind speed is " + wind + " and visibility is " + visibility + "</h4><br>");

            res.write("<h2>The Temperature in " + query + " with longitude " + lon + " and latitude " + lat + " is " + temp + " degree celsius </h2><br>");


            res.send();
        });
    });
})
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});