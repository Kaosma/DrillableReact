// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   Modal,
// } from 'react-native';
// import { styles } from './styles';
// import { db } from '../../DatabaseRequest';
// import * as firebase from 'firebase';
// import { FAB } from 'react-native-paper';
// import { AppContext } from '../../Context';

// // Returning the manage teams screen
// export const ManageTeams = ({ navigation }: { navigation: any }) => {
//   // Using the rating modal component when a rating a drill
//   const AddTeamModal = ({ setIsVisible }) => {
//     const [clubNameValue, setClubNameValue] = useState('Club Name');
//     const [groupNameValue, setGroupNameValue] = useState('Group Name');
//     return (
//       <View style={styles.modalRootContainer}>
//         <View style={styles.modalView}>
//           <Text style={styles.modalHeader}> Add Team</Text>

//           <TextInput
//             value={clubNameValue}
//             onChangeText={setClubNameValue}
//             style={styles.clubTextInput}
//           />

//           <TextInput
//             value={groupNameValue}
//             onChangeText={setGroupNameValue}
//             style={styles.groupTextInput}
//           />

//           <View style={styles.modalButtonContainer}>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => {
//                 addTeamToFirebase(clubNameValue, groupNameValue);
//                 setIsVisible(false);
//               }}
//             >
//               <Text style={styles.modalButtonText}>Done</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => {
//                 setIsVisible(false);
//               }}
//             >
//               <Text style={styles.modalButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };
//   // Drill class interface
//   interface Drill {
//     title: string;
//     id: string;
//     duration: number;
//     numberOfPlayers: number;
//     imageUrl: string;
//     category: string;
//     level: number;
//     ratings: number[];
//     equipment: number[];
//   }

//   // Practice class interface
//   interface Practice {
//     duration: number;
//     players: number;
//     drills: Drill[];
//   }

//   // Team class interface
//   interface Team {
//     clubName: string;
//     groupName: string;
//   }

//   const { teamsList, setTeamsList } = useContext(AppContext);
//   const [modalIsVisible, setIsVisible] = useState(false);

//   // Retrieving all drills from the database
//   function getTeamsFromDatabase() {
//     const currentUser = firebase.auth().currentUser;
//     db.collection('users')
//       .doc(currentUser?.uid)
//       .collection('teams')
//       .get()
//       .then(function (querySnapshot: any) {
//         let retrievedTeams: Team[] = [];
//         querySnapshot.forEach(function (teamDoc: any) {
//           console.log(teamDoc.data());
//           const data = teamDoc.data();
//           const teamClub: string = data.club;
//           const teamGroup: string = data.group;
//           retrievedTeams.push({
//             clubName: teamClub,
//             groupName: teamGroup,
//           });
//           setTeamsList(retrievedTeams);
//         });
//       })
//       .catch(function (error) {
//         console.log('Error getting documents: ', error);
//       });
//   }

//   function addTeamToFirebase(clubName: string, groupName: string) {
//     const currentUser = firebase.auth().currentUser;
//     db.collection('users')
//       .doc(currentUser?.uid)
//       .collection('teams')
//       .add({
//         club: clubName,
//         group: groupName,
//       })
//       .then(() => {
//         getTeamsFromDatabase();
//       });
//   }

//   // Making sure it only retrieves the drills once
//   useEffect(() => {
//     getTeamsFromDatabase();
//   }, []);

//   return (
//     <View style={styles.rootContainer}>
//       <Modal visible={modalIsVisible} transparent>
//         <AddTeamModal setIsVisible={setIsVisible} />
//       </Modal>
//       <FlatList
//         data={teamsList}
//         style={{ marginVertical: 10 }}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2}
//         renderItem={({ item, index }) => {
//           if (item.clubName === '' || item.groupName === '') {
//             return <View />;
//           }
//           return (
//             <View style={{ padding: 10, }}>
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   console.log('hej');
//                 }}
//                 style={styles.teamButtonContainer}
//               >
//                 <Text numberOfLines={1} style={styles.teamClubText}>
//                   {item.clubName}
//                 </Text>
//                 <Text numberOfLines={1} style={styles.teamGroupText}>
//                   {item.groupName}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           );
//         }}
//       />
//       <FAB
//         icon={require('../../assets/plus.png')}
//         color="#fc5c14"
//         style={styles.manageTeamsFAB}
//         onPress={() => setIsVisible(true)}
//       />
//     </View>
//   );
// };
