"use strict";
const express=require('express');
const app=express();
const Port=8080;
const cors=require('cors');
app.use(cors());
require('dotenv').config();
const weather = require('./data/weather.json')



app.get('/data',(req,res)=>{
    let city=weather[2];
     let reqData=city.data.map(day=>{
         return{
         date:day.valid_date,
         description:day.weather.description,
         }
     })
     let customRespone={
        forecast:reqData,
        city_name:city.city_name   
    }
    res.status(200).json(customRespone);
});



app.listen(Port, ()=>{
    console.log(`lisen to ${Port}`)
});