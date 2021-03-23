import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { TabsComponent } from '../../App';
import { EquipmentText } from '../../customComponents/EquipmentText';
import * as firebase from 'firebase';
import { db } from '../../DatabaseRequest';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

export const AutoGenerator = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [players, setPlayers] = useState(0);
  const [duration, setDuration] = useState(0);
  const [categories, setCategories] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  function calculateIndex(index: number) {
    switch (index) {
      case 0:
        return 'Ballhandling';
      case 1:
        return 'Passing';
      case 2:
        return 'Shooting';
      case 3:
        return 'Rebounding';
      case 4:
        return 'Defense';
      case 5:
        return 'IQ';
      default:
        return 'None';
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.practiceInfoText}>
          Practice duration: {duration}min
        </Text>
        <Slider
          style={styles.durationSlider}
          minimumValue={0}
          maximumValue={240}
          step={5}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#fc5c14"
          onValueChange={(value) => {
            setDuration(value);
          }}
        />
        <Text style={styles.practiceInfoText}>
          Number of players: {players}
        </Text>
        <Slider
          style={styles.playerSlider}
          minimumValue={0}
          maximumValue={30}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#fc5c14"
          onValueChange={(value) => {
            setPlayers(value);
          }}
        />
      </View>
      <View style={styles.selectCategoryContainer}>
        <Text style={styles.categoryInfoText}>Categories</Text>
        <View style={styles.categoryList}>
          <FlatList
            data={categories}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryButton}
                  onPress={() => {
                    let changeCategories = [...categories];
                    changeCategories[index] = !item;
                    setCategories(changeCategories);
                  }}
                >
                  <Image
                    source={
                      item === true
                        ? require('../../assets/checked-checkbox.png')
                        : require('../../assets/unchecked-checkbox.png')
                    }
                    style={{
                      height: 35,
                      width: 35,
                      tintColor: '#f4f4f4',
                    }}
                  />
                  <Text style={styles.categoryButtonText}>
                    {calculateIndex(index)}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.generatePracticeButton}
        onPress={() => {
          navigation.navigate('PracticeCreator');
        }}
      >
        <Text style={styles.generatePracticeButtonText}>Generate practice</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};
