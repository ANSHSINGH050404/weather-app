import React from 'react';
import { View, Text } from 'react-native';
import { WeatherData } from '../types/weather';
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Droplets } from 'lucide-react-native';

interface WeatherCardProps {
  data: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear': return <Sun color="white" size={64} />;
    case 'clouds': return <Cloud color="white" size={64} />;
    case 'rain': return <CloudRain color="white" size={64} />;
    case 'thunderstorm': return <CloudLightning color="white" size={64} />;
    default: return <Cloud color="white" size={64} />;
  }
};

export const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <View className="items-center justify-center py-10">
      <Text className="text-white text-4xl font-bold">{data.name}</Text>
      <View className="my-4">
        {getWeatherIcon(data.weather[0].main)}
      </View>
      <Text className="text-white text-7xl font-light">{Math.round(data.main.temp)}°</Text>
      <Text className="text-white text-xl capitalize">{data.weather[0].description}</Text>
      
      <View className="flex-row mt-10 w-full justify-around px-4">
        <View className="items-center bg-white/10 rounded-2xl p-4 w-[28%]">
          <Wind color="white" size={24} />
          <Text className="text-white font-semibold mt-2">{data.wind.speed}m/s</Text>
          <Text className="text-white/60 text-xs">Wind</Text>
        </View>
        <View className="items-center bg-white/10 rounded-2xl p-4 w-[28%]">
          <Droplets color="white" size={24} />
          <Text className="text-white font-semibold mt-2">{data.main.humidity}%</Text>
          <Text className="text-white/60 text-xs">Humidity</Text>
        </View>
        <View className="items-center bg-white/10 rounded-2xl p-4 w-[28%]">
          <Sun color="white" size={24} />
          <Text className="text-white font-semibold mt-2">{Math.round(data.main.temp_max)}°</Text>
          <Text className="text-white/60 text-xs">High</Text>
        </View>
      </View>
    </View>
  );
};
