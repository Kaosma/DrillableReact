import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { View, SectionList, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { Drill, DrillsSection } from '../../Classes';
import { AppContext } from '../../Context';

// Returning the saved drills screen
export const SavedDrills = ({ navigation }: { navigation: any }) => {
  const { getAddedDrillsFromDatabase, savedDrills } = useContext(AppContext);

  const renderSectionHeader = ({ section: { sectionTitle } }) => {
    return <Text style={{fontSize: 25, fontWeight:'600', color: 'grey', padding: 10}}>{sectionTitle}</Text>;
  };

  // Making sure it only retrieves the drills once
  useEffect(() => {
    getAddedDrillsFromDatabase();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <SectionList
        sections={savedDrills}
        style={{ flex: 1, width: '100%', borderWidth: 1, borderStyle: 'solid', borderColor: 'red' }}
        showsVerticalScrollIndicator={true}
        bounces={true}
        maxToRenderPerBatch={2}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => item + index}
        renderItem={(item) => {
          return (
            <View style={{padding: 10}}>
              <Text style={{ color: '#f4f4f4' }}>
                {item.section.data[item.index].title}
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
