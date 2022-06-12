import './style.css';

async function getWeather(Location){
    let weather= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Location}&APPID=70febd8b3593e4e8740eaafc7b003c34`);
    return weather;
}

console.log(getWeather('London'));