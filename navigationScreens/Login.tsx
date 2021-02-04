import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles';
import * as firebase from 'firebase';

export const Login = ({ navigation }: { navigation: any }) => {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');

  function signInUser() {
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        navigation.navigate('Tabs' /*, user*/);
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
        <Text>Login</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TextInput
          placeholder="Enter email"
          value={userEmail}
          onChangeText={setEmail}
          style={{
            color: '#f4f4f4',
            borderWidth: 2,
            borderRadius: 3,
            borderColor: '#ff7315',
            fontSize: 20,
          }}
        />
        <TextInput
          placeholder="Enter password"
          value={userPassword}
          onChangeText={setPassword}
          style={{
            color: '#f4f4f4',
            borderWidth: 2,
            borderRadius: 3,
            borderColor: '#ff7315',
            fontSize: 20,
            marginTop: 10,
          }}
        />

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 7 }}
            onPress={() => {
              navigation.navigate('SignUp' /*, user*/);
            }}
          >
            <Text style={{ color: '#f4f4f4' }}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 7 }}
            onPress={() => {
              signInUser();
            }}
          >
            <Text style={{ color: '#f4f4f4' }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
      <StatusBar style="auto" />
    </View>
  );
};
