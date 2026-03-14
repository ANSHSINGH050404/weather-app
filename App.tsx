import "./global.css";
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, ActivityIndicator, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as Location from 'expo-location';
import { SearchBar } from './src/components/SearchBar';
import { WeatherCard } from './src/components/WeatherCard';
import { Forecast } from './src/components/Forecast';
import { fetchWeather, fetchForecast, fetchWeatherByCoords } from './src/api/weather';
import { WeatherData, ForecastData } from './src/types/weather';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [city, setCity] = useState('London');

  const loadWeatherData = async (searchCity?: string) => {
    try {
      setLoading(true);
      const targetCity = searchCity || city;
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(targetCity),
        fetchForecast(targetCity),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      setCity(targetCity);
    } catch (error) {
      Alert.alert('Error', 'City not found or API error. Please check your API key.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        loadWeatherData();
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        const weatherData = await fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
        setWeather(weatherData);
        const fData = await fetchForecast(weatherData.name);
        setForecast(fData);
        setCity(weatherData.name);
      } catch (error) {
        loadWeatherData();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getBackgroundColors = (): [string, string] => {
    if (!weather) return ['#4facfe', '#00f2fe'];
    const condition = weather.weather[0].main.toLowerCase();
    if (condition === 'clear') return ['#f6d365', '#fda085'];
    if (condition === 'clouds') return ['#bdc3c7', '#2c3e50'];
    if (condition === 'rain') return ['#00c6fb', '#005bea'];
    if (condition === 'thunderstorm') return ['#37ecba', '#72afd3'];
    return ['#4facfe', '#00f2fe'];
  };

  return (
    <LinearGradient
      colors={getBackgroundColors()}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <SearchBar onSearch={loadWeatherData} />
          
          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="white" />
              <Text className="text-white mt-4 font-medium">Fetching Weather...</Text>
            </View>
          ) : (
            <ScrollView 
              className="flex-1"
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {weather && <WeatherCard data={weather} />}
              {forecast && <Forecast data={forecast} />}
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
