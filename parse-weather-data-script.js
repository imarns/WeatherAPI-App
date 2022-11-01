
import * as fs from "fs";

//Importing JSON string and converting to JS Object
import {readFileSync } from 'fs';
const importFile = readFileSync("./weather-data.json", "utf8");
const obj = JSON.parse(importFile);

//Create empty array to store data
var WeatherDataArray = [];

//Loop to retrieve data from JSON string
for (let dayCounter = 0; dayCounter <obj.days.length; dayCounter++) {
    for (let hourCounter = 0; hourCounter < obj.days[dayCounter].hours.length; hourCounter++) {

       //Push objects into array
       if (obj.days[dayCounter].hours[hourCounter].temp > 16) {
            WeatherDataArray.push({"ResolvedAddress": obj.resolvedAddress,
              "Date": obj.days[dayCounter].datetime,
              "Time": obj.days[dayCounter].hours[hourCounter].datetime,
              "Temperature": obj.days[dayCounter].hours[hourCounter].temp,
              "Precipitation": obj.days[dayCounter].hours[hourCounter].precip,
              "FeelsLike": obj.days[dayCounter].hours[hourCounter].feelslike,
              "Humidity": obj.days[dayCounter].hours[hourCounter].humidity
            });
       };
    };
};

//Convert completed array to CSV string
const csvString = [
    [
      "ResolvedAddress",
      "Date",
      "Time",
      "Temperature",
      "Precipitation",
      "FeelsLike",
      "Humidity"
    ],
    ...WeatherDataArray.map(item => [
      item.ResolvedAddress,
      item.Date,
      item.Time,
      item.Temperature,
      item.Precipitation,
      item.FeelsLike,
      item.Humidity
    ])
  ]
   .map(e => e.join(",")) 
   .join("\n");

//Output completed CSV string to console
console.log(csvString);

//Create empty directory to store CSV file
fs.mkdir('./Output', { recursive: true }, (err) => {
    if (err) throw err;
});

//Write data to CSV file
let writeableStream = fs.createWriteStream('./Output/ParsedWeatherData.csv')
writeableStream.write(csvString);

//{flags: 'w'}
