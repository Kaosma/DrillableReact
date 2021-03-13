import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  SafeAreaView,
} from 'react-native';
import { db } from '../../DatabaseRequest';
import * as firebase from 'firebase';
import { DrillsContext } from '../../Context';
import { RatingModal } from '../../customComponents/RatingModal';
import { styles } from './styles';

export const DrillBank = ({ navigation }: { navigation: any }) => {
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
    equipment: [];
  }

  const [rating, setRating] = useState(0);

  // Using the rating modal component when a rating a drill
  const RateModal = ({ setIsVisible }) => {
    return (
      <View
        style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
        <View
          style={{
            backgroundColor: '#f4f4f4',
            borderRadius: 6,
            alignItems: 'center',
            marginTop: 200,
            width: '80%',
          }}
        >
          <Text
            style={{
              marginTop: 10,
              color: '#3a3535',
              fontFamily: 'System',
              fontSize: 30,
            }}
          >
            Rate this drill?
          </Text>

          <RatingModal
            starRating={rating}
            ratingCallback={(stars) => setRating(stars)}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{ paddingBottom: 15, paddingLeft: 25 }}
              onPress={() => {
                rateDrillThroughFirebase();
                setIsVisible(false);
              }}
            >
              <Text
                style={{ color: '#000000', fontFamily: 'System', fontSize: 25 }}
              >
                Done
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingBottom: 15, paddingLeft: 25 }}
              onPress={() => {
                console.log(ratedDrill);
              }}
            >
              <Text
                style={{ color: '#000000', fontFamily: 'System', fontSize: 25 }}
              >
                HEJ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingBottom: 15, paddingRight: 25 }}
              onPress={() => {
                setIsVisible(false);
                setRating(0);
                setRatedDrill('');
              }}
            >
              <Text
                style={{ color: '#000000', fontFamily: 'System', fontSize: 25 }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const { practiceDrills, setDrills, addDrill } = useContext(DrillsContext);

  const [drillsList, setDrillsList] = useState<Drill[]>([]);
  const [modalIsVisible, setIsVisible] = useState(false);
  const [ratedDrill, setRatedDrill] = useState('');

  // Retrieving all drills from the database
  function getDrillsFromDatabase() {
    db.collection('drills')
      .get()
      .then(function (querySnapshot: any) {
        //console.log(querySnapshot.getChildren());
        let array: Drill[] = [];
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

          db.collection('drills')
            .doc(doc.id)
            .collection('ratings')
            .get()
            .then((snapShot) => {
              snapShot.forEach((ratingDoc) => {
                console.log(ratingDoc.data().rating);
                drillRatings.push(ratingDoc.data().rating);
              });
            });
          array.push({
            title: drillName,
            id: drillId,
            duration: drillLength,
            numberOfPlayers: drillNumberOfPlayers,
            imageUrl: drillImage,
            category: drillCategory,
            level: drillLevel,
            ratings: drillRatings,
            equipment: [],
          });
        });
        setDrillsList(array);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }

  // Making sure it only retrieves the drills once
  useEffect(() => {
    getDrillsFromDatabase();
  }, []);

  // Rating a drill through firebase
  function rateDrillThroughFirebase() {
    const currentUser = firebase.auth().currentUser;
    db.collection('drills')
      .doc(ratedDrill)
      .collection('ratings')
      .doc(currentUser?.uid)
      .set({
        rating: rating,
      })
      .then((ref) => {
        console.log(ref);
        setRatedDrill('');
      });
  }
  function calculateDrillRating(ratings: number[]) {
    if (ratings !== undefined) {
      let ratingSum = 0;
      ratings.forEach((ratingItem) => {
        ratingSum += ratingItem;
      });
      return (ratingSum / ratings.length).toFixed(1);
    }
    return 0;
  }

  // Returning the drillbank screen
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Modal visible={modalIsVisible} transparent>
        <RateModal setIsVisible={setIsVisible} />
      </Modal>
      <View style={{ width: '100%' }}>
        <FlatList
          data={drillsList}
          renderItem={({ item }) => {
            return (
              <View style={styles.drillContainer}>
                <View style={styles.drillView}>
                  <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.titleText}>{item.title}</Text>
                    </View>

                    <View style={styles.detailedInfoContainer}>
                      <Text style={styles.infoText}>
                        No. Players: {item.numberOfPlayers}
                      </Text>
                      <Text style={styles.infoText}>
                        Duration: {item.duration}min
                      </Text>
                    </View>
                  </View>

                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.drillImage}
                      source={{ uri: item.imageUrl }}
                    />
                  </View>
                </View>

                <View style={styles.drillButtonContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={styles.drillStandardButton}
                      onPress={() => {
                        setRatedDrill(item.id);
                        setIsVisible(true);
                      }}
                    >
                      <Text style={styles.drillStandardButtonText}>RATE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.drillStandardButton}
                      onPress={() => {
                        navigation.navigate('ViewDrill', item);
                      }}
                    >
                      <Text style={styles.drillStandardButtonText}>VIEW</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.drillStandardButton}
                      onPress={() => {
                        if (
                          !practiceDrills.some(
                            (instance: { id: string }) =>
                              item.id === instance.id
                          )
                        ) {
                          navigation.navigate('PracticeCreator');
                          addDrill(item);
                        }
                      }}
                    >
                      <Text style={styles.drillStandardButtonText}>ADD</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>
                      {calculateDrillRating(item.ratings)}★
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
