import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState('');

  return (
    <View className="flex-row items-center bg-white/20 rounded-full px-4 py-2 mx-4 mt-4">
      <TextInput
        className="flex-1 text-white text-lg"
        placeholder="Search city..."
        placeholderTextColor="#cbd5e1"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={() => onSearch(city)}
      />
      <TouchableOpacity onPress={() => onSearch(city)}>
        <Search color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
};
