async function getLatLon(city) {
  // Fetch data of city to get lat and lon
  const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=194689880e60e9ffc603d9a1de4909e2');
  const data = await response.json();
  const latLon = [data[0].lat, data[0].lon];
  return latLon
}

async function getData(lat, lon) {
  // Fetch weather data from API
  const response = await fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely&units=imperial&appid=194689880e60e9ffc603d9a1de4909e2', {mode: 'cors'})
  const weatherData = await response.json();
  return weatherData;
}

export async function processWeather(city) {
  // Fetch lat/lon of input city
  const latLon = await getLatLon(city);

  // Fetch data using getData function
  const forecastData = await getData(latLon[0], latLon[1]);

  // Create weather object
  let weather = {
    city,
    currentCondition: '',
    currentTemp: '',
    feelsLike: '',
    currentHigh: '',
    currentLow: '',
    humidity: '',
    windspeed: '',
  }

  // Assign properties from JSON response
  weather.currentCondition = forecastData.current.weather[0].description;
  weather.currentTemp = forecastData.current.temp;
  weather.feelsLike = forecastData.current.feels_like;
  weather.currentHigh = forecastData.daily[0].temp.max;
  weather.currentLow = forecastData.daily[0].temp.min;
  weather.humidity = forecastData.current.humidity;
  weather.windspeed = forecastData.current.wind_speed;
  
  console.log(weather);
}