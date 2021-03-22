import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabsComponent } from '../../App';
import { EquipmentText } from '../../customComponents/EquipmentText';
import * as firebase from 'firebase';
import { db } from '../../DatabaseRequest';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

export const PracticeSettings = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  // Saves the practices to the current logged in user's practice in firebase
  function savePracticeToFirebase(
    length: number,
    drillsNumber: number,
    playersNumber: number
  ) {
    const currentUser = firebase.auth().currentUser;

    db.collection('users')
      .doc(currentUser?.uid)
      .collection('practices')
      .add({
        length: length,
        numberOfDrills: drillsNumber,
        players: playersNumber,
      })
      .then((ref) => {
        console.log(ref);
      });
  }

  const [players, setPlayers] = useState(0);

  let practiceLength: number = 0;
  let numberOfDrills: number = 0;
  let drills = route.params.practiceDrills;
  let combinedEquipment: number[] = [0, 0, 0, 0, 0];

  // Calculating the practice length and the amount of drills in the practice
  drills.forEach((item: { duration: number; equipment: number[] }) => {
    practiceLength += item.duration;
    numberOfDrills++;
    for (let index = 0; index < 5; index++) {
      if (item.equipment[index] > combinedEquipment[index]) {
        combinedEquipment[index] = item.equipment[index];
      }
    }
  });

  return (
    <View style={styles.rootContainer}>
      <View style={styles.practiceInfoContainer}>
        <Text style={styles.practiceInfo}>
          Practice length: {practiceLength}min
        </Text>
        <Text style={styles.practiceInfo}>
          Number of drills: {numberOfDrills}
        </Text>
        <Text style={styles.practiceInfo}>Number of players: {players}</Text>
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
        <Text style={styles.practiceInfo}>Equipment</Text>
        <View style={styles.equipmentContainer}>
          <EquipmentText index={0} equipmentValue={combinedEquipment[0]} />
          <EquipmentText index={1} equipmentValue={combinedEquipment[1]} />
          <EquipmentText index={2} equipmentValue={combinedEquipment[2]} />
          <EquipmentText index={3} equipmentValue={combinedEquipment[3]} />
          <EquipmentText index={4} equipmentValue={combinedEquipment[4]} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => {
          savePracticeToFirebase(practiceLength, numberOfDrills, players);
          //navigation.navigate('Tabs');
        }}
      >
        <Text style={styles.doneButtonText}>Start Practice</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};
