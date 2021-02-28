/* eslint-disable prettier/prettier */
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles';
import * as firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Login = (
  { navigation, route }: { navigation: any },
  { route: any }
) => {
  const [userEmail, setEmail] = useState('l@l.se');
  const [userPassword, setPassword] = useState('Hej123');

  // Sign in the user if the email and password match and user exists in firebase
  function signInUser() {
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        navigation.navigate('Tabs');
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
    <SafeAreaView style={styles.rootContainer}>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>Login</Text>
      </View>

      <View
        style={style.inputContainer}
      >
        <View style={style.inputView}>
          <View style={style.inputFields}>
            <Text style={style.inputText}>{'Email'}</Text>

            <TextInput
              value={userEmail}
              onChangeText={setEmail}
              style={style.inputTextField}
            />
          </View>

          <View style={style.inputFields}>
            <Text style={style.inputText}>{'Password'}</Text>

            <TextInput
              value={userPassword}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={style.inputTextField}
            />
          </View>

          <TouchableOpacity
            style={style.advanceButton}
            onPress={() => {
              signInUser();
            }}
          >
            <Text style={style.advanceButtonText}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Text style={style.buttonText}>
            Don't have an account yet? Sign up
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#f4f4f4',
    borderRadius: 6,
    margin: 5,
    marginTop: 30,
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    color: '#f4f4f4',
    fontSize: 40,
  },
  inputView: {
    alignItems: 'center',
    margin: 20,
  },
  inputFields: {
    padding: 10,
  },
  inputTextField: {
    color: '#f4f4f4',
    backgroundColor: '#3a3535',
    borderRadius: 3,
    fontSize: 17,
    width: 200,
    marginTop: 2,
    padding: 5,
  },
  inputText: {
    color: '#f4f4f4',
  },
  advanceButton: {
    backgroundColor: '#ff7315',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  advanceButtonText: {
    margin: 7,
    color: '#f4f4f4',
    fontSize: 20,
  },
  buttonText: {
    color: '#f4f4f4',
    marginTop: 8,
  },
});