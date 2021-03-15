import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabsComponent } from '../../App';
import * as firebase from 'firebase';
import { db } from '../../DatabaseRequest';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

export const PracticeSettings = (
  { route }: { route: any },
  { navigation }: { navigation: any }
) => {
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

  // Calculating the practice length and the amount of drills in the practice
  drills.forEach((item: { duration: number }) => {
    practiceLength += item.duration;
    numberOfDrills++;
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
        <Text style={styles.practiceInfo}>Equipment: {players}</Text>
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
