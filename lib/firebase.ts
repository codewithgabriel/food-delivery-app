import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// @ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCNIJJOWvR4gzS7U3f9Z34oR4IfMIC24oI",
    authDomain: "food-app-75baf.firebaseapp.com",
    projectId: "food-app-75baf",
    storageBucket: "food-app-75baf.firebasestorage.app",
    messagingSenderId: "880855455420",
    appId: "1:880855455420:web:176f525e9000412d98e2b9",
    measurementId: "G-136KE8JL9L"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export default app;
