import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { TabsComponent } from '../../App';
import { EquipmentText } from '../../customComponents/EquipmentText';
import * as firebase from 'firebase';
import { db } from '../../DatabaseRequest';
import Slider from '@react-native-community/slider';
import { AppContext } from '../../Context';
import { styles } from './styles';

export const AutoGenerator = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {

  // Drill class interface
  interface Drill {
    title: string;
    id: string;
    duration: number;
    numberOfPlayers: number;
    imageUrl: string;
    category: string;
    level: number;
    ratings: number[];
    equipment: number[];
  }

  const [players, setPlayers] = useState(0);
  const [practiceDuration, setPracticeDuration] = useState(0);
  const [categories, setCategories] = useState([
    'false',
    'false',
    'false',
    'false',
    'false',
    'false',
  ]);

  const {
    practiceDrills,
    setDrills,
    addDrill,
    removeDrill,
    resetDrills,
  } = useContext(AppContext);

  let textCategories = [
    'Ballhandling',
    'Passing',
    'Shooting',
    'Rebounding',
    'Defense',
    'IQ',
  ];

  function addDrillsToPractice(
    drills: Drill[] | undefined,
    createdPractieDuration: number
  ) {
    if (createdPractieDuration < practiceDuration) {
      if (drills !== undefined) {
        addSingleDrillToPractice(drills, drills[0].duration);
      }
    } else if (createdPractieDuration > practiceDuration) {
      if (drills !== undefined) {
        switchDrill(drills, createdPractieDuration);
      }
    } else if (createdPractieDuration === practiceDuration) {
      setDrills(drills);
      navigation.navigate('PracticeCreator');
    }
  }

  function addSingleDrillToPractice(drills: Drill[], totalDuration: number) {
    addDrill(drills[0]);
    const foundDrills = drills.slice(1);
    addDrillsToPractice(foundDrills, totalDuration + drills[0].duration);
  }

  function switchDrill(drills: Drill[], totalDuration: number) {
    const foundDrills = drills.splice(-1, 1);
    const foundDrill = drills[drills.length - 1];
    addSingleDrillToPractice(foundDrills, totalDuration - foundDrill.duration);
  }

  function createPractice() {
    // Retrieving all drills from the database
    db.collection('drills')
      .where('numberOfPlayers', '<=', players)
      .get()
      .then(function (querySnapshot: any) {
        let retrievedDrills: Drill[] = [];
        querySnapshot.forEach(function (doc: any) {
          const data = doc.data();
          const drillName: string = data.name;
          const drillLength: number = data.length;
          const drillNumberOfPlayers: number = data.numberOfPlayers;
          const drillId: string = doc.id;
          const drillImage: string = data.imageUrl;
          const drillCategory: string = data.category;
          const drillLevel: number = data.level;
          const drillRatings: number[] = [];
          const drillEquipment: number[] = data.equipment;

          db.collection('drills')
            .doc(doc.id)
            .collection('ratings')
            .get()
            .then((snapShot) => {
              snapShot.forEach((ratingDoc) => {
                drillRatings.push(ratingDoc.data().rating);
              });
              if (categories.includes(drillCategory)) {
                retrievedDrills.push({
                  title: drillName,
                  id: drillId,
                  duration: drillLength,
                  numberOfPlayers: drillNumberOfPlayers,
                  imageUrl: drillImage,
                  category: drillCategory,
                  level: drillLevel,
                  ratings: drillRatings,
                  equipment: drillEquipment,
                });
                addDrillsToPractice(retrievedDrills, 0);
              }
            });
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }

  return (
    <View style={styles.rootContainer}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.practiceInfoText}>
          Practice duration: {practiceDuration}min
        </Text>
        <Slider
          style={styles.durationSlider}
          minimumValue={0}
          maximumValue={240}
          step={5}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#fc5c14"
          onValueChange={(value) => {
            setPracticeDuration(value);
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryButton}
                  onPress={() => {
                    let changeCategories = [...categories];
                    if (item === 'false') {
                      changeCategories[index] = textCategories[index];
                    } else {
                      changeCategories[index] = 'false';
                    }
                    setCategories(changeCategories);
                  }}
                >
                  <Image
                    source={
                      item === 'false'
                        ? require('../../assets/unchecked-checkbox.png')
                        : require('../../assets/checked-checkbox.png')
                    }
                    style={{
                      height: 35,
                      width: 35,
                      tintColor: '#f4f4f4',
                    }}
                  />
                  <Text style={styles.categoryButtonText}>
                    {textCategories[index]}
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
          createPractice();
        }}
      >
        <Text style={styles.generatePracticeButtonText}>Generate practice</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};
