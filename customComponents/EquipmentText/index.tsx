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
            source={require('../../assets/basketball-icon.png')}
            style={{
              height: 35,
              width: 35,
              tintColor: '#f4f4f4',
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
            source={require('../../assets/basketball-hoop.png')}
            style={{
              height: 35,
              width: 35,
              tintColor: '#f4f4f4',
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
            source={require('../../assets/icon-cone.png')}
            style={{
              height: 30,
              width: 30,
              tintColor: '#f4f4f4',
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
            source={require('../../assets/icons8-tennis-ball-90.png')}
            style={{
              height: 25,
              width: 25,
              tintColor: '#f4f4f4',
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
            source={require('../../assets/icons8-brick-wall-100.png')}
            style={{
              height: 35,
              width: 35,
              tintColor: '#f4f4f4',
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
