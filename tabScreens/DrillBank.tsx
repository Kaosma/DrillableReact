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
  StyleSheet,
} from 'react-native';
import { styles } from '../styles';
import { db } from '../DatabaseRequest';
import { DrillsContext } from '../Context';
import { RatingModal } from '../customComponents/RatingModal';

// Using the rating modal component when a rating a drill
const RateModal = ({ setIsVisible }, { ratedDrill }) => {
  return (
    <View
      style={{
        backgroundColor: '#f4f4f4',
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 200,
      }}
    >
      <Text
        style={{
          marginTop: 10,
          color: '#3a3535',
          fontFamily: 'Roboto',
          fontSize: 30,
        }}
      >
        Rate this drill?
      </Text>

      <RatingModal></RatingModal>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={{ margin: 15 }}
          onPress={() => {
            console.log(ratedDrill);
            setIsVisible(false);
          }}
        >
          <Text
            style={{ color: '#000000', fontFamily: 'Roboto', fontSize: 25 }}
          >
            Done
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ margin: 15 }}
          onPress={() => {
            setIsVisible(false);
          }}
        >
          <Text
            style={{ color: '#000000', fontFamily: 'Roboto', fontSize: 25 }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    numberOfRatings: number;
    equipment: [];
  }

  const { practiceDrills, setDrills, addDrill } = useContext(DrillsContext);

  const [drillsList, setDrillsList] = useState<Drill[]>([]);
  const [modalIsVisible, setIsVisible] = useState(false);
  const [ratedDrill, setRatedDrill] = useState('');

  // Retrieving all drills from the database
  function getDrillsFromDatabase() {
    db.collection('drills')
      .get()
      .then(function (querySnapshot: any) {
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
          array.push({
            title: drillName,
            id: drillId,
            duration: drillLength,
            numberOfPlayers: drillNumberOfPlayers,
            imageUrl: drillImage,
            category: drillCategory,
            level: drillLevel,
            numberOfRatings: 0,
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
  function rateDrillThroughFirebase() {}

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
                <View style={style.drillView}>
                  <View style={style.infoContainer}>
                    <View style={style.titleContainer}>
                      <Text style={style.titleText}>{item.title}</Text>
                    </View>

                    <View style={style.detailedInfoContainer}>
                      <Text style={style.infoText}>
                        No. Players: {item.numberOfPlayers}
                      </Text>
                      <Text style={style.infoText}>
                        Duration: {item.duration}min
                      </Text>
                    </View>
                  </View>

                  <View style={style.imageContainer}>
                    <Image
                      style={style.drillImage}
                      source={{ uri: item.imageUrl }}
                    />
                  </View>
                </View>

                <View style={style.drillButtonContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={style.drillStandardButton}
                      onPress={() => {
                        setRatedDrill(item.title);
                        setIsVisible(true);
                      }}
                    >
                      <Text style={style.drillStandardButtonText}>RATE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={style.drillStandardButton}
                      onPress={() => {
                        navigation.navigate('ViewDrill', item);
                      }}
                    >
                      <Text style={style.drillStandardButtonText}>VIEW</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={style.drillStandardButton}
                      onPress={() => {
                        navigation.navigate('PracticeCreator');
                        addDrill(item);
                      }}
                    >
                      <Text style={style.drillStandardButtonText}>ADD</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={style.ratingContainer}>
                    <Text style={style.ratingText}>0{item.rating}★</Text>
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

const style = StyleSheet.create({
  drillView: {
    flex: 4,
    flexDirection: 'row',
    marginTop: 10,
  },
  infoContainer: {
    flex: 3,
    marginLeft: 10,
  },
  titleContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    color: '#f4f4f4',
    fontSize: 22,
  },
  detailedInfoContainer: {
    flex: 3,
    flexDirection: 'row',
    marginTop: 10,
  },
  infoText: {
    flex: 1,
    color: '#f4f4f4',
    fontSize: 17,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drillImage: {
    width: 70,
    height: 70,
  },
  drillButtonContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  drillStandardButton: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    marginRight: 20,
  },
  drillStandardButtonText: {
    fontFamily: 'Roboto',
    color: '#f4f4f4',
    fontSize: 20,
  },
  ratingContainer: {
    marginRight: 15,
  },
  ratingText: {
    flex: 1,
    color: '#f4f4f4',
    fontSize: 20,
  },
});
