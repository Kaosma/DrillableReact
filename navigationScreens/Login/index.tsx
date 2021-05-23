import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Login</Text>
      </View>

      <View
        style={styles.inputContainer}
      >
        <View style={styles.inputView}>
          <View style={styles.inputFields}>
            <Text style={styles.inputText}>{'Email'}</Text>

            <TextInput
              value={userEmail}
              onChangeText={setEmail}
              style={styles.inputTextField}
            />
          </View>

          <View style={styles.inputFields}>
            <Text style={styles.inputText}>{'Password'}</Text>

            <TextInput
              value={userPassword}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.inputTextField}
            />
          </View>

          <TouchableOpacity
            style={styles.advanceButton}
            onPress={() => {
              signInUser();
            }}
          >
            <Text style={styles.advanceButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Text style={styles.buttonText}>
            Don't have an account yet? Sign up
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
