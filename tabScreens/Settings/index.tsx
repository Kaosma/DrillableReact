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

  function changePassword() {
    if (inputPassword === confirmInputPassword) {
      currentUser
        ?.updatePassword(inputPassword)
        .then(() => {
          setInputPassword('');
          setConfirmInputPassword('');
          setShowPasswordInput(false);
          setPasswordErrorText('');
        })
        .catch((error) => {
          if (error.code === 'auth/weak-password') {
            setPasswordErrorText(
              'Password must be at least 6 characters long!'
            );
          }
        });
    } else {
      setPasswordErrorText('Both passwords must match!');
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
      <View style={styles.settingsButtonsContainer}>
        <TouchableOpacity
          style={styles.primaryButtonContainer}
          onPress={() => {
            setShowPasswordInput(!showPasswordInput);
          }}
        >
          <Text style={styles.primaryButtonText}>Change password</Text>
        </TouchableOpacity>

        <View
          style={{
            display: showPasswordInput ? 'flex' : 'none',
            alignItems: 'center',
            paddingBottom: 20,
          }}
        >
          <View style={{justifyContent: 'flex-start',}}>
            <Text style={styles.inputTitle}>New password</Text>
            <TextInput
              secureTextEntry={true}
              value={inputPassword}
              onChangeText={(text: string) => {
                setInputPassword(text);
                setPasswordErrorText('');
              }}
              style={styles.changePasswordInput}
            />
            <Text style={styles.inputTitle}>Confirm password</Text>
            <TextInput
              secureTextEntry={true}
              value={confirmInputPassword}
              onChangeText={(text: string) => {
                setConfirmInputPassword(text);
                setPasswordErrorText('');
              }}
              style={styles.changePasswordInput}
            />
            <Text style={styles.errorText}>{passwordErrorText}</Text>
          </View>
          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={() => {
              changePassword();
            }}
          >
            <Text style={styles.changePasswordButtonText}>DONE</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.primaryButtonContainer}
          onPress={() => {
            logoutUser();
          }}
        >
          <Text style={styles.primaryButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButtonContainer}
          onPress={() => {
            deleteUser();
          }}
        >
          <Text style={styles.secondaryButtonText}>Delete account</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
