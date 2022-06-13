import './style.css';

const weatherContainer=document.getElementById('weatherContainer');
const weatherContainerCity=document.getElementById('location');
const weatherContainerTemperature=weatherContainer.querySelector('#temperature');
const weatherContainerFeelTemp=document.getElementById('feelsLikeTemp');
const weatherContainerWind=document.getElementById('wind');
const weatherContainerHumidity=document.getElementById('humidity');
const weatherContainerWeather=document.getElementById('weather');

//weather object constructor
const weatherObject = (weather,temperature,feelsLikeTemp,location,wind,humidity) =>{
    return {weather,temperature,feelsLikeTemp,location,wind,humidity};
}

//async function that gets weather from openweather api

async function getWeather(Location){
    let weather= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Location}&APPID=70febd8b3593e4e8740eaafc7b003c34`);
    let data=await weather.json();
    return data;
}

//returns weather object using constructor
function weatherData(rawData){
    return weatherObject(rawData.weather[0].main,rawData.main.temp,rawData.main.feels_like,rawData.name,rawData.wind.speed,rawData.main.humidity);
}

//adds info to html page
function showWeather(dataObj){
    weatherContainerCity.innerText=dataObj.location;
    weatherContainerTemperature.innerText=dataObj.temperature;
    weatherContainerFeelTemp.innerText=dataObj.feelsLikeTemp;
    weatherContainerWind.innerText=`${dataObj.wind*3.6} Km/h`;
    weatherContainerHumidity.innerText=`${dataObj.humidity}%`;
    weatherContainerWeather.innerText=dataObj.weather;
}

//main get weather function. Coordinates the required functions and returns the final weather object
async function mainWeatherLoop(city){
    try{
    let data=await getWeather(city);
    let dataObj= weatherData(data);
    showWeather(dataObj);
    }
    catch{
        console.log('error');
    }
}

const cityWeatherSearch=document.querySelector('#cityWeather');
const weatherForm=document.querySelector('#weatherForm');

weatherForm.addEventListener('submit',function(e){
    e.preventDefault();
    mainWeatherLoop(cityWeatherSearch.value)
})

window.addEventListener('load',(e)=>{
    mainWeatherLoop('Vancouver');
})

