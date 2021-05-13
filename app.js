const express = require("express")
const app = express()
const https = require("https")




app.get("/",(req,res)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?&q=London&appid=6309c5c951f00ab641af8f0a80c1397b&units=metric"
    https.get(url, (response)=>{
        console.log(response.statusCode)

        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The Weather is currently "+ desc + "</p>")
            res.write("<h1>The Temperature in London is " + temp + " degrees Celcius.</h1>")
            res.write("<img src="+imageUrl+">")
            res.send()
        })
    })
})

app.listen(3000,()=>{
    console.log("Server is running at port 3000.")
})