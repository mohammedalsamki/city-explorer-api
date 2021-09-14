"use strict";
const express =require('express');
const app= express();
const cros=require("cors");
const axios = require("axios");
require("dotenv").config();

app.use(cros());
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.status(200).json("message:im working");

})
let watherHandler =async(req,res)=>{
    let city_name =req.query.searchQuery;
    let lat =req.query.lat;
    let lon =req.query.lon;

    let url=`https://api.weatherbit.io/v2.0/forecast/daily?city=${city_name}&key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}`;
    let resAxios =await axios.get(url);
    let dataWaather =resAxios.data;
    let wanteddata =dataWaather.data.map(item=>{
        return new Forcast(item.datatime,item.weather.description);

    })
    res.status(200).json(wanteddata);

}
app.get('/weather',watherHandler)
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)

})
class Forcast{
    constructor(data,description){
        this.data=data;
        this.description=description
    }
}