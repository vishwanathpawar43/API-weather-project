const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const {
    urlencoded
} = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const city = req.body.cityName;
    const appid = "42f8d3e30731db91529de7507dc800f1";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=metric";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            res.write("Temp in " + city + " is " + temp);
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
})