import { Image, SafeAreaView } from 'react-native';
import { AppContext } from './Context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Login } from './navigationScreens/Login';
import { SignUp } from './navigationScreens/SignUp';
import { DrillBank } from './tabScreens/DrillBank';
import { SavedDrills } from './tabScreens/SavedDrills';
import { Settings } from './tabScreens/Settings';
import { ViewDrill } from './navigationScreens/ViewDrill';
import { ViewVideo } from './navigationScreens/ViewVideo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrillsSection } from './Classes';
import { db } from './DatabaseRequest';
import * as firebase from 'firebase';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

// Returning the tabScreens in a tab navigator
export const TabsComponent = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        tabBarOptions={{
          showIcon: true,
          style: { backgroundColor: '#ff7315' },
          activeTintColor: '#f4f4f4',
          indicatorStyle: { backgroundColor: '#f4f4f4' },
        }}
      >
        <Tab.Screen
          name="Drill bank"
          component={DrillBank}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={require('./assets/basketball_icon.png')}
                  style={{
                    tintColor: '#f4f4f4',
                    height: 25,
                    width: 25,
                    opacity: focused === true ? 1 : 0.5,
                  }}
                />
              ); // <---- android
            },
          }}
        />
        <Tab.Screen
          name="Saved Drills"
          component={SavedDrills}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={require('./assets/list.png')}
                  style={{
                    tintColor: '#f4f4f4',
                    height: 25,
                    width: 25,
                    opacity: focused === true ? 1 : 0.5,
                  }}
                />
              ); // <---- android
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={require('./assets/settings.png')}
                  style={{
                    tintColor: '#f4f4f4',
                    height: 25,
                    width: 25,
                    opacity: focused === true ? 1 : 0.5,
                  }}
                />
              ); // <---- android
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default function App({ navigation }: { navigation: any }) {
  const [savedDrills, setSavedDrills] = useState<DrillsSection[]>([
    {
      sectionTitle: 'No saved drills',
      data: [],
    },
  ]);

  // Retrieving all drills from the database
  async function getAddedDrillsFromDatabase() {
    let retrieveSavedDrills: DrillsSection[] = [];
    try {
      const currentUser = firebase.auth().currentUser;
      const querySnapshot = await db
        .collection('users')
        .doc(currentUser?.uid)
        .collection('savedDrills')
        .get();
      for (const doc of querySnapshot.docs) {
        const drillRef = db.collection('drills').doc(doc.id);
        const drillSnapshot = await drillRef.get();
        if (!drillSnapshot.exists) {
          console.log('No such document!');
        } else {
          const data = drillSnapshot.data();
          if (data !== undefined) {
            const drillName: string = data.name;
            const drillLength: number = data.length;
            const drillNumberOfPlayers: number = data.numberOfPlayers;
            const drillId: string = doc.id;
            const drillImage: string = data.imageUrl;
            const drillVideo: string = data.videoUrl;
            const drillCategory: string = data.category;
            const drillLevel: number = data.level;
            const drillRatings: number[] = [];
            const drillEquipment: number[] = data.equipment;

            const snapShot = await db
              .collection('drills')
              .doc(doc.id)
              .collection('ratings')
              .get();
            snapShot.docs.forEach((ratingDoc) => {
              drillRatings.push(ratingDoc.data().rating);
            });
            const savedCategories = retrieveSavedDrills.map(
              (d) => d.sectionTitle
            );

            if (savedCategories.includes(drillCategory)) {
              retrieveSavedDrills.map((d) => {
                if (d.sectionTitle === drillCategory) {
                  console.log('Exists');
                  d.data.push({
                    title: drillName,
                    id: drillId,
                    duration: drillLength,
                    numberOfPlayers: drillNumberOfPlayers,
                    imageUrl: drillImage,
                    videoUrl: drillVideo,
                    category: drillCategory,
                    level: drillLevel,
                    ratings: drillRatings,
                    equipment: drillEquipment,
                  });
                  setSavedDrills(retrieveSavedDrills);
                }
              });
            } else {
              console.log('New');
              retrieveSavedDrills.push({
                sectionTitle: drillCategory,
                data: [
                  {
                    title: drillName,
                    id: drillId,
                    duration: drillLength,
                    numberOfPlayers: drillNumberOfPlayers,
                    imageUrl: drillImage,
                    videoUrl: drillVideo,
                    category: drillCategory,
                    level: drillLevel,
                    ratings: drillRatings,
                    equipment: drillEquipment,
                  },
                ],
              });
            }
          }
        }
      }
      setSavedDrills(retrieveSavedDrills);
    } catch (e) {
      console.log('error', e);
    }
  }

  // Remove a saved drill from firebase
  async function removeSavedDrill(id: string) {
    try {
      const currentUser = firebase.auth().currentUser;
      db.collection('users')
        .doc(currentUser?.uid)
        .collection('savedDrills')
        .doc(id)
        .delete()
        .then(() => {
          getAddedDrillsFromDatabase();
        });
    } catch (error) {
      console.log('Error rate drill: ', error);
    }
  }

  // Returning the navigation screens (including the tab navigator) in a stack navigator
  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          savedDrills,
          setSavedDrills,
          getAddedDrillsFromDatabase,
          removeSavedDrill,
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#f4f4f4',
            headerStyle: {
              backgroundColor: '#ff7315',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={TabsComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewDrill"
            component={ViewDrill}
            options={({}) => ({
              title: '',
              headerBackTitle: 'Back',
            })}
          />
          <Stack.Screen
            name="ViewVideo"
            component={ViewVideo}
            options={({}) => ({
              title: '',
              headerBackTitle: 'Back',
            })}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
