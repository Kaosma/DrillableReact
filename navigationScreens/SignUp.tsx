import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles';
import * as firebase from 'firebase';

export const SignUp = ({ navigation }: { navigation: any }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  function createUser() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newEmail, newPassword)
      .then(() => {
        navigation.navigate('Login' /*, user*/);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  return (
    <View style={styles.rootContainer}>
      <View>
        <Text style={{ color: '#f4f4f4', fontSize: 40 }}>Sign Up</Text>
      </View>
      <View>
        <TextInput
          placeholder="Email"
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <TextInput
          placeholder="Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        {/*<TextInput 
                  placeholder='Username'
                  value={newUsername}
                onChangeText={setNewUsername}/>*/}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            createUser();
          }}
        >
          <Text>Register User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login' /*, user*/);
          }}
        >
          <Text>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
      <View></View>
      <StatusBar style="auto" />
    </View>
  );
};
