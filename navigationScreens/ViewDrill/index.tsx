import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './styles';

// Returning a screen to view info of a single drill
export const ViewDrill = ({ route }: { route: any }) => {
  return (
    <View style={styles.backgroundView}>
      <View style={styles.viewDrillContainer}>
        <View style={styles.drillInfoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.opacityText}>
              {route.params.numberOfRatings}★
            </Text>
            <Text style={styles.titleText}>{route.params.title}</Text>
            <Text style={styles.ratingText}>
              {route.params.numberOfRatings}★
            </Text>
          </View>

          <View style={styles.detailedInfoContainer}>
            <Text style={styles.infoText}>
              Category: {route.params.category}
            </Text>
            <Text style={styles.infoText}>Level: {route.params.level}</Text>
          </View>

          <View style={styles.detailedInfoContainer}>
            <Text style={styles.infoText}>
              Minimum {route.params.numberOfPlayers} players
            </Text>
            <Text style={styles.infoText}>{route.params.duration} min</Text>
          </View>

          <View style={styles.bottomInfoContainer}>
            <Text style={styles.infoText}>{route.params.equipment}</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              style={styles.drillImage}
              source={{ uri: route.params.imageUrl }}
            />
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
