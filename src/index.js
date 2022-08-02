import './style.css';
import { processCurrentWeather, processWeekWeather, processHourlyWeather } from './api';

const locationForm = document.querySelector('.location');
const locationInput = document.querySelector('.locationInput');
const searchButton = document.querySelector('.btn');

locationForm.addEventListener('submit', (e) => {
  // Prevent page from reloading
  e.preventDefault();
  // Retreive current weather
  processCurrentWeather(locationInput.value);
  // Retrieve week forecast
  processWeekWeather(locationInput.value);
  // Retrieve Hourly forecast
  processHourlyWeather(locationInput.value);
  locationInput.value = null;
})