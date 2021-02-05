import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles';

// Returning the manage teams screen
export const ManageTeams = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.rootContainer}>
      <StatusBar style="auto" />
    </View>
  );
};
