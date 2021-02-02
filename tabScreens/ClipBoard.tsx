import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { styles } from "../styles"
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import RatingAlert from '../customComponents/RatingAlert'

export const ClipBoard = ({navigation}: {navigation: any}) => {
    return (
        <View style={styles.rootContainer}>
            <RatingAlert></RatingAlert>
            <StatusBar style="auto" />
        </View>
    )
}