import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useContext} from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Icon, InlineIcon } from '@iconify/react';
import { styles } from "../styles"
import plusSquareFill from '@iconify-icons/bi/plus-square-fill';
import plusOutlined from '@iconify-icons/ant-design/plus-outlined';
import { DrillsContext } from "../App"
import xCircle from '@iconify-icons/bi/x-circle';
import eyeFilled from '@iconify-icons/ant-design/eye-filled';



export const CreatePractice = ({navigation}: {navigation: any}) => {

    const { practiceDrills, setDrills, removeDrill } = useContext(DrillsContext);

    const EmptySlot = () => {
        return(
            <TouchableOpacity style={{
              alignItems: 'center', 
              marginTop: 10,
              justifyContent: 'center', 
              flexDirection:'row', 
              backgroundColor: '#3a3535', 
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
            <View style={{width: '90%'}}>
                <FlatList
                    data={practiceDrills}
                    renderItem={({item, index}) => {
                    return <View style={{marginTop: 10,flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#3a3535', borderRadius: 2, shadowColor: 'black', shadowRadius: 3, width: '100%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#f4f4f4', height: 50, margin: 10}}>
                                <Text style={{color:'#3a3535', margin: 10, fontSize: 20, fontFamily: 'roboto', fontWeight: '500'}}>{index+1}</Text>
                            </View>
                            <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#f4f4f4', height: 50, marginTop: 10, marginBottom: 10}}>
                                <Text style={{color:'#3a3535', margin: 10, fontSize: 20, fontFamily: 'roboto', fontWeight: '500'}}>{item.title}</Text>
                            </View>
                        </View>
                
                        <View style={{flexDirection: 'row'}}>
                            <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#3a3535', height: 50, marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                                <Text style={{color:'#f4f4f4', margin: 10, fontSize: 20, fontFamily: 'roboto', fontWeight: '500'}}>{item.duration}min</Text>
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
                                removeDrill(index);
                            }}>
                                <Icon icon={xCircle} height="40" width="40"style={{color: '#fc5c14'}} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={{
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                borderRadius: 25, 
                                width: 50, 
                                height: 50, 
                                marginTop: 10,
                                marginBottom: 10}}
                            onPress={() => {
                                navigation.navigate("ViewDrill", item);
                            }}>
                                <Icon icon={eyeFilled} height="45" width="45"style={{color: '#f4f4f4'}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    }}
                />
                <EmptySlot></EmptySlot>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}