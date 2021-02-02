import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import { styles } from "../styles"
import { db } from "../DatabaseRequest"
import { Rating, AirbnbRating } from 'react-native-ratings';
import { DrillsContext } from "../App"

export const DrillBank = ({navigation}: {navigation: any}) => {

    const { practiceDrills, setDrills, addDrill } = useContext(DrillsContext);

    type DrillProps = {propTitle: string; propNumberOfPlayers: number; propDuration: number; propId: string}
  
    const Drill = ({propTitle, propNumberOfPlayers, propDuration, propId}: DrillProps) => {
        const drillInstance: Drill = {
            title: propTitle,
            numberOfPlayers: propNumberOfPlayers,
            duration: propDuration,
            id: propId
        }
        return (
            <View style={styles.drillContainer}>
                <View style={{flex: 4, flexDirection: 'row', }}>
                    <View style={{flex: 3, marginLeft: 20}}>
                    <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{flex: 1, color: '#f4f4f4', fontSize: 22}}>{propTitle}</Text>
                        {/*<Text style={{flex: 1, color: '#f4f4f4', fontSize: 20}}>{rating}★</Text>*/}
                    </View>

                    <View style={{flex: 3, flexDirection: 'row', marginTop: 10}}>
                        <Text style={{flex: 1, color: '#f4f4f4', fontSize: 17}}>No. Players: {propNumberOfPlayers}</Text>
                        <Text style={{flex: 1, color: '#f4f4f4', fontSize: 17}}>Duration: {propDuration}</Text>
                    </View>
                    </View>

                    <View style={{flex: 1, }}>
                    <Image 
                        source={require('../assets/adaptive-icon.png')} 
                        style={{width: 50, height: 50,}} 
                    />
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', marginLeft: 20}}>
                    <TouchableOpacity style={styles.drillContainerButton}>RATE</TouchableOpacity>
                    <TouchableOpacity style={styles.drillContainerButton}>VIEW</TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.drillContainerButton} 
                      onPress={()=>{
                        navigation.navigate("PracticeCreator"); addDrill(drillInstance);
                      }}>ADD</TouchableOpacity>
                </View>
            </View>
        );
    };
    interface Drill {
        title: string;
        id: string;
        duration: number;
        numberOfPlayers: number
        //recommendedNumber: number;
        //imageUrl: string;
        //description: string;
        //category: string;
        //numberOfRatings: number;
    }

    const [drillsList, setDrillsList] = useState<Drill[]>([]);

    function getDrillsFromDatabase() {
        db.collection("drills")
        .get()
        .then(function(querySnapshot: any) {
            let array : Drill[] = [];
            querySnapshot.forEach(function(doc: any) {
            const data = doc.data();
            const drillName = data.name
            const drillLength = data.length
            const drillNumberOfPlayers = data.numberOfPlayers
            const drillId = data.id
            array.push({title: drillName, duration: drillLength, numberOfPlayers: drillNumberOfPlayers, id: drillId})});
            setDrillsList(array);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    useEffect(() => {
        getDrillsFromDatabase();
    }, []);

    return (
        <View style={styles.rootContainer}>
            <View style={{width: '100%'}}>
                <FlatList
                    data={drillsList}
                    renderItem={({item}) => {
                    return <Drill 
                    title = {item.title}
                    duration = {item.duration}
                    numberOfPlayers = {item.numberOfPlayers}
                    id= {item.id}
                    />
                    }}
                />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}