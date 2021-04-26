import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { db } from '../../DatabaseRequest';
import * as firebase from 'firebase';
import { FAB } from 'react-native-paper';

// Returning the manage teams screen
export const ManageTeams = ({ navigation }: { navigation: any }) => {
  // Drill class interface
  interface Drill {
    title: string;
    id: string;
    duration: number;
    numberOfPlayers: number;
    imageUrl: string;
    category: string;
    level: number;
    ratings: number[];
    equipment: number[];
  }

  // Practice class interface
  interface Practice {
    duration: number;
    players: number;
    drills: Drill[];
  }

  // Team class interface
  interface Team {
    clubName: string;
    groupName: string;
  }

  const [teamsList, setTeamsList] = useState<Team[]>([]);

  // Retrieving all drills from the database
  function getTeamsFromDatabase() {
    const currentUser = firebase.auth().currentUser;
    db.collection('users')
      .doc(currentUser?.uid)
      .collection('teams')
      .get()
      .then(function (querySnapshot: any) {
        let retrievedTeams: Team[] = [];
        querySnapshot.forEach(function (teamDoc: any) {
          console.log(teamDoc.data());
          const data = teamDoc.data();
          const teamClub: string = data.club;
          const teamGroup: string = data.group;
          retrievedTeams.push({
            clubName: teamClub,
            groupName: teamGroup,
          });
          setTeamsList(retrievedTeams);
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }

  // Making sure it only retrieves the drills once
  useEffect(() => {
    getTeamsFromDatabase();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={teamsList}
        style={{marginVertical: 10}}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item, index }) => {
          if (item.clubName === '' || item.groupName === '') {
            return <View />;
          }
          return (
            <View
              style={{
                padding: 10,
              }}
            >
              <TouchableOpacity
                key={index}
                onPress={() => {
                  console.log('hej');
                }}
                style={{
                  backgroundColor: '#f4f4f4',
                  borderRadius: 10,
                  alignItems: 'center',
                  maxWidth: 150,
                  minWidth: 150,
                }}
              >
                <Text
                  style={{
                    color: '#ff7315',
                    padding: 10,
                    fontSize: 18,
                    fontWeight: '600',
                  }}
                >
                  {item.clubName}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: 'black',
                    paddingTop: 0,
                    padding: 10,
                    fontSize: 18,
                    fontWeight: '400',
                  }}
                >
                  {item.groupName}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <FAB
        icon={require('../../assets/icons8-plus-math-90.png')}
        color="#fc5c14"
        style={{
          position: 'absolute',
          bottom: 40,
          right: 20,
          backgroundColor: '#f4f4f4',
        }}
        onPress={() => navigation.navigate('PracticeCreator')}
      />
    </View>
  );
};
