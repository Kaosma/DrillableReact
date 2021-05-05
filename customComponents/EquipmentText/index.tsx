import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './styles';

export const EquipmentText = ({
  index,
  equipmentValue,
}: {
  index: number;
  equipmentValue: number;
}) => {
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

  switch (index) {
    case 0:
      return (
        <View style={styles.equipmentItem}>
          <Image
            source={require('../../assets/basketball_icon.png')}
            style={{
              height: 35,
              width: 35,
              tintColor: '#fc5c14',
              display: equipmentValue === 0 ? 'none' : 'flex',
            }}
          />
          <Text style={styles.equipmentText}>
            {numberOfEquipment(equipmentValue)}
          </Text>
        </View>
      );
    case 1:
      return (
        <View style={styles.equipmentItem}>
          <Image
            source={require('../../assets/basketball_hoop.png')}
            style={{
              height: 35,
              width: 35,
              tintColor: '#fc5c14',
              display: equipmentValue === 0 ? 'none' : 'flex',
            }}
          />
          <Text style={styles.equipmentText}>
            {numberOfEquipment(equipmentValue)}
          </Text>
        </View>
      );
    case 2:
      return (
        <View style={styles.equipmentItem}>
          <Image
            source={require('../../assets/cone.png')}
            style={{
              height: 30,
              width: 30,
              tintColor: '#fc5c14',
              display: equipmentValue === 0 ? 'none' : 'flex',
            }}
          />
          <Text style={styles.equipmentText}>
            {numberOfEquipment(equipmentValue)}
          </Text>
        </View>
      );
    case 3:
      return (
        <View style={styles.equipmentItem}>
          <Image
            source={require('../../assets/tennisball.png')}
            style={{
              height: 25,
              width: 25,
              tintColor: '#fc5c14',
              display: equipmentValue === 0 ? 'none' : 'flex',
            }}
          />
          <Text style={styles.equipmentText}>
            {numberOfEquipment(equipmentValue)}
          </Text>
        </View>
      );
    case 4:
      return (
        <View style={styles.equipmentItem}>
          <Image
            source={require('../../assets/brick_wall.png')}
            style={{
              height: 35,
              width: 35,
              tintColor: '#fc5c14',
              display: equipmentValue === 0 ? 'none' : 'flex',
            }}
          />
          <Text style={styles.equipmentText}>
            {numberOfEquipment(equipmentValue)}
          </Text>
        </View>
      );
    default:
      return (
        <Image
          source={require('../../assets/eye.png')}
          style={{
            height: 35,
            width: 35,
            tintColor: '#fc5c14',
            display: equipmentValue === 0 ? 'none' : 'flex',
          }}
        />
      );
  }
};
