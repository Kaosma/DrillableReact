import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { ManageTeams } from "./tabScreens/ManageTeams";
import { ClipBoard } from "./tabScreens/ClipBoard";
import { DrillBank } from "./tabScreens/DrillBank"
import { styles } from "./styles"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { Icon, InlineIcon } from '@iconify/react';
import basketballIcon from '@iconify-icons/carbon/basketball';
import clipboardEditOutline from '@iconify-icons/mdi/clipboard-edit-outline';
import peopleTeam16Filled from '@iconify-icons/fluent/people-team-16-filled';
import { CreatePractice } from './navigationScreens/CreatePractice';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const TabsComponent = ({navigation}: {navigation: any}) => {
    return(
      <Tab.Navigator tabBarOptions={{
        showIcon:'true',
        style: { backgroundColor: '#ff7315' }, 
        activeTintColor:'#f4f4f4',
        indicatorStyle:{backgroundColor:'#f4f4f4'},
        }}>

          <Tab.Screen name="Drill bank" component={DrillBank} options={{ tabBarIcon: ({ focused, color}) => {
            return <Icon icon={basketballIcon} style={{color: '#f4f4f4'}} />;  // <---- android
          }}} />
          <Tab.Screen name="Manage Teams" component={ManageTeams} options={{ tabBarIcon: ({ focused, color}) => {
            return <Icon icon={peopleTeam16Filled} style={{color: '#f4f4f4'}} />;  // <---- android
          }}} />
          <Tab.Screen name="Clip Board" component={ClipBoard} options={{ tabBarIcon: ({ focused, color}) => {
            return <Icon icon={clipboardEditOutline} style={{color: '#f4f4f4'}} />;  // <---- android
          }}} />
      </Tab.Navigator>
      
    );
}
export default function App({navigation}: {navigation: any}) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabs" component={TabsComponent} />
                <Stack.Screen name="PracticeCreator" component={CreatePractice} />
            </Stack.Navigator>
            <FAB 
              icon={require('./assets/basketball_iOS.png')}
              color="#f4f4f4"
              style={{ position: 'absolute', bottom: 40, right: 20, backgroundColor: '#fc5c14'}} 
              onPress={() => navigation.navigate("PracticeCreator")}
            />
        </NavigationContainer>
    );
}


