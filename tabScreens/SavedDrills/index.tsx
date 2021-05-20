import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { View, SectionList, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { Drill, DrillsSection } from '../../Classes';
import { AppContext } from '../../Context';

// Returning the saved drills screen
export const SavedDrills = ({ navigation }: { navigation: any }) => {
  const { getAddedDrillsFromDatabase, savedDrills } = useContext(AppContext);

  const renderSectionHeader = ({ section: { title } }) => {
    return <Text>{title}</Text>;
  };

  // Making sure it only retrieves the drills once
  useEffect(() => {
    getAddedDrillsFromDatabase();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <SectionList
        sections={savedDrills}
        style={{ flex: 1, width: '100%', marginTop: 24 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onEndReachedThreshold={0.5}
        keyExtractor={(it) => it}
        renderItem={(item) => {
          return (
            <View>
              <Text style={{ color: '#f4f4f4' }}>
                {item.section.data[item.index].duration}
              </Text>
            </View>
          );
        }}
        renderSectionHeader={renderSectionHeader}
      />
      {/* )} */}
      <StatusBar style="auto" />
    </View>
  );
};
