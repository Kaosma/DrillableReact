import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './styles';

// Returning a screen to view info of a single drill
export const ViewDrill = ({ route }: { route: any }) => {
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
  function numberOfEquipment(value: number) {
    switch (value) {
      case 0:
        return '';
      case 1:
        return '';
      default:
        return 'x' + value;
    }
  }
  const Equipment = ({ index }: { index: number }) => {
    const equipmentValue = route.params.equipment[index];
    switch (index) {
      case 0:
        return (
          <View style={{ display: 'flex', flexDirection: 'row'}}>
            <Image
              source={require('../../assets/basketball-icon.png')}
              style={{
                height: 35,
                width: 35,
                tintColor: '#f4f4f4',
                display: equipmentValue === 0 ? 'none' : 'flex',
              }}
            />
            <Text style={{ color: '#f4f4f4' }}>
              {numberOfEquipment(equipmentValue)}
            </Text>
          </View>
        );
      case 1:
        return (
          <View style={{ display: 'flex', flexDirection: 'row'}}>
            <Image
              source={require('../../assets/basketball-hoop.png')}
              style={{
                height: 35,
                width: 35,
                tintColor: '#f4f4f4',
                display: equipmentValue === 0 ? 'none' : 'flex',
              }}
            />
            <Text style={{ color: '#f4f4f4' }}>
              {numberOfEquipment(equipmentValue)}
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
              source={require('../../assets/icon-cone.png')}
              style={{
                height: 35,
                width: 35,
                tintColor: '#f4f4f4',
                display: equipmentValue === 0 ? 'none' : 'flex',
              }}
            />
            <Text style={{ color: '#f4f4f4' }}>
              {numberOfEquipment(equipmentValue)}
            </Text>
          </View>
        );
      case 3:
        return (
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
              source={require('../../assets/icons8-tennis-ball-90.png')}
              style={{
                height: 35,
                width: 35,
                tintColor: '#f4f4f4',
                display: equipmentValue === 0 ? 'none' : 'flex',
              }}
            />
            <Text style={{ color: '#f4f4f4' }}>
              {numberOfEquipment(equipmentValue)}
            </Text>
          </View>
        );
      case 4:
        return (
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
              source={require('../../assets/icons8-brick-wall-100.png')}
              style={{
                height: 35,
                width: 35,
                tintColor: '#f4f4f4',
                display: equipmentValue === 0 ? 'none' : 'flex',
              }}
            />
            <Text style={{ color: '#f4f4f4' }}>
              {numberOfEquipment(equipmentValue)}
            </Text>
          </View>
        );
      default:
        return (
          <Image
            source={require('../../assets/favicon.png')}
            style={{
              height: 35,
              width: 35,
              tintColor: '#f4f4f4',
              display: equipmentValue === 0 ? 'none' : 'flex',
            }}
          />
        );
    }
  };

  return (
    <View style={styles.backgroundView}>
      <View style={styles.viewDrillContainer}>
        <View style={styles.drillInfoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.opacityText}>
              {calculateDrillRating(route.params.ratings)}★
            </Text>
            <Text style={styles.titleText}>{route.params.title}</Text>
            <Text style={styles.ratingText}>
              {calculateDrillRating(route.params.ratings)}★
            </Text>
          </View>

          <View style={styles.detailedInfoContainer}>
            <Text style={styles.infoText}>
              Category: {route.params.category}
            </Text>
            <Text style={styles.infoText}>{route.params.duration} min</Text>
          </View>

          <View style={styles.detailedInfoContainer}>
            <Text style={styles.infoText}>
              Min. players: {route.params.numberOfPlayers}
            </Text>
            <Text style={styles.infoText}>Level: {route.params.level}</Text>
          </View>

          <View style={styles.bottomInfoContainer}>
            <Text style={styles.infoText}>Equipment</Text>
            <View style={styles.equipmentContainer}>
              <Equipment index={0} />
              <Equipment index={1} />
              <Equipment index={2} />
              <Equipment index={3} />
              <Equipment index={4} />
            </View>
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
