import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
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
            navigation.navigate('Login' /*, user*/);
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
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#f4f4f4', fontSize: 40 }}>Sign Up</Text>
      </View>
      <View
        style={{
          backgroundColor: '#000000',
          borderWidth: 2,
          borderColor: '#f4f4f4',
          borderRadius: 6,
          margin: 5,
          marginTop: 30,
        }}
      >
        <View style={{ alignItems: 'center', margin: 20 }}>
          <TextInput
            placeholder="Email"
            value={newEmail}
            onChangeText={setNewEmail}
            style={{
              color: '#f4f4f4',
              backgroundColor: '#3a3535',
              borderRadius: 3,
              fontSize: 20,
              margin: 10,
            }}
          />
          <TextInput
            placeholder="Password"
            value={newPassword}
            onChangeText={setNewPassword}
            style={{
              color: '#f4f4f4',
              backgroundColor: '#3a3535',
              borderRadius: 3,
              fontSize: 20,
              margin: 10,
            }}
          />
          {/*<TextInput 
                  placeholder='Username'
                  value={newUsername}
                onChangeText={setNewUsername}/>*/}
          <TouchableOpacity
            style={{
              backgroundColor: '#ff7315',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() => {
              createUser();
            }}
          >
            <Text style={{ margin: 7, color: '#f4f4f4', fontSize: 20 }}>
              Register User
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login' /*, user*/);
          }}
        >
          <Text style={{ color: '#f4f4f4' }}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <View></View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
