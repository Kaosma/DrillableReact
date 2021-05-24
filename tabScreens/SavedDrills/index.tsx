import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { View, SectionList, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { AppContext } from '../../Context';

// Returning the saved drills screen
export const SavedDrills = ({ navigation }: { navigation: any }) => {
  const { savedDrills, getAddedDrillsFromDatabase, removeSavedDrill } = useContext(AppContext);

  const renderSectionHeader = ({ section: { sectionTitle } }) => {
    return (
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            color: 'grey',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 5,
          }}
        >
          {sectionTitle}
        </Text>
      </View>
    );
  };

  // Making sure it only retrieves the drills once
  useEffect(() => {
    getAddedDrillsFromDatabase();
  }, []);

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

  const drilles = [
    {
      sectionTitle: 'Bollkontroll',
      data: [
        {
          title: 'tennisbollövning',
          id: '1',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 1,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: 'två bollar',
          id: '2',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 3,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: 'skips',
          id: '3',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 2,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
      ],
    },
    {
      sectionTitle: 'Passning',
      data: [
        {
          title: 'banana drill',
          id: '4',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Passning',
          level: 3,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: 'Pssning med en boll',
          id: '5',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 3,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: 'Enstudspass',
          id: '6',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 2,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
      ],
    },
    {
      sectionTitle: 'Fys',
      data: [
        {
          title: 'Springa',
          id: '7',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 1,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: 'Armhävningar',
          id: '8',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 3,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: 'Situps',
          id: '9',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 2,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
      ],
    },
    {
      sectionTitle: 'Uppvärmning',
      data: [
        {
          title: 'Jogga',
          id: '10',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 1,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: 'Bajsa',
          id: '11',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 3,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: 'Latcha',
          id: '12',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 2,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
      ],
    },
    {
      sectionTitle: 'Skott',
      data: [
        {
          title: 'skottis',
          id: '13',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 1,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: 'skjuts',
          id: '14',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 3,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
        {
          title: '3pt',
          id: '15',
          duration: 5,
          numberOfPlayers: 4,
          imageUrl: 'drillImage',
          videoUrl: 'drillVideo',
          category: 'Bollkontroll',
          level: 2,
          ratings: [2, 3],
          equipment: [0, 0, 0, 0, 0],
        },
      ],
    },
  ];

  return (
    <View style={styles.rootContainer}>
      <SectionList
        sections={savedDrills}
        style={{ flex: 1, width: '100%' }}
        showsVerticalScrollIndicator={true}
        bounces={true}
        stickySectionHeadersEnabled={false}
        maxToRenderPerBatch={2}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          const drill = item.section.data[item.index];
          return (
            <View style={styles.drillContainer}>
              <View style={styles.drillView}>
                <View style={styles.infoContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{drill.title}</Text>
                    <Text style={styles.infoText}>Lv: {drill.level}</Text>
                  </View>

                  <View style={styles.detailedInfoContainer}>
                    <Text style={styles.infoText}>
                      No. Players: {drill.numberOfPlayers}
                    </Text>
                    <Text style={styles.infoText}>
                      Duration: {drill.duration}min
                    </Text>
                  </View>
                </View>

                <View style={styles.imageContainer}>
                  <Image
                    style={styles.drillImage}
                    source={{ uri: drill.imageUrl }}
                  />
                </View>
              </View>

              <View style={styles.drillButtonContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.drillStandardButton}
                    onPress={() => {
                      navigation.navigate('ViewDrill', drill);
                    }}
                  >
                    <Text style={styles.drillStandardButtonText}>VIEW</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.drillStandardButton}
                    onPress={() => {
                      removeSavedDrill(drill.id);
                    }}
                  >
                    <Text style={styles.drillStandardButtonText}>REMOVE</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>
                    {calculateDrillRating(drill.ratings)}
                  </Text>
                  <Text style={styles.ratingStar}>★</Text>
                </View>
              </View>
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
