import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Drill } from '../../Classes';
import { AppContext } from '../../Context';

// Returning the manage teams screen
export const ManageDrills = ({ navigation }: { navigation: any }) => {
  const { getAddedDrillsFromDatabase, savedDrills } = useContext(AppContext);

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
