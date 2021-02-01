import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from "../styles"
import { firebaseConfig, db } from "../DatabaseRequest"

