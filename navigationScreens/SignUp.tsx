import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles';
import * as firebase from 'firebase';
import { db } from '../DatabaseRequest';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SignUp = ({ navigation }: { navigation: any }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Creates a new user and registers it in firebase
  function createUser() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newEmail, newPassword)
      .then((userProvider) => {
        db.collection('users')
          .doc(userProvider.user?.uid)
          .set({
            email: userProvider.user?.email,
          })
          .then((ref) => {
            console.log(ref);
            navigation.navigate('Login', { newEmail, newPassword });
          });
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
        <Text style={style.headerText}>Sign Up</Text>
      </View>
      <View style={style.inputContainer}>
        <View style={style.inputView}>
          <View style={style.inputFields}>
            <Text style={style.inputText}>{'Email'}</Text>
            <TextInput
              value={newEmail}
              onChangeText={setNewEmail}
              style={style.inputTextField}
            />
          </View>
          <View style={style.inputFields}>
            <Text style={style.inputText}>{'Password'}</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              style={style.inputTextField}
            />
          </View>
          {/*<TextInput
                  placeholder='Username'
                  value={newUsername}
                onChangeText={setNewUsername}/>*/}

          <TouchableOpacity
            style={style.advanceButton}
            onPress={() => {
              createUser();
            }}
          >
            <Text style={style.advanceButtonText}>Register User</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={style.buttonText}>Already have an account? Sign in</Text>
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