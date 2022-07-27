import './style.css';
import { processCurrentWeather, processWeekWeather, processHourlyWeather } from './api';


processCurrentWeather('London');
processWeekWeather('london');
processHourlyWeather('london');