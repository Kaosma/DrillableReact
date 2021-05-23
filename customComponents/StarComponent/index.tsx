import React from 'react';
import { View, Image } from 'react-native';

// Custom star component
export const Star = ({ filled }: { filled: boolean }) => {
  return (
    <View>
      <Image
        source={
          filled === true
            ? require('../../assets/star_filled.png')
            : require('../../assets/star_unfilled.png')
        }
        style={{ height: 35, width: 35, tintColor: '#ff7315' }}
      />
    </View>
  );
};
