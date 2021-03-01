import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabsComponent } from '../App';
import { styles } from '../styles';
import * as firebase from 'firebase';
import { db } from '../DatabaseRequest';
import Slider from '@react-native-community/slider';

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
      <View style={style.practiceInfoContainer}>
        <Text style={style.practiceInfo}>
          Practice length: {practiceLength}min
        </Text>
        <Text style={style.practiceInfo}>
          Number of drills: {numberOfDrills}
        </Text>
        <Text style={style.practiceInfo}>Number of players: {players}</Text>
        <Slider
          style={style.playerSlider}
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
      <TouchableOpacity
        style={style.doneButton}
        onPress={() => {
          savePracticeToFirebase(practiceLength, numberOfDrills, players);
          //navigation.navigate('Tabs');
        }}
      >
        <Text style={style.doneButtonText}>Start Practice</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const style = StyleSheet.create({
  practiceInfoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  practiceInfo: {
    color: '#f4f4f4',
    fontSize: 25,
    marginTop: 25,
  },
  playerSlider: {
    width: 250,
    height: 40,
  },
  doneButton: {
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 3,
    height: 70,
    width: '80%',
  },
  doneButtonText: {
    color: '#f4f4f4',
    fontFamily: 'Roboto',
    fontSize: 20,
  },
});
