import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import { styles } from "../styles"
import { db } from "../DatabaseRequest"

export const ViewDrill = ({navigation}: {navigation: any}) => {
    return(
        <View style={styles.rootContainer}>
            <View style={styles.drillContainer}>
                
            </View>
        </View>
    );
}