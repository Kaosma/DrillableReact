import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCB7F6NnS7SFnnwnZT-OJQsLWpMNum4tew",
  authDomain: "drillable.firebaseapp.com",
  databaseURL: "https://drillable.firebaseio.com",
  projectId: "drillable",
  storageBucket: "drillable.appspot.com",
  messagingSenderId: "15822012428",
  appId: "1:15822012428:web:f39d48df19d01589ff6e29",
  measurementId: "G-9RHEXC0EKZ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
type DrillProps = {title: string; numberOfPlayers: number; duration: number}

const Drill = ({title, numberOfPlayers, duration}: DrillProps) => {
  return (
    <View style={styles.drillContainer}>
      <View style={{flex: 4, flexDirection: 'row', }}>
        <View style={{flex: 3, marginLeft: 20}}>
          <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1, color: '#f4f4f4', fontSize: 22}}>{title}</Text>
            {/*<Text style={{flex: 1, color: '#f4f4f4', fontSize: 20}}>{rating}★</Text>*/}
          </View>

          <View style={{flex: 3, flexDirection: 'row', marginTop: 10}}>
            <Text style={{flex: 1, color: '#f4f4f4', fontSize: 17}}>No. Players: {numberOfPlayers}</Text>
            <Text style={{flex: 1, color: '#f4f4f4', fontSize: 17}}>Duration: {duration}</Text>
          </View>
        </View>

        <View style={{flex: 1, }}>
          <Image 
            source={require('./assets/adaptive-icon.png')} 
            style={{width: 50, height: 50,}} 
          />
        </View>
      </View>

      <View style={{flex: 1, flexDirection: 'row', marginLeft: 20}}>
        <TouchableOpacity style={styles.drillContainerButton}>RATE</TouchableOpacity>
        <TouchableOpacity style={styles.drillContainerButton}>VIEW</TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {

  interface Drill {
    title: string;
    //id: string;
    duration: number;
    numberOfPlayers: number
    //recommendedNumber: number;
    //imageUrl: string;
    //description: string;
    //category: string;
    //numberOfRatings: number;
  }
  const [drillsList, setDrillsList] = useState<Drill[]>([]);
  
  function getDrillsFromDatabase() {
    db.collection("drills")
      .get()
      .then(function(querySnapshot: any) {
        let array : Drill[] = [];
        querySnapshot.forEach(function(doc: any) {
          const data = doc.data();
          const drillName = data.name
          const drillLength = data.length
          const drillNumberOfPlayers = data.numberOfPlayers
          array.push({title: drillName, duration: drillLength, numberOfPlayers: drillNumberOfPlayers})
        });
        setDrillsList(array);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }

  useEffect(() => {
    getDrillsFromDatabase();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <View style={{width: '100%'}}>
        <FlatList
          data={drillsList}
          renderItem={({item}) => {
            return <Drill 
            title = {item.title}
            duration = {item.duration}
            numberOfPlayers = {item.numberOfPlayers}
            />
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#3a3535',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drillContainer: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#f4f4f4',
    borderRadius: 6,
    margin: 5,
  },
  drillContainerButton: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    marginRight: 30
  }
});
