import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

// Returning the manage teams screen
export const Settings = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log('Change language');
        }}
      >
        <Text>Change language</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('Change password');
        }}
      >
        <Text>Change password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('Log out');
        }}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('Delete account');
        }}
      >
        <Text>Delete account</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};
