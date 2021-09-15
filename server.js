"use strict";
const express = require('express');
const app = express();
const cros = require("cors");
const axios = require("axios");
require("dotenv").config();

app.use(cros());
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).json("message:im working");

})
let watherHandler = async (req, res) => {
    let city_name = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city_name}&key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}`;
    let resAxios = await axios.get(url);
    let dataWaather = resAxios.data;
    let wanteddata = dataWaather.data.map(item => {
        return new Forcast(item.datatime, item.weather.description);

    })
    res.status(200).json(wanteddata);

}

app.get('/weather', watherHandler)
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)

})




let movieHandler=async (req, res) => {
    let cityQury = req.query.city;
    console.log(cityQury);
    const movies = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityQury}`;
    axios.get(movies).then(movieValu => {
      console.log(movieValu.data.results[0].title);
  
      let movieInformation = movieValu.data.results.map((item) => {
        return new Movie(item);
      });
      
      res.send(movieInformation);
    })
      .catch(err => {
        res.send(err.message);
      });
  
  };
  app.get('/movies',movieHandler) 

class Forcast {
    constructor(data, description) {
        this.data = data;
        this.description = description
    }
}
class Movie {
    constructor(item) {
        this.title = item.original_title,
            this.overview = item.overview,
            this.average_votes = item.vote_count,
            this.image_ur = item.image_ur,
            this.popularity = item.popularity,
            this.released_on = item.release_date;
    }
}