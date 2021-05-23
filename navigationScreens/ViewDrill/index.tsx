import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EquipmentText } from '../../customComponents/EquipmentText';
import { styles } from './styles';

// Returning a screen to view info of a single drill
export const ViewDrill = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
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

  return (
    <View style={styles.backgroundView}>
      <View style={styles.viewDrillContainer}>
        <View style={styles.drillInfoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{route.params.title}</Text>
            <Text style={styles.ratingText}>
              {calculateDrillRating(route.params.ratings)}
            </Text>
            <Text style={styles.ratingStar}>★</Text>
          </View>

          <View style={styles.detailedInfoContainer}>
            <View style={styles.categories}>
              <Text style={styles.categoriesText}>Level</Text>
              <Text style={styles.categoriesText}>Category</Text>
              <Text style={styles.categoriesText}>Duration</Text>
              <Text style={styles.categoriesText}>Minimum players</Text>
            </View>
            <View style={styles.categoriesInfo}>
              <View style={styles.separatorContainer}>
                <Text style={styles.separatorText}>: </Text>
                <Text style={styles.separatorText}>: </Text>
                <Text style={styles.separatorText}>: </Text>
                <Text style={styles.separatorText}>: </Text>
              </View>
              <View style={styles.containerInfo}>
                <Text style={styles.categoriesInfoText}>{route.params.level}</Text>
                <Text style={styles.categoriesInfoText}>{route.params.category}</Text>
                <Text style={styles.categoriesInfoText}>{route.params.duration} min</Text>
                <Text style={styles.categoriesInfoText}>{route.params.numberOfPlayers}</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomInfoContainer}>
            <Text style={styles.equipmentInfoText}>Equipment: </Text>
            <View style={styles.equipmentContainer}>
              <EquipmentText
                index={0}
                equipmentValue={route.params.equipment[0]}
              />
              <EquipmentText
                index={1}
                equipmentValue={route.params.equipment[1]}
              />
              <EquipmentText
                index={2}
                equipmentValue={route.params.equipment[2]}
              />
              <EquipmentText
                index={3}
                equipmentValue={route.params.equipment[3]}
              />
              <EquipmentText
                index={4}
                equipmentValue={route.params.equipment[4]}
              />
            </View>
          </View>

          <View style={styles.imageContainer}>
            <ImageBackground
              borderRadius={3}
              style={styles.drillImage}
              source={{ uri: route.params.imageUrl }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ViewVideo');
                }}
              >
                <Image
                  style={styles.iconOverlay}
                  source={require('../../assets/play.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
