import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

// Returning the clipboard screen
export const ClipBoard = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.rootContainer}>
      <StatusBar style="auto" />
    </View>
  );
};
