import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { styles } from '../styles';

// Returning a screen to view info of a single drill
export const ViewDrill = ({ route }: { route: any }) => {
  return (
    <View style={style.backgroundView}>
      <View style={styles.viewDrillContainer}>
        <View style={style.drillInfoContainer}>
          <View style={style.titleContainer}>
            <Text style={style.opacityText}>
              {route.params.numberOfRatings}★
            </Text>
            <Text style={style.titleText}>{route.params.title}</Text>
            <Text style={style.ratingText}>
              {route.params.numberOfRatings}★
            </Text>
          </View>

          <View style={style.detailedInfoContainer}>
            <Text style={style.infoText}>
              Category: {route.params.category}
            </Text>
            <Text style={style.infoText}>Level: {route.params.level}</Text>
          </View>

          <View style={style.detailedInfoContainer}>
            <Text style={style.infoText}>
              Minimum {route.params.numberOfPlayers} players
            </Text>
            <Text style={style.infoText}>{route.params.duration} min</Text>
          </View>

          <View style={style.bottomInfoContainer}>
            <Text style={style.infoText}>{route.params.equipment}</Text>
          </View>

          <View style={style.imageContainer}>
            <Image
              style={style.drillImage}
              source={{ uri: route.params.imageUrl }}
            />
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const style = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#3a3535',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  drillInfoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: '#f4f4f4',
    fontSize: 25,
  },
  ratingText: {
    color: '#f4f4f4',
    fontSize: 20,
    marginRight: 10,
  },
  opacityText: {
    fontSize: 20,
    opacity: 0,
  },
  detailedInfoContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomInfoContainer: {
    marginTop: 20,
  },
  infoText: {
    color: '#f4f4f4',
    fontSize: 20,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  drillImage: {
    width: 200,
    height: 200,
  },
});
