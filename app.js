const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const exp = require("constants");
const ejs=require("ejs");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(express.static("assets"));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  res.render("index");

});
app.post("/", function(req, res) {
    const query = req.body.cityName;
    const appKey = "094f27ffffdbfd6b0398b54303c32237";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?units="+ units + "&q=" + query + "&appid="+ appKey;
    https.get(url, function(response) {
      console.log(response.statusCode);
      console.log(response.statusMessage);
  
      response.on("data", function(data) {
  
        const weatherData = JSON.parse(data);
        temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        console.log(icon);
        const iconUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
        res.render("index",{temp: temp});

      })
    })

})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})