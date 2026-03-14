import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ForecastData } from '../types/weather';
import { Cloud, Sun, CloudRain } from 'lucide-react-native';

interface ForecastProps {
  data: ForecastData;
}

const getSmallWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear': return <Sun color="white" size={24} />;
    case 'clouds': return <Cloud color="white" size={24} />;
    case 'rain': return <CloudRain color="white" size={24} />;
    default: return <Cloud color="white" size={24} />;
  }
};

export const Forecast = ({ data }: ForecastProps) => {
  // Filter for one forecast per day (OpenWeather provides 3-hour intervals)
  const dailyForecast = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  return (
    <View className="mt-6 px-4">
      <Text className="text-white text-xl font-bold mb-4">5-Day Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dailyForecast.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          return (
            <View key={index} className="bg-white/10 rounded-2xl p-4 mr-4 items-center w-24">
              <Text className="text-white font-medium">{dayName}</Text>
              <View className="my-2">
                {getSmallWeatherIcon(item.weather[0].main)}
              </View>
              <Text className="text-white font-bold">{Math.round(item.main.temp)}°</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
