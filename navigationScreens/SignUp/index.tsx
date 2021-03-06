import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { db } from '../../DatabaseRequest';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <View style={styles.inputFields}>
            <Text style={styles.inputText}>{'Email'}</Text>
            <TextInput
              value={newEmail}
              onChangeText={setNewEmail}
              style={styles.inputTextField}
            />
          </View>
          <View style={styles.inputFields}>
            <Text style={styles.inputText}>{'Password'}</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.inputTextField}
            />
          </View>
          {/*<TextInput
                  placeholder='Username'
                  value={newUsername}
                onChangeText={setNewUsername}/>*/}

          <TouchableOpacity
            style={styles.advanceButton}
            onPress={() => {
              createUser();
            }}
          >
            <Text style={styles.advanceButtonText}>Register User</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={styles.buttonText}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
