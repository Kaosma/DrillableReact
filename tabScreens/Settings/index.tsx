import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { styles } from './styles';
import { db } from '../../DatabaseRequest';
import * as firebase from 'firebase';

// Returning the manage teams screen
export const Settings = ({ navigation }: { navigation: any }) => {
  const currentUser = firebase.auth().currentUser;

  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [confirmInputPassword, setConfirmInputPassword] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  function changeLanguage() {
    console.log('hej');
  }
  function changePassword() {
    if (inputPassword === confirmInputPassword) {
      currentUser
        ?.updatePassword(inputPassword)
        .then(() => {
          setInputPassword('');
          setConfirmInputPassword('');
          setShowPasswordInput(false);
          setPasswordErrorText('Password Successfully Changed!');
        })
        .catch((error) => {
          // if (error.code === 'auth/email-already-in-use') {
          //   console.log('That email address is already in use!');
          // }

          // if (error.code === 'auth/invalid-email') {
          //   console.log('That email address is invalid!');
          // }

          console.error(error);
        });
    }
  }
  function logoutUser() {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate('Login'));
  }
  function deleteUser() {
    db.collection('users')
      .doc(currentUser?.uid)
      .delete()
      .then(() => {
        firebase
          .auth()
          .currentUser?.delete()
          .then(() => logoutUser());
      });
  }
  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log('Change language');
        }}
      >
        <Text style={styles.settingsButtonText}>Change language</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setShowPasswordInput(!showPasswordInput);
        }}
      >
        <Text style={styles.settingsButtonText}>Change password</Text>
      </TouchableOpacity>

      <View
        style={{
          display: showPasswordInput ? 'flex' : 'none',
          alignItems: 'center',
        }}
      >
        <TextInput
          value={inputPassword}
          onChangeText={setInputPassword}
          style={styles.changePasswordInput}
        />
        <TextInput
          value={confirmInputPassword}
          onChangeText={setConfirmInputPassword}
          style={styles.changePasswordInput}
        />
        <TouchableOpacity
          onPress={() => {
            changePassword();
          }}
        >
          <Text style={styles.changePasswordButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          logoutUser();
        }}
      >
        <Text style={styles.settingsButtonText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          deleteUser();
        }}
      >
        <Text style={styles.settingsButtonText}>Delete account</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};
