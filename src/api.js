async function getLatLon(city) {
  // Fetch data of city to get lat and lon
  const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=194689880e60e9ffc603d9a1de4909e2');
  const data = await response.json();
  const latLon = [data[0].lat, data[0].lon];
  return latLon
}

async function getData(city) {
  // Fetch lat/lon of input city
  const latLon = await getLatLon(city);

  // Fetch weather data from API
  const response = await fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + latLon[0] + '&lon=' + latLon[1] + '&exclude=minutely&units=imperial&appid=194689880e60e9ffc603d9a1de4909e2', {mode: 'cors'})
  const weatherData = await response.json();
  return weatherData;
}

export async function processCurrentWeather(city) {
  const forecastData = await getData(city);

  // Create weather object for current weather
  let currentWeather = {
    city,
  }

  // Assign properties from JSON response
  currentWeather.currentCondition = forecastData.current.weather[0].description;
  currentWeather.currentTemp = forecastData.current.temp;
  currentWeather.feelsLike = forecastData.current.feels_like;
  currentWeather.currentHigh = forecastData.daily[0].temp.max;
  currentWeather.currentLow = forecastData.daily[0].temp.min;
  currentWeather.humidity = forecastData.current.humidity;
  currentWeather.windspeed = forecastData.current.wind_speed;
  
  return currentWeather;
}

export async function processHourlyWeather(city) {
  const forecastData = await getData(city)
  console.log(forecastData)

  // Create object for hourly forecast
  let hours = [];

  for (let i = 0; i < 12; i++) {
    // Get forecast hour from Date object
    const time = new Date((forecastData.hourly[i].dt) * 1000)

    // Create hour object in hours array, assign weather properties
    const hour = {
    time: `${time.getHours()}:00`,
    temp: forecastData.hourly[i].temp,
    weather: forecastData.hourly[i].weather[0].description,
    };

    // Create hour object in hours object, assign weather properties
    hours[i] = hour;

  }
  console.log(hours);

}

export async function processWeekWeather(city) {
  const forecastData = await getData(city)

  // Create object for week

}