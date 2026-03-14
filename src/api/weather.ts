import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/constants';
import { WeatherData, ForecastData } from '../types/weather';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await api.get<WeatherData>('/weather', {
    params: { q: city },
  });
  return response.data;
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const response = await api.get<ForecastData>('/forecast', {
    params: { q: city },
  });
  return response.data;
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await api.get<WeatherData>('/weather', {
    params: { lat, lon },
  });
  return response.data;
};
