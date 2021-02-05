import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { styles } from '../styles';
import { View } from 'react-native';

// Returning the clipboard screen
export const ClipBoard = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.rootContainer}>
      <StatusBar style="auto" />
    </View>
  );
};
