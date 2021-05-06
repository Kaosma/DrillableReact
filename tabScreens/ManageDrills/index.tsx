import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Drill } from '../../Classes';

// Returning the manage teams screen
export const ManageDrills = ({ navigation }: { navigation: any }) => {
  // Retrieving all drills from the database
  function getAddedDrillsFromDatabase() {
    
  }

  // Making sure it only retrieves the drills once
  useEffect(() => {
    getAddedDrillsFromDatabase();
  }, []);
  return (
    <View style={styles.rootContainer}>
      <StatusBar style="auto" />
    </View>
  );
};
