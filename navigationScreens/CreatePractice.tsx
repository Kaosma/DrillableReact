import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useContext} from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Icon, InlineIcon } from '@iconify/react';
import { styles } from "../styles"
import plusSquareFill from '@iconify-icons/bi/plus-square-fill';
import plusOutlined from '@iconify-icons/ant-design/plus-outlined';
import { DrillsContext } from "../App"



export const CreatePractice = ({navigation}: {navigation: any}) => {

    const { practiceDrills, setDrills } = useContext(DrillsContext);
    
    type PracticeDrillProps = {title: string; duration: number; index: number}

    const AddedDrill = ({title, duration, index}: PracticeDrillProps) => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#3a3535', borderRadius: 2, shadowColor: 'black', shadowRadius: 7, width: '100%'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#f4f4f4', height: 50, margin: 10}}>
                        <Text style={{color:'#3a3535', margin: 10, fontSize: 20, fontFamily: 'roboto', fontWeight: '500'}}>{index}</Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#f4f4f4', height: 50, marginTop: 10, marginBottom: 10}}>
                        <Text style={{color:'#3a3535', margin: 10, fontSize: 20, fontFamily: 'roboto', fontWeight: '500'}}>{title}</Text>
                    </View>
                </View>
          
                <View style={{flexDirection: 'row'}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#f4f4f4', height: 50, marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                        <Text style={{color:'#3a3535', margin: 10, fontSize: 20, fontFamily: 'roboto', fontWeight: '500'}}>{duration}min</Text>
                    </View>
                    <TouchableOpacity 
                      style={{
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: 25, 
                        width: 50, 
                        height: 50, 
                        margin: 10}}
                      onPress={() => {
                        console.log(practiceDrills)
                      }}>
                        <Text style={{color:'red', fontSize: 50}}>⊗</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const EmptySlot = () => {
        return(
            <TouchableOpacity style={{
              alignItems: 'center', 
              justifyContent: 'center', 
              flexDirection:'row', 
              backgroundColor: '#3a3535', 
              borderColor: '#000000', 
              borderWidth:2,
              borderRadius: 2, 
              shadowColor: 'black', 
              shadowRadius: 3, 
              height: 70,
              width: '100%'}}
              onPress={()=> { navigation.navigate("DrillBank")}}>    
                {/*<Text style={{fontFamily: 'roboto', color: '#ff7315', fontSize:'55'}}>ADD DRILL</Text>*/}
                <Icon icon={plusOutlined} width='60' height='60' style={{color: '#ff7315'}} />   
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.rootContainer}>
            <View style={{width: '100%'}}>
                <FlatList
                    data={practiceDrills}
                    renderItem={({item}) => {
                    return <AddedDrill 
                    title = {item.title}
                    duration = {item.duration}
                    index = {1}
                    />
                    }}
                />
                <EmptySlot></EmptySlot>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}