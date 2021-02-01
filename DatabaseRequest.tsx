import * as firebase from 'firebase';
import 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCB7F6NnS7SFnnwnZT-OJQsLWpMNum4tew",
    authDomain: "drillable.firebaseapp.com",
    databaseURL: "https://drillable.firebaseio.com",
    projectId: "drillable",
    storageBucket: "drillable.appspot.com",
    messagingSenderId: "15822012428",
    appId: "1:15822012428:web:f39d48df19d01589ff6e29",
    measurementId: "G-9RHEXC0EKZ"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();