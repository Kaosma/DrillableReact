import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { styles } from './styles';
import { db } from '../../DatabaseRequest';
import * as firebase from 'firebase';
import { FAB } from 'react-native-paper';
import { AppContext } from '../../Context';

// Returning the manage teams screen
export const ManageTeams = ({ navigation }: { navigation: any }) => {
  // Using the rating modal component when a rating a drill
  const AddTeamModal = ({ setIsVisible }) => {
    const [clubNameValue, setClubNameValue] = useState('Club Name');
    const [groupNameValue, setGroupNameValue] = useState('Group Name');
    return (
      <View
        style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
        <View
          style={{
            backgroundColor: '#f4f4f4',
            borderRadius: 6,
            alignItems: 'center',
            marginTop: 200,
            width: '80%',
          }}
        >
          <Text
            style={{
              marginTop: 10,
              color: '#3a3535',
              fontFamily: 'System',
              fontSize: 30,
            }}
          >
            Add Team
          </Text>

          <TextInput
            value={clubNameValue}
            onChangeText={setClubNameValue}
            style={{ color: '#f4f4f4',
            backgroundColor: '#3a3535',
            borderRadius: 3,
            fontSize: 17,
            width: 200,
            marginTop: 20,
            padding: 5,}}
          ></TextInput>

          <TextInput
            value={groupNameValue}
            onChangeText={setGroupNameValue}
            style={{ color: '#f4f4f4',
            backgroundColor: '#3a3535',
            borderRadius: 3,
            fontSize: 17,
            width: 200,
            marginTop: 20,
            marginBottom: 20,
            padding: 5,}}
          ></TextInput>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{ paddingBottom: 15, paddingLeft: 25 }}
              onPress={() => {
                addTeamToFirebase(clubNameValue, groupNameValue);
                setIsVisible(false);
              }}
            >
              <Text
                style={{ color: '#000000', fontFamily: 'System', fontSize: 25 }}
              >
                Done
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingBottom: 15, paddingRight: 25 }}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Text
                style={{ color: '#000000', fontFamily: 'System', fontSize: 25 }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
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

  const { teamsList, setTeamsList } = useContext(AppContext);
  const [modalIsVisible, setIsVisible] = useState(false);

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

  function addTeamToFirebase(clubName: string, groupName: string) {
    const currentUser = firebase.auth().currentUser;

    db.collection('users')
      .doc(currentUser?.uid)
      .collection('teams')
      .add({
        club: clubName,
        group: groupName,
      })
      .then(() => {
        getTeamsFromDatabase();
      });
  }

  // Making sure it only retrieves the drills once
  useEffect(() => {
    getTeamsFromDatabase();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Modal visible={modalIsVisible} transparent>
        <AddTeamModal setIsVisible={setIsVisible} />
      </Modal>
      <FlatList
        data={teamsList}
        style={{ marginVertical: 10 }}
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
        onPress={() => setIsVisible(true)}
      />
    </View>
  );
};
