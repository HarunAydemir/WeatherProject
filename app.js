const { json, query } = require('express');
const express=require('express');
const https = require("https");
const bodyParser = require("body-parser");


const app  = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {

   res.sendFile(__dirname+"/index.html")


})

app.post("/",function (req,res) {

const Query =req.body.cityName;
const ApıKey ="526ead784b76e8d2dbfdf714414d408b";
const units= "metric";
const url ="https://api.openweathermap.org/data/2.5/find?q="+Query+"&units="+units+"&appid="+ApıKey;

https.get(url,function(response) {
   
    response.on("data",function (data) {
        const weatherdata= JSON.parse(data)
        const heat = weatherdata.list[0].main.temp
        const Condition =weatherdata.list[0].weather[0].description
        const icon = weatherdata.list[0].weather[0].icon
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
       res.write("<p>The weather in "+Query+" is  "+Condition+" currently</p>")
       res.write("<h1>The degree is "+ heat +" celcius.</h1>")
       res.write("<img src="+imageUrl+">")
    })
})

})



app.listen(3000,function () {
    console.log("Server is running on port 3000.");
})