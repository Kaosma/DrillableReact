import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from '../styles';

// Returning a screen to view info of a single drill
export const ViewDrill = ({ route }: { route: any }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#3a3535',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <View style={styles.viewDrillContainer}>
        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ color: '#000000', fontSize: 20 }}>
              {route.params.numberOfRatings}★
            </Text>
            <Text style={{ color: '#f4f4f4', fontSize: 25 }}>
              {route.params.title}
            </Text>
            <Text style={{ color: '#f4f4f4', fontSize: 20, marginRight: 10 }}>
              {route.params.numberOfRatings}★
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Text style={{ color: '#f4f4f4', fontSize: 20 }}>
              Category: {route.params.category}
            </Text>
            <Text style={{ color: '#f4f4f4', fontSize: 20 }}>
              Level: {route.params.level}
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Text style={{ color: '#f4f4f4', fontSize: 20 }}>
              Minimum {route.params.numberOfPlayers} players
            </Text>
            <Text style={{ color: '#f4f4f4', fontSize: 20 }}>
              {route.params.duration} min
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#f4f4f4' }}>{route.params.equipment}</Text>
          </View>

          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: route.params.imageUrl }}
            />
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
