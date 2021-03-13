import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Login } from './navigationScreens/Login';
import { SignUp } from './navigationScreens/SignUp';
import { ManageTeams } from './tabScreens/ManageTeams';
import { ClipBoard } from './tabScreens/ClipBoard';
import { DrillBank } from './tabScreens/DrillBank';
import { CreatePractice } from './navigationScreens/CreatePractice';
import { ViewDrill } from './navigationScreens/ViewDrill';
import { PracticeSettings } from './navigationScreens/PracticeSettings';
import { DrillsContext } from './Context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FAB } from 'react-native-paper';
import { Icon, InlineIcon } from '@iconify/react';
//import basketballIcon from '@iconify-icons/carbon/basketball';
//import clipboardEditOutline from '@iconify-icons/mdi/clipboard-edit-outline';
//import peopleTeam16Filled from '@iconify-icons/fluent/people-team-16-filled';
//import coneIcon from '@iconify-icons/bi/cone';

// Creating the stack and tab navigator
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
          component={
            DrillBank
          } /*options={{ tabBarIcon: ({ focused, color}) => {
                  return <Icon icon={coneIcon} height="25" width="25"style={{color: '#f4f4f4'}} />;  // <---- android
                }}}*/
        />
        <Tab.Screen
          name="Manage Teams"
          component={
            ManageTeams
          } /*options={{ tabBarIcon: ({ focused, color}) => {
                  return <Icon icon={peopleTeam16Filled} height="25" width="25"style={{color: '#f4f4f4'}} />;  // <---- android
                }}}*/
        />
        <Tab.Screen
          name="Clip Board"
          component={
            ClipBoard
          } /*options={{ tabBarIcon: ({ focused, color}) => {
                  return <Icon icon={clipboardEditOutline} height="25" width="25"style={{color: '#f4f4f4'}} />;  // <---- android
                }}}*/
        />
      </Tab.Navigator>

      <FAB
        icon={require('./assets/basketball_iOS.png')}
        color="#f4f4f4"
        style={{
          position: 'absolute',
          bottom: 40,
          right: 20,
          backgroundColor: '#fc5c14',
        }}
        onPress={() => navigation.navigate('PracticeCreator')}
      />
    </SafeAreaView>
  );
};

export default function App({ navigation }: { navigation: any }) {
  const [practiceDrills, setDrills] = useState<Drill[]>([]);

  // Adding a drill to the practice
  const addDrill = (drill: Drill) => {
    const drillsList = [...practiceDrills];
    drillsList.push(drill);
    setDrills(drillsList);
  };

  // Removing a drill from the practice
  const removeDrill = (index: number) => {
    const drillsList = [...practiceDrills];
    drillsList.splice(index, 1);
    setDrills(drillsList);
  };

  // Drill class interface
  interface Drill {
    title: string;
    id: string;
    duration: number;
    numberOfPlayers: number;
    recommendedNumber: number;
    imageUrl: string;
    description: string;
    category: string;
    level: number;
    numberOfRatings: number;
  }

  // Returning the navigation screens (including the tab navigator) in a stack navigator
  return (
    <NavigationContainer>
      <DrillsContext.Provider
        value={{ practiceDrills, setDrills, addDrill, removeDrill }}
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
            name="PracticeCreator"
            component={CreatePractice}
            options={({ route }) => ({
              title: 'New Practice',
              headerBackTitle: 'Drill bank',
            })}
          />
          <Stack.Screen
            name="DrillBank"
            component={DrillBank}
            options={({ route }) => ({ title: 'Drill Bank' })}
          />
          <Stack.Screen
            name="ViewDrill"
            component={ViewDrill}
            options={({ route }) => ({
              title: '',
              headerBackTitle: 'Back',
            })}
          />
          <Stack.Screen
            name="PracticeSettings"
            component={PracticeSettings}
            options={({ route }) => ({
              title: 'Practice Settings',
              headerBackTitle: 'Drills',
            })}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </DrillsContext.Provider>
    </NavigationContainer>
  );
}
