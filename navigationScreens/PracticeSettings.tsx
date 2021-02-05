import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
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
  drills.forEach((item) => {
    practiceLength += item.duration;
    numberOfDrills++;
  });

  return (
    <View style={styles.rootContainer}>
      <View style={{ marginTop: 10, alignItems: 'center' }}>
        <Text style={{ color: '#f4f4f4', fontSize: 25, marginTop: 20 }}>
          Practice length: {practiceLength}min
        </Text>
        <Text style={{ color: '#f4f4f4', fontSize: 25, marginTop: 25 }}>
          Number of drills: {numberOfDrills}
        </Text>
        <Text style={{ color: '#f4f4f4', fontSize: 25, marginTop: 25 }}>
          Number of players: {players}
        </Text>
        <Slider
          style={{ width: 250, height: 40 }}
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
        style={{
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
        }}
        onPress={() => {
          savePracticeToFirebase(practiceLength, numberOfDrills, players);
          //navigation.navigate('Tabs');
        }}
      >
        <Text style={{ color: '#f4f4f4', fontFamily: 'Roboto', fontSize: 20 }}>
          Start Practice
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};
