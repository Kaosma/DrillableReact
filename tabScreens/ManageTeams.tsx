import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from "../styles"
import Slider from '@react-native-community/slider';

// Returning the manage teams screen
export const ManageTeams = ({navigation}: {navigation: any}) => {
    return (
        <View style={styles.rootContainer}>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            <StatusBar style="auto" />
        </View>
    )
}